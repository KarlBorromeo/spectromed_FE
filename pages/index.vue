<template>
  <v-sheet>Test</v-sheet>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware({ redirect }) {
    return redirect('/serviceReport')
  },
}
</script>
