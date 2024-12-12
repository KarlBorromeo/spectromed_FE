<template>
  <v-row no-gutters>
      <v-col cols="12">
          <v-container class="mt-2">
            <h3 class="title">My Profile</h3>
            <v-divider />
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <strong class="subtitle-2">First Name:</strong> 
                        {{userData ? userData.firstName : ''}}
                    </v-col>
                    <v-col cols="12" md="6">
                        <strong class="subtitle-2">Last Name:</strong>
                        {{userData ? userData.lastName : ''}}
                    </v-col>
                    <v-col cols="12" md="6">
                        <strong class="subtitle-2">Employee ID:</strong>
                        {{userData ? userData.employeeId : ''}}
                    </v-col>
                    <v-col cols="12" md="6">
                        <strong class="subtitle-2">Email:</strong>
                         {{userData ? userData.email : ''}}
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-progress-circular
                            v-if="isLoading"
                            indeterminate
                            color="primary" />
                        <v-sheet v-else class="ma-0 pa-0" color="transparent">
                        <v-sheet v-if="userData.signature" class="ma-0 pa-0" color="transparent" outlined>
                            <v-card class="d-flex flex-wrap justify-start align-start elevation-0" color="transparent">
                              <strong class="subtitle-2 mr-3">Signature:</strong>
                              <v-img
                                lazy-src="https://picsum.photos/id/11/10/6"
                                max-height="200"
                                max-width="300"
                                :src="`${
                                    userData.signature 
                                        ? $axios.defaults.baseURL + userData.signature.url
                                        : null
                                }`"
                              ></v-img>            
                            </v-card>
       
                        </v-sheet>
                        <v-sheet v-else class="ma-0 pa-0" color="transparent">
                            Signature : None
                        </v-sheet> 
                        </v-sheet>
                    </v-col>
                    <v-col cols="12" class="text-right">
                        <v-btn 
                            class="primary lighten-1" 
                            :disabled="isLoading" 
                            :loading="isLoading"
                            @click="toggleEditData"
                            small
                            >
                            Edit
                            <v-icon small >mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>           
          </v-container>
          
      </v-col>

      <EditData
      :open="isEditDataOpen"
      @close="toggleEditData"/>
  </v-row>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Profile',
  data: () => ({
      isLoading: false,
      isEditDataOpen: false,
  }),

  created() {
      this.copyUser(this.$auth.user)
  },
  
  computed:{
      ...mapState('user', ['userData']),
      // ...mapGetters('user', ['fetchUserData']),
  },

  methods:{
      ...mapActions('user', ['copyUser',]),

      toggleEditData(){
          this.isEditDataOpen = !this.isEditDataOpen
      },
  }
}
</script>