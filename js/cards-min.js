"use strict";const cards=document.querySelectorAll(".projects .card");function cardHover(e){let t=e.target;if(!t.classList.contains("card")){let e=t.closest(".card");if(!e)return 0;t=e}requestAnimationFrame(()=>{cardAnim([t,e])})}function cardAnim(e){const[t,r]=[...e],o=document.body.getBoundingClientRect(),n=t.getBoundingClientRect(),d=[Math.round(n.x+Number(n.width/2)),Math.round(n.y-Number(o.top)+Number(n.height/2))],a=Math.round(r.pageY-d[1])/(n.height/2),c=Math.round(r.pageX-d[0])/(n.width/2),s=`rotate3d(${-a},${c}, 0,${Number(15*Math.sqrt(a**2+c**2))}deg)`;t.style.transform=s}0===config.mobile&&(document.querySelector(".projects").addEventListener("mousemove",cardHover),cards.forEach(e=>{e.addEventListener("mouseout",t=>{e.style.transform="rotate3d(0,0,0,0deg)",e.classList.remove("hovered")})}));