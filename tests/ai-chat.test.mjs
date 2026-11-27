import test from "node:test";
import assert from "node:assert/strict";
import {onRequestGet as chatGet,onRequestPost as chatPost} from "../functions/api/ai/chat.js";
import {onRequestGet as adminGet,onRequestPatch as adminPatch} from "../functions/api/ai/admin/quotes.js";

const base = "https://feature-ai-live-chat.memory-lane-photography.pages.dev/api/ai/chat";
const enabledEnv = {
 AI_CHAT_ENABLED:"true", OPENAI_API_KEY:"fake", SUPABASE_URL:"https://livorstsjtixdgksuzou.supabase.co",
 SUPABASE_SERVICE_ROLE_KEY:"fake", SUPABASE_ANON_KEY:"fake",
 TURNSTILE_SECRET_KEY:"fake", AI_CHAT_TURNSTILE_SITE_KEY:"fake"
};

test("unconfigured chat stays disabled",async()=>{
 const response=await chatGet({request:new Request(base),env:{}});
 assert.equal(response.status,200);
 assert.deepEqual(await response.json(),{enabled:false});
});
test("unconfigured chat refuses messages",async()=>{
 const response=await chatPost({request:new Request(base,{method:"POST"}),env:{}});
 assert.equal(response.status,503);
});
test("configured chat advertises only the Turnstile site key",async()=>{
 const response=await chatGet({request:new Request(base),env:enabledEnv});
 const body=await response.json();assert.equal(body.enabled,true);
 assert.equal(body.turnstileSiteKey,"fake");
 assert.equal(JSON.stringify(body).includes("SERVICE_ROLE"),false);
});
test("chat refuses an invalid request origin before any network call",async()=>{
 const request=new Request(base,{method:"POST",headers:{Origin:"https://attacker.example","Content-Type":"application/json"},body:JSON.stringify({message:"hello"})});
 const response=await chatPost({request,env:enabledEnv});
 assert.equal(response.status,403);
});
test("chat refuses a non-JSON body",async()=>{
 const request=new Request(base,{method:"POST",headers:{Origin:"https://feature-ai-live-chat.memory-lane-photography.pages.dev","Content-Type":"text/plain"},body:"hi"});
 const response=await chatPost({request,env:enabledEnv});
 assert.equal(response.status,415);
});
test("admin API refuses missing configuration",async()=>{
 const response=await adminGet({request:new Request(base),env:{}});
 assert.equal(response.status,503);
});
test("admin API denies requests without an authenticated session",async()=>{
 const response=await adminGet({request:new Request(base),env:enabledEnv});
 assert.equal(response.status,403);
});
test("admin draft changes reject cross-origin requests",async()=>{
 const request=new Request(base,{method:"PATCH",headers:{Origin:"https://attacker.example"}});
 const response=await adminPatch({request,env:enabledEnv});
 assert.equal(response.status,403);
});

test("public production hostname cannot enable staged AI chat",async()=>{
 const r=await chatGet({request:new Request("https://memorylaneadelaide.com/api/ai/chat"),env:enabledEnv});
 assert.deepEqual(await r.json(),{enabled:false});
});
test("preview refuses accidentally configured production database",async()=>{
 const r=await chatGet({request:new Request(base),env:{...enabledEnv,SUPABASE_URL:"https://dwqnbzugacobmmjbcswr.supabase.co"}});
 assert.deepEqual(await r.json(),{enabled:false});
});
test("verified bot challenge still obeys an atomic per-IP rate limit before AI call",async()=>{
 const original=globalThis.fetch;
 const destinations=[];
 try {
   globalThis.fetch=async(input)=>{
     const target=String(input);destinations.push(target);
     if(target.includes("challenges.cloudflare.com/turnstile"))
       return new Response(JSON.stringify({success:true,hostname:"feature-ai-live-chat.memory-lane-photography.pages.dev"}),{status:200});
     if(target.endsWith("/rest/v1/rpc/ai_chat_claim_rate_limit"))
       return new Response("false",{status:200});
     throw Error("Unexpected network call: "+target);
   };
   const r=await chatPost({
     request:new Request(base,{method:"POST",headers:{Origin:"https://feature-ai-live-chat.memory-lane-photography.pages.dev",
       "Content-Type":"application/json","CF-Connecting-IP":"192.0.2.10"},
       body:JSON.stringify({message:"Could you give me a quote?",turnstileToken:"A".repeat(60)})}),
     env:enabledEnv
   });
   assert.equal(r.status,429);
   assert.equal(destinations.length,2);
   assert.equal(destinations.some(x=>x.includes("api.openai.com")),false);
 } finally {globalThis.fetch=original;}
});
