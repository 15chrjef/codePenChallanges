// Fetch the top 1000 US cities by population json from this url and create a typeahead to filter by city or state name

// each city should be a <li> in the suggestions <ul>

// there is a span class of `hl` to highlight matchesasdfasd

// Demo: http://wes.io/fAksasdfasdfasdfasd

var url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
// Good luck! 

class App extends React.Component {
  constructor(){
    super()
    this.state={ 
      data: [],
      text: ''
    };
  }
  componentDidMount(){
    axios.get(url)
    .then((data) => this.setState({data: data.data.slice(0,100)}))
  }
  handleChange(e){
    this.setState({ text: e.target.value })
  }
  renderRows() {
    const { text } = this.state;
    var stuff = this.state.data.filter( (data, i) => {
      var realData = data.city + data.state
      for(var i = 0; i< realData.length; i++) {
        var possibleText = realData.substr(i, text.length)
        console.log('possibleText', possibleText, 'text', text, realData[i], text[i] )
        if(realData[i] === text[0] && possibleText === text ) {
          'asdf'
          return true
        }                 
      }
      return false
    }).map((data, i) => {
      var city1,city2,city3,state1,state2,state3
      for(var i = 0; i < data.city.length; i++) {
        if(data.city[i] === text[0] && data.city.substr(i, text.length) === text) {
          city1 = data.city.substr(0, i)
          city2 = data.city.substr(i, text.length)
          city3 = data.city.substr(i+ text.length)
        }
      }
      for(var j = 0; j < data.state.length; j++) {
        if(data.state[j] === text[0] && data.state.substr(j, text.length) === text) {
          state1 = data.state.substr(0, j)
          state2 = data.state.substr(j, text.length)
          state3 = data.state.substr(j + text.length)
        }
      }
      console.log('city2', city2, 'state2', state2)
      var myCity = city2 ? (<p style={{...mainStyle, flexDirection: 'row'}}><p>{city1}</p><p style={{backgroundColor: 'yellow'}}>{city2}</p><p>{city3}</p></p>) : data.city;
      var myState = state2 ? (<p style={{...mainStyle, flexDirection: 'row'}}><p>{state1}</p><p style={{backgroundColor: 'yellow'}}>{state2}</p><p>{state3}</p></p>): data.state;
      return (
        <div style={{backgroundColor: 'white', width: '100%', ...mainStyle, width: '25%', marginBottom: '5px', flexDirection: 'row'}} key={i}>
          {myCity}, {myState}
        </div>
      )
    })
    console.log('stufffff', stuff) 
    return stuff
  }
  render() {
    // console.log('thisssdada', this.state.data && this.state.data[0])sadasdas
    return (
      <div>
        <form className="search-form">
          <input type="text" value={this.state.text} onChange={this.handleChange.bind(this)} className="search" placeholder="City or State"/>
          <ul className="suggestions">
            <li>Filter for a city</li>
            <li>or a state</li>
          </ul>
         </form>
        <div style={{...mainStyle, flexDirection: 'column', marginTop: '-25px'}}>
          {this.renderRows()}
        </div>
      </div>
    )
  }
}

var mainStyle ={
  display:'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
}
ReactDOM.render(<App/>, document.getElementById('container'))
