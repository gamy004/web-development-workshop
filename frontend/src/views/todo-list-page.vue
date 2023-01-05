<template>
  <b-row id="homePage">
    <b-col cols="12" class="mt-3">
      <h2 class="d-flex align-items-baseline">
        <font-awesome-icon icon="list" />
        <span class="ml-2">Todo List</span>
      </h2>

      <b-button :to="{ name: 'home' }">
        <font-awesome-icon icon="home" />
        Home
      </b-button>
      <b-button :to="{ name: 'about' }">
        <font-awesome-icon icon="info" />
        About
      </b-button>
    </b-col>

    <b-col class="mt-3">
      <div class="text-right mb-3">
        <b-button
          variant="light"
          pill
          class="bg-deep-blue"
          @click="showManageModal = true"
          >Add task</b-button
        >
      </div>
      <b-list-group>
        <b-list-group-item
          v-for="userTask in userTasks"
          :key="`task-${userTask.id}`"
        >
          <div class="d-flex align-items-center flex-column flex-sm-row">
            <div
              class="bg-deep-blue text-center text-white font-size-xl d-50 rounded-circle mb-3 mb-sm-0"
            >
              <font-awesome-icon icon="list" />
            </div>

            <div class="pl-0 pl-sm-4">
              <div class="d-flex align-items-center">
                <span class="font-size-lg">{{ userTask.title }}</span>
              </div>
              <small v-html="userTask.description"></small>
            </div>

            <div class="mt-3 mt-sm-0 ml-sm-auto">
              <b-button
                variant="light"
                pill
                class="mr-2 bg-deep-blue"
                @click="handleEdit(userTask)"
              >
                <span class="btn-wrapper--icon">
                  <font-awesome-icon icon="edit" />
                </span>
                <span class="btn-wrapper--label"> Edit </span>
              </b-button>

              <b-button
                variant="light"
                pill
                class="bg-heavy-rain"
                @click="handleDelete(userTask)"
              >
                <span class="btn-wrapper--icon">
                  <font-awesome-icon icon="trash" />
                </span>
                <span class="btn-wrapper--label"> Delete </span>
              </b-button>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>

      <b-modal
        :title="modalTitle"
        v-model="showManageModal"
        @ok="handleOkManageModal"
        @hidden="handleHiddenManageModal"
      >
        <b-form @submit.stop.prevent="handleManageFormSubmit">
          <b-form-group
            label="Title"
            label-for="new-task-title"
            id="fieldset-new-task-title"
            invalid-feedback="Title is required."
          >
            <b-form-input
              placeholder="title"
              id="new-task-title"
              v-model="form.title"
              :state="$v.form.title.$anyError ? false : null"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Description (Optional)"
            label-for="new-task-description"
            id="fieldset-new-task-description"
          >
            <b-form-textarea
              placeholder="description"
              id="new-task-description"
              v-model="form.description"
            ></b-form-textarea>
          </b-form-group>
        </b-form>

        <template #modal-ok>
          <b-spinner v-if="submitting" label="submitting" small></b-spinner>
          <span v-else>{{ edittedTaskId ? "Edit" : "Add" }}</span>
        </template>
      </b-modal>

      <b-modal
        title="Delete task"
        v-model="showDeleteModal"
        @ok="handleOkDeleteModal"
        @hidden="handleHiddenDeleteModal"
      >
        Are you really want to delete this task?
        <template #modal-ok>
          <b-spinner v-if="deleting" label="deleting" small></b-spinner>
          <span v-else>Delete</span>
        </template>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { User } from "../models";
import { Task } from "../models/Task";

export default {
  data() {
    return {
      userId: null,
      invalid: false,
      deleting: false,
      submitting: false,
      showManageModal: false,
      showDeleteModal: false,
      edittedTaskId: null,
      deletedTaskId: null,
      form: {
        title: "",
        description: "",
      },
    };
  },

  validations: {
    form: {
      title: {
        required,
      },
    },
  },

  computed: {
    user() {
      return User.query().with("tasks").where("id", this.userId).first();
    },

    userTasks() {
      return this.user ? this.user.tasks : [];
    },

    modalTitle() {
      return this.edittedTaskId ? "Edit task" : "New task";
    },
  },

  methods: {
    handleOkManageModal(event) {
      event.preventDefault();

      this.handleManageFormSubmit();
    },

    handleHiddenManageModal() {
      this.resetManageForm();
    },

    handleEdit(task) {
      this.edittedTaskId = task.id;
      this.$set(this.form, "title", task.title);
      this.$set(this.form, "description", task.description);
      this.showManageModal = true;
    },

    handleOkDeleteModal(event) {
      event.preventDefault();

      this.handleDeleteSubmit();
    },

    handleHiddenDeleteModal() {
      this.deletedTaskId = null;
    },

    handleDelete(task) {
      this.deletedTaskId = task.id;
      this.showDeleteModal = true;
    },

    resetManageForm() {
      this.$v.$reset();
      this.edittedTaskId = null;
      this.form = {
        title: "",
        description: "",
      };
    },

    async handleManageFormSubmit() {
      this.invalid = false;

      this.$v.$touch();

      if (this.$v.$invalid) {
        this.invalid = true;
        return;
      }

      try {
        this.submitting = true;

        if (this.edittedTaskId) {
          await Task.api().update(
            this.edittedTaskId,
            this.form.title,
            this.form.description
          );
        } else {
          await Task.api().create(this.form.title, this.form.description);
        }

        this.showManageModal = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.submitting = false;
      }
    },

    async handleDeleteSubmit() {
      try {
        this.deleting = true;

        await Task.api().remove(this.deletedTaskId);

        this.showDeleteModal = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.deleting = false;
      }
    },
  },

  async mounted() {
    const promise = await User.api().load();

    const { id } = promise.response.data;

    if (id) {
      this.userId = id;
    }

    await Task.api().fetch();
  },
};
</script>
