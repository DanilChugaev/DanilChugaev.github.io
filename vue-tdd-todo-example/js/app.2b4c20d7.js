(function(t){function e(e){for(var o,i,r=e[0],c=e[1],l=e[2],d=0,v=[];d<r.length;d++)i=r[d],n[i]&&v.push(n[i][0]),n[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);u&&u(e);while(v.length)v.shift()();return a.push.apply(a,l||[]),s()}function s(){for(var t,e=0;e<a.length;e++){for(var s=a[e],o=!0,r=1;r<s.length;r++){var c=s[r];0!==n[c]&&(o=!1)}o&&(a.splice(e--,1),t=i(i.s=s[0]))}return t}var o={},n={1:0},a=[];function i(e){if(o[e])return o[e].exports;var s=o[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=o,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/vue-tdd-todo-example/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;a.push([4,0]),s()})({"0Mei":function(t,e,s){"use strict";var o=s("3ewy"),n=s.n(o);n.a},"1kZ0":function(t,e,s){},"3ewy":function(t,e,s){},4:function(t,e,s){t.exports=s("Vtdi")},Vtdi:function(t,e,s){"use strict";s.r(e);s("VRzm");var o=s("Kw5r"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{attrs:{id:"inspire",dark:""}},[s("v-navigation-drawer",{attrs:{clipped:"",fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[s("v-list",[s("router-link",{staticClass:"list__tile list__tile--link",attrs:{to:"/vue-tdd-todo-example"}},[s("v-list-tile",[s("v-list-tile-action",[s("v-icon",[t._v("dashboard")])],1),s("v-list-tile-content",[s("v-list-tile-title",[t._v("В работе")])],1)],1)],1),s("router-link",{staticClass:"list__tile list__tile--link",attrs:{to:"/vue-tdd-todo-example/history"}},[s("v-list-tile",[s("v-list-tile-action",[s("v-icon",[t._v("dashboard")])],1),s("v-list-tile-content",[s("v-list-tile-title",[t._v("История операций")])],1)],1)],1)],1),s("v-btn",{on:{click:t.createPush}},[t._v("Вызвать push")])],1),s("v-toolbar",{attrs:{app:"",fixed:"","clipped-left":""}},[s("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),s("v-toolbar-title",[t._v("Простой ToDo лист")])],1),s("v-content",[s("router-view")],1),s("v-footer",{attrs:{app:""}},[s("span",[t._v("© 2018")])])],1)},a=[],i=s("tzDv"),r=s.n(i),c={data:function(){return{drawer:!0}},props:{source:String},methods:{temp:function(){console.log("click")},createPush:function(){r.a.create("Установи уведомления пуш",{body:"Простое пуш уведомление",icon:"assets/logo.png",timeout:4e3,onClick:function(){window.focus(),this.close()}})}}},l=c,u=(s("nNx0"),s("KHd+")),d=Object(u["a"])(l,n,a,!1,null,null,null),v=d.exports,f=s("Mb3Q"),k=s("jE9Z"),p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home pa-3"},[s("div",{staticClass:"ss-flex"},[s("v-text-field",{attrs:{name:"new-task",label:"Введите новую задачу"},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.add(e):null}},model:{value:t.task,callback:function(e){t.task=e},expression:"task"}}),s("v-btn",{attrs:{color:"info"},on:{click:t.add}},[t._v("Добавить")])],1),s("ToDoList",{attrs:{newTask:t.sendTask},on:{add:t.add,clearField:t.clearField}})],1)},h=[],T=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ss-flex ss-flex--column"},[t.progress>0?s("div",{staticClass:"ss-flex ss-flex--align-center"},[s("span",{staticClass:"mr-3"},[t._v(t._s(t.progress)+"%")]),s("v-progress-linear",{model:{value:t.progress,callback:function(e){t.progress=e},expression:"progress"}})],1):t._e(),s("v-btn-toggle",{attrs:{mandatory:""},model:{value:t.typeTask,callback:function(e){t.typeTask=e},expression:"typeTask"}},[s("v-btn",{attrs:{flat:"",value:"active"}},[t._v("\n      Активные\n    ")]),s("v-btn",{attrs:{flat:"",value:"closed"}},[t._v("\n      Завершенные\n    ")]),s("v-btn",{attrs:{flat:"",value:"all"}},[t._v("\n      Все\n    ")])],1),s("v-list",{attrs:{"two-line":"",subheader:""}},t._l(t.arrTask,function(e){return s("v-list-tile",{key:e.id,attrs:{href:"javascript:;"}},[s("v-list-tile-action",{on:{click:function(s){t.toggleTask(e)}}},[s("v-checkbox",{attrs:{readonly:""},model:{value:e.done,callback:function(s){t.$set(e,"done",s)},expression:"item.done"}})],1),s("v-list-tile-content",{on:{click:function(s){t.toggleTask(e)}}},[s("v-list-tile-title",[t._v(t._s(e.id)+" - "+t._s(e.text))])],1),s("v-list-tile-action",[s("v-btn",{attrs:{icon:"",ripple:""},on:{click:function(s){t.removeTask(e.id)}}},[s("delete-icon")],1)],1)],1)}))],1)},g=[],m=s("iv4g"),b=s("yT7P"),y=s("L2JU"),_=s("S+Rf"),w={name:"ToDoList",props:{newTask:String},components:{deleteIcon:_["a"]},data:function(){return{arrTask:[],activeTask:[],closedTask:[],progress:0,typeTask:"active"}},computed:Object(b["a"])({},Object(y["c"])(["getActiveTask","getClosedTask","getProgress"]),Object(y["b"])(["actionTaskToActive"])),mounted:function(){this.arrTask=this.getActiveTask,this.progress=this.getProgress},watch:{newTask:function(t,e){var s=this;""!==t&&t!==e&&(s.addTaskToActive(t),s.clearField())},typeTask:function(t){this.refreshTaskList(t)}},methods:{toggleTask:function(t){var e=this;t.done?e.restoreTask(t.id):e.addTaskToClosed(t.id),t.done=!t.done},removeTask:function(t){this.$store.dispatch("actionTaskRemove",t),this.progress=this.getProgress,this.refreshTaskList(this.typeTask)},addTaskToActive:function(t){this.$store.dispatch("actionTaskToActive",t),this.progress=this.getProgress},addTaskToClosed:function(t){this.$store.dispatch("actionTaskToClosed",t),this.progress=this.getProgress},restoreTask:function(t){this.$store.dispatch("actionTaskRestore",t),this.progress=this.getProgress},clearField:function(){this.$emit("clearField")},refreshTaskList:function(t){var e=this;switch(t){case"active":e.arrTask=e.getActiveTask;break;case"closed":e.arrTask=e.getClosedTask;break;case"all":e.arrTask=Object(m["a"])(e.getActiveTask).concat(Object(m["a"])(e.getClosedTask));break}}}},x=w,C=(s("0Mei"),Object(u["a"])(x,T,g,!1,null,"e7d595fa",null)),O=C.exports,j={name:"active",components:{ToDoList:O},data:function(){return{task:"",sendTask:""}},methods:{add:function(){var t=this;t.sendTask=t.task},clearField:function(){var t=this;t.sendTask="",t.task=""}}},A=j,P=Object(u["a"])(A,p,h,!1,null,null,null),$=P.exports,L=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home pa-3"},[this.history.length>0?s("div",{staticClass:"ss-flex ss-flex--justify-end mb-3"},[s("v-btn",{attrs:{color:"info"},on:{click:t.clearHistory}},[t._v("Очистить историю")])],1):t._e(),s("v-list",{attrs:{"two-line":"",subheader:""}},t._l(t.history,function(e){return s("v-list-tile",{key:e.id,class:e.class},[s("v-list-tile-content",[s("v-list-tile-title",[t._v(t._s(e.id)+" - "+t._s(e.text))]),s("v-list-tile-sub-title",[t._v(t._s(e.date)+" - "+t._s(e.status))])],1)],1)}))],1)},H=[],R={name:"history",data:function(){return{history:[]}},computed:Object(b["a"])({},Object(y["c"])(["getHistory"])),mounted:function(){this.history=this.getHistory},methods:{clearHistory:function(){this.$store.dispatch("actionHistoryClear")}}},D=R,F=Object(u["a"])(D,L,H,!1,null,null,null),S=F.exports;o["default"].use(k["a"]);var E=new k["a"]({mode:"history",routes:[{path:"/",redirect:"/vue-tdd-todo-example"},{path:"/vue-tdd-todo-example",name:"active",component:$},{path:"/vue-tdd-todo-example/history",name:"history",component:S}]});o["default"].use(y["a"]);var M=new y["a"].Store({state:{taskId:0,count:0,activeTask:[],closedTask:[],history:[]},getters:{getActiveTask:function(t){return t.activeTask},getClosedTask:function(t){return t.closedTask},getHistory:function(t){return t.history},getProgress:function(t){var e=t.count,s=t.closedTask.length;return 0!==e&&0!==s?Math.round(s/e*100):0}},mutations:{mutationTaskToActive:function(t,e){t.taskId+=1,t.count+=1;var s={id:t.taskId,done:!1,date:(new Date).toLocaleString(),text:e};t.activeTask.unshift(s),t.history.unshift(Object(b["a"])({},s,{status:"Новая задача",class:"active"}))},mutationTaskToClosed:function(t,e){var s=t.activeTask.filter(function(t){return t.id===e})[0];s.date=(new Date).toLocaleString(),t.closedTask.unshift(s),t.activeTask.splice(t.activeTask.indexOf(s),1),t.history.unshift(Object(b["a"])({},s,{status:"Задача завершена",class:"closed"}))},mutationTaskRestore:function(t,e){var s=t.closedTask.filter(function(t){return t.id===e})[0];s.date=(new Date).toLocaleString(),t.activeTask.unshift(s),t.closedTask.splice(t.closedTask.indexOf(s),1),t.history.unshift(Object(b["a"])({},s,{status:"Задача восстановлена",class:"restore"}))},mutationTaskRemove:function(t,e){var s={},o="",n=t.closedTask.filter(function(t){return t.id===e})[0],a=t.activeTask.filter(function(t){return t.id===e})[0];t.count-=1,n?(s=n,o="closedTask"):(s=a,o="activeTask"),s.date=(new Date).toLocaleString(),t[o].splice(t[o].indexOf(s),1),t.history.unshift(Object(b["a"])({},s,{status:"Задача удалена",class:"deleted"}))},mutationHistoryClear:function(t){t.history.splice(0)}},actions:{actionTaskToActive:function(t,e){var s=t.commit;s("mutationTaskToActive",e)},actionTaskToClosed:function(t,e){var s=t.commit;s("mutationTaskToClosed",e)},actionTaskRestore:function(t,e){var s=t.commit;s("mutationTaskRestore",e)},actionTaskRemove:function(t,e){var s=t.commit;s("mutationTaskRemove",e)},actionHistoryClear:function(t){var e=t.commit;e("mutationHistoryClear")}}}),I=s("zlta"),N=s.n(I),z=s("lIOY");Object(z["a"])("/sw.js",{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});s("v0CA"),s("0eeA");o["default"].config.productionTip=!1,o["default"].use(N.a),Object(f["sync"])(M,E),new o["default"]({router:E,store:M,render:function(t){return t(v)}}).$mount("#app")},nNx0:function(t,e,s){"use strict";var o=s("1kZ0"),n=s.n(o);n.a}});
//# sourceMappingURL=app.2b4c20d7.js.map