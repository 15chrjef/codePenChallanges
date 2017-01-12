// The back of the cards
const POKEBALL = "http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest"

// The front of the cards
const cards =[
   "http://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png"
  ,"http://cdn.bulbagarden.net/upload/thumb/3/3e/039Jigglypuff.png/250px-039Jigglypuff.png"
  ,"http://cdn.bulbagarden.net/upload/4/41/130Gyarados.png"
  ,"http://cdn.bulbagarden.net/upload/thumb/7/78/150Mewtwo.png/250px-150Mewtwo.png" 
 ];

 const shuffleCards = (cardsToDuplicate) => {
    var duplicatedCards = cardsToDuplicate.slice();
    var shuffledCurrentIndex = duplicatedCards.length;   
    while(shuffledCurrentIndex > 0) {
      var randomInt = Math.floor(Math.random() * shuffledCurrentIndex);      
      var tempVal = duplicatedCards[randomInt];
      var swappedVal = duplicatedCards[shuffledCurrentIndex -1];
      duplicatedCards[randomInt] = swappedVal;
      duplicatedCards[shuffledCurrentIndex -1] = tempVal;
      shuffledCurrentIndex --;
    }
    return duplicatedCards
  }

const shuffledMappedCards = shuffleCards(cards.concat(cards))
.map( (card, i) => {
  return {
    src: card,
    flipped: false, 
    id: i + card.substr(card.length -5, 1), 
    groupId: card.substr(card.length -5, 1), 
  }
});

class Card extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showed: true
    }
  }
  componentWillMount() {
    setTimeout(() => this.setState({ showed: '' }), 2000)
  }
  handleClick(id, groupId) {
    if(this.props.cardsSelected.length < 2){
      this.props.handleClick(id,groupId)
    }
  }
  render() {
    var image, style;
    const { cardsSelected, bannedIds } = this.props;
    const { src, id, groupId } = this.props.data;
    image = cardsSelected.indexOf(id) !== -1 || this.state.showed ?  src : POKEBALL;
    style = bannedIds.indexOf(groupId) !== -1 ? styles.bannedCardStyle : styles.cardStyle;
    return(
      <div>
         <div onClick={() => this.handleClick(id, groupId)} style={style}>
          <img style={{width: 200}} src={image}/>
         </div>
      </div>
    )
  }
}

class Board extends React.Component {
  constructor() {
    super()
    this.state={
      cardData: shuffledMappedCards,
      cards: '',
      flips: 0,
      cardsSelected: [],
      bannedIds: []
    }
  }
  componentWillMount() { 
    this.renderCards()
  }
  renderCards() {
    var myCardData = this.state.cardData;
    var myCards = myCardData.map( (card, i) => (
        <Card 
          handleClick={this.cardWasClicked.bind(this)}  
          data={card}
          key={i}
          cardsSelected={this.state.cardsSelected}
          bannedIds={this.state.bannedIds}
        /> 
      )
    )
    this.setState({ cards: myCards })
  }
  cardWasClicked(id, groupId) {
    const { cardsSelected, bannedIds, flips } = this.state;
    if(cardsSelected.length === 0){
      this.setState({
        cardsSelected: [id]
      })
      setTimeout(() => this.renderCards(),1)
  } else {
      var newSelectedCards = cardsSelected;
      newSelectedCards.push(id)
      this.setState({ cardsSelected: newSelectedCards })
      setTimeout( () => {
        if(cardsSelected[0].slice(1) === groupId) {
          var newBannedIds = bannedIds;
          newBannedIds.push(groupId);
          this.setState({ bannedIds: newBannedIds });
        }
        this.setState({
          flips: flips + 1,
          cardsSelected: []
        })
        setTimeout(() => this.renderCards(),1)
      }, 1000)
    }    
  }
  renderScore() {
    const { bannedIds, flips } = this.state;
    if( bannedIds.length < 4){
      return <div style={{display: 'none'}}>Your Counter: {flips}!</div>
    } else {
      return <div style={{fontSize: 30, fontWeight: 'bold'}}>Your Score: {flips} !</div>
    }
  }
  render() {
    return(
      <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems:'center'}}>
        <div>Welcome To the Grand Finale of Pokemon Concentration sponsored by Affinity!</div>
        {this.renderScore()}
        <div style={{ width: 1000, flexWrap: 'wrap', display: 'flex', flexDirection: 'row'}}>
          {this.state.cards}
        </div>
      </div>
    )
  }  
}


const styles = {
  cardStyle:{
    cursor: 'pointer', 
    border: '1px solid black', 
    padding: 10,
    margin: 10
  },
  bannedCardStyle:{
    display: 'none'
  }
}

React.render(<Board />, document.getElementById('container'))
