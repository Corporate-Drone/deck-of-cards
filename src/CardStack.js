import axios from 'axios';
import Card from './Card';
import './CardStack.css';
import React, { Component } from 'react';

class CardStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remaining: 0,
            deckId: "",
            cards: []
        };
        this.getCard = this.getCard.bind(this);
    }

    //create deck
    async componentDidMount() {
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle'
        let response = await axios.get(url);
        this.setState({
            remaining: response.data.remaining,
            deckId: response.data.deck_id
        });
    }

    //get card and add to state
    async getCard() {
        const url = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`
        try {
            let response = await axios.get(url);
            let newCard = response.data.cards
            if (!response.data.success) {
                throw new Error("No more cards remaining!")
            }
            this.setState({
                remaining: response.data.remaining,
                cards: [...this.state.cards, newCard[0]]
            });
        } catch (error) {
            alert(error);
        }
    }


    render() {
        const cards = this.state.cards.map(card => (
            <Card key={card.code} image={card.image} alt={card.suit} />
        ))
        return (
            <div className='CardStack'>
                <h1 className='CardStack-title'>♦ Card Dealer ♦</h1>
                <h2 className='CardStack-title subtitle'>
                    ♦ A demo made with React ♦
                </h2>
                <button className='CardStack-btn' onClick={this.getCard}>
                    Get a card!
                    </button>
                <div className='CardStack-cardarea'>{cards}</div>
            </div>
        )
    }
}

export default CardStack;