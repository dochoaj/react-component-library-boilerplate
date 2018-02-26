import React, { Component } from 'react'
import App from './App'

class Main extends Component {

  constructor(props) {
    super(props)
    this.state ={
      url: 'http://donut-app.5rabbits.com/api/v1/comparison',
      tenant_country:  {
        "name": "Perú",
        "code": "PE"
        },
      countries: [
        {
          "name": "Chile",
          "code": "CL"
        },
        {
          "name": "Costa Rica",
          "code": "CR"
        },
        {
          "name": "Perú",
          "code": "PE"
        },
        {
          "name": "Uruguay",
          "code": "UY"
        }
      ],
      tenant: "cpb",
      product: "ttb",
      period_detail: "2017"
    }
  }

  render() {
    return(
        <App url={this.state.url}
          tenant_country={this.state.tenant_country}
          countries={this.state.countries}
          tenant={this.state.tenant}
          product={this.state.product}
          period={this.state.period_detail}/>
    )
  }
}

export default Main