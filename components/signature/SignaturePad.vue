<template>
    <section>
      <v-btn
        @click.stop="dialog = true"
        small
        class="text-decoration-underline"
      >
        Enter a Signature
      </v-btn>
      <v-dialog
        v-model="dialog"
        max-width="450"
      >
        <v-card>
          <v-card-title class="text-h5">
            Customer Name & Signature
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              class=""
              type="text"
              label="Customer Name"
            />
            <v-card class="mx-4 elevation-2">
                <Signature ref="signature" :value="[]" :width="400" :height="200" instructions="Sign here.."/> 
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="cancel"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="emitSave"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </section>
  </template>
  <script>
  // refer to this documentation: https://lemonadejs.com/docs/plugins/signature
  import Signature from '@lemonadejs/signature/dist/vue';
  export default {
    components: { Signature },
    data () {
      return {
        dialog: false,
        name: null,
      }
    },
    methods: {
        emitSave(){
            let obj = {
                signature: this.$refs.signature.current.getImage(),
                name: this.name
            }
            if(!this.name){
                alert('name must not be null')
                return;
            }
            this.$emit('save',obj)
            this.dialog = false
            this.name = null;
        },
        cancel(){
            this.dialog = false;
            this.name = null;
        }
    }
  }
</script>