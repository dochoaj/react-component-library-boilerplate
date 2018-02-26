import React, { Component } from 'react';
import Chart from 'chart.js';
import PropTypes, { number } from 'prop-types'

class LineChart extends Component {
  static propTypes = {
    chartType: PropTypes.oneOf([
      'hours', 'rates'
    ]),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    labels: PropTypes.arrayOf(PropTypes.number),
    highlightIndices: PropTypes.arrayOf(PropTypes.number)
  }

  componentDidMount () {
    this.renderChart()
  }

  componentDidUpdate() {
    this.renderChart()
  }

  renderChart = () => {
    var ctx = document.getElementById("lineChart");
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.props.labels,
        datasets: [{
          label: this.props.chartType==='hours'? 'Facturadas' : 'Efectiva',
          data: this.props.data[0],
          backgroundColor: [
            'rgba(0, 133, 237, 0.2)'
          ],
          borderWidth: 1,

          pointRadius: this.props.data[0].map((value, index) => {
            return this.props.highlightIndices[0] === index ? 4 : 0
          }),
          pointBackgroundColor: 'rgba(0, 133, 237, 1)'
        }, 
        {
          label: this.props.chartType==='hours'? 'Facturables' : 'Estándar',
          data: this.props.data[1],
          backgroundColor: [
            'rgba(255, 120, 204, 0.2)'
          ],
          borderWidth: 1,

          pointRadius: this.props.data[1].map((value, index) => {
            return this.props.highlightIndices[1] === index ? 4 : 0
          }),
          pointBackgroundColor: 'rgba(255, 120, 204, 1)'
        }]
      },
      options: {
        legend: {
          labels: {
            fontColor: "black",
            fontSize: 13,
            usePointStyle: true
          },
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              fontSize: 15
            },
            scaleLabel: {
              display: true,
              labelString: "Cantidad de estudios",
              fontColor: "black",
              fontSize: 15
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero:true,
              fontSize: 15
            }
          }]
        }
      }
    });
  }

  render() {
    return (
      <canvas id="lineChart" width="200" height="100"></canvas>
    );
  }
}

export default LineChart;