<template>
    <div class="ma-0 pa-0 pt-5 fill-height d-block" style="background-color: transparent;" outlined>
        <div class="pa-3">
            <h3 class="title">Report History</h3>
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