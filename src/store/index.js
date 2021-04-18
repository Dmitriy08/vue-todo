import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  },
  mutations: {
    createTask(state, task){
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    cancelEditTask(state){
      state.tasks = JSON.parse(localStorage.getItem('tasks'))
    },

    updateTask(state, {id, title, todos}){
      const tasks = state.tasks.concat()
      const idx = tasks.findIndex(task => task.id === id)
      const task = tasks[idx]
      tasks[idx] = {
        ...task,
        title,
        todos
      }
      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },

    deleteTask(state, id){
      const tasks = state.tasks.concat()
      const idx = tasks.findIndex(task => task.id === id)
      state.tasks.splice(idx, 1)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },

  actions: {
    createTask({commit}, task){
      commit('createTask', task)
    },
    updateTask({commit}, task){
      commit('updateTask', task)
    },

    deleteTask({commit}, id){
      commit('deleteTask', id)
    },
    cancelEditTask({commit}) {
      commit('cancelEditTask')
    }
  },

  getters:{
    tasks: state => state.tasks,
    taskById: state => id => state.tasks.find(task => task.id === id),
  },

  modules: {
  }
})
