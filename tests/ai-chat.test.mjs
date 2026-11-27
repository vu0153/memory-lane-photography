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