import {Pie} from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['info'],
  data () {
    return {
      chartData: this.info,
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

        _this.renderChart(_this.chartData, _this.options)
      },
    },
  },
  mounted () {
    const _this = this

    _this.renderChart(_this.chartData, _this.options)
  },
}
