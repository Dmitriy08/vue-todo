<template>
  <div>
    <section class="ls s-pt-50 task-single">
      <div class="container">
        <div class="row">
          <div class="col-12" v-if="newTask || flagEdit">
            <Modal
                v-if="modalShow"
                v-bind:title="modalTitle"
                v-bind:modalShow="modalShow"
                v-bind:modalHandler="modalHandler"
                @closeModal="closeModal"
            />
            <TaskEdit
                v-bind:task="task"
                v-bind:newTask="newTask"
                @undo="undo"
                @redo="redo"
                @flagFalse="flagFalse"
                @cancelEdit="cancelEditTask"
            />
          </div>
          <div class="col-12" v-else>
            <button class="btn btn_maincolor" @click="editTask">Edit Task</button>
            <div class="divider-60"></div>
            <h2>{{ task.title }}</h2>
            <TodoList v-bind:todos="task.todos" v-bind:flagEdit="flagEdit"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import TodoList from '../components/TodoList'
import TaskEdit from "../components/TaskEdit";
import Modal from "../components/Modal";

export default {
  data() {
    return {
      title: '',
      flagEdit: false,
      todosTitle: '',
      modalTitle: '',
      modalShow: false,
      modalHandler: () => {},
      newT: {
        title: 'My New Task',
        id: +this.$route.params.id,
        todos: []
      },
      historyTask: {},
      taskHistory: [],
      historyIndex: -1,
      watching: true,
    }
  },
  components: {
    TodoList,
    TaskEdit,
    Modal
  },
  computed: {
    task: {
      get: function () {
        let task = this.$store.getters.taskById(+this.$route.params.id);
        if (task === undefined) {
          task = this.newT
        }
        if (Object.keys(this.historyTask).length) {
          task = this.taskHistory[this.historyIndex]
        }
        return task
      },
      set: function (val) {
        console.log(val)
        this.historyTask = val
      }
    },
    newTask() {
      let t = this.$store.getters.taskById(+this.$route.params.id);
      return t === undefined
    }
  },
  watch: {
    task: {
      handler: function (val) {
        if (this.watching) {
          this.taskHistory.push(JSON.parse(JSON.stringify(val)));
          this.historyIndex = this.taskHistory.length - 1;
        } else {
          this.watching = true;
        }
      },
      deep: true,
    }
  },
  methods: {
    undo() {
      this.watching = false;
      if (this.historyIndex > 0) {
        this.historyIndex -= 1;
        this.task = this.taskHistory[this.historyIndex];
      }
    },
    redo() {
      this.watching = false;
      if (this.historyIndex < (this.taskHistory.length - 1)) {
        this.historyIndex += 1;
        this.task = this.taskHistory[this.historyIndex];
      }
    },
    showModal(title){
      this.modalShow = true;
      this.modalTitle = title;
    },
    closeModal(){
      this.modalShow = false;
      this.modalTitle = ''
    },
    cancelEditTask(){
      console.log(1111)
      this.showModal('Cancel edit task?');
      this.modalHandler = function () {
        this.$store.dispatch('cancelEditTask');
      }
      this.$router.push('/')
    },

    editTask() {
      this.flagEdit = true;
    },

    flagFalse(flag) {
      this.flagEdit = flag
    },

  }
}
</script>