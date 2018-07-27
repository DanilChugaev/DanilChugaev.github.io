<template>
  <div id="app">
    <v-app>
      <h1>Xsolla Summer School 2018</h1>
      <h2>Тестовое задание Frontend-потока</h2>
      <grid :gridData="transactions"></grid>
    </v-app>
  </div>
</template>

<script>
import Grid from './components/grid'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
    Grid,
  },
  data () {
    return {
      transactions: {
        items: [],
        typesData: {},
        filters: {
          user: null,
          payment_method: null,
          project: null,
        },
      },
    }
  },
  mounted () {
    const _this = this
    
    _this.transactions.items.push(..._this.getTransactions)
    _this.transactions.typesData = Object.assign({}, _this.transactions.typesData, {..._this.getTypesDataTable})
  },
  computed: {
    /**
     * Mix the getters into computed with object spread operator
     * */
    ...mapGetters([
      'getTransactions',
      'getTypesDataTable',
    ]),
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
