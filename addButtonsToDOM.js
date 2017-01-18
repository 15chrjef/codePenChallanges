class App extends React.Component {
  constructor(){
    super()
    this.state = {
      buttons: [0]
    };
  }
  renderButtons(){
    return this.state.buttons.map((button, i) => {
      return <Button handleClick={this.incrementButtons.bind(this)} key={i}/>
    })
  }
  incrementButtons(i){
    var arr = this.state.buttons
    arr.push(0)
    arr[i] += 1;
    this.setState({
      buttons: arr
    }, this.renderButtons)
  }
  render() {
    return(
      <div>
        {this.renderButtons()}
      </div>
    )
  }
}

class Button extends React.Component {
  constructor(){
    super()
    this.state= { clicks: 0}
  }
  render(){
    return(
      <div  
        onClick={(e)=> {
          this.props.handleClick(e.target)
          this.setState({ clicks: this.state.clicks + 1})
        }}
        style={{cursor: 'pointer', border: '1px solid black'}}
       >
        {this.state.clicks}
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('container'))
