<template>
  <div class="home pa-3">
    <div v-if="this.history.length > 0"
         class="ss-flex ss-flex--justify-end mb-3"
    >
      <v-btn color="info"
             @click="clearHistory">Очистить историю</v-btn>
    </div>
    
    <v-list two-line subheader>
      <v-list-tile v-for="item in history" :key="item.id"
                   :class="item.class"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{item.id}} - {{item.text}}</v-list-tile-title>
          <v-list-tile-sub-title>{{item.date}} - {{item.status}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'history',
  data () {
    return {
      history: [],
    }
  },
  computed: {
    ...mapGetters([
      'getHistory',
    ]),
  },
  mounted () {
    this.history = this.getHistory
  },
  methods: {
    clearHistory () {
      this.$store.dispatch('actionHistoryClear')
    },
  },
}
</script>
