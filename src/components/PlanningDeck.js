import React, { Component } from 'react'
import update from 'react-addons-update'

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
		this.setState({
			players
		})

		if ((index + 1) === num) {
			setTimeout(() => {
				this.setState({
					phase: 'reveal'
				})
			}, 500)
		}
	}

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
		// Set up the users cards for the select phase
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

PlanningDeck.propTypes = {
	state: React.PropTypes.object.isRequired,
	deck: React.PropTypes.object.isRequired
}