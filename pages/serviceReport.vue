<template>
  <v-container class="pt-0" style="padding: 0!important">
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

    <v-form ref="form" style="border: 1px dashed black">
      <v-container class="ma-4">
        <v-row justify="start" align="start">
          <v-col cols="2">
            <v-text-field 
              class="marginPaddingY0"
              type="date"
              label="Date"
            />
            <v-text-field 
              class="marginPaddingY0"
              type="text"
              label="S.R No.:"
            />
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1 marginPaddingY0">Customer's Information</p>
            <v-divider />
          </v-col>
          <v-col cols="2" class="marginPaddingY0">
            <p class="subtitle-2">Account</p>
          </v-col>
          <v-col cols="6" class="marginPaddingY0">
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
          <v-col cols="6" class="marginPaddingY0">
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
          <v-col cols="6" class="marginPaddingY0">
            <v-textarea
              type="text"
              label="Reason for Service"
              auto-grow
              rows="2"
              filled
            />
            <v-textarea
              type="text"
              label="Service Rendered"
              auto-grow
              filled
              rows="4"
            />
            <v-textarea
              type="text"
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
            <p class="subtitle-1 marginPaddingY0">Parts Replaced</p>
            <v-divider />
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
        ]
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
</style>