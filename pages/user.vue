<template>
  <v-container>
    <p class="title">User module here</p>
    <v-divider />
    <v-row justify="center" class="mt-5">
      <v-col cols="0" md="3" class="d-none d-md-block">
      </v-col>
      <v-col cols="10" md="6">
        <v-textarea
          rows="1"
          auto-grow
          label="Username"
          readonly
          v-model="username"
        />
        <v-textarea
          rows="1"
          auto-grow
          label="Fullname"
          readonly
          v-model="fullname"
        />
        <v-textarea
          rows="1"
          auto-grow
          label="Email"
          readonly
          v-model="email"
        />
        <v-card height="150">
        </v-card>
      </v-col>
      <v-col cols="0" md="3" class="d-none d-md-block">
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="success darken-1">Edit</v-btn>
        <v-btn color="primary lighten-1" class="ml-2">Save</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'User',
    data(){
      return{
        username: 'username',
        fullname: 'fullname',
        email: 'email@gmailcom'
      }
    }
}
</script>

<style>

</style>