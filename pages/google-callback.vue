<template>
  <div>
    <p class="subtitle-1 white--text text-center">Processing authentication...</p>
    <div class="d-flex justify-center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="white"
        indeterminate
      ></v-progress-circular>      
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  async mounted() {
    if(!this.$auth.user){
      const queryParams = this.$route.query;
  
        if (!queryParams) {
          console.error("No query parameters found.");
          this.$router.push('/login');
          return;
        }
        
        await new Promise(resolve => setTimeout(resolve,300))
        // Construct the Strapi callback URL manually
        let strapiCallbackUrl = `${process.env.API_URL}/api/auth/google/callback`;
  
        // Append query parameters
        const queryString = Object.entries(queryParams)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
  
        if (queryString) {
          strapiCallbackUrl += `?${queryString}`;
        }
  
        // Make the request to Strapi
        const { data } = await this.$axios.get(strapiCallbackUrl);
        this.$auth.setUser(data.user);
  
        // Set the JWT token
        this.$auth.setUserToken(data.jwt, data.jwt);
  
        // Redirect after successful authentication
        location.reload()
    }
  },
};
</script>
