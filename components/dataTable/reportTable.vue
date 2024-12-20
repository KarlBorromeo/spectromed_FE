<template>
  <v-card class="mt-2">
    <v-card-text>
      <!-- SEARCH AND REFRESH BUTTON -->
      <v-sheet class="mb-2 d-flex flex-wrap align-center justify-center">
          <!-- Search Field -->
          <v-text-field
          v-model="search"
          label="Search"
          outlined
          dense
          clearable
          :disabled="isLoading"
          hide-details
          class="flex-grow-1 mt-1"
          prepend-inner-icon="mdi-magnify"
          @keydown.enter="fetchList" />
          <!-- REFRESH Button -->
          <v-btn
          color="primary"
          outlined
          height="40"
          class="ml-2 mt-1"
          @click="fetchList">
              <v-icon>
                  mdi-refresh
              </v-icon>
          </v-btn>
      </v-sheet>
      <v-divider />
      <!-- DATA TABLE -->
      <v-data-table
      :headers="headers"
      :loading="isLoading"
      :items="files"
      hide-default-footer
      disable-sort
      disable-pagination
      >
        <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex justify-center text-capitalize" style="gap: 10px;">
                <v-btn class="text-lowercase caption elevation-0 rounded-xxl" @click="sampleView(item)">
                    view
                    <v-icon small class="black--text">
                        mdi-eye
                    </v-icon>          
                </v-btn>
                <v-btn class="text-lowercase caption elevation-0 rounded-xxl" @click="onDownload(item)">
                    download pdf
                    <v-icon small class="black--text">
                        mdi-download
                    </v-icon>          
                </v-btn>
                <v-btn class="text-lowercase caption elevation-0 rounded-xxl" @click="openUpdateForm(item)">
                    udpate
                    <v-icon small class="blue--text">
                        mdi-text-box-edit
                    </v-icon>           
                </v-btn>
                <v-btn class="text-lowercase caption elevation-0 rounded-xxl" @click="toggleShare(item)">
                    share
                    <v-icon small class="red--text"> 
                        mdi-share
                    </v-icon>
                </v-btn>
                <v-btn class="text-lowercase caption elevation-0 rounded-xxl" @click="onToggleDelete(item)">
                    delete
                    <v-icon small class="red--text"> 
                        mdi-delete 
                    </v-icon>
                </v-btn>
            </div>
        </template>
      </v-data-table>
      <v-divider />
      <!-- Pagination -->
      <v-sheet class="d-flex flex-wrap align-center pt-3 pl-sm-4 grey--text">
          <v-sheet class="flex-grow-1">
              Total: {{ totalRecords.toLocaleString() }}
          </v-sheet>
          <v-sheet class="d-flex align-center" width="80" style="margin-right: 16px;">
              <v-select
                  v-model="pagination.limit"
                  color="primary"
                  outlined
                  :disabled="isLoading"
                  dense
                  hide-details
                  :items="[10, 15, 20]"/>
          </v-sheet>
          <v-sheet class="d-none d-sm-flex align-center">
              <v-pagination
                  v-model="pagination.page"
                  :disabled="isLoading"
                  :length="pageTotal"
                  :total-visible="isMobile ? 4 : 6"/>
          </v-sheet>
          <v-sheet class="w-100 d-flex justify-center d-sm-none mt-2">
              <v-pagination
                  v-model="pagination.page"
                  :disabled="isLoading"
                  :length="pageTotal"
                  :total-visible="isMobile ? 4 : 6"/>
          </v-sheet>
      </v-sheet>
    </v-card-text>
    
    <NativePdfViewer
      title="Service Report"
      :open="showPDFViewer"
      :pdf="pdf"
      :loading="isLoading"
      @toggle="onTogglePdfViewer" 
    />

    <YesNoDialog
      title="Confirm"
      :width="420"
      :open="isDeleteOpen"
      :loading="isLoading"
      @yes="deleteForm"
      @no="onToggleDelete(null)">
      <template #default>
          <v-alert class="mb-0" outlined type="error">
          Do you want to delete Filename: <b>{{holdSelectedData ? holdSelectedData.filename : ''}}</b>?
          </v-alert>
      </template>
    </YesNoDialog>

    <ReportTableFormsSharePdf
      :open="showShareModal"
      :values="holdSelectedData"
      @close="toggleShare(null)"/>
  </v-card>
</template>

<script>
import globalMixin from '@/mixins/global';
  export default {
    mixins: [globalMixin],
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'File Name',
            align: 'center', 
            value: 'filename',
          },
          { 
            text: 'Actions', 
            align: 'center', 
            value: 'actions',
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
        },
        totalRecords: 0,
        files: [],
        isLoading: false,
        showPDFViewer: false,
        pdf: null,
        holdSelectedData: null,
        isDeleteOpen:false,
        showShareModal: false,
      }
    },

    computed: {
      pageTotal() {
        return Math.ceil(this.totalRecords / this.pagination.limit);
      },
    },

    watch:{
        pagination: {
            handler() {
                this.fetchList();
            },
            deep: true,
        },
    },

    methods: {
      async fetchList(){
        if(this.isLoading){
          return
        }

        try {
          this.isLoading = true
          const search = this.search || '';
          const limit = this.pagination.limit;
          const offset =
            this.pagination.page === 1
              ? 0
              : this.pagination.limit * this.pagination.page -
                this.pagination.limit;
          
          const { data } = await this.$axios.get(`/api/forms-list/user/forms/${this.$auth.user.id}?search=${search}&limit=${limit}&offset=${offset}`)
          console.log(data)
          this.files = data?.data || []
          this.totalRecords = data?.total || 0
        } catch (error) {
          
        } finally {
          this.isLoading = false
        }
      },
      async sampleView(item){
        if(this.isLoading){
          return
        }

        try {
            this.isLoading = true
            this.pdf = '';
            this.onTogglePdfViewer();
            const {data} = await this.$axios.get(`/api/forms-list/${item.category}/${item.id}`)
            this.pdf = data;
            // console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = false
        }
      },
      async onDownload(item){
        if(this.isLoading){
          return
        }

        try {
            this.isLoading = true
            
            const {data} = await this.$axios.get(`/api/forms-list/${item.category}/${item.id}`)
            const downloadLink = document.createElement('a');
            // Todo after data
            // this.pdf = data;
            downloadLink.href = data;
            downloadLink.download = `${item.filename}`
            downloadLink.click()
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = false
        }
      },
      async deleteForm(){
        if(this.isLoading){
          return
        }

        try {
          this.isLoading = true
          const { data } = await this.$axios.delete(`/api/forms-lists/${this.holdSelectedData.id}`)

          if(data){
            // SNACK BAR HERE
            console.log('Deleted Successfully')
            this.onToggleDelete(null)
          }
          
        } catch (error) {
          // SNACK BAR HERE
          console.log(error)
        } finally {
          this.isLoading = false
          this.fetchList()
        }
      },
      async openUpdateForm(item){
        // save session data
        sessionStorage.setItem('formData', JSON.stringify(item.formData));
        sessionStorage.setItem('id', JSON.stringify(item.id));
        // route to service report page
        this.$router.push({
          name: 'serviceReport'
        });
      },

      onToggleDelete(item){
        this.holdSelectedData = item
        this.isDeleteOpen = !this.isDeleteOpen
      },

      onTogglePdfViewer() {
        this.showPDFViewer = !this.showPDFViewer;
      },

      toggleShare(item){
        this.holdSelectedData = item
        this.showShareModal = !this.showShareModal
      },
    },
    async beforeMount(){
      await this.fetchList()
    }
  }
</script>