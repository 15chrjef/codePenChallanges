/* For Angular:
function Ctrl($scope) {
  $scope.title = "Currency Exchange"
}
*/
class CurrencyExchange extends React.Component {
  constructor(){
    super()
    this.state = {
      data: '',
      currency: '',
      amount: '',
      currencyList: ''
    }
  }
  componentWillMount() {
    axios.get('https://api.fixer.io/latest')
    .then((data) => { 
      this.setState({ data: data.data})
    })
  }         
  handleSubmit(e) {
    e.preventDefault()
    const { data, currency, amount } = this.state;
    var quantityExchanged = Number.isNaN(Number(amount)) === true || Number(amount) === 0? 1 : Number(amount);
    var currencyRates = data.rates
    var inputtedRateValue = currencyRates[currency.toUpperCase()]
    if(inputtedRateValue || currency.toUpperCase() === 'EUR') {
      var keys = Object.keys(currencyRates)
      var myCurrencies = keys.map((mappedCurrency, i) => {
        var mappedValue = currencyRates[mappedCurrency];
        if(currency.toUpperCase() === 'EUR'){
          inputtedRateValue = 1;
        }
        return (
          <div key={i}>
            <div> Currency Type: {mappedCurrency}</div>
            <div>{quantityExchanged * Number(mappedValue)/Number(inputtedRateValue)}</div>
          </div>
        )
      })
      this.setState({
        currencyList: myCurrencies
      })
    }
  }
  handleChange(e) {
    if(e.target.id === 'amount') {
      this.setState({
        amount: e.target.value
      })
    } else if(e.target.id === 'currency'){
      this.setState({
        currency: e.target.value
      })
    }
  }
  render() {
    return ( 
      <h1>
        Currency Exchange
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Amount</label>
          <input 
            onChange={this.handleChange.bind(this)}
            value={this.state.amount}
            id='amount' 
            type='text'
           />
          <label>Currency</label>
          <input 
            onChange={this.handleChange.bind(this)}
            value={this.state.currency}
            id='currency' 
            type='text'
           />
          <input type='submit'/>
        </form>
        {this.state.currencyList}
      </h1>
    )
    
  }
}

ReactDOM.render(<CurrencyExchange />, document.getElementById('container'))
