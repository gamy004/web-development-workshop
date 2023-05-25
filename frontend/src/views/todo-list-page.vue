<template>
	<div id="todo-list-page" class="card mt-3">
		<div class="card-body">
			<div class="header">
				<font-awesome-icon icon="fa-solid fa-list" class="icon" />
				<span class="page-name">{{ pageName }}</span>
			</div>

			<div class="todo-list-group__header">
				<b-button ref="craeteBtn" variant="primary" pill @click="onCreateClicked">
					{{ "Add Todo List Item" }}
				</b-button>
			</div>

			<b-list-group ref="todoList">
				<b-list-group-item
					v-for="todoListItem in todoList"
					ref="todoListItem"
					:key="`todolist-item-${todoListItem.id}`"
					:id="`todolist-item-${todoListItem.id}`"
				>
					<div class="todo-list-item__container">
						<div class="todo-list-item__detail">
							<h4 class="todo-list-item__title">{{ todoListItem.title }}</h4>
							<small class="todo-list-item__description" v-html="todoListItem.description"></small>
						</div>

						<div class="todo-list-item__actions">
							<b-button variant="outline-dark" pill @click="onEditClicked(todoListItem.id, todoListItem)">
								<span class="btn-wrapper--icon">
									<font-awesome-icon icon="edit" />
								</span>
								<span class="btn-wrapper--label">{{ "Edit" }}</span>
							</b-button>

							<b-button variant="outline-danger" pill @click="onDeleteClicked(todoListItem.id)">
								<span class="btn-wrapper--icon">
									<font-awesome-icon icon="trash" />
								</span>
								<span class="btn-wrapper--label">{{ "Delete" }}</span>
							</b-button>
						</div>
					</div>
				</b-list-group-item>
			</b-list-group>

			<todo-list-item-modal ref="todoListItemComponent" @onSubmited="onSubmited" @onDeleted="onDeleted" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { Subject, switchMap } from "rxjs";
import TodoListItemModal from "@/components/TodoListItemModal.vue";
import TodoList from "@/models/TodoList";

export default {
	components: {
		TodoListItemModal,
	},
	data() {
		return {
			pageName: "Todo List",
		};
	},
	computed: {
		...mapGetters({
			currentUser: "authentication/currentUser",
		}),
		todoList() {
			return TodoList.query().where("user_id", this.currentUser.id).all();
		},
	},
	created() {
		this._todolist$ = new Subject();
		this.todolistSubscription = this._todolist$
			.asObservable()
			.pipe(switchMap(() => TodoList.api().fetch()))
			.subscribe();
	},
	mounted() {
		this._todolist$.next();
		this.todoListItemComponent = this.$refs.todoListItemComponent;
	},
	beforeUnmount() {
		this.todolistSubscription.unsubscribe();
	},
	methods: {
		onCreateClicked() {
			this.todoListItemComponent.open();
		},
		onEditClicked(todoListItemId, todoListItem) {
			this.todoListItemComponent.open(todoListItemId, todoListItem);
		},
		onDeleteClicked(todoListItemId) {
			this.todoListItemComponent.delete(todoListItemId);
		},
		onSubmited() {
			this._todolist$.next();
		},
		onDeleted() {
			this._todolist$.next();
		},
	},
};
</script>

<style lang="css" scoped>
.header {
	display: flex;
	flex-direction: row;
	align-items: baseline;
	gap: 0.5rem;
	padding: 0.5rem 0.25rem;
}

.header > .icon {
	font-size: 1.5rem;
}
.header > .page-name {
	font-size: 2rem;
}
.todo-list-group__header {
	display: flex;
	flex: 1;
	justify-content: flex-end;
	padding: 0.75rem 0;
}
.todo-list-item__container {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
.todo-list-item__container > .todo-list-item__detail {
	display: flex;
	flex-direction: column;
	flex: 1;
}
.todo-list-item__detail > .todo-list-item__description {
	text-indent: 1rem;
}
.todo-list-item__container > .todo-list-item__actions {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	gap: 0.5rem;
}

@media screen and (min-width: 576px) {
	.todo-list-item__container {
		flex-direction: row;
	}
	.todo-list-item__container > .todo-list-item__actions {
		margin: auto 0;
	}
}
</style>
