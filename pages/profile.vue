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
                         <v-sheet v-if="userData.signature" class="ma-0 pa-0" color="transparent" outlined>
                            <span>Signature: </span>
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
                            class="primary" 
                            :disabled="isLoading" 
                            :loading="isLoading"
                            @click="toggleEditData">
                            Edit Data
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
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