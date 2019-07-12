import React, { Component } from 'react';
import './Card.css'

//TODO: Add clean/align deck that stack the cards evenly (tranform back to 0)
class Card extends Component {
  constructor() {
    super()
    // Generates a random angle to display each card, one above the other
    let angle = Math.random() * 90 - 45
    let positionX = Math.random() * 40 - 20
    let positionY = Math.random() * 40 - 20
    this._transform = `translate(${positionX}px, ${positionY}px) rotate(${angle}deg)`
    //FIXME: Transfer angles from constructor to CDU or SCU 
  }
  render() {
    return (
      <img
        style={{ transform: this._transform }}
        className='Card'
        src={this.props.image}
        alt={this.props.name}
      />
    );
  }
}

export default Card;