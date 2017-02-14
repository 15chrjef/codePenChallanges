const ProductImage = (props) => {
  const { color, src } = props
  return (
    <div> 
      <i style={{
          color, 
          fontSize: '180px', 
          paddingLeft: '20px', 
          paddingRight: '20px',
          border: '1px solid black'
         }} 
        className={src}/>
    </div>
  )
}

const ColorSelector = (props) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div>Select A Color</div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <p 
          onClick={() => props.changeColor('black')}
          style={{height: '20px', width: '20px', backgroundColor: 'black', cursor: 'pointer'}}
        />
        <p 
          onClick={() => props.changeColor('blue')}
          style={{height: '20px', width: '20px', backgroundColor: 'blue', cursor: 'pointer'}}
        />
        <p 
          onClick={() => props.changeColor('yellow')}
          style={{height: '20px', width: '20px', backgroundColor: 'yellow', cursor: 'pointer'}}
        />
        <p 
          onClick={() => props.changeColor('red')}
          style={{height: '20px', width: '20px', backgroundColor: 'red', cursor: 'pointer'}}
        />
      </div>
    </div>
  )
}

const ProductInfo = (props) => {
  var content;
  if(props.showInfo === 'description') {
    content = <div>{props.description}</div>
  } else {
    var content = props.reviews.map((review) => <div>{review}</div>)
  }
  
  return (
    <div>
      <h1>{props.name}</h1>
      <h4>Price: ${props.price}.00</h4>
      <button>Buy it Now</button>
      <select onChange={ (e) => props.handleSelect(e)}>
        <option value="reviews">Reviews</option>
        <option value="description">Description</option>
      </select>
      {content}
    </div>
  )
}


class App extends React.Component{
  constructor (){
    super()
    this.state={
      name: 'SpinningWidget',
      color: 'black',
      reviews: [],
      description: 'an amazing spinner',
      price: '10',
      showInfo: 'reviews',
      text: ''
    }
  }
  changeColor(color) {
    this.setState({color})
  }
  handleSelect(e) {
    this.setState({ showInfo: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    var text = this.state.text;
    var arr = this.state.reviews.slice();
    arr.push(text)
    this.setState({
      reviews: arr,
      text: ''
    })
  }
  handleChange(text) {
    this.setState({ text: text.target.value })
  }
  render(){
    const { name, reviews, color, price, description, showInfo } = this.state
    return (
      <div style={{display:'flex', flexDirection: 'row' }}>
        <div style={{marginRight: '80px'}}>
          <ProductImage
            src='ion-ios-game-controller-a'
            color={color}
          />
          <ColorSelector changeColor={this.changeColor.bind(this)}/>
        </div>
        <div>
           <ProductInfo 
             showInfo={showInfo} 
             handleSelect={this.handleSelect.bind(this)} 
             name={name}
             reviews={reviews} 
             description={description}
             color={color} 
             price={price}
           />
          <form onSubmit={this.handleSubmit.bind(this)}>
           <input 
            onChange={this.handleChange.bind(this)}
            value={this.state.text}
            type='text'
           />
           <input onSubmit={this.handleSubmit} type='submit'/>
          </form>
        </div>
      </div>
    ) 
  }
}


ReactDOM.render(<App/>, document.getElementById('container'))
