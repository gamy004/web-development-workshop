<template>
  <b-row id="homePage">
    <b-col cols="12" class="mt-3">
      <h2>Home Page</h2>

      <b-card title="This is static content" class="mt-3">
        <b-card-text>{{ content }}</b-card-text>
      </b-card>

      <b-card title="This is dynamic content" class="mt-3">
        <b-button variant="primary">Load content</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      content: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      `,
    };
  },
};
</script>
