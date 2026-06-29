(function(){
  const line=(w="w70")=>`<span class="skeleton-line ${w}"></span>`;
  const card=(rows=["w55","w85","w70","w40"])=>`<article class="skeleton-card" aria-hidden="true">${rows.map(line).join("")}</article>`;
  const set=(selector,html)=>{const el=document.querySelector(selector);if(el)el.innerHTML=html};
  function showSkeleton(){
    const count=document.querySelector("#favorites-count");
    if(count)count.textContent="Cargando";
    set("#favorites-list",card(["w45","w80","w65","w95","w50"])+card(["w55","w75","w60","w90","w45"]));
    set("#yesterday-list",`<div class="skeleton-stack">${card(["w70","w45"])}${card(["w65","w35"])}</div>`);
    set("#planning-list",`<div class="skeleton-stack">${card(["w35","w85","w70"])}${card(["w40","w75","w60"])}${card(["w30","w80","w65"])}</div>`);
    set("#standings-list",`<div class="skeleton-card skeleton-table" aria-hidden="true">${line("w35")}${line("w95")}${line("w90")}${line("w92")}${line("w80")}</div>`);
  }
  function guardKnockoutBracket(){
    const list=document.querySelector("#standings-list");
    if(!list||list.dataset.guardApplied==="true")return;
    const counts={};
    let invalid=false;
    document.querySelectorAll(".round-head").forEach(head=>{
      const title=head.querySelector("h3")?.textContent?.trim();
      const raw=head.querySelector("span")?.textContent?.trim()||"";
      const match=raw.match(/(\d+)\s*\/\s*(\d+)/);
      if(!title||!match)return;
      const current=Number(match[1]),expected=Number(match[2]);
      counts[title]=current;
      if(current>expected)invalid=true;
    });
    if(Object.keys(counts).length)window.WCBRoundCounts=counts;
    if(invalid){
      list.dataset.guardApplied="true";
      list.innerHTML='<p class="empty">El cuadro se completará cuando ESPN publique todos los cruces.</p>';
    }
  }
  window.WCBShowSkeleton=showSkeleton;
  showSkeleton();
  window.addEventListener("load",guardKnockoutBracket);
  const standings=document.querySelector("#standings-list");
  if(standings)new MutationObserver(guardKnockoutBracket).observe(standings,{childList:true,subtree:true});
})();
