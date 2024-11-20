<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height: 100vh;"
  >
    <v-sheet
      elevation="3"
      class="pa-5 text-center"
      rounded
      max-width="400px"
    >
      <h3 class="mb-5">Sample Login</h3>
      <v-btn
        color="red darken-1"
        dark
        block
        @click="loginWithGoogle"
      >
        Login with Google
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'login',
  auth: 'guest',
  methods: {
    loginWithGoogle() {
      // Trigger Nuxt Auth Google login
      this.$auth.loginWith('google');
    },
  },
};
</script>

<style scoped>
/* Add any custom styling here, if needed */
</style>
