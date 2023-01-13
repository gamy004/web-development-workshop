<template>
  <b-modal
    static
    @hidden="onHidden"
    id="add-task-modal"
    :title="modalTitle"
    hide-footer
    v-model="showModalData"
  >
    <b-form ref="modal-form" @submit="onSubmit">
      <b-form-group>
        <b-form-input
          ref="taskTitleInput"
          type="text"
          v-model="newTaskName"
          name="taskName"
        ></b-form-input>
        <b-form-input
          type="text"
          v-model="newTaskDesc"
          name="taskDesc"
        ></b-form-input>
        <b-button id="submit-button" type="submit" variant="primary"
          >Submit</b-button
        >
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "todo-list-modal",
  props: {
    taskName: String,
    taskDesc: String,
    showModal: Boolean,
    modalTitle: String,
    provider: Function,
  },
  data() {
    return {
      newTaskName: this.taskName,
      newTaskDesc: this.taskDesc,
      showModalData: this.showModal,
    };
  },
  // mounted() {
  //   alert("dfafdsf")
  //   this.newTaskName = this.taskName,
  //     this.newTaskDesc = this.taskDesc,
  //     this.showModalData = this.showModal
  // },
  methods: {
    async onSubmit(event) {
      let promise;

      event.preventDefault();

      const data = {
        title: this.newTaskName,
        description: this.newTaskDesc,
      };

      if (this.provider) {
        promise = await this.provider(data);
      }

      this.$emit("submit", data);

      this.onHidden();

      return promise;
    },
    onHidden() {
      this.showModalData = false;

      this.$emit("hidden");
    },
    onEdit(taskData) {
      this.showModalData = true;
      this.editTaskId = taskData.id;
      this.newTaskName = taskData.title;
      this.newTaskDesc = taskData.description;
    },
  },

  watch: {
    showModal: {
      immediate: true,
      handler(value) {
        if (value) {
          this.showModalData = this.showModal;
          this.newTaskName = this.taskName;
          this.newTaskDesc = this.taskDesc;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
