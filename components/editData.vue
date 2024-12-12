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
                <h4 v-else class="white--text">
                    Edit Data
                </h4>
                <v-spacer />
                <v-btn :loading="isLoading" :disabled="isLoading" color="white" icon @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" lazy-validation>
                    <v-row class="mt-2">
                        <v-col cols="12" md="6">
                            <v-text-field
                            v-model="formData.firstName"
                            hide-details
                            outlined
                            label="First Name"
                            dense
                            :rules="fieldRequired"/>
                        </v-col>
                         <v-col cols="12" md="6">
                            <v-text-field
                            v-model="formData.lastName"
                            hide-details
                            outlined
                            label="Last Name"
                            dense
                            :rules="fieldRequired"/>
                        </v-col>
                         <v-col cols="12" md="6">
                            <v-text-field
                            v-model="formData.employeeId"
                            hide-details
                            outlined
                            label="Employee ID"
                            dense
                            :rules="fieldRequired"/>
                        </v-col>
                        <v-col cols="12" md="6" class="text-center">
                            <v-sheet v-if="formData.signature === null" class="ma-0 pa-0">
                                <!------------------------------ ONLINE UPLOAD -------------------->
                                <v-progress-circular
                                    v-if="isLoading"
                                    indeterminate
                                    color="primary" />

                                <label
                                    v-else
                                    for="file-upload"
                                    class="custom-file-upload mx-2 mb-4">
                                    <v-icon>mdi-upload</v-icon> Upload Signature
                                </label>
                                
                                <input
                                    id="file-upload"
                                    accept="image/jpeg,image/png,image/webp"
                                    type="file"
                                    ref="fileInput"
                                    :disabled="isLoading"
                                    @change="onUploadFiles" />
                                <!------------------------------------------------------------------>
                            </v-sheet>
                            <!-- DISPLAY OF IMAGE AND REMOVE BUTTON -->
                            <v-sheet v-else class="ma-0 pa-0">
                                <!-- Display -->
                                <v-row class="ma-2">
                                    <v-col cols="12" class="text-center ma-0 pa-0">
                                        <v-sheet outlined class="ma-0 pa-0">
                                        <img
                                            height="150px"
                                            :src="`${
                                                formData.signature 
                                                    ? $axios.defaults.baseURL + formData.signature.url
                                                    : null
                                            }`"
                                        />
                                        </v-sheet>
                                        <span v-if="!fetchUserData.signature" style="color:red" class="ma-0 pa-0">Submit first to save this image</span>
                                    </v-col>
                                    <!-- Remove Button -->
                                    <v-col col="12" class="text-center ma-0 pa-0">
                                        <v-btn
                                        class="mt-5"
                                        :loading="isLoading"
                                        :disabled="isLoading"
                                        depressed
                                        color="error"
                                        @click="imageDelete">
                                            Remove
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-divider />
            <v-card-actions>
                <v-spacer />
                <v-btn :disabled="isLoading" class="error" @click="close">
                    Cancel
                </v-btn>
                <v-btn :disabled="isLoading" class="primary" @click="onSubmit()">
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'EditData',
    props:{
        open: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        isLoading: false,
        fieldRequired: [v => !!v || 'Field is required'],
        formData: {
            firstName: null,
            lastName: null,
            employeeId: null,
            signature: null,
        },
    }),

    watch: {
        open(value){
            if(value){
                this.formData = {
                    firstName: this.fetchUserData.firstName,
                    lastName: this.fetchUserData.lastName,
                    employeeId: this.fetchUserData.employeeId,
                    signature: this.fetchUserData.signature || this.fetchOfflineImage
                }

                // console.log(this.$axios.defaults.baseURL);
            }
        }
    },

    computed: {
        ...mapGetters('user', ['fetchUserData','fetchOfflineImage']),
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
        ...mapActions('user', ['saveImage','resetImage','updateUser']),

        close(){
            this.formData = {
                firstName: null,
                lastName: null,
                employeeId: null,
                signature: null,
            },

            this.$refs.form.resetValidation()

            this.$emit('close')
        },

        async onUploadFiles(e){
            if(this.isLoading){
                return
            }

            const imageFile = e.target.files[0]


            // Checks if the image uploaded is really an image
            if(imageFile.type.split('/')[0] !== 'image'){
                // PUT THE SNACKBAR ERROR HERE
                console.error('Image only (.png, .jpeg, .webp)')
                return
            }

            // Can add an image file size limit if needed


            // Sending Data
            try {
                this.isLoading = true
                const imageForm = new FormData()

                imageForm.append('files', imageFile, imageFile.name)

                const { data } = await this.$axios.post('/api/upload', imageForm)

                if(data){
                    // Save the data to the vuex 
                    this.saveImage(data[0])
                    this.formData.signature = data[0]
                }
            } catch (error) {
                
            } finally {
                this.isLoading = false
                this.$refs.fileInput.value = null;
            }

        },

        async imageDelete() {
            if (this.isLoading) {
                return
            }
            try {
                this.isLoading = true
                    await this.$axios.delete(
                    'api/upload/files/' + this.formData.signature.id,
                    )
            } catch (error) {
                // SNACK BAR ERROR HERE
                console.error(error)
            } finally {
                this.isLoading = false
                this.formData.signature = null
                this.resetImage()
            }
        },

        async onSubmit(){
            if(this.isLoading){
                return
            }

            if(this.formData.signature === null){
                // Snack Bar HERE
                console.error('Signature Field is required')

                return
            }

            if(this.$refs.form.validate()){
                try {
                    this.isLoading = true

                    const { data } = await this.$axios.put(`/api/users/${this.fetchUserData.id}`,
                        this.formData
                    )

                    if(data){
                        // Snackbar HERE
                        console.log('Successfully updated data');
                        this.updateUser(this.formData)
                        this.close()
                    }
                } catch (error) {
                    // SNACK BAR ERROR HERE
                    console.error(error)
                } finally {
                    this.isLoading = false
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    input[type='file'] {
        display: none;
    }
    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }
    .custom-offline-upload {
        border: 1px solid grey;
        color: grey;
        display: inline-block;
        padding: 6px 12px;
        cursor: not-allowed;
    }
</style>