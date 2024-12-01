<template>
    <div class="ma-0 pa-0 fill-height d-block" style="background-color: transparent;" outlined>
        <p v-if="fetching">Lodingggg</p>
        <div v-else>
            <p class="subtitle-1">Report history</p>
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
    }
}
</script>