<template>
    <div class="ma-0 pa-0 fill-height d-block" style="background-color: transparent;" outlined>
        <p v-if="fetching">Lodingggg</p>
        <div v-else>
            <p class="subtitle-1">Report history</p>
            <!-- TODO -->
            <v-btn outlined @click="sample">
                Sample
            </v-btn>
            <v-divider />
            <form-dropdown />
            <reports />
        </div>
    </div>
</template>
<script>
import Reports from '~/components/dataTable/reports.vue'
import formDropdown from '~/components/dropdown/formDropdown.vue'
export default {
  components: { formDropdown, Reports },
    name: 'Forms',
    data(){
        return{
            fetching: true,
        }
    },
    async mounted(){
        await new Promise(resolve => setTimeout(resolve,2000))
        this.fetching = false
    },
    methods: {
        // Todo
        async sample(){
            if(this.fetching){
                return   
            }
                const {data} = await this.$axios.get(`/forms-list/service-report/1`)

                console.log(data);
            try {
                this.fetching = true
            } catch (error) {
                console.log(error);
            } finally {
                this.fetching = false
            }
        },
    },
}
</script>