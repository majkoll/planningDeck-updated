import React, { Component } from 'react'
import Card from './card/Card'
import Waiting from './waiting/Waiting'

import './PlanningDeck.css'

class PlanningDeck extends Component {
	
	state = this.props.state

	/**
	* cardSelection function
	* @param value
	* This function
	**/
	cardSelection = (value) => {
		this.setState({
			selectedCard: value
		})
		setTimeout(() => {
			if (this.state.selectedCard) {
				this.setState({
					phase: 'waiting'
				})
			}
		}, 100)
	}

	updatePlayerCard = (players, num, index) => {
		//console.log(players, num, index)
		this.setState({
			players
		})

		if ((index + 1) === num) {
			this.setState({
				playersReady: true
			})
		}
	}

	render() {
		// Set up the users cards for the select phase
		let cards = this.props.deck.cards.map((card, index) => {
			let active = (card === this.state.selectedCard ? true : false)
			return <Card card={card} key={index} onClick={this.cardSelection} active={active} />
		})

		return (
			<div className="PlanningDeck">
				{this.state.phase === 'select' && (
					<div className="cards">
						{cards}
					</div>
				)}
				{this.state.phase === 'waiting' && (
					<Waiting playersReady={this.state.playersReady} deck={this.props.deck} players={this.state.players} userCard={this.state.selectedCard} updatePlayerState={this.updatePlayerCard} />
				)}
			</div>
		)
	}
}

export default PlanningDeck

PlanningDeck.propTypes = {
	state: React.PropTypes.object.isRequired,
	deck: React.PropTypes.object.isRequired
}