<template>
    <div class="d-flex justify-start py-2">
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="pink"
            dark
            v-bind="attrs"
            v-on="on"
            class="rounded-xxl"
            small
          >
            Generate Report
            <v-icon small id="cog" class="ml-2">mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            class="rounded-xxl"
            :to="item.path?item.path:''"
            router
            exact
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: 'Service Report',
        path: '/serviceReport'
      }
    ],
  }),
}
</script>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
#cog{
  animation: rotate 2s linear infinite;
}
</style>