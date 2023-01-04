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
      <b-list-group>
        <b-list-group-item>
          <b-form @submit.prevent="addTask">
            <h5>Add new Task</h5>

            <b-form-group
              label="Title"
              label-for="new-task-title"
              id="fieldset-new-task-title"
            >
              <b-form-input
                placeholder="title"
                id="new-task-title"
                v-model="form.title"
                required
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

            <b-button
              variant="light"
              type="submit"
              class="bg-deep-blue font-weight-bold"
              >Add</b-button
            >
          </b-form>
        </b-list-group-item>

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
              <b-button variant="light" pill class="mr-2 bg-deep-blue">
                <span class="btn-wrapper--icon">
                  <font-awesome-icon icon="edit" />
                </span>
                <span class="btn-wrapper--label"> Edit </span>
              </b-button>

              <b-button variant="light" pill class="bg-heavy-rain">
                <span class="btn-wrapper--icon">
                  <font-awesome-icon icon="trash" />
                </span>
                <span class="btn-wrapper--label"> Delete </span>
              </b-button>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import { User } from "../models";
import { Task } from "../models/Task";

export default {
  data() {
    return {
      userId: null,
      submitting: false,
      form: {
        title: "",
        description: "",
      },
    };
  },

  computed: {
    user() {
      return User.query().with("tasks").where("id", this.userId).first();
    },

    userTasks() {
      return this.user ? this.user.tasks : [];
    },
  },

  methods: {
    async addTask() {
      try {
        this.submitting = true;

        await Task.api().create(this.form.title, this.form.description);
      } catch (error) {
        console.log(error);
      } finally {
        this.submitting = false;
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
