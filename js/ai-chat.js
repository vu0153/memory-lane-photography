/* Memory Lane AI Chat. No credentials or Supabase writes in the browser. */
(function(){
"use strict";
const KEY="ml-chat-session-v1", API="/api/ai/chat";
const root=document.createElement("div");root.id="ml-chat-root";
root.innerHTML=[
'<button type="button" class="ml-chat-launcher" aria-label="Chat with Memory Lane" aria-controls="ml-chat-panel" aria-expanded="false">✉ Chat with us</button>',
'<section id="ml-chat-panel" class="ml-chat-panel" role="dialog" aria-label="Memory Lane chat" hidden>',
'<header class="ml-chat-head"><div><strong id="ml-chat-persona">Memory Lane</strong><small>Virtual photography assistant</small></div>',
'<button class="ml-chat-close" type="button" aria-label="Close chat">×</button></header>',
'<p class="ml-chat-notice">You are chatting with AI. Messages are saved to help with your enquiry. A personal quote is emailed after studio approval.</p>',
'<div class="ml-chat-log" role="log" aria-live="polite" aria-relevant="additions"></div>',
'<form class="ml-chat-compose"><label for="ml-chat-message" class="ml-chat-privacy">Your message</label>',
'<textarea id="ml-chat-message" rows="2" maxlength="1200" required placeholder="Tell us about your photoshoot..."></textarea>',
'<div id="ml-chat-turnstile" class="ml-chat-turnstile"></div>',
'<div class="ml-chat-controls"><small class="ml-chat-privacy">Please avoid sensitive information.</small>',
'<button class="ml-chat-send" type="submit" disabled>Send</button></div></form></section>'
].join("");
document.body.appendChild(root);
const launcher=root.querySelector(".ml-chat-launcher"),panel=root.querySelector(".ml-chat-panel"),
close=root.querySelector(".ml-chat-close"),log=root.querySelector(".ml-chat-log"),
label=root.querySelector("#ml-chat-persona"),form=root.querySelector(".ml-chat-compose"),
input=root.querySelector("#ml-chat-message"),send=root.querySelector(".ml-chat-send");
let initialized=false,enabled=false,busy=false,challenge="",challengeId=null;
const token=()=>{try{return localStorage.getItem(KEY)||""}catch(_){return""}};
const saveToken=value=>{try{if(value)localStorage.setItem(KEY,value)}catch(_){}};
function bubble(role,text){const e=document.createElement("div");e.className="ml-chat-bubble "+(["user","assistant"].includes(role)?role:"system");e.textContent=String(text||"");log.appendChild(e);log.scrollTop=log.scrollHeight;}
function setPersona(value){if(typeof value==="string"&&/^[A-Za-z]{2,24}$/.test(value))label.textContent=value;}
function sync(){send.disabled=!enabled||busy||!challenge;}
launcher.addEventListener("click",()=>{launcher.hidden=true;panel.hidden=false;launcher.setAttribute("aria-expanded","true");close.focus();if(!initialized){initialized=true;initialize();}});
function hide(){panel.hidden=true;launcher.hidden=false;launcher.setAttribute("aria-expanded","false");launcher.focus();}
close.addEventListener("click",hide);document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)hide()});
async function initialize(){
 bubble("assistant","Welcome to Memory Lane Photo Studio. I'm a virtual photography assistant.");
 try{
 const r=await fetch(API,{headers:{"Accept":"application/json"},cache:"no-store"});
 const config=await r.json();
 if(!r.ok||config.enabled!==true||!config.turnstileSiteKey)throw Error("Unavailable");
 enabled=true;
 if(token())await restore();
 await addChallenge(config.turnstileSiteKey);
 }catch(_){enabled=false;bubble("system","Online chat is being set up. Please use our booking form to contact the studio.");}
}
async function restore(){
 const r=await fetch(API,{headers:{"Accept":"application/json","X-ML-Chat-Token":token()},cache:"no-store"});
 if(r.status===401||r.status===404){try{localStorage.removeItem(KEY)}catch(_){}return;}
 if(!r.ok)return;
 const data=await r.json();
 if(!Array.isArray(data.messages))return;
 log.textContent="";setPersona(data.persona);for(const m of data.messages)bubble(m.role,m.body);
}
function addChallenge(sitekey){return new Promise(resolve=>{
 const render=()=>{if(!window.turnstile){resolve();return;}
 challengeId=window.turnstile.render("#ml-chat-turnstile",{sitekey,appearance:"interaction-only",
 callback:v=>{challenge=v;sync()},"expired-callback":()=>{challenge="";sync()},"error-callback":()=>{challenge="";sync()}});
 resolve();};
 if(window.turnstile){render();return;}
 const s=document.createElement("script");s.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
 s.async=true;s.defer=true;s.onload=render;s.onerror=resolve;document.head.appendChild(s);
});}
function reset(){challenge="";if(challengeId!==null&&window.turnstile)window.turnstile.reset(challengeId);busy=false;sync();}
form.addEventListener("submit",async e=>{
 e.preventDefault();const message=input.value.trim();if(!enabled||busy||!challenge||!message)return;
 const turnstileToken=challenge;busy=true;sync();bubble("user",message);input.value="";
 try{
  const r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},
   body:JSON.stringify({message,token:token(),turnstileToken})});
  const data=await r.json();if(!r.ok)throw Error(data.error||"Chat is temporarily unavailable.");
  saveToken(data.token);setPersona(data.persona);bubble("assistant",data.reply);
 }catch(err){bubble("system",err.message||"Message not sent. Please try again.");}
 finally{reset();input.focus();}
});
})();
