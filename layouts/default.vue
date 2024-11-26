<template>
  <v-app dark>
    <!-- Left Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      permanent
      app
      id="drawer"
    >
      <v-list>
        <v-list-item class="d-flex ma-0 pa-0 align-center white--text flex-grow-0" :class="miniVariant==true?'justify-center':'justify-space-around'">
            <div id="logoContainer" v-if="!miniVariant"/>
            <p class="title ma-0 pa-0" v-if="!miniVariant">Spectromed</p>
            <v-btn v-if="!miniVariant" icon @click.stop="miniVariant = !miniVariant" class="ma-0 pa-0">
              <v-icon class="white--text">mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
            
            <v-btn icon v-if="miniVariant" @click.stop="miniVariant = false" class="pa-0 ma-0">
              <v-icon class="white--text">mdi-apps</v-icon>
            </v-btn>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="white--text"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-icon class="white--text">mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">Hi, Karl</v-list-item-title>
            </v-list-item-content>
          </v-list-item>          
          <v-list-item>
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
    <!-- <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      
      <v-spacer />
      <v-btn outlined color="error" @click="onLogout()">
        Logout
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar> -->
    <v-main>
      <v-container fluid :style="{ padding: 0 }">
        <v-main style="background-color: #EBE9EF;">
          <v-container>
            <Nuxt />
          </v-container>
        </v-main>
      </v-container>
    </v-main>
    <!-- <v-footer app color="primary darken-2" class="white--text">
      <span>&copy; {{ new Date().getFullYear() }} - SpectroMed</span>
    </v-footer> -->
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} Iron-Dev ♥</span>
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
          to: '/',
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
<style scoped>
#drawer{
  background-color: #212026;

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

</style>
