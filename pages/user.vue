<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-card class="ma-5" outlined>
                <v-card-title class="align-center">
                    Dashboard
                </v-card-title>
            </v-card>
            <v-divider />
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        First Name: {{userData ? userData.firstName : ''}}
                    </v-col>
                    <v-col cols="12" md="6">
                        Last Name: {{userData ? userData.lastName : ''}}
                    </v-col>
                    <v-col cols="12" md="6">
                        Employee ID: {{userData ? userData.employeeId : ''}}
                    </v-col>
                    <v-col cols="12" md="6">
                        Email: {{userData ? userData.email : ''}}
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-progress-circular
                            v-if="isLoading"
                            indeterminate
                            color="primary" />
                        <v-sheet v-else class="ma-0 pa-0" color="transparent">
                            <span>Signature: </span>
                         <v-sheet v-if="(userData ? userData.signature : false)" class="ma-0 pa-0 overflow-auto" color="transparent" outlined>
                            
                            <img
                                height="150px"
                                :src="`${
                                    userData.signature 
                                        ? $axios.defaults.baseURL + userData.signature.url
                                        : null
                                }`"
                            />
                         </v-sheet>
                         <v-sheet v-else class="ma-0 pa-0" color="transparent">
                            Signature : None
                         </v-sheet> 
                        </v-sheet>
                    </v-col>
                    <v-col cols="12" class="text-right">
                        <v-btn 
                            class="primary text-capitalize" 
                            :disabled="isLoading" 
                            :loading="isLoading"
                            @click="toggleEditData"
                            small
                            :x-small="$vuetify.breakpoint.width < 600"
                            >
                            Edit Data
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-col>

        <EditData
        :open="isEditDataOpen"
        @close="toggleEditData"/>
        <Snackbar ref="snackbar" :text="snackbarText" :color="snackbarColor"/>
    </v-row>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'Profile',
    data: () => ({
        snackbarText: '',
        snackbarColor: '',
        isLoading: false,
        isEditDataOpen: false,
    }),

    mounted() {
        // console.log('HERE IN PROFILE');
        this.fetctUserData()
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

        async fetctUserData(){
            try {
                this.isLoading = true

                const { data } = await this.$axios.get('/api/users/me?populate=*')

                if(data){
                    this.copyUser(data)
                }
            } catch (error) {
                this.snackbarText = 'Something went wrong'
                this.snackbarColor = 'red'
                this.$refs.snackbar.snackbar = true;
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>