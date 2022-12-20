export const routerMixin = {
  methods: {
    $_routerMixin_isPage(name) {
      return this.$route.name === name;
    },
  },
};
