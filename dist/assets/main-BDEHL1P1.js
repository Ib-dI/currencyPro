import"./style-ceMUldZf.js";const n=document.querySelectorAll(".currency-btn"),s=document.querySelectorAll(".target-btn");let c=null,a=null;const d=document.getElementById("exchange-rate-btn");document.addEventListener("DOMContentLoaded",()=>{s.forEach(e=>{e.disabled=!0}),n.forEach(e=>{e.addEventListener("click",()=>i(e,!0))}),s.forEach(e=>{e.addEventListener("click",()=>i(e,!1))})});function o(){const e=c&&a;d.disabled=!e;const r=d.querySelector("a");e?r.setAttribute("href",`results.html?base=${c}&target=${a}`):r.removeAttribute("href")}function i(e,r){const l=e.dataset.currency;r?(c=l,n.forEach(t=>{t.classList.toggle("selected",t===e),t.disabled=!1}),s.forEach(t=>{t.disabled=t.dataset.currency===l})):(a=l,s.forEach(t=>{t.classList.toggle("selected",t===e)})),u(),o()}function u(){s.forEach(e=>{e.disabled=!c}),n.forEach(e=>{e.disabled=e.dataset.currency===a,e.classList.toggle("selected",e.dataset.currency===c)}),s.forEach(e=>{e.disabled=e.dataset.currency===c||!c,e.classList.toggle("selected",e.dataset.currency===a)}),d.disabled=!(c&&a)}
