<template>
    <div>
        <b-card>

            <div>
                <h2 class="d-flex align-items-baseline">
                    <font-awesome-icon icon="info" />
                    <span class="ml-2">About</span>
                </h2>
            </div>
            <div>
                <b-button title="Home" :to="{ name: 'home' }"><font-awesome-icon :icon="['fas', 'home']" />Home</b-button>
                <b-button title="TodoList" :to="{ name: 'todolist' }" class="ml-2"><font-awesome-icon
                        :icon="['fas', 'table-list']" />To
                    do List</b-button>
            </div>

        </b-card>
        <b-card title="User Infomation" class="card__title-location">
            <b-spinner v-if="loading" label="Spinning"></b-spinner>
            <div v-else-if="userWithRole != null">
                <b-card-text>Email: {{ userWithRole.email }}</b-card-text>
                <b-card-text>Username: {{ userWithRole.username }}</b-card-text>
                <b-card-text v-if="userWithRole.role">Role: {{ userWithRole.role.name }}</b-card-text>
            </div>
            <b-card-text v-else>No user Infomation</b-card-text>
        </b-card>

    </div>
</template>

<script>
import { User } from "../models";


export default {
    data() {
        return {
            userId: null,
            loading: false
        }
    },
    computed: {
        userWithRole() {
            return User.query().with('role').where('id', this.userId).first()  //vuex orm 
        }
    },

    async mounted() {
        let res;

        this.loading = true;

        try {
            res = await User.api().fetchUser();
        } catch (error) {
            console.error(error);

            alert("some thing went wrong!!!");
        } finally {
            this.loading = false;
        }

        if (res) {
            let { id: userId = null } = res.response.data;

            if (userId != null) {
                this.userId = userId;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.card__title-location {

    .card-title {
        font-weight: bold;
    }
}
</style>