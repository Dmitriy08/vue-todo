<template>
  <li>
    <div v-if="!todoEdit" v-bind:class="{done: todo.completed}">
       <input v-if="flagEdit" v-bind:checked="todo.completed" type="checkbox" @change="todo.completed = !todo.completed"/>
      <span>{{ todo.title }}</span>
    </div>
    <div class="form" v-if="todoEdit">
      <div class="form-input">
        <input v-if="flagEdit" v-model="todo.title" type="text"/>
      </div>
    </div>
    <button class="btn btn_maincolor" v-if="flagEdit" @click="todoEdit = !todoEdit">{{ todoEdit ? 'Done' : 'Edit' }}</button>
    <button class="btn btn_maincolor2" v-if="flagEdit" @click="$emit('delete-todo', todo.id)">Delete</button>
  </li>
</template>
<script>
export default {
  props: ['todo', 'flagEdit'],
  data(){
    return {
      todoEdit: false
    }
  },
  methods:{
  }
}
</script>
<style type="scss">

</style>