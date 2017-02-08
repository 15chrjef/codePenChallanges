const mainStyle = { 
  display:'flex', 
  alignItems: 'center', 
  justifyContent:'center'
}

const FizzCell = (props) => {
  let style;
  if(props.value === 'fizz'){
    style = { backgroundColor: 'green', color: 'white' }
  } else if (props.value === 'buzz') {
    style = { backgroundColor: 'blue', color: 'white' }
  } else if ( props.value === 'fizzbuzz') {
    style = { backgroundColor: 'gray', color: 'white' }
  }
  return (
    <div style={{
        border: '1px solid black', 
        height: '60px', 
        width: '60px', 
        display:'flex', 
        justifyContent: 'center', 
        ...style
      }}
     >
      {props.value}
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()
    let arr = [];
    for(var i = 1; i <= 50; i++) {
      if( i % 3 === 0 && i % 5 === 0) {
        arr.push('fizzbuzz');
      } else if( i % 3 === 0) {
        arr.push('fizz')
      } else if( i % 5 === 0) {
        arr.push('buzz')
      } else {
        arr.push(i)
      }
    }
    this.state = { arr };
  }
  renderFizzBuzz() {
    return this.state.arr.map((value, i) => <FizzCell value={value} key={i}/>)
  }
  render() {
    return (
      <div style={{...mainStyle, flexDirection:'column'}}>
        <div>FizzBuzz Vizual</div>
        <div style={{...mainStyle, width: '50%', flexWrap: 'wrap'}}>
          {this.renderFizzBuzz()}
        </div>
      </div>
     )
  }
}

ReactDOM.render(<App/>, document.getElementById('container'))

