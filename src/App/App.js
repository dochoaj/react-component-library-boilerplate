import React, { Component } from 'react'
import { uniq, orderBy } from 'lodash'
import 'font-awesome/css/font-awesome.css'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import PropTypes from 'prop-types'

import BarChart from './BarChart'
import LineChart from './LineChart'
import Table from './Table'
import data from './data/dummy.json'

import './App.css'

class App extends Component {

  static propTypes = {
    url: PropTypes.string,
    tenant_country: PropTypes.object,
    countries: PropTypes.array,
    tenant: PropTypes.string,
    product: PropTypes.string,
    period: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      data: null,
      chartType: 'hours',
      selectedCountry: props.tenant_country.code,
      selectedPeriod: this.props.period,
      tenant_country: props.tenant_country,
      countries: props.countries,
      loading: true,
      url: props.url,
      years: [
        { value: '2017', label: 'Año 2017', className: 'option-country' },
      ],
    }
  }

  componentWillMount() {
    this.fetchComparison()
  }

  fetchComparison() {
    fetch(this.state.url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        country: this.state.selectedCountry,
        period_detail: this.state.selectedPeriod,
        tenant: this.props.tenant,
        product: this.props.product,
      }),
    }).then((res) => res.json())
      .then((datos) => {
        this.setState({ data: datos, loading: false })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCountry !== this.state.selectedCountry) {
      this.fetchComparison()
    }
  }

  handleChangeCountry = (selectedCountry) => {
    if (!selectedCountry) {
      selectedCountry = this.props.tenant_country.code
    }
    this.setState({ selectedCountry: selectedCountry.value })
  }

  handleChangeDate = (selectedPeriod) => {
    this.setState({ selectedPeriod: selectedPeriod.value })
  }

  handleChartTypeChange = (event) => {
    this.setState({
      chartType: event.target.value,
    })
  }

  buildCountry() {
    const countries = this.state.countries.map((country) => {
      return { value: country.code, label: country.name }
    })

    return (
      <Select
        name="country"
        value={this.state.selectedCountry}
        className="select-item select-country"
        placeholder="País"
        arrowRenderer={null}
        clearable = {false}
        onChange={this.handleChangeCountry}
        options={countries} />
    )
  }

  buildFilterYear() {
    return (
      <div className="filter-year">
      <Select
            name="country"
            value={this.state.selectedPeriod}
            className="filter-year year-item"
            placeholder="Año 2017"
            arrowRenderer={null}
            clearable = {false}
            onChange={this.handleChangeDate}
            options={this.state.years}
        />
      </div>
    )
  }

  render() {
    if (this.state.loading) {
      return 'LOADING...'
    }
    const comparisonData = [[], [], [], []]
    const comparisonLabels = []
    const histogramData = [[], []]
    let histogramLabels = []

    this.state.data.comparison.forEach((row) => {
      comparisonLabels.push(row.category_name)
      comparisonData[0].push(this.state.chartType === 'hours'
        ? row.billable_duration
        : row.billed_rate
      )

      comparisonData[1].push(this.state.chartType === 'hours'
        ? row.average_billable_duration
        : row.average_billed_rate
      )

      comparisonData[2].push(this.state.chartType === 'hours'
        ? row.billed_duration
        : row.standard_rate
      )

      comparisonData[3].push(this.state.chartType === 'hours'
        ? row.average_billed_duration
        : row.average_standard_rate
      )
    })

    if (this.state.chartType === 'hours') {
      data.histogram.billable_duration.data.forEach((row) => {
        histogramLabels.push(row[0])
        histogramData[0].push(row[1])
      })

      data.histogram.billed_duration.data.forEach((row) => {
        histogramLabels.push(row[0])
        histogramData[1].push(row[1])
      })
    } else {
      data.histogram.billed_rate.data.forEach((row) => {
        histogramLabels.push(row[0])
        histogramData[0].push(row[1])
      })

      data.histogram.standard_rate.data.forEach((row) => {
        histogramLabels.push(row[0])
        histogramData[1].push(row[1])
      })
    }

    histogramLabels = orderBy(uniq(histogramLabels))


    return (
      <div className="container-statistics">
        <div className="Tooltip">
        </div>
        <div className="statistics-top">
          <p className="statistics-title">5rabbits</p>
          <div className="help-structure">
            <p className="statistics-help">Ayuda</p>
            <i className="fa fa-question-circle statistics-help-icon" data-tip="React-tooltip" aria-hidden="true"></i>
            <ReactTooltip place="left" type="info" effect="solid">
              <p className="help-title">HORAS</p>
              <p className="help-text">Las actividades te permitiran organizar los trabajos que ingreses por tipos. Podrás asignar estas actividades desde los proyectos.</p>

              <p className="help-title">TARIFAS</p>
              <p className="help-text">Debes agregar las categorias desde los proyectos. Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed.</p>
            </ReactTooltip>
          </div>
          <p className="statistics-subtitle">Índices para uso de mercado</p>
          <p className="statistics-description"></p>
        </div>
        <hr className="statistics-divider" />
        <div className="App">
          <div className="Panel panel-table">
            <div className="select-content">
              <div className="Select country">
                  {this.buildCountry()}
              </div>
              <div className="filter-container">
                  {this.buildFilterYear()}
              </div>
            </div>
            <div className="select-table">
              <div className="inline-display c1">
                <div className="inline-display statistics-category">CATEGORÍAS</div>
              </div>
              <label className="inline-display c2 statistics-top-table">
                <input type="radio" value="hours" name="chart_type"
                  checked={this.state.chartType === 'hours'} onChange={this.handleChartTypeChange}/>
                HORAS
              </label>
              <label className="inline-display c3 statistics-top-table">
                <input type="radio" value="rates" name="chart_type"
                  checked={this.state.chartType === 'rates'} onChange={this.handleChartTypeChange}/>
                TARIFAS
              </label>
            </div>
            <Table data={this.state.data.comparison}/>
          </div>
          <div className="Chart_grid">
            <div className="Panel">
              <p className="chart-title">COMPARACIÓN DE CATEGORÍAS</p>
              <BarChart
                data={comparisonData}
                chartType={this.state.chartType}
                labels={comparisonLabels}
               />
            </div>
            <div className="Panel">
              <p className="chart-title">POSICIÓN EN EL MERCADO</p>
              <LineChart
                data={histogramData}
                chartType={this.state.chartType}
                labels={histogramLabels}
                highlightIndices={[2, 4]}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { App }
