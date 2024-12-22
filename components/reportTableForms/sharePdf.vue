<template>
    <v-dialog
    v-model="dialog"
    persistent
    scrollable
    max-width="60%"
    :fullscreen="$vuetify.breakpoint.width < 600 ">
        <v-card>
            <v-card-title class="primary">
                <h4 v-if="isLoading" class="white--text">
                    Please wait...
                </h4>
                <h4 v-else class="white--text title my-0 py-0">
                    Share PDF
                </h4>
                <v-spacer />
                <v-btn :loading="isLoading" :disabled="isLoading" color="white" icon @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" lazy-validation>
                    <v-row class="mt-2">
                        <v-col cols="12" class="py-0">
                            <v-text-field
                            v-model="formData.recepient"
                            outlined
                            dense
                            label="To: "
                            class="py-0"
                            :rules="emailRule"/>
                        </v-col>
                        <v-col cols="12" class="py-0">
                            <v-textarea
                            v-model="formData.message"
                            outlined
                            dense
                            class="py-0"
                            rows="4"
                            :auto-grow="false"
                            no-resize
                            hide-details
                            :disabled="isLoading"
                            label="Message"/>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn :disabled="isLoading" class="error" @click="close" small>
                    Cancel
                </v-btn>
                <v-btn :disabled="isLoading" :loading="isLoading" class="primary" @click="onSubmit()" small>
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   name: 'ReportTableFormsSharePdf',
   props: {
    open: {
        type: Boolean,
        default: false,
    },
    values: {
        type: Object,
        default: () => ({})
    }
   },

   data: () => ({
        isLoading: false,
        fieldRequired: [v => !!v || 'Field is required'],
        emailRule: [
            v => !!v || 'Field is required', 
            v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || 'Enter a valid email address.',
        ],
        formData: {
           recepient: null,
           message: '',
        },
    }),

    watch: {
        open(value){
            if(value){
                if(this.values){
                    this.formData.message = `A PDF attachment was sent to you by ${this.fetchUserData.firstName + ' ' + this.fetchUserData.lastName}`
                }
            }
        }
    },

    computed: {
        ...mapGetters('user', ['fetchUserData']),
        dialog: {
            get() {
                return this.open
            },
            set() {
                this.$emit('close')
            },
        },
    },

    methods: {
        close(){
            this.formData = {
                recepient: null,
                message: '',
            },

            this.$refs.form.resetValidation()

            this.$emit('close')
        },
        
        async onSubmit(){
            if(this.isLoading){
                return
            }

            const finalData = {
                category: this.values.category,
                filename: this.values.filename,
                formData: this.values.formData,
                recepient: this.formData.recepient,
                message: this.formData.message,
            }

            if(this.$refs.form.validate()){
                try {
                    this.isLoading = true

                    const { data } = await this.$axios.post(`/api/forms-list/email/${this.values.id}/${this.values.userId}`,
                        {data: finalData}
                    )

                    if(data){
                        // TODO SNACK BAR TO SAY THAT THE SEND EMAIL IS A SUCCESS
                        this.close()
                    }
                } catch (error) {
                    // TODO SNACK BAR ERROR HERE
                    console.error(error)
                } finally {
                    this.isLoading = false
                }
            }
        },
    },
}
</script>