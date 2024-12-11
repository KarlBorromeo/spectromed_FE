<template>
    <div class="text-center ma-2">
      <!-- <v-btn
        color="primary"
        @click="snackbar = true"
      >
        Open Snackbar
      </v-btn> -->
      <v-snackbar
        v-model="snackbar"
        :color="color?color:'primary darken-1'"
        dark
      >
        {{ text }}
  
        <template v-slot:action="{ attrs }">
          <v-btn
            color="black"
            text
            class="caption"
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>

<script>
export default {
    props: ['text','color'],
    data: () => ({
        snackbar: false,
    }),
}
</script>