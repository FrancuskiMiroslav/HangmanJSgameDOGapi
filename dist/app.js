!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="./src/js/main.js")}({"./src/js/main.js":function(t,e){window.addEventListener("DOMContentLoaded",(function(){const t=document.getElementById("play-btn"),e=document.getElementById("play-button"),n=document.getElementById("game-container"),o=document.querySelector(".game-container__img"),r=document.getElementById("final-message"),l=document.getElementById("popup-container"),i=document.getElementById("notification-container");document.querySelectorAll(".figure-part");let a=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];async function c(){t.innerText="Change word (display new Dog breed)";const e=await fetch("https://dog.ceo/api/breeds/list/all"),a=await e.json();let c=Object.keys(a.message);const s=c[Math.floor(Math.random()*c.length)],d=await fetch(`https://dog.ceo/api/breed/${s}/images/random`),u=await d.json();o.innerHTML=`\n\t\t\t\t\t\t\t\t<img\n\t\t\t\t\t\t\t\t\tsrc="${u.message}"\n\t\t\t\t\t\t\t\t\tclass="dog__image"\n\t\t\t\t\t\t\t\t\talt=""\n\t\t\t\t\t\t\t\t\tid="dog-img"\n\t\t\t\t\t\t\t\t/>\n\t\t\t\t\t\t\t\t<button class="dog__btn" id="next-btn">Next hint</button>\n\t\t\t\t\t\t\t`;const m=document.getElementById("dog-img"),g=getComputedStyle(m).height;document.getElementById("next-btn").addEventListener("click",t=>{fetch(`https://dog.ceo/api/breed/${s}/images/random`).then(t=>t.json()).then(t=>m.setAttribute("src",t.message))});let p=s;const f=document.getElementById("word"),y=[],b=[];function h(){f.innerHTML="\n         \t\t "+p.split("").map(t=>`\n              <li class="letter">\n              ${y.includes(t)?t:""}\n              </li>\n              `).join("");f.innerText.replace(/\n/g,"")===p&&(r.innerText="Congrats! You won!",l.style.display="flex")}function j(){i.classList.add("show"),setTimeout(()=>{i.classList.remove("show")},1500)}h(),function(){let t=document.querySelectorAll(".alphabet-button");console.log(p),t.forEach(t=>{t.addEventListener("click",t=>{let e=t.currentTarget.innerText;t.target.classList.add("clicked"),p.includes(e)?y.includes(e)?j():(y.push(e),h()):b.includes(e)?j():b.push(e)})})}(),n.style.maxHeight=parseInt(g.replace(/px/,""))+3e3+"px"}t.addEventListener("click",t=>{c()}),e.addEventListener("click",()=>{c(),l.style.display="none",document.querySelectorAll(".alphabet-button").forEach(t=>{t.classList.remove("clicked")})}),myButtons=document.getElementById("buttons"),letters=document.createElement("ul"),letters.classList.add("alphabet-list"),letters.innerHTML=`\n\t${a.map(t=>`\n\t\t\t  <li class="alphabet-button">\n\t\t\t  ${t}\n\t\t  </li>\n\t\t  `).join("")}\n\t`,myButtons.appendChild(letters)}))}});