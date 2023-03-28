<template>
    <b-modal :title="title" hide-footer @hidden="$emit('hidden')" v-model="value">

        <b-row inline>
            <b-col>
                <b-form-input type="text" v-model="displayMessage" />
            </b-col>
            <b-col cols="3">
                <b-button v-if="title === 'Add New Task'" :title="title" variant="outline-success" @click="addMessage"
                    v-model="value">Add </b-button>
                <b-button v-else-if="title === 'Edit Task'" :title="title" variant="outline-warning" :isShowModal="false"
                    @click="editMessage()" v-model="value">Edit</b-button>
            </b-col>
        </b-row>

    </b-modal>
</template>

<script>

export default {
    name: "TodoModal",
    props: {
        isShowModal: {
            type: Boolean,
            default: false
        },
        title: String,
        message: String
    },
    data() {
        return {
            newMessage: "",
        }
    },
    computed: {
        value: {
            get() {
                return this.isShowModal
            },
            set(value) {
                // console.log("test");
                this.$emit('update:isShowModal', value)
            }
        },
        displayMessage: {
            get() {
                // console.log("get");
                return this.message
            },
            set(value) {
                // console.log("set", value);
                this.newMessage = value
            }
        },

    },
    methods: {
        addMessage() {
            this.$emit('add', this.newMessage)
            this.newMessage = ""
        },
        editMessage() {
            console.log("message", this.message)
            console.log("this.newMessage", this.newMessage)
            this.$emit('EditedItem', this.newMessage)
        },

    },
    // watch: {
    //     newMessage: {
    //         handler: function (newMessage) {
    //             console.log(newMessage);
    //         }
    //     }
    // },

}
</script>

<style lang="scss" scoped></style>