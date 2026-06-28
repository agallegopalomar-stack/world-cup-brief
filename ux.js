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
  window.WCBShowSkeleton=showSkeleton;
  showSkeleton();
})();
