import {Pie} from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['info'],
  data () {
    return {
      chartData: this.info,
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    }
  },
  mounted () {
    const _this = this

    _this.renderChart(_this.chartData, _this.options)
  },
}
