/* Admin quote queue API: bearer JWT, verified via Supabase Auth and admin_users.
 * No email is sent by this endpoint. The operator reviews and saves a draft.
 */
const json=(v,s=200)=>new Response(JSON.stringify(v),{status:s,headers:{"Content-Type":"application/json","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
const configured=(env,request)=>{const host=new URL(request.url).hostname;
 return host.endsWith(".memory-lane-photography.pages.dev") && host!=="memory-lane-photography.pages.dev" &&
 env.SUPABASE_URL?.replace(/\/$/,"")==="https://livorstsjtixdgksuzou.supabase.co" &&
 !!env.SUPABASE_SERVICE_ROLE_KEY&&!!env.SUPABASE_ANON_KEY;
};
async function adminUser(request,env){
 const h=request.headers.get("Authorization")||"";
 const m=h.match(/^Bearer\s+(.+)$/i);if(!m)return null;
 const response=await fetch(env.SUPABASE_URL.replace(/\/$/,"")+"/auth/v1/user",{
   headers:{apikey:env.SUPABASE_ANON_KEY,Authorization:"Bearer "+m[1]}});
 if(!response.ok)return null;
 const user=await response.json();
 if(!user.id)return null;
 const admins=await data(env,"admin_users","GET","?select=user_id&user_id=eq."+encodeURIComponent(user.id)+"&limit=1");
 return admins[0]?user:null;
}
async function data(env,table,method="GET",query="",body){
 const r=await fetch(env.SUPABASE_URL.replace(/\/$/,"")+"/rest/v1/"+table+query,{
  method,headers:{apikey:env.SUPABASE_SERVICE_ROLE_KEY,Authorization:"Bearer "+env.SUPABASE_SERVICE_ROLE_KEY,
   "Content-Type":"application/json",Prefer:"return=representation"},
  body:body===undefined?undefined:JSON.stringify(body)});
 if(!r.ok)throw Error("Database operation failed");
 return r.json();
}
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function onRequestGet({request,env}){
 if(!configured(env,request))return json({error:"Admin review not configured"},503);
 try{
  if(!await adminUser(request,env))return json({error:"Admin authorization required"},403);
  const quotes=await data(env,"ai_quote_requests","GET",
    "?select=id,session_id,email,status,context_excerpt,quoted_price_aud,email_subject,email_body,created_at&order=created_at.desc&limit=60");
  return json({quotes});
 }catch(_){return json({error:"Unable to load quote requests"},503);}
}
export async function onRequestPatch({request,env}){
 if(!configured(env,request))return json({error:"Admin review not configured"},503);
 if(request.headers.get("Origin")!==new URL(request.url).origin)return json({error:"Invalid origin"},403);
 try{
  const user=await adminUser(request,env);
  if(!user)return json({error:"Admin authorization required"},403);
  const body=await request.json();
  if(!uuid.test(body.id||""))return json({error:"Invalid quote ID"},400);
  // Draft-only review, never 'sent' and no sending from this API.
  if(body.status!=="reviewing")return json({error:"Only draft review is available"},400);
  if(typeof body.email_subject!=="string"||body.email_subject.length>150||
     typeof body.email_body!=="string"||body.email_body.length>6000)
     return json({error:"Invalid draft"},400);
  const price=body.quoted_price_aud===""||body.quoted_price_aud==null?null:Number(body.quoted_price_aud);
  if(price!==null&&(!Number.isFinite(price)||price<0||price>100000))return json({error:"Invalid price"},400);
  const out=await data(env,"ai_quote_requests","PATCH",
    "?id=eq."+encodeURIComponent(body.id)+"&status=in.(pending_review,reviewing)",
    {status:"reviewing",quoted_price_aud:price,email_subject:body.email_subject.trim(),
     email_body:body.email_body.trim(),updated_at:new Date().toISOString()});
  if(!out.length)return json({error:"Request already changed. Refresh to review."},409);
  return json({saved:true,id:out[0].id,status:"reviewing"});
 }catch(_){return json({error:"Unable to save quote draft"},503);}
}
