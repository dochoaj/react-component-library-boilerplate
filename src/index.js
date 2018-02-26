import React from 'react';
import ReactDOM from 'react-dom';
import { Donut } from './App';
import './index.css';

const settings = {
  url: 'http://donut-app.5rabbits.com/api/v1/comparison',
  tenant_country: {
    name: 'Perú',
    code: 'PE',
  },
  countries: [
    {
      name: 'Chile',
      code: 'CL',
    },
    {
      name: 'Costa Rica',
      code: 'CR',
    },
    {
      name: 'Perú',
      code: 'PE',
    },
    {
      name: 'Uruguay',
      code: 'UY',
    },
  ],
  tenant: 'cpb',
  product: 'ttb',
  period_detail: '2017',
}

ReactDOM.render(
  <Donut url={settings.url}
         tenant_country={settings.tenant_country}
         countries={settings.countries}
         tenant={settings.tenant}
         product={settings.product}
         period={settings.period_detail} />,
  document.getElementById('root')
);
