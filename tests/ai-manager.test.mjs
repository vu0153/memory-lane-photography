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