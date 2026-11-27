import test from "node:test";
import assert from "node:assert/strict";
import {onRequestGet, onRequestPost} from "../functions/api/ai/admin/manager.js";
const preview="https://feature-ai-live-chat.memory-lane-photography.pages.dev/api/ai/admin/manager";
const env={
 SUPABASE_URL:"https://livorstsjtixdgksuzou.supabase.co",
 SUPABASE_SECRET_KEY:"test-secret", SUPABASE_PUBLISHABLE_KEY:"test-publishable",
 OPENAI_API_KEY:"test-openai", AI_MANAGER_ENABLED:"true"
};
test("Manager disabled without staging environment configuration",async()=>{
 const r=await onRequestGet({request:new Request(preview),env:{}});
 assert.equal(r.status,503);
});
test("Manager cannot be reached from Memory Lane production domain",async()=>{
 const r=await onRequestGet({request:new Request("https://memorylaneadelaide.com/api/ai/admin/manager"),env});
 assert.equal(r.status,503);
});
test("Manager refuses production database URL even on branch preview",async()=>{
 const r=await onRequestGet({request:new Request(preview),env:{...env,SUPABASE_URL:"https://dwqnbzugacobmmjbcswr.supabase.co"}});
 assert.equal(r.status,503);
});
test("Manager requires valid Admin bearer token",async()=>{
 const r=await onRequestGet({request:new Request(preview),env});
 assert.equal(r.status,403);
});
test("Manager rejects cross-origin writes",async()=>{
 const req=new Request(preview,{method:"POST",headers:{Origin:"https://attacker.example","Content-Type":"application/json"},body:"{}"});
 const r=await onRequestPost({request:req,env});
 assert.equal(r.status,403);
});
test("Manager cannot publish policy without Admin authentication",async()=>{
 const req=new Request(preview,{method:"POST",headers:{Origin:"https://feature-ai-live-chat.memory-lane-photography.pages.dev","Content-Type":"application/json"},
 body:JSON.stringify({action:"publish_policy",confirm:true,key:"customer_service",title:"New policy",content:"Test policy"})});
 const r=await onRequestPost({request:req,env});
 assert.equal(r.status,403);
});

test("authenticated owner can read agent registry, active policies and task proposals",async()=>{
 const oldFetch=globalThis.fetch;
 const adminId="11111111-1111-4111-8111-111111111111";
 globalThis.fetch=async(url,init={})=>{
  const dest=String(url);
  if(dest.endsWith("/auth/v1/user"))return new Response(JSON.stringify({id:adminId}),{status:200});
  if(dest.includes("/rest/v1/admin_users"))return new Response(JSON.stringify([{user_id:adminId}]),{status:200});
  if(dest.includes("/rest/v1/ai_agent_registry"))return new Response(JSON.stringify([{slug:"manager",display_name:"AI Manager",purpose:"Coordination",launch_state:"preview"}]),{status:200});
  if(dest.includes("/rest/v1/ai_admin_profiles"))return new Response(JSON.stringify([{display_name:"Long",locale:"vi-VN"}]),{status:200});
  if(dest.includes("/rest/v1/ai_policy_versions"))return new Response(JSON.stringify([{policy_key:"customer_service",version:1,title:"Service",body:"Collect enquiries."}]),{status:200});
  if(dest.includes("/rest/v1/ai_manager_tasks"))return new Response(JSON.stringify([]),{status:200});
  if(dest.includes("/rest/v1/ai_manager_messages"))return new Response(JSON.stringify([]),{status:200});
  throw Error("Unexpected request "+dest);
 };
 try{
  const req=new Request(preview,{headers:{Authorization:"Bearer testing-admin-token"}});
  const r=await onRequestGet({request:req,env});
  assert.equal(r.status,200);
  const data=await r.json();
  assert.equal(data.agents[0].slug,"manager");
  assert.equal(data.policies[0].policy_key,"customer_service");
  assert.equal(data.managerEnabled,true);
 }finally{globalThis.fetch=oldFetch;}
});

test("owner instruction generates task proposals but never executes them",async()=>{
 const oldFetch=globalThis.fetch;
 const id="11111111-1111-4111-8111-111111111111";
 const requests=[];
 globalThis.fetch=async(url,init={})=>{
  const dest=String(url);requests.push({dest,method:init?.method||"GET",payload:init?.body?JSON.parse(init.body):null});
  if(dest.endsWith("/auth/v1/user"))return new Response(JSON.stringify({id}),{status:200});
  if(dest.includes("/rest/v1/admin_users"))return new Response(JSON.stringify([{user_id:id}]),{status:200});
  if(dest.includes("/rest/v1/rpc/ai_chat_claim_rate_limit"))return new Response("true",{status:200});
  if(dest.includes("/rest/v1/ai_agent_registry"))return new Response(JSON.stringify([{slug:"manager",display_name:"AI Manager",purpose:"Coordination",launch_state:"preview"}]),{status:200});
  if(dest.includes("/rest/v1/ai_admin_profiles"))return new Response(JSON.stringify([{display_name:"Long",locale:"vi-VN"}]),{status:200});
  if(dest.includes("/rest/v1/ai_policy_versions"))return new Response(JSON.stringify([{policy_key:"booking",version:1,title:"Booking",body:"Owner approves bookings."}]),{status:200});
  if(dest.includes("/rest/v1/ai_manager_tasks")&&init?.method==="POST")return new Response(JSON.stringify([{id:"task-1"}]),{status:200});
  if(dest.includes("/rest/v1/ai_manager_messages")&&init?.method==="POST")return new Response(JSON.stringify([{id:1}]),{status:200});
  if(dest.includes("/rest/v1/ai_manager_tasks"))return new Response("[]",{status:200});
  if(dest.includes("/rest/v1/ai_manager_messages"))return new Response("[]",{status:200});
  if(dest==="https://api.openai.com/v1/responses"){
   return new Response(JSON.stringify({status:"completed",output:[{content:[{
      type:"output_text",text:JSON.stringify({reply:"Tôi đã tạo đề xuất cho Booking Agent, chưa thực thi.",
      tasks:[{agent:"booking",title:"Review scheduling request",instructions:"Prepare a proposal for the owner."}]})
    }]}]}),{status:200});
  }
  throw Error("Unexpected request "+dest);
 };
 try{
  const req=new Request(preview,{method:"POST",
   headers:{Authorization:"Bearer testing-admin-token",Origin:"https://feature-ai-live-chat.memory-lane-photography.pages.dev","Content-Type":"application/json"},
   body:JSON.stringify({action:"message",message:"Hãy giao việc kiểm tra lịch chụp cho Booking Agent"})});
  const r=await onRequestPost({request:req,env});
  assert.equal(r.status,200);
  const out=await r.json();
  assert.equal(out.proposedTasks,1);
  assert.equal(requests.filter(x=>x.dest==="https://api.openai.com/v1/responses").length,1);
  const modelCall=requests.find(x=>x.dest==="https://api.openai.com/v1/responses");
  assert.equal(modelCall.payload.store,false);
  assert.equal(modelCall.payload.text.format.type,"json_schema");
  const savedTask=requests.find(x=>x.dest.includes("/rest/v1/ai_manager_tasks")&&x.method==="POST");
  assert.equal(savedTask.payload[0].status,"proposed");
  assert.equal(requests.some(x=>/resend\.com|facebook\.com|gmail\.com/.test(x.dest)),false);
 }finally{globalThis.fetch=oldFetch;}
});

