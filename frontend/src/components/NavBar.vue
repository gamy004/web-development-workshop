<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand :to="{ name: 'home' }">Learn4Life Workshop</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          :to="{ name: 'home' }"
          :active="$_routerMixin_isPage('home')"
          >Home</b-nav-item
        >
      </b-navbar-nav>

      <!-- For putting link to about page -->

      <b-navbar-nav class="ml-auto">
        <!-- For putting go to log in page link -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { routerMixin } from "../mixins/routerMixin";

export default {
  mixins: [routerMixin],
};
</script>
