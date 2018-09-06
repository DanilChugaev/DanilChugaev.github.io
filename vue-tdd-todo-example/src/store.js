import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskId: 0,
    count: 0,
    activeTask: [],
    closedTask: [],
    history: [],
  },
  getters: {
    getActiveTask (state) {
      return state.activeTask
    },
    getClosedTask (state) {
      return state.closedTask
    },
    getHistory (state) {
      return state.history
    },
    getProgress (state) {
      let countAll = state.count
      let closedCount = state.closedTask.length

      if (countAll !== 0 && closedCount !== 0) {
        return Math.round(closedCount / countAll * 100)
      } else {
        return 0
      }
    },
  },
  mutations: {
    mutationTaskToActive (state, taskText) {
      state.taskId += 1
      state.count += 1

      let taskObj = {
        id: state.taskId,
        done: false,
        date: new Date().toLocaleString(),
        text: taskText,
      }

      state.activeTask.unshift(taskObj)
      state.history.unshift({
        ...taskObj,
        status: 'Новая задача',
        class: 'active',
      })
    },
    mutationTaskToClosed (state, taskId) {
      let taskObj = state.activeTask.filter(item => item.id === taskId)[0]

      taskObj.date = new Date().toLocaleString()

      state.closedTask.unshift(taskObj)
      state.activeTask.splice(state.activeTask.indexOf(taskObj), 1)
      state.history.unshift({
        ...taskObj,
        status: 'Задача завершена',
        class: 'closed',
      })
    },
    mutationTaskRestore (state, taskId) {
      let taskObj = state.closedTask.filter(item => item.id === taskId)[0]

      taskObj.date = new Date().toLocaleString()

      state.activeTask.unshift(taskObj)
      state.closedTask.splice(state.closedTask.indexOf(taskObj), 1)
      state.history.unshift({
        ...taskObj,
        status: 'Задача восстановлена',
        class: 'restore',
      })
    },
    mutationTaskRemove (state, taskId) {
      let taskObj = {}
      let obj = ''
      let taskClosedObj = state.closedTask.filter(item => item.id === taskId)[0]
      let taskActiveObj = state.activeTask.filter(item => item.id === taskId)[0]

      state.count -= 1

      if (taskClosedObj) {
        taskObj = taskClosedObj
        obj = 'closedTask'
      } else {
        taskObj = taskActiveObj
        obj = 'activeTask'
      }

      taskObj.date = new Date().toLocaleString()

      state[obj].splice(state[obj].indexOf(taskObj), 1)
      state.history.unshift({
        ...taskObj,
        status: 'Задача удалена',
        class: 'deleted',
      })
    },
    mutationHistoryClear (state) {
      state.history.splice(0)
    },
  },
  actions: {
    actionTaskToActive ({commit}, taskText) {
      commit('mutationTaskToActive', taskText)
    },
    actionTaskToClosed ({commit}, taskId) {
      commit('mutationTaskToClosed', taskId)
    },
    actionTaskRestore ({commit}, taskId) {
      commit('mutationTaskRestore', taskId)
    },
    actionTaskRemove ({commit}, taskId) {
      commit('mutationTaskRemove', taskId)
    },
    actionHistoryClear ({commit}) {
      commit('mutationHistoryClear')
    },
  },
})
