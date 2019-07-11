import React, { Component } from 'react'
import axios from 'axios'

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
        throw new Error('No cards remaining!') // Display error once all cards have been drawn
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
      alert(err)
    }
  }

  render() {
    return (
      <div>
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get Card!</button>
      </div>
    );
  }
}

export default Deck;