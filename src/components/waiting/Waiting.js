import React, { Component } from 'react'
import update from 'react-addons-update'
import Card from '../card/Card'
import Spinner from '../player/player-selecting.gif'

import './Waiting.css'

class Waiting extends Component {
	
	componentDidMount() {
		// When this component is ready, I loop through every teamMember that is playing the game.
		// Each of the will select a card
		this.props.players.forEach((player, index) => {
			// Fake that the players will take a different amount of time do select a card.
			setTimeout(() => {
				// function that let's the team members select a card
				this.playersSelectCard(index)		
			}, (index+1) * 1000)
		})
	}
	
	flip = () => {
		console.log('flip')
	}

	/*
	* This function let's each team member select a card from the deck.
	*/
	playersSelectCard = ( index ) => {
		let cards = this.props.deck.cards, // set all card values to string
			value = cards[Math.round(Math.random() * (12 - 0) + 0)], // randomise a card that the team members select
			players	= this.props.players // current team members are saved,

		// update team members state selectedCard. It's null from the beginning but will now get a value.	
		players[index] = update(players[index], {selectedCard: {$set: value}})
		
		this.updatePlayerState(players, players.length, index)
	}

	/*
	* This function calls a function in the parent component, that will update the applications state. 
	* In this case, the team members selected card state
	*/
	updatePlayerState = ( value, numberOfTeamMembers, index ) => {
		this.props.updatePlayerState(value, numberOfTeamMembers, index)
	}

	render() {
		let userCards = this.props.players.map((player, index) => {
			if (player.selectedCard) {
				return <Card key={index} card={player.selectedCard} player={player.nickname} playersReady={this.props.playersReady} />
			} else {
				return <div className="spinnerContainer"><img src={Spinner} alt="spinner" key={index} /></div>
			}
		})
		return (
			<div>
				Waiting
				<div className="cards">
					<Card playersReady={this.props.playersReady} card={this.props.userCard} key='user' player='User' />
					{userCards}
				</div>
			</div>
		)
	}
}

export default Waiting

Waiting.propTypes = {
	players: React.PropTypes.array.isRequired,
	updatePlayerState: React.PropTypes.func.isRequired,
	deck: React.PropTypes.object.isRequired,
	userCard: React.PropTypes.string.isRequired,
	playersReady: React.PropTypes.bool.isRequired
}