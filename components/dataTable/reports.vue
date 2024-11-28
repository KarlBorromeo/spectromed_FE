<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="filtered(search)"
    >
      <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex justify-center text-capitalize" style="gap: 10px;">
              <v-btn class="text-lowercase elevation-0 rounded-xxl">
                  view
                  <v-icon small class="black--text">
                      mdi-eye
                  </v-icon>          
              </v-btn>
              <v-btn class="text-lowercase elevation-0 rounded-xxl">
                  download pdf
                  <v-icon small class="black--text">
                      mdi-download
                  </v-icon>          
              </v-btn>
              <v-btn class="text-lowercase elevation-0 rounded-xxl">
                  udpate
                  <v-icon small class="blue--text">
                      mdi-text-box-edit
                  </v-icon>           
              </v-btn>
              <v-btn class="text-lowercase elevation-0 rounded-xxl">
                  share
                  <v-icon small class="red--text"> 
                      mdi-share
                  </v-icon>
              </v-btn>
              <v-btn class="text-lowercase elevation-0 rounded-xxl">
                  delete
                  <v-icon small class="red--text"> 
                      mdi-delete 
                  </v-icon>
              </v-btn>
          </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'File Name',
            align: 'start',
            filterable: false,
            value: 'name',
          },
          { 
            text: 'Actions', 
            align: 'center', 
            value: 'actions',
        }
        ],
        files: [
          {
            name: 'system_type} ${serial_no} ${customer_name} ${MMDDYY}',
          },
          {
            name: 'ksystem_type} ${serial_no} ${customer_name} ${MMDDYY}',
          },
          {
            name: 'okay ${serial_no} ${customer_name} ${MMDDYY}',
          },
          {
            name: '- ${system_type} ${serial_no} borromeo ${MMDDYY}',
          },
          {
            name: '- ${system_type} ${serial_no} ${customer_name} ${MMDDYY}',
          },
          {
            name: '- ${system_type} ${serial_no} ${customer_name} ${MMDDYY}',
          },
          {
            name: '- ${system_type} ${serial_no} ${customer_name} ${MMDDYY}',
          },
          {
            name: '- ${system_type} ${serial_no} ${customer_name} ${MMDDYY}',
          },
        ],
      }
    },
    methods: {
      filtered(searchVal){
        if(!searchVal){
          return this.files
        }
        const filteredList = this.files.filter((item) => {
          if(item.name.toLowerCase().startsWith(searchVal.toLowerCase())){
            return item
          }
        });
        return filteredList
      }
    },
  }
</script>