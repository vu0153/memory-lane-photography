/* Owner-only AI Manager Console. Tasks are proposals, not automatically executed. */
(function(){
"use strict";
const panel=document.getElementById("aiManagerPanel");if(!panel)return;
const status=document.getElementById("aiManagerStatus");
const thread=document.getElementById("aiManagerThread");
const form=document.getElementById("aiManagerForm");
const input=document.getElementById("aiManagerInput");
const submit=document.getElementById("aiManagerSend");
const agentList=document.getElementById("aiManagerAgents");
const taskList=document.getElementById("aiManagerTasks");
const policyForm=document.getElementById("aiPolicyForm");
const policySelect=document.getElementById("aiPolicyKey");
const policyTitle=document.getElementById("aiPolicyTitle");
const policyBody=document.getElementById("aiPolicyBody");
const policySave=document.getElementById("aiPolicyPublish");
const policyStatus=document.getElementById("aiPolicyStatus");
const refreshButton=document.getElementById("aiManagerRefresh");
let policies=[],managerEnabled=false,loading=false;
function statusText(message){status.textContent=message;}
async function api(method,body){
 const {data}=await supabaseClient.auth.getSession();
 if(!data.session)throw Error("Staging Admin sign-in required.");
 const response=await fetch("/api/ai/admin/manager",{
  method,headers:{"Authorization":"Bearer "+data.session.access_token,"Accept":"application/json",
    ...(method!=="GET"?{"Content-Type":"application/json"}:{})},
  ...(method!=="GET"?{body:JSON.stringify(body)}:{})
 });
 const result=await response.json();
 if(!response.ok)throw Error(result.error||"AI Manager not available.");
 return result;
}
function item(parent,title,detail,chip){
 const outer=document.createElement("div");outer.className="ai-manager-item";
 const heading=document.createElement("strong");heading.textContent=title;outer.appendChild(heading);
 const p=document.createElement("small");p.textContent=detail;outer.appendChild(p);
 if(chip){const badge=document.createElement("span");badge.className="ai-manager-badge";badge.textContent=chip;outer.appendChild(badge);}
 parent.appendChild(outer);
}
function displayPolicies(){
 const previous=policySelect.value;policySelect.textContent="";
 const names={brand_voice:"Brand Voice",services:"Services & Packages",customer_service:"Customer Service",
  booking:"Booking & Scheduling",studio_operations:"Studio Operations",marketing:"Brand & Marketing",finance:"Finance & Analytics"};
 for(const [key,name] of Object.entries(names)){
  const p=policies.find(p=>p.policy_key===key);
  const opt=document.createElement("option");opt.value=key;
  opt.textContent=name+(p?" · v"+p.version:" · new policy");
  policySelect.appendChild(opt);
 }
 if(policies.some(p=>p.policy_key===previous))policySelect.value=previous;
 showPolicy();
}
function showPolicy(){
 const p=policies.find(p=>p.policy_key===policySelect.value);
 const selectedTitle=policySelect.options[policySelect.selectedIndex]?.textContent||"New policy";
 policyTitle.value=p?.title||selectedTitle.split(" ·")[0];
 policyBody.value=p?.body||"";
}
function render(result){
 managerEnabled=result.managerEnabled===true;
 thread.textContent="";
 if(!result.messages?.length){
  const p=document.createElement("p");p.className="ai-manager-explainer";
  p.textContent="Talk to your AI Manager here. It will propose tasks for departments. Tasks are not automatically executed in this preview.";
  thread.appendChild(p);
 }else{
  for(const msg of result.messages){
   const el=document.createElement("div");el.className="ai-manager-msg "+(msg.role==="owner"?"owner":"manager");
   el.textContent=msg.body;thread.appendChild(el);
  }
 }
 thread.scrollTop=thread.scrollHeight;
 agentList.textContent="";
 for(const a of result.agents||[])item(agentList,a.display_name,a.purpose,a.launch_state);
 taskList.textContent="";
 for(const t of result.tasks||[])item(taskList,t.title,t.agent_slug+" · "+t.instructions,t.status);
 if(!result.tasks?.length)item(taskList,"No proposed tasks yet","The Manager will create task proposals when you send an instruction.","waiting");
 policies=result.policies||[];
 displayPolicies();
 submit.disabled=!managerEnabled;
 statusText(managerEnabled?"Manager ready for staging tests. Proposed tasks require your approval.":"Manager chat is disabled until AI_MANAGER_ENABLED is configured in Cloudflare Preview.");
}
async function refresh(){
 if(loading)return;loading=true;refreshButton.disabled=true;
 try{render(await api("GET"));}
 catch(e){statusText(e.message);}
 finally{loading=false;refreshButton.disabled=false;}
}
form.addEventListener("submit",async event=>{
 event.preventDefault();
 const message=input.value.trim();if(!managerEnabled||!message||message.length>1500)return;
 submit.disabled=true;statusText("AI Manager is preparing task proposals...");
 try{await api("POST",{action:"message",message});input.value="";await refresh();}
 catch(e){statusText(e.message);}
 finally{submit.disabled=!managerEnabled;}
});
policySelect.addEventListener("change",showPolicy);
policyForm.addEventListener("submit",async event=>{
 event.preventDefault();
 if(!policySelect.value||!policyTitle.value.trim()||!policyBody.value.trim())return;
 const name=policySelect.options[policySelect.selectedIndex]?.textContent||policySelect.value;
 if(!window.confirm("Publish a new version of "+name+"? This will affect future AI responses in staging."))return;
 policySave.disabled=true;policyStatus.textContent="Publishing policy...";
 try{
  await api("POST",{action:"publish_policy",confirm:true,key:policySelect.value,title:policyTitle.value,content:policyBody.value});
  policyStatus.textContent="Policy version published in staging. No production policy was changed.";
  await refresh();
 }catch(e){policyStatus.textContent=e.message;}
 finally{policySave.disabled=false;}
});
refreshButton.addEventListener("click",refresh);
window.memoryLaneAIManager={refresh};
})();
