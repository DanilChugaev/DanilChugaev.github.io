(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"08e7":function(e,i,t){},"11e9":function(e,i,t){var s=t("52a7"),a=t("4630"),r=t("6821"),n=t("6a99"),u=t("69a8"),o=t("c69a"),c=Object.getOwnPropertyDescriptor;i.f=t("9e1e")?c:function(e,i){if(e=r(e),i=n(i,!0),o)try{return c(e,i)}catch(t){}if(u(e,i))return a(!s.f.call(e,i),e[i])}},1511:function(e,i,t){"use strict";t.r(i);var s=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("v-container",{staticClass:"user"},[0===e.selectedUser.length?t("div",{staticClass:"error-block"},[t("span",[e._v("Пользователь не найден")]),t("span",{staticClass:"error-smile"},[e._v(":(")])]):t("v-layout",{staticClass:"user-layout"},[t("v-flex",{staticClass:"info"},[t("v-layout",{attrs:{column:"","align-start":"","pa-4":""}},[t("v-layout",{attrs:{row:"","align-center":"","mb-3":""}},[t("v-flex",{staticClass:"display-3 mr-4"},[t("v-avatar",{attrs:{size:"150px",color:"green lighten-4"}},[e._v("\n              "+e._s(e._f("firstLetter")(e.selectedUser.username))+"\n            ")])],1),t("v-flex",{staticClass:"display-3"},[t("div",{staticClass:"ratio"},[t("div",{staticClass:"ml-2 grey--text text--darken-2"},[t("span",[e._v(e._s(e.selectedUser.ratio))])]),t("v-icon",{staticClass:"star",attrs:{color:"yellow darken-2"}},[e._v("\n                star\n              ")])],1)])],1),t("v-flex",{staticClass:"display-1",attrs:{"mb-3":""}},[e._v("\n          "+e._s(e.selectedUser.username)+"\n        ")])],1)],1),t("v-flex",{staticClass:"achievement elevation-4"},[t("v-list",{attrs:{"two-line":"",subheader:""}},e._l(e.selectedUser.achievements,function(i,s){return t("v-list-tile",{key:i.id,attrs:{avatar:""}},[t("v-list-tile-avatar",[t("img",{attrs:{src:"https://picsum.photos/500/300?image="+(5*s+10)}})]),t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(i.name))]),t("v-list-tile-sub-title",[e._v(e._s(i.date))])],1),t("div",{staticClass:"achievement-cost"},[t("div",{staticClass:"ml-2 grey--text text--darken-2"},[t("span",[e._v(e._s(i.cost))])]),t("v-icon",{attrs:{color:"yellow darken-2"}},[e._v("\n              star\n            ")])],1)],1)}),1)],1)],1)],1)},a=[],r=(t("c5f6"),{name:"User",data:function(){return{users:[{user_id:116467,username:"Юрасов Богдан",first_name:"Богдан",last_name:"Юрасов",data_reg:"16 января",ratio:1,achievements:[{id:"id1",name:"ачивка номер 1",date:"16 января",cost:15},{id:"id2",name:"ачивка номер 2",date:"16 января",cost:15},{id:"id3",name:"ачивка номер 2",date:"16 января",cost:15},{id:"id1111",name:"ачивка номер 1",date:"16 января",cost:15},{id:"id2111",name:"ачивка номер 2",date:"16 января",cost:15},{id:"id311111",name:"ачивка номер 2",date:"16 января",cost:15},{id:"id12224",name:"ачивка номер 1",date:"16 января",cost:15},{id:"id2346",name:"ачивка номер 2",date:"16 января",cost:15},{id:"id34572345",name:"ачивка номер 2",date:"16 января",cost:15}]},{user_id:113963,username:"Астахов Афанасий",first_name:"Афанасий",last_name:"Астахов",data_reg:"6 мая",ratio:1,achievements:[{id:"id11",name:"ачивка номер 1",cost:15},{id:"id21",name:"ачивка номер 2",cost:15},{id:"id13",name:"ачивка номер 2",cost:15}]}]}},filters:{firstLetter:function(e){return e.substr(0,1).toUpperCase()}},computed:{id:function(){console.log()},selectedUser:function(){var e=this.users,i=Number(this.$route.params.id),t=e.filter(function(e){return e.user_id===i});return 0===t.length?[]:t[0]}}}),n=r,u=(t("a667"),t("2877")),o=Object(u["a"])(n,s,a,!1,null,"e76014c6",null);i["default"]=o.exports},"4e82":function(e,i,t){},"5dbc":function(e,i,t){var s=t("d3f4"),a=t("8b97").set;e.exports=function(e,i,t){var r,n=i.constructor;return n!==t&&"function"==typeof n&&(r=n.prototype)!==t.prototype&&s(r)&&a&&a(e,r),e}},"75de":function(e,i,t){"use strict";var s=t("08e7"),a=t.n(s);a.a},"7f4d":function(e,i,t){},"7f7f":function(e,i,t){var s=t("86cc").f,a=Function.prototype,r=/^\s*function ([^ (]*)/,n="name";n in a||t("9e1e")&&s(a,n,{configurable:!0,get:function(){try{return(""+this).match(r)[1]}catch(e){return""}}})},"8b97":function(e,i,t){var s=t("d3f4"),a=t("cb7c"),r=function(e,i){if(a(e),!s(i)&&null!==i)throw TypeError(i+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,i,s){try{s=t("9b43")(Function.call,t("11e9").f(Object.prototype,"__proto__").set,2),s(e,[]),i=!(e instanceof Array)}catch(a){i=!0}return function(e,t){return r(e,t),i?e.__proto__=t:s(e,t),e}}({},!1):void 0),check:r}},9093:function(e,i,t){var s=t("ce10"),a=t("e11e").concat("length","prototype");i.f=Object.getOwnPropertyNames||function(e){return s(e,a)}},a667:function(e,i,t){"use strict";var s=t("4e82"),a=t.n(s);a.a},a865:function(e,i,t){"use strict";t.r(i);var s=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"achievement-page"},[t("div",{staticClass:"filter-wrap"},[t("v-text-field",{staticClass:"filter-input",attrs:{label:"Введите автора или название ачивки",solo:""},model:{value:e.searchQuery,callback:function(i){e.searchQuery=i},expression:"searchQuery"}}),t("svg",{staticClass:"down",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"100%",height:"100",viewBox:"0 0 100 100",preserveAspectRatio:"none"}},[t("path",{attrs:{d:"M0 0 C 50 100 80 100 100 0 Z"}})])],1),t("v-container",[t("h2",{staticClass:"heading"},[e._v("Список авторов")]),t("v-expansion-panel",{attrs:{expand:""}},e._l(e.filteredAuthors,function(i,s){return t("v-expansion-panel-content",{key:i.id,scopedSlots:e._u([{key:"header",fn:function(){return[t("v-avatar",{staticClass:"company-avatar",attrs:{size:"70px",color:"grey lighten-4"}},[t("img",{attrs:{src:"https://picsum.photos/500/300?image="+(18*s+10),alt:"avatar"}})]),t("div",[e._v(e._s(i.author_name))])]},proxy:!0}],null,!0)},[t("v-card",[t("v-card-text",{staticClass:"grey lighten-4"},[t("v-list",{attrs:{"three-line":"",subheader:""}},e._l(i.achievements,function(i,s){return t("v-list-tile",{key:i.id,attrs:{avatar:""}},[t("v-list-tile-avatar",[t("img",{attrs:{src:"https://picsum.photos/500/300?image="+(5*s+10)}})]),t("v-list-tile-content",[t("v-list-tile-title",[e._v(e._s(i.name))]),t("v-list-tile-sub-title",[e._v(e._s(i.description))])],1),t("div",{staticClass:"achievement-cost"},[t("div",{staticClass:"ml-2 grey--text text--darken-2"},[t("span",[e._v(e._s(i.cost))])]),t("v-icon",{attrs:{color:"yellow darken-2"}},[e._v("\n                    star\n                  ")])],1)],1)}),1)],1)],1)],1)}),1)],1)],1)},a=[],r=(t("7f7f"),{name:"Achievement",data:function(){return{searchQuery:"",authors:[{author_name:"Первый автор ачивок",achievements:[{id:10,name:"первая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"16 мая"},{id:20,name:"вторая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:15,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:30,name:"Третья ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:40,name:"четвертая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"16 мая"},{id:50,name:"пятая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:15,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:60,name:"шестая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"}]},{author_name:"Второй автор ачивок",achievements:[{id:11,name:"седьмая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"16 мая"},{id:21,name:"восьмая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:15,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:31,name:"девятая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:41,name:"десятая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"16 мая"},{id:51,name:"одинадцатая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:15,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:61,name:"12 ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"}]},{author_name:"Третий автор ачивок",achievements:[{id:1111,name:"13 ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"16 мая"},{id:2222,name:"вторая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:15,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:3333,name:"Третья ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:4444,name:"4 ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"16 мая"},{id:5555,name:"5 ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:15,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:6666,name:"шестая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"}]},{author_name:"Четвертый автор ачивок",achievements:[{id:111,name:"первая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"16 мая"},{id:222,name:"вторая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:15,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:333,name:"Третья ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:444,name:"4 ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"16 мая"},{id:555,name:"5 ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:15,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"},{id:666,name:"шестая ачивка",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam doloribus eveniet magni pariatur rerum unde veritatis, voluptas. A accusantium asperiores aspernatur doloribus ea eius eum incidunt neque quasi ratione.",cost:58,icon:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",creation_date:"string(unix timestamp)"}]}]}},computed:{filteredAuthors:function(){var e=this,i=this.authors,t=this.searchQuery;return t=t.toLowerCase(),t&&(i=i.filter(function(i){var s=i.author_name.toLowerCase().indexOf(t)>-1,a=e.filteredAchievements(i.achievements);return s||a})),i}},methods:{filteredAchievements:function(e){var i=this.searchQuery,t=e;return i=i.toLowerCase(),i&&(t=t.filter(function(e){return e.name.toLowerCase().indexOf(i)>-1})),0!==t.length}}}),n=r,u=(t("75de"),t("2877")),o=Object(u["a"])(n,s,a,!1,null,"240b3731",null);i["default"]=o.exports},aa77:function(e,i,t){var s=t("5ca1"),a=t("be13"),r=t("79e5"),n=t("fdef"),u="["+n+"]",o="​",c=RegExp("^"+u+u+"*"),d=RegExp(u+u+"*$"),m=function(e,i,t){var a={},u=r(function(){return!!n[e]()||o[e]()!=o}),c=a[e]=u?i(l):n[e];t&&(a[t]=c),s(s.P+s.F*u,"String",a)},l=m.trim=function(e,i){return e=String(a(e)),1&i&&(e=e.replace(c,"")),2&i&&(e=e.replace(d,"")),e};e.exports=m},c5f6:function(e,i,t){"use strict";var s=t("7726"),a=t("69a8"),r=t("2d95"),n=t("5dbc"),u=t("6a99"),o=t("79e5"),c=t("9093").f,d=t("11e9").f,m=t("86cc").f,l=t("aa77").trim,p="Number",v=s[p],g=v,f=v.prototype,h=r(t("2aeb")(f))==p,_="trim"in String.prototype,b=function(e){var i=u(e,!1);if("string"==typeof i&&i.length>2){i=_?i.trim():l(i,3);var t,s,a,r=i.charCodeAt(0);if(43===r||45===r){if(t=i.charCodeAt(2),88===t||120===t)return NaN}else if(48===r){switch(i.charCodeAt(1)){case 66:case 98:s=2,a=49;break;case 79:case 111:s=8,a=55;break;default:return+i}for(var n,o=i.slice(2),c=0,d=o.length;c<d;c++)if(n=o.charCodeAt(c),n<48||n>a)return NaN;return parseInt(o,s)}}return+i};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(e){var i=arguments.length<1?0:e,t=this;return t instanceof v&&(h?o(function(){f.valueOf.call(t)}):r(t)!=p)?n(new g(b(i)),t,v):b(i)};for(var y,q=t("9e1e")?c(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),A=0;q.length>A;A++)a(g,y=q[A])&&!a(v,y)&&m(v,y,d(g,y));v.prototype=f,f.constructor=v,t("2aba")(s,p,v)}},e32f:function(e,i,t){"use strict";var s=t("7f4d"),a=t.n(s);a.a},f829:function(e,i,t){"use strict";t.r(i);var s=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"rating-page"},[t("div",{staticClass:"filter-wrap"},[t("v-text-field",{staticClass:"filter-input",attrs:{label:"Введите логин пользователя",solo:""},model:{value:e.searchQuery,callback:function(i){e.searchQuery=i},expression:"searchQuery"}}),t("svg",{staticClass:"down",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"100%",height:"100",viewBox:"0 0 100 100",preserveAspectRatio:"none"}},[t("path",{attrs:{d:"M0 0 C 50 100 80 100 100 0 Z"}})])],1),t("v-layout",{attrs:{column:""}},[t("v-container",[t("v-list",{staticClass:"users",attrs:{"two-line":""}},[t("h2",{staticClass:"heading"},[e._v("Рейтинг пользователей")]),e._l(e.filteredRatings,function(i,s){return t("router-link",{key:i.user_id,staticClass:"users__item",attrs:{to:"/user/"+i.user_id}},[t("v-list-tile",{attrs:{avatar:"",size:"100px"}},[t("v-list-tile-avatar",[t("img",{attrs:{src:"https://picsum.photos/500/300?image="+(5*s+10)}})]),t("v-list-tile-content",[t("v-list-tile-title",[e._v("\n                "+e._s(i.username)+"\n              ")]),t("v-list-tile-sub-title",[e._v("\n                "+e._s(s+1)+" место\n              ")])],1),t("div",{staticClass:"users__rating",attrs:{title:"количество ачивок"}},[t("v-icon",{attrs:{color:"yellow darken-2"}},[e._v("\n                star\n              ")]),t("div",{staticClass:"ml-2 grey--text text--darken-2"},[t("span",[e._v(e._s(i.ratio))])])],1)],1),t("v-divider")],1)})],2)],1)],1)],1)},a=[],r={data:function(){return{users:[{user_id:116467,username:"Юрасов Богдан",ratio:9742},{user_id:113963,username:"Астахов Афанасий",ratio:9485},{user_id:116294,username:"Торсунов Фома",ratio:9196},{user_id:111829,username:"Яркова Евгения",ratio:9174},{user_id:117416,username:"Цой Юлия",ratio:8660},{user_id:114642,username:"Филипов Венедикт",ratio:8351},{user_id:118912,username:"Балинский Ян",ratio:7971},{user_id:113115,username:"Федченкова Ираида",ratio:7936},{user_id:118006,username:"Мурогова Полина",ratio:7901},{user_id:112427,username:"Рыжанова Ксения",ratio:7731},{user_id:118755,username:"Юхтриц Ефрем",ratio:7560},{user_id:112790,username:"Храмов Георгий",ratio:6980},{user_id:113326,username:"Талызин Наум",ratio:6954},{user_id:113442,username:"Буркина Анастасия",ratio:6175},{user_id:118915,username:"Покровская Софья",ratio:6174}],searchQuery:""}},computed:{filteredRatings:function(){var e=this.users,i=this.searchQuery;return i=i.toLowerCase(),i&&(e=e.filter(function(e){return e.username.toLowerCase().indexOf(i)>-1})),e}}},n=r,u=(t("e32f"),t("2877")),o=Object(u["a"])(n,s,a,!1,null,"ffa580ba",null);i["default"]=o.exports},fdef:function(e,i){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=about.dbeea194.js.map