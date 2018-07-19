<template>
  <div id="app">
    <h1>Xsolla Summer School 2018</h1>
    <h2>Тестовое задание Frontend-потока</h2>
    <grid :gridData="transactions"></grid>
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
        data: [],
        typeData: {
          transaction: [
            {
              field: 'id',
              headTable: 'transaction_id',
              isVisible: false,
            },
            {
              field: 'project.name',
              headTable: 'Проект',
              isVisible: true,
            },
            {
              field: 'payment_method.name',
              headTable: 'Платежная система',
              isVisible: true,
            },
            {
              field: 'transfer_date',
              headTable: 'Дата перевода',
              isVisible: true,
            },
          ],
          user: [
            {
              field: 'id',
              headTable: 'id пользователя',
              isVisible: true,
            },
            {
              field: 'name',
              headTable: 'Имя',
              isVisible: true,
            },
            {
              field: 'email',
              headTable: 'Email',
              isVisible: true,
            },
          ],
          payment_details: [
            {
              field: 'payment.currency',
              headTable: 'Валюта',
              isVisible: true,
            },
            {
              field: 'payment.amount',
              headTable: 'Сумма',
              isVisible: true,
            },
          ],
          purchase: [
            {
              field: 'virtual_currency.name',
              headTable: 'Виртуальная валюта',
              isVisible: true,
            },
            {
              field: 'virtual_items',
              headTable: 'Виртуальные объекты',
              isVisible: true,
            },
          ],
        },
      },
    }
  },
  mounted () {
    const _this = this
    
    _this.transactions.data = _this.getTransactions
  },
  computed: {
    /**
     * mix the getters into computed with object spread operator
     * */
    ...mapGetters([
      'getTransactions',
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
  margin-top: 60px;
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
