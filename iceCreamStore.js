var iceCreams = ["Vanilla", "Pistachio", "Chocolate", "Mint", "Coffee", "Salted Caramel", "Butterscotch", "Rocky Road", "Green Tea", "Peanut Butter Fudge"]


class IceCreamShop extends React.Component {
  constructor() {
    super()
    var newIceCreams = iceCreams.map((cream) => {
      var randomNum = Math.floor(Math.random() * 5 + 1);
      return { creamName:cream , randomNum }
    })
    this.state = {
      availableCreams: newIceCreams,
      cost: 0,
      cartedCreams: {}
    };
  }
  removeCream(name, price) {
    var newCartedCreams = this.state.cartedCreams;
    if(newCartedCreams[name] && newCartedCreams[name] > 0){
      newCartedCreams[name] -= 1;
      this.setState({
        cartedCreams: newCartedCreams,
        cost: this.state.cost - price
      }) 
    }
  }
  addCream(name, price) {
    var newCartedCreams = this.state.cartedCreams;
    if(!newCartedCreams[name]) {
      newCartedCreams[name] = 1
    } else {
      newCartedCreams[name] += 1
    }
    this.setState({
      cartedCreams: newCartedCreams,
      cost: this.state.cost + price
    })
  }
  renderIceCreams() {
     return this.state.availableCreams.map((cream, i) => {
       console.log(cream)
       return (
         <div key={i}>
           <div style={{ border: '1px solid black', width: '100px'}}>
             {cream.creamName} cost:{cream.randomNum}
             <div onClick={() => { this.addCream(cream.creamName, cream.randomNum) }} style={{cursor: 'pointer'}}>+</div>
             <div onClick={() => { this.removeCream(cream.creamName, cream.randomNum) }} style={{cursor: 'pointer'}}>-</div>
            </div>
         </div>
       )
    })
  }
	render() {
  	return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>{this.renderIceCreams()}</div>
         Your Total:{this.state.cost}
      </div>
    )
  }
}
React.render(<IceCreamShop />, document.getElementById('container'))



/** UNCOMMENT TO USE ANGULAR:
function Ctrl($scope) {
  $scope.title = "Welcome to my Ice Cream Shop!"
}
********************************/
