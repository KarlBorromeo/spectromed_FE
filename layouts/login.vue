<template>
  <v-app>
    <!-- <v-container fluid class="mt-16 mx-0 col-12 px-0" style=""> -->
    <v-container fluid class="fill-height ma-0 pa-0">
      <v-main>
        <Nuxt />
      </v-main>
    </v-container>
    <v-footer app color="primary darken-2" class="white--text">
      <span>&copy; {{ new Date().getFullYear() }} - SpectroMed</span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
export default {
    name: 'LoginLayout',
    beforeMount() {
        if (this.$auth.user) {
        this.$router.push('/')
        }
    },
}
</script>