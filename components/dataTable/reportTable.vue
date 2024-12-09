<template>
  <v-card class="mt-2">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        :loading="isLoading"
        color="primary darken-2"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="filtered(search)"
    >
      <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex justify-center text-capitalize" style="gap: 10px;">
              <v-btn class="text-lowercase caption elevation-0 rounded-xxl" @click="sampleView(item.name)">
                  view
                  <v-icon small class="black--text">
                      mdi-eye
                  </v-icon>          
              </v-btn>
              <v-btn class="text-lowercase caption elevation-0 rounded-xxl">
                  download pdf
                  <v-icon small class="black--text">
                      mdi-download
                  </v-icon>          
              </v-btn>
              <v-btn class="text-lowercase caption elevation-0 rounded-xxl">
                  udpate
                  <v-icon small class="blue--text">
                      mdi-text-box-edit
                  </v-icon>           
              </v-btn>
              <v-btn class="text-lowercase caption elevation-0 rounded-xxl">
                  share
                  <v-icon small class="red--text"> 
                      mdi-share
                  </v-icon>
              </v-btn>
              <v-btn class="text-lowercase caption elevation-0 rounded-xxl">
                  delete
                  <v-icon small class="red--text"> 
                      mdi-delete 
                  </v-icon>
              </v-btn>
          </div>
      </template>
    </v-data-table>
    <NativePdfViewer
      title="Service Report"
      :open="showPDFViewer"
      :pdf="pdf"
      :loading="fetching"
      @toggle="onTogglePdfViewer" 
    />
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
        files: [],
        aw: [
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
        isLoading: false,
        fetching: false,
        showPDFViewer: false,
        pdf: null,
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
      },
      async fetchList(){
        this.isLoading = true;
        try{
          await new Promise(resolve => setTimeout(resolve,2000))
          this.files = this.aw;
        }catch(err){

        }
        this.isLoading = false;
      },
      async sampleView(fileName){
        try {
            this.fetching = true
            this.pdf = '';
            this.onTogglePdfViewer();
            await new Promise(resolve => setTimeout(resolve,4000))
            const {data} = await this.$axios.get(`/forms-list/service-report/1`)
            this.pdf = data;
            // console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            this.fetching = false
        }
      },
      onTogglePdfViewer() {
        this.showPDFViewer = !this.showPDFViewer;
      },
    },
    async beforeMount(){
      await this.fetchList()
    }
  }
</script>