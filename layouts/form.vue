<template>
  <v-app>
      <v-main style="border: 3px solid blue" class="ma-0 pa-0">
        <Nuxt />
      </v-main>  
  </v-app>

  </template>
  
  <script>
  export default {
      name: 'serviceReport',
      beforeMount() {
          if (!this.$auth.user) {
          this.$router.push('/login')
          }
      },
  }
  </script>
  
  <style scoped>
  </style>