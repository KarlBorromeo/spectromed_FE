<template>
  <div>
    <p>Processing authentication...</p>
  </div>
</template>

<script>
export default {
  layout: 'login',
  async mounted() {
    const queryParams = this.$route.query;

      if (!queryParams) {
        console.error("No query parameters found.");
        this.$router.push('/login');
        return;
      }

      // Construct the Strapi callback URL
      const strapiCallbackUrl = new URL("http://localhost:1337/api/auth/google/callback");
      Object.keys(queryParams).forEach((key) => {
        strapiCallbackUrl.searchParams.append(key, queryParams[key]);
      });

      // Make the request to Strapi
      const { data } = await this.$axios.get(strapiCallbackUrl.toString());
      this.$auth.setUser(data.user);

      // Now, set the JWT token that Strapi uses (not the Google id_token)
      // This assumes the JWT token is returned from Strapi after successful login
      this.$auth.setUserToken(data.jwt, data.jwt);  // The first `data.jwt` is the name of the property you're setting
      // The second `data.jwt` is the actual token value

      // Redirect after successful authentication
      this.$router.push('/');
  },
};
</script>
