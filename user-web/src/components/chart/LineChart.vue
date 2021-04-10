<template>
  <div id="chart-area" style="background-color: white; border-radius: 5px;">
    <canvas id="line-chart-area"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: [
    'labels',
    'datasets',
    'chartTitle',
    'horizontalLabel',
    'verticalLabel',
  ],
  mounted() {
    this.drawChart('line-chart-area', this.getLineChartConfig);
  },
  watch: {
    labels() {
      this.drawChart('line-chart-area', this.getLineChartConfig);
    },
    datasets() {
      this.drawChart('line-chart-area', this.getLineChartConfig);
    },
  },
  data() {
    return {
      lineChart: '',
    }
  },
  computed: {
    getLineChartConfig() {
      return {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: this.chartTitle,
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.horizontalLabel,
              }
            }],
            yAxes: [{
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.verticalLabel,
              }
            }]
          },
          animation: {
            onComplete() {
            },
            onProgress() {
            },
          },
        }
      }
    }
  },
  methods: {
    drawChart(chartId, config) {
      if (this.lineChart !== '') {
        this.lineChart.destroy();
      }

      const ctx = document.getElementById(chartId).getContext('2d');
      this.lineChart = new Chart(ctx, config);
    },
  },
}
</script>

<style scoped>

</style>
