<template>
  <ol class="todos">
    <TodoItem v-for="todo in todos" v-bind:todo="todo" v-bind:flagEdit="flagEdit" @delete-todo="removeTodo"/>
  </ol>
</template>
<script>
import TodoItem from "./TodoItem";

export default {
  props: ['todos', 'flagEdit'],
  components: {
    TodoItem
  },
  methods:{
    removeTodo(id){
     this.$emit('delete-todo', id)
    }
  }
}
</script>