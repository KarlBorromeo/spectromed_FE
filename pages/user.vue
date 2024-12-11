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
          label="Firstname"
          readonly
          v-model="firstname"
        />
        <v-textarea
          rows="1"
          auto-grow
          label="Lastname"
          readonly
          v-model="lastname"
        />
        <v-textarea
          rows="1"
          auto-grow
          label="Email"
          readonly
          v-model="email"
        />
        <div class="d-flex flex-wrap justify-start align-end">
          <v-img
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="150"
            max-width="250"
            :src="signatureURL"
            v-if="signatureURL" 
            class="mr-2"
          />
          <v-btn x-small class="elevation-1" @click.stop="dialog = true">{{buttonSignatureText}}</v-btn>
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Upload
              </v-card-title>

              <v-card-text>
                <p class="mt-2">
                  The uploaded signature will be used for the entire documents generated. You can't proceed for document generation if no uploaded signature.
                </p>
                <v-divider />
                <v-file-input
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Choose a signature"
                  prepend-icon="mdi-camera"
                  label="Signature"
                />
              </v-card-text>
              
              <v-card-actions>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <!-- <v-file-input
          v-else
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Upload Signature"
          prepend-icon="mdi-camera"
          label="Upload Signature"
          v-model="signature"
        /> -->
      </v-col>
      <v-col cols="0" md="3" class="d-none d-md-block">
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="success darken-1">Edit</v-btn>
        <v-btn color="primary lighten-1" class="ml-2">Save</v-btn>
      </v-col>
    </v-row>
    <Snackbar ref="snackbar" :text="snackbarMsg" :color="snackbarColor"/>
    
  </v-container>
</template>

<script>
export default {
    name: 'User',
    data(){
      return{
        id: '',
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        signature: null,
        signatureURL: null,

        snackbarMsg: '',
        snackbarColor: null,
        dialog: false,

      }
    },
    computed:{
      buttonSignatureText(){
        if(this.signatureURL){
          return 'Change Signature';
        }else{
          return 'Upload Signature'
        }
      }
    },
    methods: {
      async fetchUserMe(){
        try{
          const response = await this.$store.dispatch('user/fetchUserMe');
          this.id = response.id;
          this.username = response.username;
          this.email = response.email;
          this.firstname = response.fullname;
          this.lastname = response.fullname
          if(response.signature){
            this.signatureURL = process.env.API_URL_ASSET + response.signature.url
          }
        }catch(error){
          this.snackbarMsg = error;
          this.snackbarColor = 'red';
          this.$refs.snackbar.snackbar = true;
        }
      },
      async updateUserMe(){
        
      }
    },
    async beforeMount(){
      await this.fetchUserMe()
    }
}
</script>

<style>

</style>