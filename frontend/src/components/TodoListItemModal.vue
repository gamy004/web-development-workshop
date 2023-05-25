<template>
	<div id="todo-list-modal-container">
		<b-modal
			ref="todoListItemModal"
			id="todo-list-item-modal"
			static
			:title="modalTitle"
			@ok="onConfirmHandler"
			@hidden="onCancelHandler"
		>
			<div class="todo-list-item-id__container" v-if="todoListItemId != null">
				<span>
					{{ `ID: ` }}
					<b>{{ todoListItemId }}</b>
				</span>
			</div>
			<b-form ref="form" @submit.prevent="onSubmitHandler">
				<b-form-group
					label="Title"
					label-for="todo-list-item-title"
					id="fieldset-todo-list-item-title"
					invalid-feedback="Title is required."
				>
					<b-form-input
						placeholder="Title"
						id="todo-list-item-title"
						v-model="todoList.title"
						:state="$v.todoList.title.$anyError ? false : null"
					></b-form-input>
				</b-form-group>

				<b-form-group
					label="Description (Optional)"
					label-for="new-task-description"
					id="fieldset-todo-list-item-description"
				>
					<b-form-textarea
						placeholder="Description"
						id="todo-list-item-description"
						v-model="todoList.description"
						rows="4"
						no-resize
					></b-form-textarea>
				</b-form-group>
			</b-form>

			<template #modal-ok>
				<b-spinner v-if="submitting" label="submitting" small></b-spinner>
				<span v-else>{{ todoListItemId != null ? "Edit" : "Add" }}</span>
			</template>
		</b-modal>

		<b-modal
			title="Delete todo list item"
			id="delete-todo-list-item-modal"
			@ok="onConfirmDeleteHandler"
			@hidden="onCancelDeleteHandler"
		>
			<div class="delete-message__container">
				<span>Are you really want to delete this todo list item ?</span>
				<span>
					<b>{{ `Todo List Item ID: ${todoListItemId}` }}</b>
				</span>
			</div>

			<template #modal-ok>
				<b-spinner v-if="deleting" label="deleting" small></b-spinner>
				<span v-else>Delete</span>
			</template>
		</b-modal>
	</div>
</template>
<script>
import TodoList from "@/models/TodoList";
import { required } from "vuelidate/lib/validators";

export default {
	data() {
		return {
			todoListItemId: null,
			submitting: false,
			deleting: false,
			todoList: new TodoList(),
		};
	},
	validations: {
		todoList: {
			title: {
				required,
			},
		},
	},
	computed: {
		modalTitle() {
			return this.todoListItemId ? `Edit todo list item` : `Create todo list item`;
		},
	},
	methods: {
		open(todoListItemId = null, todoListItem = null) {
			if (todoListItemId && todoListItem) {
				this.todoListItemId = todoListItemId;
				this.$set(this.todoList, "title", todoListItem.title);
				this.$set(this.todoList, "description", todoListItem.description);
			}

			this.$bvModal.show("todo-list-item-modal");
		},
		onConfirmHandler(event) {
			event.preventDefault();
			this.onSubmitHandler();
		},
		onCancelHandler() {
			this.resetModel();
		},
		delete(todoListItemId = null) {
			this.todoListItemId = todoListItemId;
			this.$bvModal.show("delete-todo-list-item-modal");
		},
		onConfirmDeleteHandler(event) {
			event.preventDefault();
			this.onDeleteHandler();
		},
		onCancelDeleteHandler() {
			this.resetModel();
		},
		async onSubmitHandler() {
			this.$v.todoList.$touch();

			if (this.$v.todoList.$invalid) {
				return;
			}

			try {
				this.submitting = true;
				this.todoListItemId
					? await TodoList.api().update(this.todoListItemId, this.todoList.title, this.todoList.description)
					: await TodoList.api().create(this.todoList.title, this.todoList.description);

				this.$emit("onSubmited");
				this.$nextTick(() => {
					this.$bvModal.hide("todo-list-item-modal");
				});
			} catch (error) {
				console.log(error);
			} finally {
				this.resetModel();
				this.submitting = false;
			}
		},
		async onDeleteHandler() {
			try {
				if (this.todoListItemId) {
					this.deleting = true;
					await TodoList.api().remove(this.todoListItemId);
					this.$emit("onDeleted");
					this.$nextTick(() => {
						this.$bvModal.hide("delete-todo-list-item-modal");
					});
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.resetModel();
				this.deleting = false;
			}
		},
		resetModel() {
			this.$v.todoList.$reset();
			this.todoListItemId = null;
			this.todoList = new TodoList();
		},
	},
};
</script>

<style lang="css" scoped>
.todo-list-item-id__container {
	padding: 0.5rem 0;
}
.delete-message__container {
	display: flex;
	flex-direction: column;
}
</style>
