<template>
    <div>
        <b-card id="todolistPage" class="my-3">
            <h2 class="d-flex align-items-baseline">
                <font-awesome-icon icon="table-list" />
                <span class="ml-2">To Do List</span>
            </h2>

            <b-button title="About" :to="{ name: 'home' }"><font-awesome-icon :icon="['fas', 'home']" class="mr-1" />
                Home
            </b-button>
            <b-button title="About" :to="{ name: 'about' }" class="ml-2"><font-awesome-icon :icon="['fas', 'info']"
                    class="mr-1" />
                About
            </b-button>

        </b-card>
        <div>
            <b-card class="my-2">
                <b-button ref="addNewTaskButton" variant="outline-success" @click="openModal()">Add New Task</b-button>
            </b-card>
        </div>
        <b-card ref="todoCard" class="my-2" v-for="(todo, index) in myTodoList" :key="index">
            <b-row>
                <b-col class="col-9">
                    <b-card-text class="font-weight-bold">{{ todo.title }}</b-card-text>
                    <b-card-text v-if="todo.description != null">{{ todo.description }}</b-card-text>
                    <b-card-text>สร้างเมื่อ: {{ todo.readableCreatedAt }}</b-card-text>
                </b-col>
                <b-col class="col-3">
                    <b-button ref="editTaskButton" class="mr-2 button__edit" variant="warning"
                        @click="onEdit(todo)">Edit</b-button>
                    <b-button type="reset" variant="danger" class="button__delete"
                        @click="confirmDelete(todo.id)">Delete</b-button>
                </b-col>
            </b-row>
        </b-card>

        <TodoModal :is-show-modal="modalShow" :title="modalTitle" v-model="todo" @create:success="onCreateSuccess"
            @update:success="onUpdateSuccess" @hidden="event => closeModal(event)" :deleteItem="deleteTodoId" />

    </div>
</template>

<script>
import { todoMixin } from '@/mixins/todoMixin'
import TodoList from '@/models/TodoList'
import TodoModal from "../components/TodoModal.vue"
import { User } from '@/models/User'


export default {
    emits: ['update:message'],
    components: {
        TodoModal,
    },

    mixins: [todoMixin],
    data() {
        return {
            title: "",
            modalShow: false,
            todo: new TodoList(),
            isEdit: false,
            isDelete: false,
            deleteTodoId: null
        }
    },
    async created() {
        await this.fetch()
    },
    async mounted() {
        try {
            await User.api().fetchUser();
        } catch (error) {
            console.error(error);

            alert("some thing went wrong!!!");
        }

        // this.$nextTick(() => {
        //     console.log(this.$refs);
        // })
    },
    computed: {
        modalTitle() {
            if (this.isEdit) {
                return "Edit Task"
            }
            else if (this.isDelete) {
                return "Confirm Delete"
            }
            else {
                return "Add New Task"
            }
        },

        user() {
            return User.query().first();
        },

        myTodoList() {
            let tasks = this.user ? this.$_todoMixin_getMyTodolist(this.user.id) : [];

            return tasks
        }

    },
    methods: {
        async fetch() {
            try {
                await this.$_todoMixin_getUserTask();
            } catch (error) {
                console.error(error);
            }
        },
        openModal() {
            this.modalShow = true
        },
        closeModal() {
            this.modalShow = false
            this.isEdit = false
            this.isDelete = false
            this.todo = new TodoList();

        },
        onEdit(todo) {
            this.modalShow = true
            this.isEdit = true
            this.todo = todo

        },
        onEdited() {
            this.modalShow = false
            this.closeModal()
        },
        confirmDelete(id) {
            this.modalShow = true
            this.deleteTodoId = id
            this.isDelete = true
        },
        onCreateSuccess() {
            this.modalShow = false
        },

        onUpdateSuccess() {
            this.modalShow = false
        },


    },
}
</script>

<style lang="scss" scoped></style>