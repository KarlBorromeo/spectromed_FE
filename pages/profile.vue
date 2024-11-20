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
                        Name: {{userName.name}}
                    </v-col>
                    <v-col cols="12" md="6">
                        Email: {{userName.email}}
                    </v-col>
                </v-row>
            </v-card-text>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'Profile',
    computed:{
        userName() {
            return this.$auth ? this.$auth.user : { email: '', name: ''}
        }
    }
}
</script>