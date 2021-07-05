<template>
  <v-app>
    <v-app-bar color="primary" dark app absolute>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Wuyu File Cloud</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <v-text-field label="搜索..." dense flat hide-details rounded solo-inverted></v-text-field>
      </v-responsive>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import vuetify from '@/utils/mixins/vuetify'

  export default {
    name: 'App',
    mixins: [vuetify],
    data: () => ({
      //
    })
  }
</script>
