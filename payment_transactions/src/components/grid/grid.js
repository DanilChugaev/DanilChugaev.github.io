export default {
  name: 'Grid',
  props: {
    gridData: Object,
  },
  data () {
    return {
      loading: false,
      headers: [
        {text: 'Dessert (100g serving)', value: 'name'},
        {text: 'Calories', value: 'calories'},
        {text: 'Fat (g)', value: 'fat'},
        {text: 'Carbs (g)', value: 'carbs'},
        {text: 'Protein (g)', value: 'protein'},
        {text: 'Iron (%)', value: 'iron'},
      ],
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  watch: {
    gridData: {
      deep: true,
      handler () {
        const _this = this

        _this.getDataTable()
          .then(data => {
            // _this.distributeData(data)
          })
      },
    },
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
      if (~str.indexOf('null')) {
        return 'Не указано'
      }
      return str
    },
  },
  methods: {
    // /**
    //  * Distribute the data in columns depending on the types of columns
    //  *
    //  * @param {Object) data
    //  * */
    // distributeData (data) {
    //   // const _this = this
    //   data
    // },
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
        headers = this.selectColumnHeaders(gridDataItems[0])
        items = gridDataItems
        _this.loading = false

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
                let parent = exampleData[exampleKey][item.field] ? null : key

                headersTemp.push({
                  text: item.headTable,
                  value,
                  parent,
                })
              })
            }
          }
        }
      }

      return headersTemp
    },
  },
}
