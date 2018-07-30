import {Pie} from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['info'],
  data () {
    return {
      options: {
        title: {
          display: true,
          text: 'Данные показаны в %',
        },
        responsive: false,
        maintainAspectRatio: false,
      },
    }
  },
  watch: {
    info: {
      deep: true,
      handler () {
        const _this = this

        _this.renderChart(_this.info, _this.options)
      },
    },
  },
  mounted () {
    const _this = this

    _this.renderChart(_this.info, _this.options)
  },
}
