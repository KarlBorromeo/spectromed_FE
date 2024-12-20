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
              :disable="isLoading"
              filled
              dense
            />
            <!-- SR No. -->
            <v-text-field
              v-model="formData.srNumber"
              class="marginPaddingY0"
              type="text"
              label="S.R No.:"
              :disable="isLoading"
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
              :disable="isLoading"
              type="text"
              label="Customer Name"
            />
            <!-- BUSINESS NAME -->
            <v-text-field
              v-model="formData.businessName"
              filled
              counter
              maxlength="50"
              :disable="isLoading"
              class="marginPaddingY0"
              type="text"
              label="Business Name"
            />
            <!-- ADDRESS -->
            <v-text-field
              v-model="formData.address"
              counter
              maxlength="100"
              filled
              :disable="isLoading"
              class="marginPaddingY0"
              type="text"
              label="Address"
            />
            <!-- Mobile Number -->
            <v-text-field
              v-model="formData.mobileNumber"
              counter
              maxlength="10"
              filled
              :disable="isLoading"
              class="marginPaddingY0"
              type="text"
              hide-spin-buttons
              label="Mobile Number"
              prefix="+63"
            />
            <!-- Telephone Number -->
            <v-text-field
              v-model="formData.telephoneNumber"
              counter
              maxlength="30"
              filled
              :disable="isLoading"
              class="marginPaddingY0"
              type="text"
              label="Telephone Number"
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
              :disable="isLoading"
              type="text"
              label="System Type"
            />
            <!-- SERIAL NUMBER -->
            <v-text-field
              v-model="formData.serialNumber"
              counter
              maxlength="100"
              filled
              :disable="isLoading"
              class="marginPaddingY0"
              type="text"
              label="Serial Number"
            />
            <!-- SERVICE TYPE -->
            <v-radio-group v-model="formData.serviceType" class="marginPaddingY0" label="Service Type">
              <v-radio
                v-for="(type,i) in serviceTypeItems"
                :key="i"
                :label="type"
                :value="type"
              />
              <v-text-field
                v-model="holdOtherstext"
                v-if="formData.serviceType === 'Others'"
                counter
                maxlength="10"
                :disable="isLoading"
                filled
                class="marginPaddingY0"
                type="text"
                label="Others"
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
              :disable="isLoading"
              auto-grow
              rows="2"
              filled
            />
            <!-- Service Rendered -->
            <v-textarea
              v-model="formData.serviceRendered"
              counter
              :disable="isLoading"
              maxlength="900"
              label="Service Rendered"
              auto-grow
              filled
              rows="4"
            />
            <!-- RECOMMENDATIONS -->
            <v-textarea
              v-model="formData.recommendation"
              counter
              :disable="isLoading"
              maxlength="180"
              label="Recommendation"
              auto-grow
              filled
              rows="2"
            />
            <!-- STATUS CHOICE -->
            <v-radio-group v-model="formData.recommendChoice" class="marginPaddingY0">
              <v-radio
                v-for="(type,i) in statusItems"
                :key="i"
                :label="type"
                :value="type"
              />
              <v-text-field
                v-model="holdRecommendOtherstext"
                v-if="formData.recommendChoice === 'Others'"
                filled
                counter
                :disable="isLoading"
                maxlength="15"
                class="marginPaddingY0"
                type="text"
                label="Others"
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
                    <th class="text-center table-header white--text subtitle-2">
                      Action
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
                        :disable="isLoading"
                        hide-spin-buttons
                        dense
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-textarea
                        v-model="item.partItem"
                        counter
                        maxlength="20"  
                        :disable="isLoading"
                        auto-grow
                        filled
                        rows="1"
                        dense
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-textarea
                        v-model="item.pnsn"
                        counter
                        maxlength="25"
                        auto-grow
                        :disable="isLoading"
                        filled
                        rows="1"
                        dense
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-textarea
                        v-model="item.remarks"
                        counter
                        maxlength="40"
                        auto-grow
                        :disable="isLoading"
                        filled
                        rows="1"
                        dense
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-btn icon @click="removePartsReplaced(i)">
                        <v-icon class="red--text">mdi-close</v-icon>
                      </v-btn>
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
                :disable="isLoading"
                type="time"
              />
              <!-- ARRIVAL TIME -->
              <v-text-field
                v-model="formData.arrivalTime"
                class="marginPaddingY0 mx-4"
                label="Arrival Time"
                :disable="isLoading"
                type="time"
              />
              <!-- DEPARTURE TIME -->
              <v-text-field
                v-model="formData.departureTime"
                class="marginPaddingY0 mx-4"
                label="Departure Time"
                :disable="isLoading"
                type="time"
              />              
            </section>
          </v-col>
          <v-col cols="12">
             <v-divider />
          </v-col>
        </v-row>    
        <v-row justify="center" class="">
          <v-col cols="12" sm="8" md="6"  lg="5" xl="4" class="marginPaddingY0">
            <!-- WORKING TIME START AND END -->
            <p class="subtitle-1 text-center">Working Time</p>
            <section class="d-flex flex-wrap">
              <v-text-field
                v-model="formData.startTime"
                class="marginPaddingY0 mx-4"
                label="Start Time"
                :disable="isLoading"
                type="time"
                width="200"
                filled
              />              
              <v-text-field
                v-model="formData.endTime"
                class="marginPaddingY0 mx-4"
                label="End Time"
                type="time"
                :disable="isLoading"
                width="200"
                filled
              /> 
            </section>
            <h3 class="mt-4 text-uppercase text-center">Acknowledgement</h3>
            <p class="text-center caption">We confirm that the above spare parts have been replaced / machine has been repaired to our satisfaction
              Spare parts ordered were received in good physical condition</p>
            <v-text-field
              v-model="formData.ackDate" 
              class=""
              :disable="isLoading"
              type="date"
              label="Date"
              dense
            />
            <!-- CUSTOMER NAME AND SIGNATURE -->
            <p class="text-center overline marginPaddingY0">Customer Name & Signature</p>   
            <div class="d-flex justify-center align-center flex-column mb-2">
              <v-card height="200" width="400">
                <img :src="formData.customerSignatureImg" >
              </v-card>
            </div>
            <section class="d-flex flex-wrap justify-center">
              <SignaturePad ref="signaturePad" @save="saveSignatureName"/>              
            </section>
          </v-col>
          <v-col cols="10" class="mt-4">
            <h2 class="text-center">"Service You Can Trust"</h2>
            <section class="d-flex justify-center">
              <v-btn class="white--text btnBG caption" @click="onSubmit">Submit</v-btn>
            </section>
          </v-col>
        </v-row>    
      </v-container>
    </v-form>    
  </v-container>
</template>

<script>
import Signature from '@lemonadejs/signature/dist/vue';
export default {
    // no update the this.formData if session data is undefined
    beforeMount(){
      const formData = JSON.parse(sessionStorage.getItem('formData'));
      const id = JSON.parse(sessionStorage.getItem('id'));
      if(formData){
        this.mode = 'edit'
        this.formData = formData
        this.holdID = id

        if(formData.serviceType !== null && !this.serviceTypeItems.includes(formData.serviceType)){
          this.formData.serviceType = 'Others'
          this.holdOtherstext = formData.serviceType
        }

        if(formData.recommendChoice !== null && !this.statusItems.includes(formData.recommendChoice)){
          this.formData.recommendChoice = 'Others'
          this.holdRecommendOtherstext = formData.recommendChoice
        }
      }
        console.log('FormData:',this.formData,this.holdID);
    },
    // remove the session data before leaving this page
    beforeRouteLeave(to, from, next) {
      sessionStorage.removeItem('formData');  
      sessionStorage.removeItem('id');  
      next();
    },
    name: 'serviceReport',
    components: { Signature },
    layout: 'form',
    data(){
      return{
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
          customerSignatureImg: null,
        },
        isLoading: false,
        mode: 'create',
        holdID : null
      }
    },
    methods: {
      // increment the parts replaced array
      incrementPartReplaced(){
        if(this.formData.partsReplaced.length>=5){
          return;
        }
        this.formData.partsReplaced.push(
          {
            quantity: null,
            partItem: '',
            pnsn: '',
            remarks: ''
          }
        )
      },
      // remove an index in parts replaced array 
      removePartsReplaced(index){
        this.formData.partsReplaced.splice(index,1)
      },
      // save the emited values in the dialog, it passed the signature img and the name
      saveSignatureName(obj){
        console.log(obj)
        this.formData.customerSignatureImg  =  obj.signature
      },
      //TODO: consider the automation
      async onSubmit(){
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

          if(this.mode === 'create'){
            await this.$axios.post('/api/forms-lists',{
              data: finalData
              })
            this.$router.push('/reports')
          }else{
            await this.$axios.put(`/api/forms-lists/${this.holdID}`,{
                data: {
                  formData: {
                    ...this.formData,
                    serviceType: this.formData.serviceType === 'Others' ? this.holdOtherstext : this.formData.serviceType ,
                    recommendChoice: this.formData.recommendChoice === 'Others' ? this.holdRecommendOtherstext: this.formData.recommendChoice,
                  }
                }
              })
            this.$router.push('/reports')
          }


        } catch (error) {
          // Snack Bar
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