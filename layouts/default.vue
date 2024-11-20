<template>
  <v-app dark>
    <!-- Left Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      
      <v-spacer />
      <v-btn outlined color="error" @click="onLogout()">
        Logout
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid :style="{ padding: 0 }">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app color="primary darken-2" class="white--text">
      <span>&copy; {{ new Date().getFullYear() }} - SpectroMed</span>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware({ $auth, redirect, state}) {
    if (!$auth.loggedIn) {
      return redirect('/login')
    } 

    const rememberExpires = $auth.$storage.getCookie('remember_expires')
    const rememberMaxage = $auth.$storage.getCookie('remember_maxage')
    if (rememberExpires) {
      $auth.options.cookie.options.expires = rememberExpires
      $auth.options.cookie.options.maxAge = rememberMaxage
    } else {
      $auth.options.cookie.options.expires = null // reset to "session"
      $auth.options.cookie.options.maxAge = null // reset to "session"
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/profile',
        },
        {
          icon: 'mdi-file-pdf-box',
          title: 'Forms',
          to: '/forms',
        },
      ],
      miniVariant: false,
    }
  },
  methods: {
    onLogout(){
      // Ensure gapi is loaded and the user is signed out
      this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
