import React, { Component } from 'react';
import axios from 'axios';

// styles
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currency: [],
      filterCurrency: [],
      rateValue: [],
    };
  }

  componentDidMount() {
    const baseUrl =
      'https://api.currencyfreaks.com/latest?apikey=447fd2eca99c4e77bdba23430647623f';

    const selectedCurrency = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];
    const filteredData = [];

    axios
      .get(baseUrl)
      .then((response) => {
        const rateCurrency = response.data.rates;
        if (rateCurrency) {
          const converted = Object.keys(rateCurrency).map((key) => [
            key,
            rateCurrency[key],
          ]);
          this.setState({ currency: converted });
        }
        if (this.state.currency.length !== 0) {
          this.state.currency.map((val) => {
            const filtered = selectedCurrency.includes(val[0]);
            if (filtered === true) {
              filteredData.push(val);
              this.setState({ filterCurrency: filteredData });
            }

          });
        }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }

  render() {

    return (
      <div className='App'>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filterCurrency
              ? this.state.filterCurrency.map((val, key) => {
                  const rateValue = (5 / 100) * val[1];
                  const exchangeRates = parseFloat(val[1]);
                  return (
                    <tr key={key}>
                      <td>{val[0]}</td>
                      <td>{exchangeRates + rateValue}</td>
                      <td>{val[1]}</td>
                      <td>{exchangeRates - rateValue}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <footer className='notes'>
          <p>Rated are based from 1 USD.</p>
          <p>This application uses API from https://currencyfreaks.com.</p>
        </footer>
      </div>
    );
  }
}
