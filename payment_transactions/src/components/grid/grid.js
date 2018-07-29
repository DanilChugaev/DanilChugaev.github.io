import list from 'vue-material-design-icons/format-list-numbers.vue'
import chart from 'vue-material-design-icons/finance.vue'

export default {
  name: 'Grid',
  props: {
    gridData: Object,
  },
  components: {
    list,
    chart,
  },
  data () {
    return {
      loading: false,
      rowsPerPageItems: [10, 20, 50, 100, 200],
      headers: [],
      items: [],
      actions: this.gridData.actions,
      projects: [],
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
          .catch(err => console.log(err))
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
        .catch(err => console.log(err))
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

      _this.loading = true

      return new Promise((resolve, reject) => {
        headers = _this.selectColumnHeaders(gridDataItems[0])
        items = _this.transformationItems(gridDataItems, headers)
        _this.loading = false

        // filters
        // graphics
        // debugger

        if (!!headers && !!items) {
          resolve({
            headers,
            items,
          })
        } else {
          reject(new Error('Sorry, an unexpected error occurred!'))
        }
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

          tempObj[header.newValue] = value
        })

        transformItems.push(tempObj)
      })

      return transformItems
    },
    runMethod (methodName) {
      this[methodName]()
    },
    /**
     * Sends a collection of all projects to the parent element
     * */
    getListAllProjects () {
      const _this = this

      if (_this.projects.length === 0) {
        const projects = new Set()

        _this.items.forEach(item => projects.add(item.project_name))
        this.$emit('getListAllProjects', projects)

        _this.projects.push(...projects)
      } else {
        this.$emit('getListAllProjects', _this.projects)
      }
    },
    // /**
    //  *
    //  * */
    // getChartPopularityPaymentSystems () {
    //
    // },
  },
}
