<template>
    <div>
        <b-card id="todolistPage">
            <div>
                <h2 class="d-flex align-items-baseline">
                    <font-awesome-icon icon="table-list" />
                    <span class="ml-2">To Do List</span>
                </h2>
            </div>
            <div>
                <b-button title="About" :to="{ name: 'home' }"><font-awesome-icon :icon="['fas', 'home']" />
                    Home
                </b-button>
                <b-button title="About" :to="{ name: 'about' }" class="ml-2"><font-awesome-icon :icon="['fas', 'info']" />
                    About
                </b-button>
            </div>

        </b-card>
        <b-card class="my-2">
            <b-input-group class="mt-3">
                <b-input-group-append>
                    <b-button variant="outline-success" @click="openModal()">Add New Task</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-card>
        <!-- {{ getTodoList }} -->
        <b-card class="my-2" v-for="({ message, id }, index) in getTodoList" :key="index">
            <b-row>
                <b-col class="col-9">
                    <b-card-text>{{ message }}</b-card-text>
                </b-col>
                <b-col class="col-3">
                    <b-button class="mr-2" variant="success" @click="onEdit(message, id)">Edit</b-button>
                    <b-button type="reset" variant="danger" v-b-modal="'my-modal'"
                        @click="confirmDelete(id, message)">Delete</b-button>
                </b-col>
            </b-row>
        </b-card>
        <TodoModal :is-show-modal="modalShow" :message="message" :title="modalTitle"
            @EditedItem="onEdited($event, editMessageId)" @hidden="event => closeModal(event)" @add="addTodolist" />

        <b-modal v-model="modalDeleteShow" title="Confirm Delete">
            <p class="my-4">Are you sure you want to delete this task?</p>
            <p class="font-weight-bold">{{ this.deleteMessage }}</p>
            <template #modal-footer="{ cancel }">
                <b-button type="reset" variant="danger" @click="onDelete()">Yes</b-button>
                <b-button variant="success" @click="cancel()">No</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { todoMixin } from '@/mixins/todoMixin'
import TodoList from '@/models/TodoList'
import TodoModal from "../components/TodoModal.vue"


export default {
    mixins: [todoMixin],
    emits: ['update:message'],
    components: {
        TodoModal,
    },
    data() {
        return {
            message: "",
            modalShow: false,
            modalDeleteShow: false,
            editMessageId: "",
            deleteMessageId: "",
            deleteMessage: ""
        }
    },
    computed: {
        getTodoList() {
            return TodoList.query().all()
        },
        modalTitle() {
            return this.editMessageId ? "Edit Task" : "Add New Task"
        }
    },
    methods: {
        openModal() {
            this.modalShow = true
        },
        closeModal() {
            // console.log(event);
            this.modalShow = false
            this.message = ""
        },
        onEdit(message, id) {
            this.editMessageId = id
            this.message = message
            this.modalShow = true
        },
        onEdited(editedMessage, editedId) {
            console.log("edited", editedId, editedMessage);
            TodoList.update({
                data: {
                    id: editedId,
                    message: editedMessage
                }
            })
            console.log("ทำถึงข้างล่าง");
            this.modalShow = false
            this.closeModal()
        },
        addTodolist(value) {
            // console.log(value);
            this.closeModal()
            if (value.trim() === "" || value === null) {

                alert("please enter somthing")
            }
            else {
                TodoList.insert({
                    data: { message: value }
                })
            }

        },
        confirmDelete(id, message) {
            console.log("id", id)
            this.deleteMessageId = id
            this.deleteMessage = message
            this.modalDeleteShow = true
        },
        onDelete() {
            console.log("1");
            TodoList.delete(this.deleteMessageId)
            console.log("2");
            this.modalDeleteShow = false
            console.log("3");
        }
    },
}
</script>

<style lang="scss" scoped></style>