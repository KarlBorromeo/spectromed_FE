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

      // Construct the Strapi callback URL manually
      let strapiCallbackUrl = `${process.env.API_URL}/auth/google/callback`;

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
      this.$router.push('/');

  },
};
</script>
