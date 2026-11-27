import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext} from "node:vm";

const source=readFileSync(new URL("../js/supabase.js",import.meta.url),"utf8");
function select(hostname){
 let config=null;
 const window={location:{hostname}};
 const supabase={createClient(url,key){config={url,key};return config;}};
 runInNewContext(source,{window,supabase});
 return {config,preview:window.memoryLaneIsBranchPreview};
}
test("branch preview routes to isolated staging",()=>{
 const result=select("feature-ai-live-chat.memory-lane-photography.pages.dev");
 assert.equal(result.preview,true);
 assert.equal(result.config.url,"https://livorstsjtixdgksuzou.supabase.co");
 assert.match(result.config.key,/^sb_publishable_/);
});
test("production custom domain keeps original Supabase",()=>{
 const result=select("memorylaneadelaide.com");
 assert.equal(result.preview,false);
 assert.equal(result.config.url,"https://dwqnbzugacobmmjbcswr.supabase.co");
});
test("production Cloudflare alias is not treated as branch preview",()=>{
 const result=select("memory-lane-photography.pages.dev");
 assert.equal(result.preview,false);
 assert.equal(result.config.url,"https://dwqnbzugacobmmjbcswr.supabase.co");
});