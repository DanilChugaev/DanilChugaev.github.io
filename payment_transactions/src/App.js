import Grid from './components/grid'
import PieChart from './components/chart/index'
import {mapGetters} from 'vuex'
import randomInteger from './components/utils'
import lazySearch from './components/mixins/lazySearch'

export default {
  name: 'app',
  components: {
    Grid,
    PieChart,
  },
  mixins: [
    lazySearch,
  ],
  data () {
    return {
      transactions: {
        items: [],
        typesData: {},
        actions: [
          {
            title: 'Список всех проектов',
            btn: 'list',
            method: 'getListAllProjects',
          },
          {
            title: 'Рейтинг популярности платежных систем',
            btn: 'rating',
            method: 'getRatingPopularityPaymentSystems',
          },
          {
            title: 'График популярности платежных систем',
            btn: 'chart',
            method: 'getChartPopularityPaymentSystems',
          },
        ],
        search: null,
      },
      dialogs: {
        projects: {
          state: false,
        },
        rating: {
          state: false,
        },
        chart: {
          state: false,
        },
      },
      projects: [],
      rating: [],
      transactionsLength: 0,
      chart: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
        }],
      },
      search: null,
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
  methods: {
    /**
     * Receives a collection of all projects from the child element
     *
     * @param {Set} projects
     * */
    getListAllProjects (projects) {
      const _this = this

      _this.projects.splice(0)
      _this.projects.push(...projects)

      _this.dialogs.projects.state = true
    },
    /**
     * Receives a list with a rating from the child element
     *
     * @param {Array} rating
     * @param {Number} transactionsLength
     * */
    getRatingPopularityPaymentSystems (rating, transactionsLength) {
      const _this = this

      _this.rating.splice(0)
      _this.transactionsLength = transactionsLength

      rating.forEach(item => {
        _this.rating.push(item)
      })

      _this.dialogs.rating.state = true
    },
    /**
     * Receives a list with a rating from the child and create chart
     *
     * @param {Array} rating
     * @param {Number} transactionsLength
     * */
    getChartPopularityPaymentSystems (rating, transactionsLength) {
      const _this = this
      let chart = _this.chart

      _this.transactionsLength = transactionsLength
      chart.labels.splice(0)
      chart.datasets[0].data.splice(0)
      chart.datasets[0].backgroundColor.splice(0)

      rating.forEach(item => {
        let percent = (item.value / _this.transactionsLength) * 100

        chart.labels.push(item.name)
        chart.datasets[0].data.push(Math.round(percent))
        chart.datasets[0].backgroundColor.push(`rgba(${randomInteger(0, 255)}, ${randomInteger(0, 255)}, ${randomInteger(0, 255)}, 0.7)`)
      })

      _this.dialogs.chart.state = true
    },
  },
}
