<template>
  <section class="ls s-pt-50">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Modal
              v-if="modalShow"
              v-bind:title="modalTitle"
              v-bind:modalShow="modalShow"
              v-bind:modalHandler="modalHandler"
              @closeModal="closeModal"
          />
        </div>
        <div class="col-6">
          <h2>My Tasks</h2>
        </div>
        <div class="col-6 text-right">
          <button v-bind:test="false" class="btn btn_maincolor" v-on:click="newTask()">New Task</button>
        </div>
        <div class="col-12">
          <div class="divider-30"></div>
          <hr>
          <div class="divider-30"></div>
          <div class="row c-mb-20 c-gutter-20" v-if="tasks.length">
            <div
                class="col-lg-4"
                v-for="(task, idx) of tasks"
                :key="task.id"
            >
              <div class="vertical-item vertical-item_shadow">
                <div class="item-content">
                  <h4 class="entry-title">{{ task.title }}</h4>
                  <TodoList v-bind:todos="task.todos.slice(0, 3)"/>
                  <router-link tag="button" class="btn btn_maincolor" :to="'/task/' + task.id">Open</router-link>
                  <button type="button" class="btn btn_maincolor2" @click="deleteTask(task.id)">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <p v-else>No Tasks</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TodoList from "../components/TodoList";
import Modal from "../components/Modal";
export default {
  name: 'Home',
  data: () => ({
    // title: '',
    // flagEdit: false
    modalTitle: '',
    modalShow: false,
    modalHandler: () => {}
  }),
  components: {
    TodoList,
    Modal
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
  },
  methods: {
    newTask() {
      const path = `/task/${Date.now()}`
      if (this.$route.path !== path) this.$router.push(path)
    },
    showModal(title){
      this.modalShow = true;
      this.modalTitle = title;
    },
    closeModal(){
      this.modalShow = false;
      this.modalTitle = ''
    },
    deleteTask(id) {
      this.showModal('Delete task?');
      this.modalHandler = function () {
        this.$store.dispatch('deleteTask', id)
      }
    }
  }
}
</script>
