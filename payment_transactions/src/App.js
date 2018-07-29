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
        actions: [
          {
            title: 'Список всех проектов',
            btn: 'list',
            method: 'getListAllProjects',
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
      },
      projects: [],
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
    // /**
    //  *
    //  * */
    // getChartPopularityPaymentSystems () {
    //
    // },
  },
}
