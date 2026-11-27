/* Memory Lane private owner dashboard, Cloudflare branch Preview only. */
(function(){
"use strict";
if(!window.memoryLaneIsBranchPreview)return;
const stage=document.getElementById("aiDashboardStage");
const legacy=document.getElementById("dashboardSection");
if(!stage||!legacy)return;
document.body.classList.add("ml-ai-preview");
const svgPaths={
 dashboard:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 network:'<rect x="9" y="2" width="6" height="5" rx="1.5"/><rect x="2" y="17" width="6" height="5" rx="1.5"/><rect x="16" y="17" width="6" height="5" rx="1.5"/><path d="M12 7v5M5 17v-5h14v5"/>',
 chat:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.8-.4-4-1L3 21l1.7-5.7A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 11h8M8 14h5"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 10h18"/>',
 camera:'<path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13" r="4"/>',
 voice:'<path d="M3 11v2h4l10 6V5L7 11H3ZM17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
 stats:'<path d="M4 20V10h4v10M10 20V4h4v16M16 20v-7h4v7"/>',
 book:'<path d="M4 4.5c3-1.5 5.7-1 8 0v15c-2.3-1-5-1.5-8 0a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Zm16 0c-3-1.5-5.7-1-8 0v15c2.3-1 5-1.5 8 0a2 2 0 0 0 2-2v-11a2 2 0 0 0-2-2Z"/>',
 refresh:'<path d="M20 6v5h-5M4 18v-5h5"/><path d="M5 10a7 7 0 0 1 12-4l3 5M4 13l3 5a7 7 0 0 0 12-4"/>',
 logout:'<path d="M9 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5M16 17l5-5-5-5M21 12H9"/>',
 sparkle:'<path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2ZM20 18l.6 1.4L22 20l-1.4.6L20 22l-.6-1.4L18 20l1.4-.6L20 18Z"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 user:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
 upload:'<path d="M12 16V3M7 8l5-5 5 5M4 16v4h16v-4"/>'
};
const symbol=k=>'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(svgPaths[k]||svgPaths.sparkle)+'</svg>';
for(const el of stage.querySelectorAll("[data-ml-icon]"))el.innerHTML=symbol(el.dataset.mlIcon);
const main=stage.querySelector(".ml-main");
const managerPanel=document.getElementById("aiManagerPanel");
const inboxPanel=document.getElementById("aiInboxPanel");
main.append(managerPanel,inboxPanel);
const $=id=>stage.querySelector("#"+id);
const agentInfo=[
 {slug:"customer_service",icon:"chat",en:"Customer Service",vi:"Chăm sóc khách hàng",enSub:"Client enquiries & guidance",viSub:"Tư vấn và hỗ trợ khách",enTasks:["Answer website enquiries","Gather client details for bookings","Create quote requests for owner review","Escalate client concerns"],viTasks:["Giải đáp yêu cầu từ website","Thu thập thông tin đặt lịch","Chuyển yêu cầu báo giá để duyệt","Báo cáo các vấn đề của khách"]},
 {slug:"booking",icon:"calendar",en:"Booking & Scheduling",vi:"Đặt lịch & Sắp xếp",enSub:"Appointments & planning",viSub:"Lịch chụp và kế hoạch",enTasks:["Prepare availability checks after calendar integration","Propose session changes for review","Track booking follow-up when connected"],viTasks:["Kiểm tra lịch khi đã kết nối hệ thống","Đề xuất thay đổi lịch để quản lý duyệt","Theo dõi đặt lịch khi được kết nối"]},
 {slug:"studio_operations",icon:"camera",en:"Studio Operations",vi:"Vận hành Studio",enSub:"Shoot preparation & delivery",viSub:"Chuẩn bị chụp và giao ảnh",enTasks:["Prepare shoot checklists","Coordinate session workflows","Track gallery delivery after integration"],viTasks:["Lập checklist buổi chụp","Điều phối quy trình tác nghiệp","Theo dõi giao ảnh sau khi tích hợp"]},
 {slug:"marketing",icon:"voice",en:"Brand & Marketing",vi:"Thương hiệu & Marketing",enSub:"Brand growth & engagement",viSub:"Phát triển và truyền thông",enTasks:["Draft social media content","Plan studio campaigns","Follow approved studio brand policy"],viTasks:["Soạn nội dung mạng xã hội","Lên kế hoạch chiến dịch","Tuân theo chính sách thương hiệu"]},
 {slug:"finance",icon:"stats",en:"Finance & Analytics",vi:"Tài chính & Phân tích",enSub:"Business performance",viSub:"Hiệu quả kinh doanh",enTasks:["Track revenue after finance integration","Monitor costs and AI spend","Prepare performance reports"],viTasks:["Theo dõi doanh thu sau khi tích hợp","Theo dõi chi phí và ngân sách AI","Lập báo cáo hiệu quả kinh doanh"]}
];
let state=null,current="overview",activeDept=null,pinned=false,fetching=false,toastTimer=null;
const vi=()=>state?.profile?.locale==="vi-VN";
const t=(english,vietnamese)=>vi()?vietnamese:english;
const set=(id,value)=>{const el=$(id);if(el)el.textContent=String(value??"");};
function timeOfDay(){
 const h=Number(new Intl.DateTimeFormat("en-AU",{hour:"2-digit",hour12:false,timeZone:"Australia/Adelaide"}).format(new Date()));
 if(h<12)return t("Good morning","Chào buổi sáng");
 return h<17?t("Good afternoon","Chào buổi chiều"):t("Good evening","Chào buổi tối");
}
function formatTime(value){
 const d=new Date(value);if(Number.isNaN(d.getTime()))return t("Unknown time","Chưa rõ thời gian");
 return new Intl.DateTimeFormat(vi()?"vi-VN":"en-AU",{dateStyle:"medium",timeStyle:"short",timeZone:"Australia/Adelaide"}).format(d);
}
function showAvatar(el){
 const p=state?.profile||{},name=p.display_name||"ML";
 el.textContent=name.slice(0,2).toUpperCase();
 if(/^data:image\/webp;base64,[A-Za-z0-9+/=]+$/.test(p.avatar_data_url||"")){
  const img=document.createElement("img");img.src=p.avatar_data_url;img.alt=name+"'s portrait";el.textContent="";el.appendChild(img);
 }
}
function toast(message){
 const el=$("mlToast");el.textContent=message;el.hidden=false;
 if(toastTimer)clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,5000);
}
function openSection(section){
 const view=section==="policy"?"manager":section;
 current=view;
 $("mlOverviewPanel").classList.toggle("is-open",view==="overview");
 managerPanel.classList.toggle("active",view==="manager");
 inboxPanel.classList.toggle("active",view==="inbox");
 for(const btn of stage.querySelectorAll(".ml-side-link[data-ml-go]"))btn.setAttribute("aria-current",btn.dataset.mlGo===section?"page":"false");
 set("mlPageTitle",t(view==="overview"?"AI Management System":view==="manager"?"AI Manager":"AI Inbox",
   view==="overview"?"Hệ thống quản lý AI":view==="manager"?"AI Manager":"Hộp thư AI"));
 if(view==="manager"&&window.memoryLaneAIManager)window.memoryLaneAIManager.refresh();
 if(view==="inbox"&&window.memoryLaneAIInbox)window.memoryLaneAIInbox.refresh();
 if(section==="policy")setTimeout(()=>{
  document.getElementById("aiPolicyForm")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
 },80);
}
async function activate(){
 // Validate permissions and fetch the owner's verified profile before showing dashboard.
 try{
  const result=await api();
  state=result;renderProfile();renderAgents();renderSummary();
  legacy.classList.add("hidden");
  stage.classList.remove("hidden");
  openSection("overview");
  return true;
 }catch(_){state=null;stage.classList.add("hidden");return false;}
}
function agentStatus(item){
 if(item.slug==="manager"&&!state?.managerEnabled)return "unavailable";
 return item.launch_state==="planned"?"planned":item.launch_state==="preview"?"preview":"preview";
}
function statusLabel(status){return status==="preview"?t("Preview","Thử nghiệm"):status==="planned"?t("Planned","Dự kiến"):status==="unavailable"?t("Unavailable","Chưa bật"):t("Live","Đang chạy");}
function renderProfile(){
 const p=state.profile;
 for(const id of ["mlHeroAvatar","mlSideAvatar","mlTopAvatar"])showAvatar($(id));
 for(const id of ["mlSideName","mlTopName","mlOwnerNode"])set(id,p.display_name);
 set("mlGreeting",timeOfDay()+", "+p.display_name);
 set("mlHeroSubtitle",t("Your AI Manager briefing","Tóm tắt công việc từ AI Manager"));
 set("mlSideRole",t("Staging administrator","Quản trị viên thử nghiệm"));
 set("mlOwnerLabel",t("Studio owner","Quản lý Studio"));
 set("mlOrgTitle",t("AI Company Organisational Structure","Sơ đồ tổ chức công ty AI"));
 set("mlOrgSubtitle",t("One AI Manager coordinating five specialist departments","Một AI Manager điều phối năm phòng ban chuyên môn"));
 set("mlManagerDesc",t("Central coordination & operations","Điều phối và quản lý công việc"));
 set("mlBriefTitle",t("Manager Briefing","Báo cáo AI Manager"));
 set("mlBriefSubtitle",t("Verified studio activity","Hoạt động được xác minh"));
 set("mlApprovalTitle",t("Needs Your Approval","Cần bạn phê duyệt"));
 set("mlApprovalSubtitle",t("Owner review queue","Danh sách chờ quản lý"));
 set("mlUpdatesTitle",t("Department Updates","Cập nhật phòng ban"));
 set("mlUpdatesSubtitle",t("Actual deployment state","Trạng thái triển khai thực tế"));
 set("mlOpenInbox",t("Open AI Inbox","Mở hộp thư AI"));
 set("mlAskManager",t("Talk to AI Manager","Trao đổi với AI Manager"));
 set("mlPageSubtitle",t("Internal company management · Staging Preview","Quản trị nội bộ · Môi trường thử nghiệm"));
}
function metricRow(parent,label,value,action){
 const row=document.createElement(action?"button":"div");
 if(action){row.type="button";row.addEventListener("click",action);}
 row.className="ml-metric-item";
 const left=document.createElement("span");left.textContent=label;
 const right=document.createElement("strong");right.textContent=String(value);
 row.append(left,right);parent.appendChild(row);
}
function capped(n,key){return state.summary.countsCapped?.[key]?"100+":String(n);}
function renderSummary(){
 const s=state.summary,brief=$("mlBriefItems"),approvals=$("mlApprovals"),updates=$("mlUpdates");
 for(const el of [brief,approvals,updates])el.textContent="";
 metricRow(brief,t("Recent chat sessions","Hội thoại gần đây"),capped(s.recentChatSessions,"chats"));
 metricRow(brief,t("Quote requests pending review","Báo giá đang chờ xem xét"),capped(s.pendingQuoteRequests,"quotes"));
 metricRow(brief,t("Proposed department tasks","Nhiệm vụ mới được đề xuất"),capped(s.proposedTasks,"tasks"));
 set("mlHeroBriefing",t(
  "Your studio preview has "+s.pendingQuoteRequests+" quote request(s) awaiting review and "+s.proposedTasks+" task proposal(s). Four departments are planned, not yet operating.",
  "Studio thử nghiệm có "+s.pendingQuoteRequests+" yêu cầu báo giá chờ xem xét và "+s.proposedTasks+" nhiệm vụ đề xuất. Bốn phòng ban vẫn đang trong kế hoạch."
 ));
 if(!state.approvals.length){
  metricRow(approvals,t("No quote requests awaiting review","Chưa có báo giá chờ phê duyệt"),"");
 }else{
  for(const a of state.approvals.slice(0,4)){
   metricRow(approvals,t("Quote request · ","Yêu cầu báo giá · ")+formatTime(a.created_at),t("Review","Xem"),()=>openSection("inbox"));
  }
 }
 for(const info of agentInfo.slice(0,4)){
  const row=state.agents.find(a=>a.slug===info.slug)||{slug:info.slug,launch_state:"planned"};
  metricRow(updates,vi()?info.vi:info.en,statusLabel(agentStatus(row)));
 }
 set("mlFreshness",t("Staging records · Refreshed: ","Dữ liệu thử nghiệm · Cập nhật: ")+formatTime(state.generated_at));
}
function closeDetail(){
 activeDept=null;pinned=false;$("mlDepartmentDetail").hidden=true;
 for(const btn of stage.querySelectorAll(".ml-dept"))btn.setAttribute("aria-pressed","false");
}
function positionDetail(){
 const panel=$("mlDepartmentDetail");
 panel.style.left="";panel.style.top="";
 if(panel.hidden||window.innerWidth<1250||!activeDept)return;
 const org=panel.closest(".ml-org-card");
 const button=stage.querySelector(".ml-dept[data-agent='"+activeDept+"']");
 if(!org||!button)return;
 const outer=org.getBoundingClientRect(),rect=button.getBoundingClientRect();
 const width=Math.min(310,outer.width*.37);
 let x=rect.right-outer.left+13;
 if(x+width>outer.width-14)x=rect.left-outer.left-width-13;
 x=Math.max(14,Math.min(x,outer.width-width-14));
 const y=Math.max(72,Math.min(rect.top-outer.top-78,outer.height-panel.offsetHeight-12));
 panel.style.left=x+"px";panel.style.top=y+"px";
}
function detail(slug,pin){
 const info=agentInfo.find(x=>x.slug===slug);
 if(!info)return;
 activeDept=slug;pinned=Boolean(pin);
 for(const btn of stage.querySelectorAll(".ml-dept"))btn.setAttribute("aria-pressed",btn.dataset.agent===slug?"true":"false");
 const panel=$("mlDepartmentDetail");panel.hidden=false;panel.textContent="";
 const row=document.createElement("div");row.className="ml-detail-top";
 const title=document.createElement("h3");title.textContent=vi()?info.vi:info.en;
 const close=document.createElement("button");close.type="button";close.className="ml-detail-close";close.textContent="×";
 close.setAttribute("aria-label",t("Close department details","Đóng thông tin phòng ban"));close.addEventListener("click",closeDetail);
 row.append(title,close);panel.appendChild(row);
 const p=document.createElement("p");p.textContent=t("Responsibilities and connected status","Nhiệm vụ chính và trạng thái triển khai");panel.appendChild(p);
 const list=document.createElement("ul");
 for(const item of (vi()?info.viTasks:info.enTasks)){
  const li=document.createElement("li");li.textContent=item;list.appendChild(li);
 }panel.appendChild(list);
 const footer=document.createElement("div");footer.className="ml-detail-actions";
 const actual=state.agents.find(a=>a.slug===slug)||{slug,launch_state:"planned"};
 const badge=document.createElement("span");badge.className="ml-status "+agentStatus(actual);badge.textContent=statusLabel(agentStatus(actual));
 const action=document.createElement("button");action.type="button";action.className="ml-link";
 action.textContent=t("Ask AI Manager about this department","Hỏi AI Manager về phòng ban này");
 action.addEventListener("click",()=>openSection("manager"));
 footer.append(badge,action);panel.appendChild(footer);
 positionDetail();
}
function renderAgents(){
 const grid=$("mlDepartmentGrid");grid.textContent="";
 for(const info of agentInfo){
  const actual=state.agents.find(a=>a.slug===info.slug)||{slug:info.slug,launch_state:"planned"};
  const button=document.createElement("button");
  button.type="button";button.className="ml-dept";button.dataset.agent=info.slug;
  button.setAttribute("aria-controls","mlDepartmentDetail");
  button.setAttribute("aria-pressed",activeDept===info.slug?"true":"false");
  const ico=document.createElement("span");ico.className="ml-dept-icon";ico.innerHTML=symbol(info.icon);
  const title=document.createElement("strong");title.textContent=vi()?info.vi:info.en;
  const sub=document.createElement("small");sub.textContent=vi()?info.viSub:info.enSub;
  const badge=document.createElement("span");badge.className="ml-status "+agentStatus(actual);badge.textContent=statusLabel(agentStatus(actual));
  button.append(ico,title,sub,badge);
  button.addEventListener("mouseenter",()=>{if(!pinned)detail(info.slug,false);});
  button.addEventListener("focus",()=>{if(!pinned)detail(info.slug,false);});
  button.addEventListener("click",()=>detail(info.slug,true));
  grid.appendChild(button);
 }
 if(activeDept)detail(activeDept,pinned);
}
async function api(method="GET",body){
 const {data,error}=await supabaseClient.auth.getSession();
 if(error||!data.session)throw Error(t("Please sign in again.","Bạn cần đăng nhập lại."));
 const r=await fetch("/api/ai/admin/overview",{
  method,headers:{"Authorization":"Bearer "+data.session.access_token,"Accept":"application/json",
   ...(method!=="GET"?{"Content-Type":"application/json"}:{})},
  ...(body?{body:JSON.stringify(body)}:{})
 });
 const out=await r.json();
 if(!r.ok){const err=new Error(out.error||"Unable to load dashboard.");err.status=r.status;throw err;}
 return out;
}
async function refresh(){
 if(fetching)return;fetching=true;$("mlRefresh").disabled=true;
 try{
  const result=await api();state=result;
  renderProfile();renderAgents();renderSummary();
 }catch(error){
  if(error.status===403){logout();return;}
  toast(error.message);
  if(!state){
   set("mlHeroBriefing",t("Dashboard data is unavailable. Check Preview configuration and Admin permissions.","Chưa thể tải dữ liệu. Hãy kiểm tra cấu hình Preview và quyền Admin."));
   set("mlFreshness",t("No verified data loaded","Chưa tải được dữ liệu xác minh"));
  }
 }finally{fetching=false;$("mlRefresh").disabled=false;}
}
function compress(file){
 return new Promise((resolve,reject)=>{
  if(file.size>12000000)return reject(Error("Image exceeds 12 MB."));
  const image=new Image(),url=URL.createObjectURL(file);
  image.onload=()=>{
   try{
    const side=Math.min(image.width,image.height);
    const canvas=document.createElement("canvas");canvas.width=256;canvas.height=256;
    const ctx=canvas.getContext("2d");if(!ctx)throw Error("Image canvas unavailable.");
    ctx.drawImage(image,(image.width-side)/2,(image.height-side)*.38,side,side,0,0,256,256);
    const value=canvas.toDataURL("image/webp",.68);
    if(!value.startsWith("data:image/webp;base64,"))throw Error("Your browser cannot convert WebP portraits.");
    resolve(value.slice("data:image/webp;base64,".length));
   }catch(e){reject(e);}finally{URL.revokeObjectURL(url);}
  };
  image.onerror=()=>{URL.revokeObjectURL(url);reject(Error("Unable to read image."));};
  image.src=url;
 });
}
async function uploadPortrait(file){
 if(!file)return;
 try{
  const image=await compress(file);
  if(image.length>100000)throw Error("Please choose a smaller portrait.");
  const result=await api("PUT",{action:"avatar",image});
  if(result.saved){toast(t("Your portrait was saved privately.","Ảnh chân dung đã được lưu riêng tư."));await refresh();}
 }catch(error){toast(error.message);}
 finally{$("mlPortraitFile").value="";}
}
function logout(){
 supabaseClient.auth.signOut().then(()=>{
  state=null;stage.classList.add("hidden");
  window.location.replace(window.location.pathname);
 }).catch(()=>toast("Sign-out failed. Please retry."));
}
for(const button of stage.querySelectorAll("[data-ml-go]")){
 button.addEventListener("click",()=>openSection(button.dataset.mlGo));
}
$("mlRefresh").addEventListener("click",refresh);
$("mlManagerTile").addEventListener("click",()=>openSection("manager"));
$("mlUpload").addEventListener("click",()=>$("mlPortraitFile").click());
$("mlPortraitFile").addEventListener("change",e=>uploadPortrait(e.target.files?.[0]));
$("mlLogout").addEventListener("click",logout);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&current==="overview"&&!$("mlDepartmentDetail").hidden)closeDetail();});
window.addEventListener("resize",()=>{if(activeDept)positionDetail();});
window.memoryLaneAIDashboard={activate,openSection,refresh,logout};
})();
