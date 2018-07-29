/**
 * The search does not begin until the user terminates the data entry
 *
 * @param {string} data - указывается в какой объект данных присваиваем строку поиска
 * @param {string} input
 * */
export default {
  data () {
    return {
      timeLazySearch: null,
    }
  },
  methods: {
    lazySearch (data, input) {
      clearTimeout(this.timeLazySearch)
      this.timeLazySearch = setTimeout(() => {
        this[data].search = this[input]
      }, 500)
    },
  },
}
