import test from "node:test";
import assert from "node:assert/strict";
import {onRequestGet,onRequestPut} from "../functions/api/ai/admin/overview.js";

const base="https://feature-ai-live-chat.memory-lane-photography.pages.dev";
const endpoint=base+"/api/ai/admin/overview";
const env={SUPABASE_URL:"https://livorstsjtixdgksuzou.supabase.co",SUPABASE_SECRET_KEY:"secret",SUPABASE_PUBLISHABLE_KEY:"public",AI_MANAGER_ENABLED:"true",OPENAI_API_KEY:"openai"};
const users=[
 {id:"be3e7ab7-fe22-41df-bddc-f7e17df3a1be",name:"Long",locale:"vi-VN"},
 {id:"8e7385aa-c346-4033-8b34-3990c837836b",name:"Mark",locale:"en-AU"}
];
test("overview fails closed without configuration",async()=>{
 const r=await onRequestGet({request:new Request(endpoint),env:{}});
 assert.equal(r.status,503);
});
test("production hostname cannot access staging overview",async()=>{
 const r=await onRequestGet({request:new Request("https://memorylaneadelaide.com/api/ai/admin/overview"),env});
 assert.equal(r.status,503);
});
test("production Supabase project is never accepted",async()=>{
 const r=await onRequestGet({request:new Request(endpoint),env:{...env,SUPABASE_URL:"https://dwqnbzugacobmmjbcswr.supabase.co"}});
 assert.equal(r.status,503);
});
test("anonymous users cannot read private overview",async()=>{
 const r=await onRequestGet({request:new Request(endpoint),env});
 assert.equal(r.status,403);
});
test("cross-origin portrait uploads are rejected",async()=>{
 const req=new Request(endpoint,{method:"PUT",headers:{"Origin":"https://attacker.example","Content-Type":"application/json"},body:'{"action":"avatar"}'});
 const r=await onRequestPut({request:req,env});
 assert.equal(r.status,403);
});
for(const user of users)test("verified "+user.name+" receives only their profile and factual staging summaries",async()=>{
 const old=globalThis.fetch;
 const calls=[];
 globalThis.fetch=async(url,options={})=>{
  const uri=String(url);calls.push({uri,options});
  if(uri.endsWith("/auth/v1/user"))return Response.json({id:user.id});
  if(uri.includes("/rest/v1/admin_users"))return Response.json([{user_id:user.id}]);
  if(uri.includes("/rest/v1/ai_admin_profiles"))return Response.json([{user_id:user.id,display_name:user.name,locale:user.locale,avatar_webp_base64:null,updated_at:"2026-11-28T00:00:00Z"}]);
  if(uri.includes("/rest/v1/ai_agent_registry"))return Response.json([{slug:"customer_service",display_name:"Customer Service",launch_state:"preview",updated_at:"2026-11-28T00:00:00Z"}]);
  if(uri.includes("/rest/v1/ai_quote_requests"))return Response.json([{id:"quote-1",status:"pending_review",created_at:"2026-11-27T00:00:00Z",email:"private@example.com"}]);
  if(uri.includes("/rest/v1/ai_manager_tasks"))return Response.json([{id:"task-1",agent_slug:"customer_service",title:"Check clients",status:"proposed",created_at:"2026-11-27T01:00:00Z"}]);
  if(uri.includes("/rest/v1/ai_policy_versions"))return Response.json([{policy_key:"customer_service",version:1,published_at:"2026-11-26T00:00:00Z"}]);
  if(uri.includes("/rest/v1/ai_chat_sessions"))return Response.json([]);
  throw Error("Unexpected request "+uri);
 };
 try{
  const r=await onRequestGet({request:new Request(endpoint,{headers:{Authorization:"Bearer valid-test-token"}}),env});
  assert.equal(r.status,200);
  const data=await r.json();
  assert.equal(data.profile.display_name,user.name);
  assert.equal(data.profile.locale,user.locale);
  assert.equal(data.summary.pendingQuoteRequests,1);
  assert.equal(data.summary.proposedTasks,1);
  assert.equal(data.summary.recentChatSessions,0);
  assert.equal(data.approvals[0].id,"quote-1");
  assert.equal(JSON.stringify(data).includes("private@example.com"),false);
  assert.equal(data.connected.bookings,false);
  assert.equal(calls.every(x=>!x.uri.includes("dwqnbzugacobmmjbcswr")),true);
  assert.equal(calls.some(x=>x.uri.includes("ai_admin_profiles")&&x.uri.includes(encodeURIComponent(user.id))),true);
 }finally{globalThis.fetch=old;}
});
test("a signed-in user not on Admin allowlist is refused",async()=>{
 const old=globalThis.fetch;
 globalThis.fetch=async(url)=>{
  if(String(url).endsWith("/auth/v1/user"))return Response.json({id:users[0].id});
  if(String(url).includes("/rest/v1/admin_users"))return Response.json([]);
  throw Error("Unauthorized request progressed into private data");
 };
 try{
  const r=await onRequestGet({request:new Request(endpoint,{headers:{Authorization:"Bearer ordinary-user"}}),env});
  assert.equal(r.status,403);
 }finally{globalThis.fetch=old;}
});
