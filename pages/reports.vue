<template>
    <div class="ma-0 pa-0 fill-height d-block" style="background-color: transparent;" outlined>
        <div>
            <p class="subtitle-1">Report history</p>
            <v-divider />
            <form-dropdown />
            <report-table />
        </div>
    </div>
</template>
<script>
import reportTable from '~/components/dataTable/reportTable.vue'
import formDropdown from '~/components/dropdown/formDropdown.vue'
export default {
  components: { formDropdown, reportTable },
    name: 'Forms',
    data(){
        return{
        }
    },
    methods: {
    },
}
</script>