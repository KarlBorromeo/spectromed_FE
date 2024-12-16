<template>
  <v-container class="pt-0">
    <div id="formHeader" class="mt-0 d-flex align-center justify-center rounded-b-xl">
      <section class="flex-grow-1 pa-2">
        <p class="text-center title white--text my-0 py-0">Service Report</p>
        <p class="text-start">
          <a href="/reports" class="caption white--text">
            <v-icon class="white--text" small>
              mdi-keyboard-return
            </v-icon>
            Return to Dashboard
          </a>          
        </p>
      </section>
    </div>

    <v-form ref="form">
      <v-container class="ma-4">
        <v-row justify="start" align="start">
          <v-col cols="4" md="2">
            <!-- DATE -->
            <v-text-field
            v-model="formData.date"
              class="marginPaddingY0"
              type="date"
              label="Date"
              filled
              dense
              :disabled="isLoading"
            />
            <!-- SR No. -->
            <v-text-field
              v-model="formData.srNumber"
              class="marginPaddingY0"
              type="text"
              label="S.R No.:"
              :disabled="isLoading"
              filled
              dense
            />
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1 marginPaddingY0">Customer's Information</p>
            <v-divider />
          </v-col>
          <v-col cols="2" class="marginPaddingY0">
            <p class="subtitle-2">Account</p>
          </v-col>
          <v-col cols="8" class="marginPaddingY0">
            <!-- CUSTOMER NAME -->
            <v-text-field
              v-model="formData.customerName"
              filled
              counter
              maxlength="30"
              class="marginPaddingY0"
              type="text"
              label="Customer Name"
              :disabled="isLoading"
            />
            <!-- BUSINESS NAME -->
            <v-text-field
              v-model="formData.businessName"
              filled
              counter
              maxlength="50"
              class="marginPaddingY0"
              type="text"
              label="Business Name"
              :disabled="isLoading"
            />
            <!-- ADDRESS -->
            <v-text-field
              v-model="formData.address"
              counter
              maxlength="100"
              filled
              class="marginPaddingY0"
              type="text"
              label="Address"
              :disabled="isLoading"
            />
            <!-- Mobile Number -->
            <v-text-field
              v-model="formData.mobileNumber"
              counter
              maxlength="10"
              filled
              class="marginPaddingY0"
              type="text"
              hide-spin-buttons
              label="Mobile Number"
              prefix="+63"
              :disabled="isLoading"
            />
            <!-- Telephone Number -->
            <v-text-field
              v-model="formData.telephoneNumber"
              counter
              maxlength="30"
              filled
              class="marginPaddingY0"
              type="text"
              label="Telephone Number"
              :disabled="isLoading"
            />
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1 marginPaddingY0">Technical Information</p>
            <v-divider />
          </v-col>
          <v-col cols="2" class="marginPaddingY0">
            <p class="subtitle-2">Service</p>
          </v-col>
          <v-col cols="8" class="marginPaddingY0">
            <!-- SYSTEM TYPE -->
            <v-text-field
              v-model="formData.systemType"
              counter
              maxlength="100"
              filled
              class="marginPaddingY0"
              type="text"
              label="System Type"
              :disabled="isLoading"
            />
            <!-- SERIAL NUMBER -->
            <v-text-field
              v-model="formData.serialNumber"
              counter
              maxlength="100"
              filled
              class="marginPaddingY0"
              type="text"
              label="Serial Number"
              :disabled="isLoading"
            />
            <!-- SERVICE TYPE -->
            <v-radio-group v-model="formData.serviceType" class="marginPaddingY0" label="Service Type">
              <v-radio
                v-for="(type,i) in serviceTypeItems"
                :key="type"
                :label="type"
                :value="type"
              />
              <v-text-field
                v-model="holdOtherstext"
                v-if="formData.serviceType === 'Others'"
                counter
                maxlength="10"
                filled
                class="marginPaddingY0"
                type="text"
                label="Others"
                :disabled="isLoading"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1 marginPaddingY0">Reasons</p>
            <v-divider />
          </v-col>
          <v-col cols="2" class="marginPaddingY0" />
          <v-col cols="8" class="marginPaddingY0">
            <!-- REASON FOR SERVICE -->
            <v-textarea
              v-model="formData.reason"
              label="Reason for Service"
              counter
              maxlength="180"
              auto-grow
              rows="2"
              filled
              :disabled="isLoading"
            />
            <!-- Service Rendered -->
            <v-textarea
              v-model="formData.serviceRendered"
              counter
              maxlength="900"
              label="Service Rendered"
              auto-grow
              filled
              rows="4"
              :disabled="isLoading"
            />
            <!-- RECOMMENDATIONS -->
            <v-textarea
              v-model="formData.recommendation"
              counter
              maxlength="180"
              label="Recommendation"
              auto-grow
              filled
              rows="2"
              :disabled="isLoading"
            />
            <!-- STATUS CHOICE -->
            <v-radio-group v-model="formData.recommendChoice" class="marginPaddingY0">
              <v-radio
                v-for="(type,i) in statusItems"
                :key="type"
                :label="type"
                :value="type"
              />
              <v-text-field
                v-model="holdRecommendOtherstext"
                v-if="formData.recommendChoice === 'Others'"
                filled
                counter
                maxlength="30"
                class="marginPaddingY0"
                type="text"
                label="Others"
                :disabled="isLoading"
              />
            </v-radio-group>
          </v-col>
          <!-- Parts Replaced Add row -->
          <v-col cols="12" class="marginPaddingY0">
            <section class=" mb-2 d-flex justify-space-between">
              <p class="subtitle-1 marginPaddingY0">Parts Replaced</p>
              <v-btn class="mx-5 elevation-1 btnBG white--text rounded-lg caption" @click="incrementPartReplaced">Add Row
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </section>
            <v-divider />
          </v-col>
          <!-- Parts Replaced Header and Data -->
          <v-col cols="2" class="marginPaddingY0" />
          <v-col cols="12" md="8" class="marginPaddingY0">
            <v-simple-table
              fixed-header
            >
              <template v-slot:default>
                <thead style="background-color: red!important;">
                  <tr>
                    <th class="text-center table-header white--text subtitle-2">
                      Quantity
                    </th>
                    <th class="text-center table-header white--text subtitle-2">
                      Part Item
                    </th>
                    <th class="text-center table-header white--text subtitle-2">
                      P/N & S/N
                    </th>
                    <th class="text-center table-header white--text subtitle-2">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,i) in formData.partsReplaced"
                    :key="i"
                  >
                    <td class="cellBorderBottom py-1" style="border-left: 1px solid #4B6472!important; border-right: 1px solid #4B6472!important">
                      <v-text-field
                        v-model="item.quantity"
                        filled
                        class="marginPaddingY0"
                        type="number"
                        hide-spin-buttons
                        dense
                        :disabled="isLoading"
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-textarea
                        v-model="item.partItem"
                        counter
                        maxlength="20"  
                        auto-grow
                        filled
                        rows="1"
                        dense
                        :disabled="isLoading"
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-textarea
                        v-model="item.pnsn"
                        counter
                        maxlength="25"
                        auto-grow
                        filled
                        rows="1"
                        dense
                        :disabled="isLoading"
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-textarea
                        v-model="item.remarks"
                        counter
                        maxlength="40"
                        auto-grow
                        filled
                        rows="1"
                        dense
                        :disabled="isLoading"
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" />
          <!-- TIME data -->
          <v-col cols="4" md="2">
            <section class="d-flex flex-wrap">
              <!-- TRAVEL TIME -->
              <v-text-field
                v-model="formData.travelTime"
                class="marginPaddingY0 mx-4"
                label="Travel Time"
                type="time"
                :disabled="isLoading"
              />
              <!-- ARRIVAL TIME -->
              <v-text-field
                v-model="formData.arrivalTime"
                class="marginPaddingY0 mx-4"
                label="Arrival Time"
                type="time"
                :disabled="isLoading"
              />
              <!-- DEPARTURE TIME -->
              <v-text-field
                v-model="formData.departureTime"
                class="marginPaddingY0 mx-4"
                label="Departure Time"
                type="time"
                :disabled="isLoading"
              />              
            </section>
          </v-col>
          <v-col cols="12">
             <v-divider />
          </v-col>
        </v-row>    
        <v-row justify="center" class="">
          <v-col cols="12" sm="8" md="6"  lg="5" xl="4" class="marginPaddingY0">
            <p class="subtitle-1 text-center">Working Time</p>
            <section class="d-flex flex-wrap">
              <v-text-field
                v-model="formData.startTime"
                class="marginPaddingY0 mx-4"
                label="Start Time"
                type="time"
                width="200"
                filled
                :disabled="isLoading"
              />              
              <v-text-field
                v-model="formData.endTime"
                class="marginPaddingY0 mx-4"
                label="End Time"
                type="time"
                width="200"
                filled
                :disabled="isLoading"
              /> 
            </section>
            <h3 class="mt-4 text-uppercase text-center">Acknowledgement</h3>
            <p class="text-center caption">We confirm that the above spare parts have been replaced / machine has been repaired to our satisfaction
              Spare parts ordered were received in good physical condition</p>
            <v-text-field
              v-model="formData.ackDate" 
              class=""
              type="date"
              label="Date"
              filled
              :disabled="isLoading"
            />
            <v-card class="elevation-3" height="150">
            </v-card>
            <p class="text-center overline marginPaddingY0">Customer Name & Signature</p>
          </v-col>
          <v-col cols="10" class="mt-4">
            <h2 class="text-center">"Service You Can Trust"</h2>
            <section class="d-flex justify-center">
              <v-btn 
                class="white--text btnBG caption"
                :disabled="isLoading"
                :loading="isLoading" 
                @click="onSubmit">
                Submit
              </v-btn>
            </section>
          </v-col>
        </v-row>    
      </v-container>
    </v-form>    
  </v-container>
</template>

<script>
export default {
    name: 'ServiceReport',
    layout: 'form',

    data(){
      return{
        isLoading: false,
        serviceTypeItems: [
          'Repair',
          'PM(Warrantly)',
          'PM-SC',
          'PM-Charge',
          'Upgrade',
          'Installation',
          'Others'
        ],
        statusItems: [
          'Operates Normally',
          'Awaiting Parts',
          'Needs Recall',
          'Others'
        ],
        holdOtherstext: '',
        holdRecommendOtherstext: '',
        formData: {
          date: null,
          srNumber: '',
          customerName: '',
          businessName: '',
          address: '',
          mobileNumber: '',
          telephoneNumber: '',
          // 
          systemType: '',
          serialNumber: '',
          serviceType: null,
          // 
          reason: '',
          serviceRendered: '',
          recommendation: '',
          recommendChoice: null,
          // 
          partsReplaced: [
            {
              quantity: null,
              partItem: '',
              pnsn: '',
              remarks: ''
            }
          ],
          travelTime: null,
          arrivalTime: null,
          departureTime: null,
          // 
          startTime: null,
          endTime: null,
          // 
          ackDate: null,
        }
      }
    },
    methods: {
      incrementPartReplaced(){
        this.formData.partsReplaced.push(
          {
            quantity: null,
            partItem: '',
            pnsn: '',
            remarks: ''
          }
        )
      },
      //TODO: consider the automation
      async onSubmit(){
        console.log(this.formData);
        if(this.isLoading){
          return
        }

        try {
          this.isLoading = true

          const today = new Date();
          const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;

          const finalData = {
            userId: this.$auth.user.id,
            category: 'service-report',
            filename: `${this.formData.systemType}_${this.formData.serialNumber}_${this.formData.customerName} ${formattedDate}`,
            formData: {
              ...this.formData,
              serviceType: this.formData.serviceType === 'Others' ? this.holdOtherstext : this.formData.serviceType ,
              recommendChoice: this.formData.recommendChoice === 'Others' ? this.holdRecommendOtherstext: this.formData.recommendChoice,
            }
          }

          const { data } = await this.$axios.post('/api/forms-lists',{ data: finalData })

          if(data){
            // SNACKBAR HERE FOR SUCCESS INPUT
            this.$router.push('/reports')
          }
        } catch (error) {
          // SNACKBAR HERE
          console.error(error)
        } finally {
          this.isLoading = false
        }
      }
    }
}
</script>

<style>
#formHeader{
  background-color: #1B2B34;
  min-height: 100px;
}
.marginPaddingY0{
  padding-top: 0!important;
  padding-bottom: 0!important;
  margin-top: 0!important;
  margin-bottom: 0!important;
}
.btnBG{
  background-color: #1B2B34!important;
}
.table-header{
  background-color: #4B6472!important;
}
.cellBorderBottom{
  border-bottom: 1px solid #4B6472!important
}
</style>