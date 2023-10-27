(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.disabled=!0}function n(e,n){e.checkValidity()?function(e){e.disabled=!1}(n):t(n)}function o(e){e.classList.add("popup_opened"),document.addEventListener("keydown",c)}function r(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",c)}function c(e){"Escape"===e.key&&r(document.querySelector(".popup_opened"))}e.d({},{NG:()=>C,eU:()=>j,j9:()=>x,R3:()=>L,HJ:()=>E});var a={baseUrl:"https://nomoreparties.co/v1/wbf-cohort-13",headers:{authorization:"9681f22a-cd1e-4370-b380-1a182fbcbd01","Content-Type":"application/json"}};function u(e,t,n,r,c,u){var l=E.cloneNode(!0),i=l.querySelector(".gallery__header");i.textContent=e;var s=l.querySelector(".gallery__image");s.src=t,s.alt=e;var d=l.querySelector(".gallery__trash");d.disabled=r,d.addEventListener("click",(function(){return function(e,t){var n;(n=e,fetch("".concat(a.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){t.remove()})).catch((function(e){console.log(e.status,e.mesage)}))}(c,l)}));var f=l.querySelector(".gallery__likes");return f.textContent=n,console.log(e,u),l.querySelector(".gallery__button").addEventListener("click",(function(e){return function(e,t,n){var o;(o=e,fetch("".concat(a.baseUrl,"/cards/likes/").concat(o),{method:"PUT",headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){t.target.closest(".gallery__button").classList.toggle("gallery__button_liked"),n.textContent=Number(n.textContent)+1})).catch((function(e){console.log(e.status,e.mesage)}))}(c,e,f)})),s.addEventListener("click",(function(){x.src=s.src,x.alt=s.alt,L.textContent=i.textContent,o(j)})),l}function l(e){C.prepend(e)}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var s,d=document.querySelector(".profile__edit"),f=document.querySelector(".profile_add"),p=document.querySelector(".popup__profile"),m=p.querySelector(".popup__name"),y=p.querySelector(".popup__about"),h=document.querySelector(".profile__name"),v=document.querySelector(".profile__cuption"),_=document.querySelector(".profile__img"),b=p.querySelector(".popup__button"),S=document.querySelector(".popup__place"),g=S.querySelector(".place__title"),q=S.querySelector(".place__link"),k=document.querySelectorAll(".popup__close"),E=document.querySelector(".template-item").content.querySelector(".gallery__item"),C=document.querySelector(".gallery"),j=document.querySelector(".popup__photo"),x=document.querySelector(".popup__photo-content"),L=document.querySelector(".popup__photo-name"),P=document.forms.profileForm,A=document.forms.placeForm,w=document.querySelectorAll(".popup__container"),U=document.querySelectorAll(".popup"),O=S.querySelector(".popup__button"),T=document.querySelector(".profile__avatar-button"),N=document.querySelector(".popup__avatar"),D=document.forms.avatarForm,I=N.querySelector(".popup__button"),J=N.querySelector(".avatar__link");k.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(e){e.preventDefault(),r(t)}))})),d.addEventListener("click",(function(){m.value=h.textContent,y.value=v.textContent,o(p)})),f.addEventListener("click",(function(){return o(S)})),T.addEventListener("click",(function(){return o(N)})),P.addEventListener("submit",(function(e){var t,n;e.preventDefault(),b.textContent="Сохранение...",(t=m.value,n=y.value,fetch("".concat(a.baseUrl,"/users/me"),{method:"PATCH",headers:a.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){h.textContent=m.value,v.textContent=y.value,P.checkValidity()&&r(p)})).catch((function(e){console.log(e)}))})),A.addEventListener("submit",(function(e){var n,o;e.preventDefault(),O.textContent="Сохранение...",l(u(g.value,q.value,0,!1)),(n=g.value,o=q.value,fetch("".concat(a.baseUrl,"/cards"),{method:"POST",headers:a.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){r(S),e.target.reset(),t(O)})).catch((function(e){console.log(e)})).finally((function(){return O.textContent="Создать"}))})),D.addEventListener("submit",(function(e){var n;e.preventDefault(),I.textContent="Сохранение...",(n=J.value,fetch("".concat(a.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:a.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){_.src=J.value,r(N),e.target.reset(),t(I)})).catch((function(e){console.log(e.status,e.mesage)})).finally((function(){return I.textContent="Сохранить"}))})),w.forEach((function(e){var t=e.querySelector(".popup__button");n(e,t)})),U.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&r(e)}))})),function(e,t){e.forEach((function(e){var o=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.buttonSelector);o.forEach((function(t){t.addEventListener("input",(function(){n(e,r),function(e){e.validity.valid?function(e){var t="eror-"+e.id;document.getElementById(t).textContent=""}(e):function(e,t){var n="eror-"+e.id;document.getElementById(n).textContent=t}(e,e.validationMessage)}(t)}))}))}))}(w,{inputSelector:".popup__text",buttonSelector:".popup__button"}),fetch("".concat(a.baseUrl,"/users/me"),{headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){h.textContent=e.name,v.textContent=e.about,_.src=e.avatar,s=e})).catch((function(e){console.log(e.status,e.mesage)})),fetch("".concat(a.baseUrl,"/cards"),{headers:a.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){l(u(e.name,e.link,e.likes.length,!function(e,t){return e._id===t.owner._id}(s,e),e._id,function(e,t){var n,o=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){u=!0,c=e},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw c}}}}(t.likes);try{for(o.s();!(n=o.n()).done;)return n.value._id===e._id}catch(e){o.e(e)}finally{o.f()}}(s,e)))}))})).catch((function(e){console.log(e.status,e.mesage)}))})();