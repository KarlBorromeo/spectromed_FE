<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height: 100vh;"
  >
    <v-row class="d-flex justify-center align-center">
      <v-col cols="10" sm="5" md="4" lg="3" class="pa-0">
        <v-sheet
          elevation="3"
          class="pa-5 ma-0 text-center"
          rounded
          height="400"
        >
          <h3 class="mb-2 title">Login</h3>
          <v-text-field 
            type="text"
            label="Username"
            hint="Type your username"
            prepend-icon="mdi-account-outline"
          />
          <v-text-field 
            type="password"
            label="Password"
            hint="Type your password"
            prepend-icon="mdi-lock-outline"
            class="mb-0 pb-0"
          />
          <p class="caption text-end pt-0 mt-0"><a class="text-decoration-underline">Forgot password?</a></p>
          <v-btn
            color="primary darken-1"
            class="rounded-xxl caption"
            dark
            block
            @click="formLogin"
          >
            Login
          </v-btn>
          <section class="d-flex align-center justify-space-between">
            <section class="custom-divider" />
            <p class="subtitle-1 pa-0 my-0">or</p>
            <section class="custom-divider" />
          </section>
          <v-btn
            color="transparent darken-1"
            class="rounded-xxl black--text caption"
            dark
            block
            @click="loginWithGoogle"
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAvVBMVEVHcEz8/f3////////+/v7s7u/6+vr5+vr5+vr9/f3////////5+vr////////Kzs/////////9/v74+fn4+fn////8vwbsTkJFiPPrQjI7q1gpp00yqVPrSTlAhfX9/f2hv/nwgHj2tLGt2bkqe/Q2gPV+qPd7woza5f2WuPns8v5ZtnHD48n92Yj80Wn+6sD4yMXtZ13znpn8xSnwuh3v6+WIwbFwoPb0qKPpKxT1mx7AtydjuXgcpjNCk8nTYqeQAAAAFXRSTlMA5d2fnApdnVLJpWJiowsJZNGXl5g9ng+vAAABP0lEQVQokY2S2XqCMBCFQVGWulRbkIRABASK0FZtq3Z9/8fqZCDK0oueCzJf/sxhJhlF+Z/G1kJVF9a4T2ZD+6LhrM1u7ZZumsyyO5pe2RQ3+O4Qhoddbd32jHzigwiJms4jTAvJqtb7GekIoSbC0F+tCNnvCSFhZawhRE/I84UfP4eyKMEMEXxA3lunYqN2fXZe/ajbjvA1YX10HIeLjXyNyrcQmwAHsD45zgue3gSozQPEgx50UYmELdtTmqYngNJ2WRVEY1nIOnATsS5lK5+MenUr28ANUtmKIvxij1KGuaUbuFgPxxvSxd4Xo9TzisLz2E+SS1e4eCylgFzK4Aj7PuJLVBevTPBfMSQxBp+qsol8UK167DLLsmNZlaVfR0Hv3muDwVjyJuKd8ZzrF8z1eX90jXtTVc07o0/+1C9hwDM1yvfWEgAAAABJRU5ErkJggg==" alt="Google Logo" style="width: 24px; height: 24px;" />
            Continue with Google
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col cols="3" md="4" lg="3" class="pa-0 d-none d-md-block">
        <v-sheet
          elevation="3"
          class="pa-5 ma-0 text-center"
          rounded
          height="400"
          id="logoBG"
        >
          <section id="logo"/>
        </v-sheet>
      </v-col>
    </v-row>
    <Snackbar ref="snackbar" color="red" text="Not yet available, pls. use Gmail service"/>
  </v-container>
</template>

<script>
export default {
    name: 'LoginPage',
    layout: 'login',
    auth: 'guest',
    methods: {
      loginWithGoogle() {
        // Trigger Nuxt Auth Google login
        this.$auth.loginWith('googleOauth');
      },
      formLogin(){
        this.$refs.snackbar.snackbar = true;
      }
    },
};
</script>

<style scoped>
/* Add any custom styling here, if needed */
#logoBG{
  /* min-height: 80px;
  min-width: 50px; */

  background: rgb(125,34,244);
  background: linear-gradient(326deg, rgba(125,34,244,1) 35%, rgba(194,149,252,1) 100%);
}
#logo{
  height: 100%;
  background-color: transparent;
  background-image: url('~@/assets/images/specMedLogo.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;
  z-index: 1000;
}
.custom-divider{
  width: 45%; 
  height: 3px;
  background-color: #AAABAB;
}
</style>
