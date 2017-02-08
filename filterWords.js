class App extends React.Component {
  state = { text: '' , results: ['cs', 'baseball', 'hello', 'for', 'horse', 'he', 'd', 'a', 'q', 'o']};
  handleChange(e){
    this.setState({text: e.target.value})
  }
  renderResults() {
    const { text, results } = this.state;
    return results.filter((result) => (
      result.substr(0, text.length) === text
    )).map((realResult, i) => (
      <div style={{borderBottom: '1px solid black', marginBottom: '5px'}}key={i}>{realResult}</div>
    ))
  }
  render() {
    return (
      <div style={{width:'130px'}}>
        <input 
          onChange={this.handleChange.bind(this)}
          type='text'
        />
        {this.renderResults()}
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('container'));
