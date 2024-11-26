<template>
  <v-app>
    <v-container fluid class="fill-height ma-0 pa-0" id="authLayout">
      <v-main>
        <Nuxt />
      </v-main>
    </v-container>
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

<style scoped>
#authLayout{
  background: rgb(151,71,255);
  background: linear-gradient(90deg, rgba(151,71,255,1) 35%, rgba(163,95,253,1) 100%);
}
</style>