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
let policies=[],managerEnabled=false,loading=false,managerLocale="en-AU";
const translate=(en,vi)=>managerLocale==="vi-VN"?vi:en;
function localize(){
 const title=panel.querySelector("h2");if(title)title.textContent=translate("AI Manager Control Centre","Trung tâm quản lý AI");
 const intro=panel.querySelector(":scope > p");
 if(intro)intro.textContent=translate("Your Manager coordinates department task proposals and policies. This preview does not send emails or confirm bookings.","AI Manager điều phối đề xuất công việc và chính sách. Bản thử nghiệm không gửi email hoặc tự xác nhận lịch.");
 const headings=panel.querySelectorAll(".ai-manager-card h3");
 const labels=[
  ["Speak to AI Manager","Trò chuyện với AI Manager"],
  ["Agent Departments","Các phòng ban AI"],
  ["Proposed Tasks","Nhiệm vụ được đề xuất"],
  ["Policies & Knowledge","Chính sách & Kiến thức"]
 ];
 headings.forEach((h,i)=>{if(labels[i])h.textContent=translate(...labels[i]);});
 input.placeholder=translate("Ask your Manager to prepare a plan or delegate a task.","Hãy yêu cầu AI Manager lập kế hoạch hoặc đề xuất giao việc.");
 submit.textContent=translate("Send to AI Manager","Gửi cho AI Manager");
 refreshButton.textContent=translate("Refresh Manager","Cập nhật");
 policySave.textContent=translate("Review and publish policy version","Duyệt và xuất bản chính sách");
}
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
 managerLocale=result.profile?.locale==="vi-VN"?"vi-VN":"en-AU";
 localize();
 managerEnabled=result.managerEnabled===true;
 thread.textContent="";
 if(!result.messages?.length){
  const p=document.createElement("p");p.className="ai-manager-explainer";
  p.textContent=translate("Talk to your AI Manager. All department tasks remain proposals until approved and implemented.","Hãy trao đổi với AI Manager. Các nhiệm vụ mới chỉ là đề xuất, chưa tự thực hiện.");
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
 if(!result.tasks?.length)item(taskList,translate("No proposed tasks yet","Chưa có nhiệm vụ đề xuất"),translate("Ask your Manager to create a task proposal.","Hãy yêu cầu AI Manager đề xuất nhiệm vụ."),translate("waiting","đang chờ"));
 policies=result.policies||[];
 displayPolicies();
 submit.disabled=!managerEnabled;
 statusText(managerEnabled?translate("Manager ready for staging tests. Proposed tasks require your approval.","AI Manager đã sẵn sàng thử nghiệm. Các nhiệm vụ cần bạn phê duyệt."):translate("Manager chat is disabled. Set AI_MANAGER_ENABLED in Cloudflare Preview.","Chưa bật AI Manager. Hãy kiểm tra AI_MANAGER_ENABLED trong Cloudflare Preview."));
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
 submit.disabled=true;statusText(translate("AI Manager is preparing task proposals...","AI Manager đang chuẩn bị đề xuất công việc..."));
 try{await api("POST",{action:"message",message});input.value="";await refresh();}
 catch(e){statusText(e.message);}
 finally{submit.disabled=!managerEnabled;}
});
policySelect.addEventListener("change",showPolicy);
policyForm.addEventListener("submit",async event=>{
 event.preventDefault();
 if(!policySelect.value||!policyTitle.value.trim()||!policyBody.value.trim())return;
 const name=policySelect.options[policySelect.selectedIndex]?.textContent||policySelect.value;
 if(!window.confirm(translate("Publish a new version of ","Xuất bản phiên bản mới của ")+name+translate("? This will affect future staging AI responses.","? Thay đổi sẽ áp dụng cho các cuộc trò chuyện thử nghiệm sau này.")))return;
 policySave.disabled=true;policyStatus.textContent=translate("Publishing policy...","Đang xuất bản chính sách...");
 try{
  await api("POST",{action:"publish_policy",confirm:true,key:policySelect.value,title:policyTitle.value,content:policyBody.value});
  policyStatus.textContent=translate("Policy published in staging. Production remains unchanged.","Đã xuất bản chính sách trong Staging. Production không thay đổi.");
  await refresh();
 }catch(e){policyStatus.textContent=e.message;}
 finally{policySave.disabled=false;}
});
refreshButton.addEventListener("click",refresh);
window.memoryLaneAIManager={refresh};
})();
