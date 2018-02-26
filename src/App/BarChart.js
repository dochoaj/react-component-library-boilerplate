import React, { Component } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types'

class BarChart extends Component {
  static propTypes = {
    chartType: PropTypes.oneOf([
      'hours', 'rates'
    ]),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    labels: PropTypes.arrayOf(PropTypes.string)
  }

  componentDidMount () {
    this.renderChart()
  }

  componentDidUpdate() {
    this.renderChart()
  }

  renderChart = () => {
    var ctx = document.getElementById("barChart");
    new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: this.props.labels,
        datasets: [{
            label: this.props.chartType === 'hours' ? 'Facturadas' : 'Efectiva',
            data: this.props.data[0],
            backgroundColor: [
              'rgba(0, 133, 237, 1)',
              'rgba(0, 133, 237, 1)',
              'rgba(0, 133, 237, 1)',
              'rgba(0, 133, 237, 1)'
            ],
            borderWidth: 1
        }, 
        {
          label: this.props.chartType === 'hours' ? 'Facturadas mercado' : 'Efectiva mercado',
          data: this.props.data[1],
          backgroundColor: [
            'rgba(207, 230, 252, 1)',
            'rgba(207, 230, 252, 1)',
            'rgba(207, 230, 252, 1)',
            'rgba(207, 230, 252, 1)'
          ],
          borderWidth: 1
        },{
          label: this.props.chartType === 'hours' ? 'Facturables': 'Estándar',
          data: this.props.data[2],
          backgroundColor: [
            'rgba(255, 120, 204, 1)',
            'rgba(255, 120, 204, 1)',
            'rgba(255, 120, 204, 1)',
            'rgba(255, 120, 204, 1)'
          ],
          borderWidth: 1
      }, {
        label: this.props.chartType === 'hours' ? 'Facturables mercado':'Estándar promedio',
        data: this.props.data[3],
        backgroundColor: [
          'rgba(254, 228, 246, 1)',
          'rgba(254, 228, 246, 1)',
          'rgba(254, 228, 246, 1)',
          'rgba(254, 228, 246, 1)'
        ],
        borderWidth: 1
      }]
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 13,
            usePointStyle: true
          },
          position: 'bottom'
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 15
            },
            scaleLabel: {
              display: true,
              labelString: this.props.chartType==='hours'? 'Horas' : 'Tarifa',
              fontColor: "black",
              fontSize: 15
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 15,
              min: 0,
            },
            categoryPercentage: 0.6,
            barPercentage: 0.9,
          }]
        }
      }
    });
  }

  render() {
    return (
      <canvas id="barChart" width="200" height="100"></canvas>
    );
  }
}

export default BarChart;