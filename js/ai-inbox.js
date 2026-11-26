/* Memory Lane Admin AI Inbox, stage 1: manual review only. */
(function(){
"use strict";
const panel=document.getElementById("aiInboxPanel");
if(!panel)return;
const refresh=document.getElementById("aiInboxRefresh");
const queue=document.getElementById("aiInboxQueue");
const form=document.getElementById("aiQuoteDraftForm");
const status=document.getElementById("aiInboxMessage");
const customer=document.getElementById("aiQuoteCustomer");
const context=document.getElementById("aiQuoteContext");
const price=document.getElementById("aiQuotePrice");
const subject=document.getElementById("aiQuoteSubject");
const body=document.getElementById("aiQuoteBody");
const submit=document.getElementById("aiQuoteDraftSave");
let quotes=[],selected=null;
function report(message){status.textContent=message;}
async function request(method,payload){
 const {data}=await supabaseClient.auth.getSession();
 if(!data.session)throw Error("Please sign in to Memory Lane Admin.");
 const response=await fetch("/api/ai/admin/quotes",{
  method,headers:{Authorization:"Bearer "+data.session.access_token,"Accept":"application/json",
   ...(method!=="GET"?{"Content-Type":"application/json"}:{})},
  ...(payload?{body:JSON.stringify(payload)}:{})});
 const value=await response.json();
 if(!response.ok)throw Error(value.error||"Unable to load AI requests.");
 return value;
}
function showQuote(id){
 selected=quotes.find(q=>q.id===id)||null;
 for(const item of queue.querySelectorAll(".ai-inbox-item"))item.classList.toggle("active",item.dataset.id===id);
 form.hidden=!selected;
 if(!selected)return;
 customer.textContent=selected.email+" · "+selected.status;
 context.textContent=selected.context_excerpt||"No additional context.";
 price.value=selected.quoted_price_aud==null?"":selected.quoted_price_aud;
 subject.value=selected.email_subject||"Memory Lane Photo Studio: Your photography enquiry";
 body.value=selected.email_body||"Hi,\n\nThank you for contacting Memory Lane Photo Studio. Here is your personalised quote:\n\n[Add the approved price, session details and conditions here.]\n\nKind regards,\nMemory Lane Photo Studio";
}
async function load(){
 report("Loading quote requests...");refresh.disabled=true;
 try{
  const result=await request("GET");
  quotes=result.quotes||[];queue.textContent="";
  if(!quotes.length){const p=document.createElement("p");p.className="ai-inbox-info";p.textContent="No quote requests yet.";queue.appendChild(p);}
  for(const q of quotes){
   const button=document.createElement("button");button.type="button";button.className="ai-inbox-item";
   button.dataset.id=q.id;
   const title=document.createElement("strong");title.textContent=q.email;
   const small=document.createElement("small");small.textContent=q.status+" · "+new Date(q.created_at).toLocaleDateString("en-AU");
   button.append(title,small);button.addEventListener("click",()=>showQuote(q.id));queue.appendChild(button);
  }
  if(selected&&quotes.some(q=>q.id===selected.id))showQuote(selected.id);
  else if(quotes.length)showQuote(quotes[0].id);else {selected=null;form.hidden=true;}
  report("Quote requests: "+quotes.length);
 }catch(error){report(error.message);form.hidden=true;}
 finally{refresh.disabled=false;}
}
refresh.addEventListener("click",load);
form.addEventListener("submit",async e=>{
 e.preventDefault();if(!selected)return;
 submit.disabled=true;report("Saving draft...");
 try{
  await request("PATCH",{id:selected.id,status:"reviewing",quoted_price_aud:price.value,
   email_subject:subject.value,email_body:body.value});
  report("Draft saved. No email has been sent.");await load();
 }catch(error){report(error.message);}
 finally{submit.disabled=false;}
});
window.memoryLaneAIInbox={refresh:load};
})();
