<template>
    <div>
        <b-modal id="todo-modal" ref="todoModal" :title="title" :hide-footer="!isDelete" @hidden="$emit('hidden')" static
            v-model="showModal">
            <div v-if="!isDelete">
                <b-form-group label="Title">
                    <b-form-input ref="input__title" type="text" v-model="displayTitle" />
                </b-form-group>
                <b-form-group label="Description">
                    <b-form-textarea ref="input__description" rows="5" max-rows="5" v-model="displayDescription" />
                </b-form-group>

                <b-button class="button__edit" v-if="todo.id" :title="title" variant="outline-warning" :isShowModal="false"
                    @click="onEdit()" block>Edit</b-button>

                <b-button class="button__add" v-else :title="title" variant="outline-success" v-model="showModal" block
                    @click="onCreate()">Add
                </b-button>
            </div>
            <p class="my-4" v-if="isDelete">
                Are you sure you want to delete this task?
            </p>
            <template #modal-footer="{ cancel }" v-if="isDelete">
                <b-button ref="button__modal-delete-confirm" type="reset" variant="danger"
                    @click="onDelete()">Yes</b-button>
                <b-button ref="button__modal-delete-cancel" variant="success" @click="cancel()">No</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { todoMixin } from "@/mixins/todoMixin";
import TodoList from "@/models/TodoList";

export default {
    name: "TodoModal",
    props: {
        isShowModal: {
            type: Boolean,
            default: false,
        },
        title: String,
        todo: {
            type: TodoList,
        },
        deleteItem: Number,
    },
    model: {
        prop: "todo",
        event: "change",
    },
    mixins: [todoMixin],
    data() {
        return {
            // newTitle: "",
            // newDescription: null,
        };
    },
    created() { },
    computed: {
        showModal: {
            get() {
                return this.isShowModal;
            },
            set(value) {
                this.$emit("update:isShowModal", value);
            },
        },
        displayTitle: {
            get() {
                return this.todo ? this.todo["title"] : "";
            },
            set(title) {
                const updatedTodo = new TodoList({ ...this.todo, title });

                this.$emit("change", updatedTodo);
            },
        },
        displayDescription: {
            get() {
                return this.todo ? this.todo["description"] : "";
            },
            set(description) {
                const updatedTodo = new TodoList({ ...this.todo, description });

                this.$emit("change", updatedTodo);
            },
        },
        isDelete() {
            return this.title === "Confirm Delete";
        },
    },
    methods: {
        async onEdit() {
            if (!this.todo.title) {
                alert("Title is requied");

                return;
            }

            if (this.todo && this.todo.id) {
                await this.$_todoMixin_editedUserTask(this.todo);
            }

            this.$emit("update:success");
        },
        async onCreate() {
            if (this.todo.title.trim() === "" || this.todo.title === null) {
                alert("Title is requied");
                return;
            }

            await this.$_todoMixin_createUserTask(this.todo);

            this.$emit("create:success");
        },
        onDelete() {
            this.$_todoMixin_deleteUserTask({ id: this.deleteItem });
            // this.$bvModal.hide("todo-modal");
            this.$emit("delelte:success")
        },
    },
};
</script>

<style lang="scss" scoped></style>
