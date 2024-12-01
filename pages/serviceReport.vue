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
            <v-text-field 
              class="marginPaddingY0"
              type="date"
              label="Date"
              filled
              dense
            />
            <v-text-field 
              class="marginPaddingY0"
              type="text"
              label="S.R No.:"
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
            <v-text-field 
              filled
              class="marginPaddingY0"
              type="text"
              label="Customer Name"
            />
            <v-text-field 
              filled
              class="marginPaddingY0"
              type="text"
              label="Business Name"
            />
            <v-text-field 
              filled
              class="marginPaddingY0"
              type="text"
              label="Address"
            />
            <v-text-field 
              filled
              class="marginPaddingY0"
              type="text"
              label="Mobile Number"
              prefix="+63"
            />
            <v-text-field 
              filled
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
            <v-text-field 
              filled
              class="marginPaddingY0"
              type="text"
              label="System Type"
            />
            <v-text-field 
              filled
              class="marginPaddingY0"
              type="text"
              label="Serial Number"
            />
            <v-radio-group class="marginPaddingY0" label="Service Type">
              <v-radio
                v-for="(type,i) in serviceTypeItems"
                :key="i"
                :label="type"
                :value="type"
              />
              <v-text-field 
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
            <v-textarea
              label="Reason for Service"
              auto-grow
              rows="2"
              filled
            />
            <v-textarea
              label="Service Rendered"
              auto-grow
              filled
              rows="4"
            />
            <v-textarea
              label="Recommendation"
              auto-grow
              filled
              rows="2"
            />
            <v-radio-group class="marginPaddingY0">
              <v-radio
                v-for="(type,i) in statusItems"
                :key="i"
                :label="type"
                :value="type"
              />
              <v-text-field 
                filled
                class="marginPaddingY0"
                type="text"
                label="Others"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12" class="marginPaddingY0">
            <section class=" mb-2 d-flex justify-space-between">
              <p class="subtitle-1 marginPaddingY0">Parts Replaced</p>
              <v-btn class="mx-5 elevation-1 btnBG white--text rounded-lg caption" @click="incrementPartReplaced">Add Row
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </section>
            <v-divider />
          </v-col>
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
                    v-for="item in partsReplaced"
                    :key="item.name"
                  >
                    <td class="cellBorderBottom py-1" style="border-left: 1px solid #4B6472!important; border-right: 1px solid #4B6472!important">
                      <v-text-field 
                        filled
                        class="marginPaddingY0"
                        type="number"
                        dense
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-textarea
                        auto-grow
                        filled
                        rows="1"
                        dense
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-textarea
                        auto-grow
                        filled
                        rows="1"
                        dense
                      />
                    </td>
                    <td class="cellBorderBottom py-1" style="border-right: 1px solid #4B6472!important">
                      <v-textarea
                        auto-grow
                        filled
                        rows="1"
                        dense
                      />
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" />
          <v-col cols="4" md="2">
            <section class="d-flex flex-wrap">
              <v-text-field
                class="marginPaddingY0 mx-4"
                label="Travel Time"
                type="time"
              />              
              <v-text-field
                class="marginPaddingY0 mx-4"
                label="Arrival Time"
                type="time"
              />              
              <v-text-field
                class="marginPaddingY0 mx-4"
                label="Departure Time"
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
            <p class="subtitle-1 text-center">Working Time</p>
            <section class="d-flex flex-wrap">
              <v-text-field
                class="marginPaddingY0 mx-4"
                label="Start Time"
                type="time"
                width="200"
                filled
              />              
              <v-text-field
                class="marginPaddingY0 mx-4"
                label="End Time"
                type="time"
                width="200"
                filled
              /> 
            </section>
            <h3 class="mt-4 text-uppercase text-center">Acknowledgement</h3>
            <p class="text-center caption">We confirm that the above spare parts have been replaced / machine has been repaired to our satisfaction
              Spare parts ordered were received in good physical condition</p>
            <v-text-field 
              class=""
              type="date"
              label="Date"
              filled
            />
            <v-card class="elevation-3" height="150">
            </v-card>
            <p class="text-center overline marginPaddingY0">Customer Name & Signature</p>
          </v-col>
          <v-col cols="10" class="mt-4">
            <h2 class="text-center">"Service You Can Trust"</h2>
            <section class="d-flex justify-center">
              <v-btn class="white--text btnBG caption">Submit</v-btn>
            </section>
          </v-col>
        </v-row>    
      </v-container>
    </v-form>    
  </v-container>
</template>

<script>
export default {
    name: 'Form',
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
        partsReplaced: [
          {
            quantity: 0,
            partItem: 'fdas',
            pnsn: 'pnsns',
            remarks: 'haha'
          }
        ]
      }
    },

    methods: {
      incrementPartReplaced(){
        this.partsReplaced.push({
          quantity: 0,
          partItem: '',
          pnsn: '',
          remarks: ''
        })
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