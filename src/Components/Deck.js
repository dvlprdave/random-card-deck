import React, { Component } from 'react'
import axios from 'axios'

const API_BAE_URL = 'https://deckofcardsapi.com/api/deck'

class Deck extends Component {
  state = {
    deck: null
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BAE_URL}/new/shuffle`)
    this.setState({ deck: deck.data })
  }

  getCard = async () => {
    // make request using deck id
    let id = this.state.deck.deck.id
    let cardUrl = `${API_BAE_URL}/${id}draw/`
    let cardRes = await axios.get(cardUrl)
    console.log(cardRes);
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