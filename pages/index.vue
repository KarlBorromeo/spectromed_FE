<template>
  <v-sheet>Test</v-sheet>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware({ redirect }) {
    return redirect('/user')
  },
}
</script>
