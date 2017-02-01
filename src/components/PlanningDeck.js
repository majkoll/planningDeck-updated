import React, { Component } from 'react'
import update from 'react-addons-update'

import Card from './card/Card'
import Waiting from './waiting/Waiting'

import './PlanningDeck.css'

class PlanningDeck extends Component {
	
	state = this.props.state

	componentDidMount() {
		this.setState({
			phase: this.state.phase || 'select'
		})
	}

	/**
	* cardSelection()
	* @param value
	* Set the state for users selectedCard so we can render a new phase
	**/
	cardSelection = (value) => {
		// Change selectedCards state to the selected cards value
		// And change the phase-state to waiting (waiting for other players to decide)
		this.setState({
			selectedCard: value,
			phase: 'waiting'
		})
	}

	/*
	* updatePlayerCard() 
	* @param players {object} - the players object
	* @param num  {number} - the number of players
	* @param index {number} - number of which iteration
	*
	* This function is sent down to the Waiting component as prop
	* It's run for every player that participate
	* updates the state of players. To be specific, the selecteCard value.
	*/
	updatePlayerCard = (players, num, index) => {
		this.setState({
			players
		})

		// if the iteration is the same as number of players, we know that all the 
		// players has selected a card, and we can go on to the reveal phase
		if ((index + 1) === num) {
			setTimeout(() => {
				this.setState({
					phase: 'reveal'
				})
			}, 500)
		}
	}

	/*
	* restartApplication()
	* Sets phase back to select and sets the users selectedCard back to null, and all players selected card back to null
	* So we can play again and again.
	*/
	restartApplication = () => {
		this.state.players.forEach((player, index) => {
			let players = this.state.players
			players[index] = update(players[index], {selectedCard: {$set: null}})
			this.setState({
				players
			})
		})
		this.setState({
			selectedCard: null,
			phase: 'select'
		})
	}

	render() {
		// Set up the deck of cards that the user can choose from
		let cards = this.props.deck.cards.map((card, index) => {
			let active = (card === this.state.selectedCard ? true : false)
			return <Card card={card} key={index} onClick={this.cardSelection} active={active} />
		})

		return (
			<div className="PlanningDeck">
				<div className="container">
					<header className="ppa-header">
						<h1>PlanningDeck</h1>
						<p>Phase: {this.state.phase}</p>
					</header>
					<article className="userStory">
						<header><p>Backlog case #1</p></header>
						<div className="case case-1">
							<header>
								<h3>Create a planning poker app</h3>
							</header>
							<div>	
								To better plan our resources, we need a fun and smooth way to estimate time and effort for our different cases in the backlog. Therefore, we need 
								to develop a planning poker application. 
							</div>
						</div>
					</article>
					{this.state.phase === 'select' && (
						<div className="cards">
							{cards}
						</div>
					)}
					{this.state.phase !== 'select' && (
						<Waiting playersReady={this.state.phase} deck={this.props.deck} players={this.state.players} userCard={this.state.selectedCard} updatePlayerState={this.updatePlayerCard} />
					)}
					{this.state.phase === 'reveal' && (
						<button className="phaseChangeButton" onClick={this.restartApplication}>Restart</button>
					)}
				</div>
			</div>
		)
	}
}

export default PlanningDeck

// Defining that this component always should get these props. Good for testing.
PlanningDeck.propTypes = {
	state: React.PropTypes.object.isRequired,
	deck: React.PropTypes.object.isRequired
}