<template>
  <div class="col-12">
    <form class="form" @submit.prevent="saveHandler()">
      <button
          class="btn btn_maincolor"
          type="button"
          @click="$emit('undo')"
      >Undo</button>
      <button
          class="btn btn_maincolor ml-20"
          @click="$emit('redo')"

          type="button"

      >Redo</button>
      <button class="btn btn_maincolor2" type="submit">Save Task</button>
      <button
          v-if="!newTask"
          class="btn btn_maincolor2"
          type="button"
          @click="cancelEdit"
      >Cancel Edit Task
      </button>
      <div class="divider-60"></div>
      <div class="form-input">
        <label for="title">Task Title</label>
        <input id="title" v-model:title="task.title" type="text" placeholder="Task title">
      </div>
    </form>
    <div class="divider-60"></div>
    <form class="form" @submit.prevent="addTodo">
      <div class="form-input">
        <label for="todo">Todo Title</label>
        <input id="todo"
               v-model:todosTitle="task.todos.todosTitle"
               type="text"
               placeholder="Todo title" required>
        <button class="btn btn_maincolor" type="submit">Add Todo</button>
      </div>
    </form>
    <TodoList v-bind:todos="task.todos" @delete-todo="deleteTodo" v-bind:flagEdit="true"/>
  </div>
</template>

<script>
import TodoList from '../components/TodoList'
export default {
  props: ['task', 'newTask'],
  components: {
    TodoList
  },
  data(){
    return {
      flagEdit: false

    }
  },
  methods:{
    saveHandler(){
      if (!this.newTask){
        this.$store.dispatch('updateTask', {
          id: this.task.id,
          title: this.task.title,
          todos: this.task.todos
        })
      }else {
        this.$store.dispatch('createTask', this.task)
        this.$router.push('/')
      }
      this.$emit('flagFalse', this.flagEdit)
    },
    addTodo() {
      if (this.task.todos.todosTitle.trim()) {
        const todo = {
          id: Date.now(),
          title: this.task.todos.todosTitle,
          completed: false
        }
        this.task.todos.push(todo)
      }
      this.task.todos.todosTitle = ''
    },
    deleteTodo(id) {
      this.task.todos = this.task.todos.filter(t => t.id !== id)
    },
    cancelEdit(){
      this.$emit('cancelEdit')
    }
  }
}
</script>