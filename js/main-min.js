"use strict";let body=document.body,html=document.documentElement,cir=16;function setup(){config.width!==window.innerWidth&&(config.width=window.innerWidth,document.querySelector(".line ._1").style.height=document.querySelector(".hero").clientHeight-document.querySelector(".message").offsetTop+document.querySelector(".message").clientHeight/2-cir+"px",document.querySelector(".line ._2").style.height=document.querySelector(".projects").clientHeight-cir+"px",document.querySelector(".line ._3").style.height=document.querySelector(".skills").clientHeight-cir+"px",document.querySelector(".line ._4").style.height=document.querySelector(".contact").clientHeight+cir+"px",document.querySelector(".line-con").style.top=document.querySelector(".hero").clientHeight-document.querySelector(".message").offsetTop-document.querySelector(".message").clientHeight/2-cir+"px")}function changeActive(e){let t=e.target;document.querySelector(".menu .active").classList.remove("active"),t.classList.add("active")}function loaded(){let e=document.querySelector(".loader");e.classList.add("hide"),e.addEventListener("transitionend",()=>{e.classList.add("invisible"),body.classList.remove("no-scroll"),animate(),startMoving()}),requestAnimationFrame(()=>{document.querySelector(".line ._1").style.height=document.querySelector(".hero").clientHeight-document.querySelector(".message").offsetTop+document.querySelector(".message").clientHeight/2-cir+"px",document.querySelector(".line ._2").style.height=document.querySelector(".projects").clientHeight-cir+"px",document.querySelector(".line ._3").style.height=document.querySelector(".skills").clientHeight-cir+"px",document.querySelector(".line ._4").style.height=document.querySelector(".contact").clientHeight+cir+"px",document.querySelector(".line-con").style.top=document.querySelector(".hero").clientHeight-document.querySelector(".message").offsetTop-document.querySelector(".message").clientHeight/2-cir+"px"})}document.querySelectorAll(".menu a").forEach(e=>{e.addEventListener("click",changeActive)}),window.addEventListener("resize",setup);