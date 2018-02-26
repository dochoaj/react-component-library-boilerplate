import React, { Component } from 'react';
import './Table.css';
import PropTypes from 'prop-types'
import { formatMoney } from 'accounting';

class Table extends Component {
    static propTypes = {
        data: PropTypes.array
      }
  render() {
    return (
      
        <table className="table-width">
          <thead>
            <tr>
              <th className="statistics-head-table">
                NOMBRE
              </th>
              <th className="statistics-head-table">
                FACTURADAS
              </th>
              <th className="statistics-head-table">
                FACTURABLES
              </th>
              <th className="statistics-head-table">
                EFECTIVA
              </th>
              <th className="statistics-head-table">
                ESTÁNDAR
              </th>
            </tr>
          </thead>
          <tbody>
              {this.props.data.map((row, index) => {
                return (<tr key={index}>
                  <td>
                    {row.category_name}
                  </td>
                  <td>
                    {formatMoney(row.billed_duration, { symbol: ""})} / {formatMoney(row.average_billed_duration, { symbol: ""})}
                  </td>
                  <td>
                    {formatMoney(row.billable_duration, { symbol: ""})} / {formatMoney(row.average_billable_duration, { symbol: ""})}
                  </td>
                  <td>
                    {formatMoney(row.standard_rate, { symbol: "USD "})} / {formatMoney(row.average_standard_rate, { symbol: "USD "})}
                  </td>
                  <td>
                    {formatMoney(row.billed_rate, { symbol: "USD "})} / {formatMoney(row.average_billed_rate, { symbol: "USD "})}
                  </td>
                </tr>)
              })}
              
          </tbody>
        </table>
    );
  }
}

export default Table;