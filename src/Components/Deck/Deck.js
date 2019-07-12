import React, { Component } from 'react'
import axios from 'axios'
import Card from '../Card/Card';
import './Deck.css'

const proxy = 'https://cors-anywhere.herokuapp.com/' //CORS error fix
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck'

class Deck extends Component {
  state = {
    deck: null,
    drawn: []
  }

  async componentDidMount() {
    let deck = await axios.get(`${proxy}${API_BASE_URL}/new/shuffle/`)
    this.setState({ deck: deck.data })
  }

  getCard = async () => {
    // make request using deck id
    let id = this.state.deck.deck_id

    try {
      let cardUrl = `${proxy}${API_BASE_URL}/${id}/draw/`
      let cardResponse = await axios.get(cardUrl)

      if (!cardResponse.data.success) {
        throw new Error('No cards remaining. You finished the deck!') // Display error once all cards have been drawn
      }

      let card = cardResponse.data.cards[0]

      this.setState({
        drawn: [
          ...this.state.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit} `
          }
        ]
      })
    } catch (err) {
      alert(err) //TODO: Display styled error message 
    }
  }

  render() {
    const cards = this.state.drawn.map(card => (
      <Card key={card.id} name={card.name} image={card.image} />
    ))
    return (
      <div className='Deck'>
        <h1 className='Deck-title'>♦ Card Dealer ♦</h1>
        <h2 className='Deck-title subtitle'>♦ Demo made with React ♦</h2>
        <button className='Deck-btn' onClick={this.getCard}>Get Card!</button>
        <div className='Deck-cardarea'>{cards}</div>
      </div>
    );
  }
}

export default Deck;