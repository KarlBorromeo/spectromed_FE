<template>
  <v-app dark>
    <!-- Header -->
    <v-app-bar
      color="deep-purple"
      dark
      v-if="$vuetify.breakpoint.width < 600"
      max-height="60"
    >
      <v-app-bar-nav-icon @click="drawer = true">
        <v-icon>mdi-page-layout-sidebar-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>SpectruMed</v-toolbar-title>
    </v-app-bar>
    <!-- Left Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      app
      :permanent="$vuetify.breakpoint.width > 600"
      id="drawer"
      class="overflow-auto"
      style="max-height: 100vh!important;"
      
    >
      <v-list>
        <v-list-item class="d-flex ma-0 pa-0 align-center white--text flex-grow-0" :class="miniVariant==true?'justify-center':'justify-space-around'">
            <div id="logoContainer" v-if="!miniVariant"/>
            <p class="title ma-0 pa-0" v-if="!miniVariant">SpectruMed</p>
            <v-btn v-if="!miniVariant" icon @click.stop="miniVariant = !miniVariant" class="ma-0 pa-0">
              <v-icon class="white--text">mdi-page-layout-sidebar-left</v-icon>
            </v-btn>
            
            <v-btn icon v-if="miniVariant" @click.stop="miniVariant = false" class="pa-0 ma-0">
              <v-icon class="white--text">mdi-page-layout-sidebar-left</v-icon>
            </v-btn>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="white--text subtitle-1"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push('/user')">
            <v-list-item-action>
              <v-icon class="white--text">mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">My Account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>      
          <v-list-item @click="onLogout">
            <v-list-item-action>
              <v-icon class="white--text">mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>          
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main id="contentMain">
      <v-container class="py-0 my-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }} Iron-Dev ♥</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DefaultLayout',
  middleware({ $auth, redirect, state}) {
    if (!$auth.user) {
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
        // {
        //   icon: 'mdi-view-dashboard',
        //   title: 'Dashboard',
        //   to: '/',
        // },
        {
          icon: 'mdi-history',
          title: 'Report Files',
          to: '/reports',
        },
      ],
      miniVariant: false,
    }
  },
  methods: {
    ...mapActions('user', ['removeUser',]),
    onLogout(){
      // Ensure gapi is loaded and the user is signed out
      this.$auth.logout();
      this.removeUser()
      this.$router.push('/login')
    }
  },
}
</script>
<style scoped>
#drawer{
  background: rgb(63,30,106);
  background: linear-gradient(0deg, rgba(63,30,106,1) 35%, rgba(95,39,168,1) 100%);
}
#logoContainer{
  min-height: 80px;
  min-width: 50px;
  background-image: url('~@/assets/images/specMedLogo.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
#logo{
  height: 100%;
}
#contentMain{
  background-image: url('~@/assets/images/dashboardBG.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
