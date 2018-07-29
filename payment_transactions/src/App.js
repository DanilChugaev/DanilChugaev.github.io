import Grid from './components/grid'
import PieChart from './components/chart/index'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
    Grid,
    PieChart,
  },
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
        filters: {
          user: null,
          payment_method: null,
          project: null,
        },
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
      ratingSum: 0,
      chart: {
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Data One',
              data: [40, 39, 10, 40, 39, 80],
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
              ],
            },
          ],
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
     * */
    getRatingPopularityPaymentSystems (rating) {
      const _this = this

      _this.rating.splice(0)
      _this.ratingSum = 0

      rating.forEach(item => {
        _this.rating.push(item)
        _this.ratingSum += item.value
      })

      _this.dialogs.rating.state = true
    },
    // /**
    //  *
    //  * */
    // getChartPopularityPaymentSystems () {
    //   const _this = this
    //
    //   _this.dialogs.chart.state = true
    // },
  },
}
