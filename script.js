(function(){
  var end=new Date("2026-10-23T03:21:00+08:00").getTime();
  var ids={d:document.getElementById("d"),h:document.getElementById("h"),m:document.getElementById("m"),s:document.getElementById("s")};
  function tick(){
    var t=Math.max(0,end-Date.now());
    ids.d.textContent=Math.floor(t/864e5);
    ids.h.textContent=Math.floor(t%864e5/36e5);
    ids.m.textContent=Math.floor(t%36e5/6e4);
    ids.s.textContent=Math.floor(t%6e4/1e3);
  }
  tick(); setInterval(tick,1000);

  var tiers=document.querySelectorAll(".tier"),dlg=document.getElementById("dlg");
  function burst(){
    if(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)return;
    var set=["\uD83D\uDC96","\u2728","\uD83D\uDC8C","\uD83D\uDC97","\u2B50"];
    for(var i=0;i<14;i++){
      var s=document.createElement("span");
      s.className="burst";
      s.textContent=set[i%set.length];
      var a=Math.random()*Math.PI*2,r=110+Math.random()*130;
      s.style.setProperty("--x",Math.cos(a)*r+"px");
      s.style.setProperty("--y",Math.sin(a)*r+"px");
      s.style.animationDelay=(Math.random()*0.15)+"s";
      s.addEventListener("animationend",function(){this.remove();});
      dlg.appendChild(s);
    }
  }
  function pick(el){
    tiers.forEach(function(t){t.setAttribute("aria-pressed",t===el?"true":"false");});
    var to=document.getElementById("to").textContent.trim()||"you";
    var ev=document.getElementById("event").textContent.trim();
    document.getElementById("dh").textContent=to+" is now "+el.dataset.name;
    document.getElementById("dp").textContent="Plan: "+el.dataset.name+" ("+el.dataset.tag+"). Valid for "+ev+" and as long as you want it.";
    var abbr={Lite:"LT",Standard:"ST",Premium:"PR",VVIP:"VV"}[el.dataset.name];
    var rnd=Math.random().toString(36).slice(2,6).toUpperCase();
    document.getElementById("code").textContent="Member ID: "+abbr+"-"+rnd;
    if(dlg.showModal){dlg.showModal();}else{dlg.setAttribute("open","");}burst();
  }
  tiers.forEach(function(el){
    el.addEventListener("click",function(){pick(el);});
    el.addEventListener("keydown",function(e){
      if(e.target===el&&(e.key==="Enter"||e.key===" ")){e.preventDefault();pick(el);}
    });
  });
  document.getElementById("close").addEventListener("click",function(){dlg.close?dlg.close():dlg.removeAttribute("open");});
})();
