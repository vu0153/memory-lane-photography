/* Private AI dashboard overview. Reads staging only, no model calls or synthetic metrics. */
const PROJECT="https://livorstsjtixdgksuzou.supabase.co";
const reply=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
const preview=(request,env)=>{
 const host=new URL(request.url).hostname;
 return host.endsWith(".memory-lane-photography.pages.dev") &&
  host!=="memory-lane-photography.pages.dev" &&
  env.SUPABASE_URL?.replace(/\/$/,"")===PROJECT &&
  !!env.SUPABASE_SECRET_KEY && !!env.SUPABASE_PUBLISHABLE_KEY;
};
async function records(env,table,params="",method="GET",body){
 const r=await fetch(PROJECT+"/rest/v1/"+table+params,{
  method,headers:{"apikey":env.SUPABASE_SECRET_KEY,"Content-Type":"application/json","Prefer":"return=representation"},
  body:body===undefined?undefined:JSON.stringify(body)
 });
 if(!r.ok)throw Error("Database query failed");
 return await r.json();
}
async function admin(env,request){
 const token=(request.headers.get("Authorization")||"").match(/^Bearer\s+(\S+)$/i)?.[1];
 if(!token)return null;
 const r=await fetch(PROJECT+"/auth/v1/user",{headers:{
  apikey:env.SUPABASE_PUBLISHABLE_KEY,Authorization:"Bearer "+token}});
 if(!r.ok)return null;
 const user=await r.json();
 if(!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(user?.id||""))return null;
 const yes=await records(env,"admin_users","?select=user_id&user_id=eq."+encodeURIComponent(user.id)+"&limit=1");
 return yes.length?user:null;
}
function profileFallback(user){
 // Admin records are authenticated and checked against allowlist.
 // Missing profile is not silently mapped to another person's image/name.
 return {display_name:"Studio Owner",locale:"en-AU",avatar_data_url:null,user_id:user.id};
}
async function getOverview(env,user){
 const [p,a,q,t,pol,s]=await Promise.all([
  records(env,"ai_admin_profiles","?select=user_id,display_name,locale,avatar_webp_base64,updated_at&user_id=eq."+encodeURIComponent(user.id)+"&limit=1"),
  records(env,"ai_agent_registry","?select=slug,display_name,purpose,launch_state,updated_at&order=slug.asc"),
  records(env,"ai_quote_requests","?select=id,status,created_at,email&order=created_at.desc&limit=100"),
  records(env,"ai_manager_tasks","?select=id,agent_slug,title,status,created_at&order=created_at.desc&limit=100"),
  records(env,"ai_policy_versions","?select=policy_key,version,published_at&state=eq.active&order=published_at.desc&limit=12"),
  records(env,"ai_chat_sessions","?select=id,created_at&order=created_at.desc&limit=100")
 ]);
 const row=p[0];
 const profile=row?{
  user_id:user.id,display_name:row.display_name,
  locale:row.locale,updated_at:row.updated_at,
  avatar_data_url:row.avatar_webp_base64?"data:image/webp;base64,"+row.avatar_webp_base64:null
 }:profileFallback(user);
 const waiting=q.filter(x=>x.status==="pending_review");
 const reviewing=q.filter(x=>x.status==="reviewing");
 const proposed=t.filter(x=>x.status==="proposed");
 // Underlying lists are limited to 100; avoid falsely reporting a full-history total.
 return {
  profile, generated_at:new Date().toISOString(), limits:{recentItems:100},
  managerEnabled:env.AI_MANAGER_ENABLED==="true" && !!env.OPENAI_API_KEY,
  agents:a.map(x=>({slug:x.slug,name:x.display_name,purpose:x.purpose,launch_state:x.launch_state,
   checked_at:x.updated_at})),
  summary:{pendingQuoteRequests:waiting.length,reviewingQuoteRequests:reviewing.length,
   proposedTasks:proposed.length,recentChatSessions:s.length,policies:pol.length,
   countsCapped:{quotes:q.length===100,tasks:t.length===100,chats:s.length===100}},
  approvals:waiting.slice(0,8).map(x=>({id:x.id,kind:"quote",created_at:x.created_at,status:x.status})),
  tasks:proposed.slice(0,8).map(x=>({id:x.id,agent:x.agent_slug,title:x.title,status:x.status,created_at:x.created_at})),
  policies:pol,
  connected:{customerService:true,bookings:false,studioOperations:false,marketing:false,finance:false},
  caution:"All counts reflect the staging database. Calendar, production bookings, social media and finance are not connected."
 };
}
export async function onRequestGet({env,request}){
 if(!preview(request,env))return reply({error:"Staging overview unavailable"},503);
 try{
  const who=await admin(env,request);
  if(!who)return reply({error:"Admin sign-in required"},403);
  return reply(await getOverview(env,who));
 }catch(_){return reply({error:"Unable to load the studio briefing. Please retry."},503);}
}
export async function onRequestPut({env,request}){
 if(!preview(request,env))return reply({error:"Staging profile unavailable"},503);
 if(request.headers.get("Origin")!==new URL(request.url).origin)return reply({error:"Invalid origin"},403);
 if(!/^application\/json(?:;|$)/i.test(request.headers.get("Content-Type")||""))return reply({error:"JSON required"},415);
 if(Number(request.headers.get("Content-Length")||0)>145000)return reply({error:"Image too large"},413);
 try{
  const who=await admin(env,request);
  if(!who)return reply({error:"Admin sign-in required"},403);
  const data=await request.json();
  if(data.action!=="avatar"||typeof data.image!=="string"||data.image.length>100000 ||
   !/^UklGR[A-Za-z0-9+/=]+$/.test(data.image) || data.image.length<120)
   return reply({error:"Upload a small WebP portrait (max 75 KB)."},400);
  // RIFF....WEBP file signature in base64, not a client-supplied MIME assertion.
  const bytes=Uint8Array.from(atob(data.image),x=>x.charCodeAt(0));
  const ascii=(start,end)=>String.fromCharCode(...bytes.slice(start,end));
  if(bytes.length>75000||bytes.length<80||ascii(0,4)!=="RIFF"||ascii(8,12)!=="WEBP")
   return reply({error:"Invalid WebP portrait."},400);
  const out=await records(env,"ai_admin_profiles",
    "?user_id=eq."+encodeURIComponent(who.id),"PATCH",
    {avatar_webp_base64:data.image,updated_at:new Date().toISOString()});
  if(!out.length)return reply({error:"Your Admin profile was not found."},409);
  return reply({saved:true});
 }catch(_){return reply({error:"Unable to save your portrait."},503);}
}
