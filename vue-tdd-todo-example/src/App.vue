<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer"
                         clipped fixed app
    >
      <v-list >
        <router-link to="/vue-tdd-todo-example" class="list__tile list__tile--link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            
            <v-list-tile-content>
              <v-list-tile-title>В работе</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
  
        <router-link to="/vue-tdd-todo-example/history" class="list__tile list__tile--link">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
      
            <v-list-tile-content>
              <v-list-tile-title>История операций</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
      <v-btn @click="createPush">Вызвать push</v-btn>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Простой ToDo лист</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import Push from 'push.js'

export default {
  data: () => ({
    drawer: true,
  }),
  props: {
    source: String,
  },
  // created () {
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     // Prevent Chrome 67 and earlier from automatically showing the prompt
  //     e.preventDefault()
  //     // Stash the event so it can be triggered later.
  //     deferredPrompt = e
  //     // Update UI notify the user they can add to home screen
  //     btnAdd.style.display = 'block'
  //   })
  // },
  methods: {
    temp () {
      console.log('click')
    },
    createPush () {
      Push.create('Установи уведомления пуш', {
        body: `Простое пуш уведомление`,
        icon: 'assets/logo.png',
        timeout: 4000,
        onClick () {
          window.focus()
          this.close()
        },
      })
    },
  },
}
</script>

<style lang="scss">
@import 'assets/scss/fonts.scss';
@import 'assets/scss/ss/index';

.application.theme--dark a {
  cursor: pointer;
  text-decoration: none;
  color: white;
}
.list {
  padding: 0!important;
}
.material-design-icon__svg {
  pointer-events: none!important;
  //fill: $orange;
}
.material-design-icon {
  width: 24px;
  height: 24px;
}
</style>
