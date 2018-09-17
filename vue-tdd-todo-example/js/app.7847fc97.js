(function (t) {
  function e (e) {
    for (var n, o, r = e[0], c = e[1], l = e[2], d = 0, v = []; d < r.length; d++) {
      o = r[d], a[o] && v.push(a[o][0]), a[o] = 0
    } for (n in c) {
      Object.prototype.hasOwnProperty.call(c, n) && (t[n] = c[n])
    }u && u(e); while (v.length) {
      v.shift()()
    } return i.push.apply(i, l || []), s()
  } function s () {
    for (var t, e = 0; e < i.length; e++) {
      for (var s = i[e], n = !0, r = 1; r < s.length; r++) {
        let c = s[r]

        a[c] !== 0 && (n = !1)
      }n && (i.splice(e--, 1), t = o(o.s = s[0]))
    } return t
  } var n = {}, a = {1: 0}, i = []; function o (e) {
    if (n[e]) {
      return n[e].exports
    } let s = n[e] = {i: e, l: !1, exports: {}}

    return t[e].call(s.exports, s, s.exports, o), s.l = !0, s.exports
  }o.m = t, o.c = n, o.d = function (t, e, s) {
    o.o(t, e) || Object.defineProperty(t, e, {configurable: !1, enumerable: !0, get: s})
  }, o.r = function (t) {
    Object.defineProperty(t, '__esModule', {value: !0})
  }, o.n = function (t) {
    let e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    }

    return o.d(e, 'a', e), e
  }, o.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, o.p = '/'; let r = window.webpackJsonp = window.webpackJsonp || [], c = r.push.bind(r)

  r.push = e, r = r.slice(); for (let l = 0; l < r.length; l++) {
    e(r[l])
  } var u = c; i.push([4, 0]), s()
})({'0Mei' (t, e, s) {
  'use strict'; let n = s('3ewy'), a = s.n(n)

  a.a
}, '1kZ0' (t, e, s) {}, '3ewy' (t, e, s) {}, '4' (t, e, s) {
  t.exports = s('Vtdi')
}, 'Vtdi' (t, e, s) {
  'use strict'; s.r(e); s('VRzm'); let n = s('Kw5r'), a = function () {
      let t = this, e = t.$createElement, s = t._self._c || e

      return s('v-app', {attrs: {id: 'inspire', dark: ''}}, [s('v-navigation-drawer', {attrs: {clipped: '', fixed: '', app: ''}, model: {value: t.drawer, callback (e) {
        t.drawer = e
      }, expression: 'drawer'}}, [s('v-list', [s('router-link', {staticClass: 'list__tile list__tile--link', attrs: {to: '/'}}, [s('v-list-tile', [s('v-list-tile-action', [s('v-icon', [t._v('dashboard')])], 1), s('v-list-tile-content', [s('v-list-tile-title', [t._v('В работе')])], 1)], 1)], 1), s('router-link', {staticClass: 'list__tile list__tile--link', attrs: {to: '/history'}}, [s('v-list-tile', [s('v-list-tile-action', [s('v-icon', [t._v('dashboard')])], 1), s('v-list-tile-content', [s('v-list-tile-title', [t._v('История операций')])], 1)], 1)], 1)], 1)], 1), s('v-toolbar', {attrs: {'app': '', 'fixed': '', 'clipped-left': ''}}, [s('v-toolbar-side-icon', {on: {click (e) {
        e.stopPropagation(), t.drawer = !t.drawer
      }}}), s('v-toolbar-title', [t._v('Простой ToDo лист')])], 1), s('v-content', [s('router-view')], 1), s('v-footer', {attrs: {app: ''}}, [s('span', [t._v('© 2018')])])], 1)
    }, i = [], o = {data () {
      return {drawer: !0}
    }, props: {source: String}, methods: {temp () {
      console.log('click')
    }}}, r = o, c = (s('nNx0'), s('KHd+')), l = Object(c.a)(r, a, i, !1, null, null, null), u = l.exports, d = s('Mb3Q'), v = s('jE9Z'), f = function () {
      let t = this, e = t.$createElement, s = t._self._c || e

      return s('div', {staticClass: 'home pa-3'}, [s('div', {staticClass: 'ss-flex'}, [s('v-text-field', {attrs: {name: 'new-task', label: 'Введите новую задачу'}, on: {keyup (e) {
        return 'button' in e || !t._k(e.keyCode, 'enter', 13, e.key, 'Enter') ? t.add(e) : null
      }}, model: {value: t.task, callback (e) {
        t.task = e
      }, expression: 'task'}}), s('v-btn', {attrs: {color: 'info'}, on: {click: t.add}}, [t._v('Добавить')])], 1), s('ToDoList', {attrs: {newTask: t.sendTask}, on: {add: t.add, clearField: t.clearField}})], 1)
    }, k = [], p = function () {
      let t = this, e = t.$createElement, s = t._self._c || e

      return s('div', {staticClass: 'ss-flex ss-flex--column'}, [t.progress > 0 ? s('div', {staticClass: 'ss-flex ss-flex--align-center'}, [s('span', {staticClass: 'mr-3'}, [t._v(`${t._s(t.progress)}%`)]), s('v-progress-linear', {model: {value: t.progress, callback (e) {
        t.progress = e
      }, expression: 'progress'}})], 1) : t._e(), s('v-btn-toggle', {attrs: {mandatory: ''}, model: {value: t.typeTask, callback (e) {
        t.typeTask = e
      }, expression: 'typeTask'}}, [s('v-btn', {attrs: {flat: '', value: 'active'}}, [t._v('\n      Активные\n    ')]), s('v-btn', {attrs: {flat: '', value: 'closed'}}, [t._v('\n      Завершенные\n    ')]), s('v-btn', {attrs: {flat: '', value: 'all'}}, [t._v('\n      Все\n    ')])], 1), s('v-list', {attrs: {'two-line': '', 'subheader': ''}}, t._l(t.arrTask, function (e) {
        return s('v-list-tile', {key: e.id, attrs: {href: 'javascript:;'}}, [s('v-list-tile-action', {on: {click (s) {
          t.toggleTask(e)
        }}}, [s('v-checkbox', {attrs: {readonly: ''}, model: {value: e.done, callback (s) {
          t.$set(e, 'done', s)
        }, expression: 'item.done'}})], 1), s('v-list-tile-content', {on: {click (s) {
          t.toggleTask(e)
        }}}, [s('v-list-tile-title', [t._v(`${t._s(e.id)} - ${t._s(e.text)}`)])], 1), s('v-list-tile-action', [s('v-btn', {attrs: {icon: '', ripple: ''}, on: {click (s) {
          t.removeTask(e.id)
        }}}, [s('delete-icon')], 1)], 1)], 1)
      }))], 1)
    }, h = [], T = s('iv4g'), g = s('yT7P'), m = s('L2JU'), b = s('S+Rf'), y = {name: 'ToDoList', props: {newTask: String}, components: {deleteIcon: b.a}, data () {
      return {arrTask: [], activeTask: [], closedTask: [], progress: 0, typeTask: 'active'}
    }, computed: Object(g.a)({}, Object(m.c)(['getActiveTask', 'getClosedTask', 'getProgress']), Object(m.b)(['actionTaskToActive'])), mounted () {
      this.arrTask = this.getActiveTask, this.progress = this.getProgress
    }, watch: {newTask (t, e) {
      let s = this

      t !== '' && t !== e && (s.addTaskToActive(t), s.clearField())
    }, typeTask (t) {
      this.refreshTaskList(t)
    }}, methods: {toggleTask (t) {
      let e = this

      t.done ? e.restoreTask(t.id) : e.addTaskToClosed(t.id), t.done = !t.done
    }, removeTask (t) {
      this.$store.dispatch('actionTaskRemove', t), this.progress = this.getProgress, this.refreshTaskList(this.typeTask)
    }, addTaskToActive (t) {
      this.$store.dispatch('actionTaskToActive', t), this.progress = this.getProgress
    }, addTaskToClosed (t) {
      this.$store.dispatch('actionTaskToClosed', t), this.progress = this.getProgress
    }, restoreTask (t) {
      this.$store.dispatch('actionTaskRestore', t), this.progress = this.getProgress
    }, clearField () {
      this.$emit('clearField')
    }, refreshTaskList (t) {
      let e = this

      switch (t) {
        case 'active': e.arrTask = e.getActiveTask; break; case 'closed': e.arrTask = e.getClosedTask; break; case 'all': e.arrTask = Object(T.a)(e.getActiveTask).concat(Object(T.a)(e.getClosedTask)); break
      }
    }}}, _ = y, w = (s('0Mei'), Object(c.a)(_, p, h, !1, null, 'e7d595fa', null)), x = w.exports, O = {name: 'active', components: {ToDoList: x}, data () {
      return {task: '', sendTask: ''}
    }, methods: {add () {
      let t = this

      t.sendTask = t.task
    }, clearField () {
      let t = this

      t.sendTask = '', t.task = ''
    }}}, C = O, j = Object(c.a)(C, f, k, !1, null, null, null), A = j.exports, P = function () {
      let t = this, e = t.$createElement, s = t._self._c || e

      return s('div', {staticClass: 'home pa-3'}, [this.history.length > 0 ? s('div', {staticClass: 'ss-flex ss-flex--justify-end mb-3'}, [s('v-btn', {attrs: {color: 'info'}, on: {click: t.clearHistory}}, [t._v('Очистить историю')])], 1) : t._e(), s('v-list', {attrs: {'two-line': '', 'subheader': ''}}, t._l(t.history, function (e) {
        return s('v-list-tile', {key: e.id, class: e.class}, [s('v-list-tile-content', [s('v-list-tile-title', [t._v(`${t._s(e.id)} - ${t._s(e.text)}`)]), s('v-list-tile-sub-title', [t._v(`${t._s(e.date)} - ${t._s(e.status)}`)])], 1)], 1)
      }))], 1)
    }, $ = [], L = {name: 'history', data () {
      return {history: []}
    }, computed: Object(g.a)({}, Object(m.c)(['getHistory'])), mounted () {
      this.history = this.getHistory
    }, methods: {clearHistory () {
      this.$store.dispatch('actionHistoryClear')
    }}}, H = L, R = Object(c.a)(H, P, $, !1, null, null, null), D = R.exports

  n.default.use(v.a); let F = new v.a({mode: 'history', routes: [{path: '/', name: 'active', component: A}, {path: '/history', name: 'history', component: D}]})

  n.default.use(m.a); let S = new m.a.Store({state: {taskId: 0, count: 0, activeTask: [], closedTask: [], history: []}, getters: {getActiveTask (t) {
      return t.activeTask
    }, getClosedTask (t) {
      return t.closedTask
    }, getHistory (t) {
      return t.history
    }, getProgress (t) {
      let e = t.count, s = t.closedTask.length

      return e !== 0 && s !== 0 ? Math.round(s / e * 100) : 0
    }}, mutations: {mutationTaskToActive (t, e) {
      t.taskId += 1, t.count += 1; let s = {id: t.taskId, done: !1, date: (new Date()).toLocaleString(), text: e}

      t.activeTask.unshift(s), t.history.unshift(Object(g.a)({}, s, {status: 'Новая задача', class: 'active'}))
    }, mutationTaskToClosed (t, e) {
      let s = t.activeTask.filter(function (t) {
        return t.id === e
      })[0]

      s.date = (new Date()).toLocaleString(), t.closedTask.unshift(s), t.activeTask.splice(t.activeTask.indexOf(s), 1), t.history.unshift(Object(g.a)({}, s, {status: 'Задача завершена', class: 'closed'}))
    }, mutationTaskRestore (t, e) {
      let s = t.closedTask.filter(function (t) {
        return t.id === e
      })[0]

      s.date = (new Date()).toLocaleString(), t.activeTask.unshift(s), t.closedTask.splice(t.closedTask.indexOf(s), 1), t.history.unshift(Object(g.a)({}, s, {status: 'Задача восстановлена', class: 'restore'}))
    }, mutationTaskRemove (t, e) {
      let s = {}, n = '', a = t.closedTask.filter(function (t) {
          return t.id === e
        })[0], i = t.activeTask.filter(function (t) {
          return t.id === e
        })[0]

      t.count -= 1, a ? (s = a, n = 'closedTask') : (s = i, n = 'activeTask'), s.date = (new Date()).toLocaleString(), t[n].splice(t[n].indexOf(s), 1), t.history.unshift(Object(g.a)({}, s, {status: 'Задача удалена', class: 'deleted'}))
    }, mutationHistoryClear (t) {
      t.history.splice(0)
    }}, actions: {actionTaskToActive (t, e) {
      let s = t.commit

      s('mutationTaskToActive', e)
    }, actionTaskToClosed (t, e) {
      let s = t.commit

      s('mutationTaskToClosed', e)
    }, actionTaskRestore (t, e) {
      let s = t.commit

      s('mutationTaskRestore', e)
    }, actionTaskRemove (t, e) {
      let s = t.commit

      s('mutationTaskRemove', e)
    }, actionHistoryClear (t) {
      let e = t.commit

      e('mutationHistoryClear')
    }}}), E = s('zlta'), M = s.n(E), I = s('lIOY')

  Object(I.a)(''.concat('/', 'sw.js'), {ready () {
    console.log('App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB')
  }, cached () {
    console.log('Content has been cached for offline use.')
  }, updated () {
    console.log('New content is available; please refresh.')
  }, offline () {
    console.log('No internet connection found. App is running in offline mode.')
  }, error (t) {
    console.error('Error during service worker registration:', t)
  }}); s('v0CA'), s('0eeA'); n.default.config.productionTip = !1, n.default.use(M.a), Object(d.sync)(S, F), new n.default({router: F, store: S, render (t) {
    return t(u)
  }}).$mount('#app')
}, 'nNx0' (t, e, s) {
  'use strict'; let n = s('1kZ0'), a = s.n(n)

  a.a
}})
// # sourceMappingURL=app.7847fc97.js.map
