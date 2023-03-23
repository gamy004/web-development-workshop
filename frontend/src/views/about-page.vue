<template>
    <div>
        <b-button title="Home" :to="{ name: 'home' }"><font-awesome-icon :icon="['fas', 'home']" />Home</b-button>
        <b-card title="User Infomation" class="info-card__title-location" v-if="userId != null">
            <b-card-text>Email: {{ user.email }}</b-card-text>
            <b-card-text>Username: {{ user.username }}</b-card-text>
            <b-card-text>Role: {{ role.name }}</b-card-text>
        </b-card>

    </div>
</template>

<script>
import { User } from "../models";
import Role from "@/models/Role"

export default {
    data() {
        return {
            userId: null,
        }
    },
    computed: {
        user() {
            return User.find(this.userId)
        },
        role() {
            return Role.find(this.user.role_id)
        }
    },

    async mounted() {
        let res = await User.api().fetchUser()

        let user = res.response.data;

        if (user != null) {
            this.userId = user.id
        }
        return user
    },
}
</script>

<style lang="scss" scoped>
.info-card__title-location {
    margin: 10px 0;

    .card-title {
        font-weight: bold;
    }
}
</style>