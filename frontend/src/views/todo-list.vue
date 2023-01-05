<template>
  <div>
    <b-link :to="{ path: '/home' }" title="home button"><font-awesome-icon icon="fa-solid fa-home" /></b-link>
    <b-card v-for="taskData in listData" :key="taskData.id">
      <b-card-text>
        {{ taskData.name }}
      </b-card-text>
      <b-card-text>
        {{ taskData.description }}
      </b-card-text>
      <b-button @click="onEdit(taskData)">
        edit
      </b-button>

      <b-button variant="danger" @click="onWillDelete(taskData.id)">
        delete
      </b-button>

    </b-card>
    <b-button @click="showModal = true">Launch demo modal</b-button>
    <b-modal @hidden="onHidden" id="add-task-modal" :title=modalTitle hide-footer v-model="showModal">
      <b-form @submit="onSubmit">
        <b-form-group>
          <b-form-input type="text" v-model="newTaskName" name="taskName"></b-form-input>
          <b-form-input type="text" v-model="newTaskDesc" name="taskDesc"></b-form-input>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
    <b-modal @hidden="onHidden" title='delete task' hide-footer v-model="willDelete">

      <b-button type="submit" variant="danger" @click="onDelete">sure</b-button>
      <b-button type="submit" variant="primary" @click="willDelete=false">no</b-button>
    </b-modal>


  </div>
</template>

<script>
// import TodoList from '@/models/TodoList';
import Task from '@/models/Task';
import User from '@/models/User'

export default {
  data() {
    return {
      showModal: false,
      editTaskId: null,
      willDelete: false,
      deleteId: null,
      todoList: "",
      newTaskName: "",
      newTaskDesc: "",
      uid: ""
    }
  },
  async mounted() {
    const uid = await User.fetchUserId()
    this.uid = uid
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      const data = {
        name: this.newTaskName,
        description: this.newTaskDesc
      }

      console.log(this.editTaskId)
      this.editTaskId == null ? User.addTask(data) : Task.editTask(this.editTaskId,
        {
          name: this.newTaskName,
          description: this.newTaskDesc
        }
      )
      this.clearData()
      this.showModal = false
    },
    onEdit(taskData) {
      this.showModal = true
      this.editTaskId = taskData.id
      this.newTaskName = taskData.name;
      this.newTaskDesc = taskData.description;

    },
    onHidden() {
      // this.editTaskId = null
      // this.newTaskName = ""
      // this.newTaskDesc = ""
    },
    onWillDelete(tid) {
      this.willDelete = !this.willDelete;
      this.deleteId = tid
    },
    onDelete() {
      Task.deleteTask(this.deleteId)
      this.willDelete = false;
    },
    clearData() {
      this.editTaskId = null
      this.newTaskName = ""
      this.newTaskDesc = ""
    }
  },
  computed: {
    listData() {
      return Task.query().where('user', this.uid).get()
    },
    modalTitle() {
      return this.editTaskId == null ? "add task" : "edit"
    },
    deleteTitle(taskData) {
      return (this.willDelete & taskData.id == this.deleteId) ? "no" : "delete"
    }
  },
  watch: {
    showModal() {
      if (!this.showModal & this.editTaskId != null) {
        this.editTaskId = null
        this.newTaskName = ""
        this.newTaskDesc = ""
      }

    }
  }
}
</script>

<style scoped>

</style>