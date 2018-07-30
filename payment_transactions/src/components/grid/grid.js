import list from 'vue-material-design-icons/format-list-numbers.vue'
import chart from 'vue-material-design-icons/finance.vue'
import rating from 'vue-material-design-icons/file-document-box-outline.vue'

export default {
  name: 'Grid',
  props: {
    gridData: Object,
  },
  components: {
    list,
    chart,
    rating,
  },
  data () {
    return {
      loading: false,
      rowsPerPageItems: [10, 20, 50, 100, 200],
      headers: [],
      items: [],
      transactionsLength: 0,
      projectsLength: 0,
      actions: this.gridData.actions,
      projects: [],
      ratingObj: {},
      ratingArr: [],
    }
  },
  watch: {
    gridData: {
      deep: true,
      handler () {
        const _this = this

        _this.getDataTable()
          .then(data => {
            _this.distributeData(data)
          })
      },
    },
  },
  mounted () {
    const _this = this

    if (_this.gridData.items.length > 0) {
      _this.getDataTable()
        .then(data => {
          _this.distributeData(data)
        })
    }
  },
  filters: {
    /**
     * Returns a new value for the field if the current value is not specified
     *
     * @param {String} str
     *
     * @return {String} str
     * */
    unknownValue (str) {
      if (str === null) {
        return 'Не указано'
      }
      return str
    },
  },
  methods: {
    /**
     * Distribute the data in columns depending on the types of columns
     *
     * @param {Object} data
     * */
    distributeData (data) {
      const _this = this

      _this.headers.splice(0)
      _this.items.splice(0)

      data.headers.forEach(header => {
        if (header.isVisible) {
          _this.headers.push(header)
        }
      })
      data.items.forEach(item => _this.items.push(item))
    },
    /**
     * Get the data and headers for the table
     *
     * @return {Promise}
     * */
    getDataTable () {
      const _this = this
      let headers = []
      let items = []
      let gridDataItems = _this.gridData.items
      let search = _this.gridData.search

      _this.loading = true

      return new Promise((resolve, reject) => {
        headers = _this.selectColumnHeaders(gridDataItems[0])
        items = _this.transformationItems(gridDataItems, headers)

        _this.transactionsLength = items.length

        let {ratingObj, ratingArr} = _this.calcRating(items)

        _this.ratingArr.splice(0)

        _this.ratingObj = Object.assign({}, _this.ratingObj, ratingObj)
        _this.ratingArr.push(...ratingArr)

        if (search !== null && search !== '') {
          items = items.filter(item => {
            for (let key in item) {
              if (String(item[key]).indexOf(search) + 1) {
                return true
              }
            }
            return false
          })
        }

        /**
         * Imitation of the server response
         * */
        setTimeout(() => {
          _this.loading = false

          if (!!headers && !!items) {
            resolve({
              headers,
              items,
            })
          } else {
            reject(new Error('Sorry, an unexpected error occurred!'))
          }
        }, 1500)
      })
    },
    /**
     * Selects column headers from the specified columns parameters
     *
     * @param {Object} exampleDataObject
     *
     * @return {Array} headers
     * */
    selectColumnHeaders (exampleDataObject) {
      const _this = this
      const typesData = _this.gridData.typesData
      const exampleData = exampleDataObject
      let headers = []

      headers.push(..._this.recursiveSearchHeaderItem(typesData, exampleData, null))

      return headers
    },
    /**
     * Helper method for selecting headers
     *
     * @param {Object} typesData
     * @param {Object} exampleData
     * @param {String} type
     *
     * @return {Array} headersTemp
     * */
    recursiveSearchHeaderItem (typesData, exampleData, type) {
      const _this = this
      let headersTemp = []

      for (let key in typesData) {
        if (!Array.isArray(typesData[key]) && typeof typesData[key] === 'object') {
          headersTemp.push(..._this.recursiveSearchHeaderItem(typesData[key], exampleData, key))
        } else {
          for (let exampleKey in exampleData) {
            if (exampleKey === type) {
              typesData[key].forEach(item => {
                let value = item.field
                let newValue = item.newField
                let parent = exampleData[exampleKey][item.field] ? null : key

                headersTemp.push({
                  sortable: false,
                  text: item.headTable,
                  value,
                  newValue,
                  parent,
                  type,
                  isVisible: item.isVisible,
                })
              })
            }
          }
        }
      }

      return headersTemp
    },
    /**
     * Converting elements for output in a table
     *
     * @param {Array} items
     * @param {Array} headers
     *
     * @return {Array} transformItems
     * */
    transformationItems (items, headers) {
      let transformItems = []

      items.forEach(item => {
        let tempObj = {}

        headers.forEach(header => {
          let tempItemType = item[header.type]
          let value = ''

          if (tempItemType[header.value] !== undefined) {
            value = tempItemType[header.value]
          } else {
            value = tempItemType[header.parent][header.value]
          }

          if (header.newValue === 'transaction_transfer_date') {
            value = new Date(Date.parse(value)).toLocaleString()
          }

          tempObj[header.newValue] = value
        })

        transformItems.push(tempObj)
      })

      return transformItems
    },
    /**
     * Calculates the popularity rating of payment systems and returns the result in several formats
     *
     * @param {Object} items
     *
     * @return {Object} rating
     * */
    calcRating (items) {
      let ratingObj = {}
      let ratingArr = []

      items.forEach(item => {
        if (ratingObj[item.payment_method_name] !== undefined) {
          ratingObj[item.payment_method_name]++
        } else {
          ratingObj[item.payment_method_name] = 1
        }
      })

      for (let item in ratingObj) {
        if ({}.hasOwnProperty.call(ratingObj, item)) {
          ratingArr.push({
            name: item,
            value: ratingObj[item],
          })
        }
      }

      ratingArr.sort((a, b) => b.value - a.value)

      return {ratingObj, ratingArr}
    },
    /**
     * Runs a method in this component by the passed name
     *
     * @param {String} methodName
     * */
    runMethod (methodName) {
      this[methodName]()
    },
    /**
     * Sends a collection of all projects to the parent element
     * */
    getListAllProjects () {
      const _this = this
      const projects = new Set()

      _this.items.forEach(item => projects.add(item.project_name))
      _this.$emit('getListAllProjects', projects)

      _this.projects.push(...projects)
    },
    /**
     * Sends a list with a rating to the parent element
     * */
    getRatingPopularityPaymentSystems () {
      const _this = this

      _this.$emit('getRatingPopularityPaymentSystems', _this.ratingArr, _this.transactionsLength)
    },
    /**
     * Sends a list with a rating to the parent element for chart
     * */
    getChartPopularityPaymentSystems () {
      const _this = this

      _this.$emit('getChartPopularityPaymentSystems', _this.ratingArr, _this.transactionsLength)
    },
  },
}
