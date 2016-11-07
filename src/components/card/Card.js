import React, { Component } from 'react'
import classNames from 'classnames'

import logo from './chas-logo.png'
import './Card.css'

class Card extends Component {

	clickHandler = (e) => {
		this.props.onClick(e.target.id)	
	}
	
	render() {

		let typeOfCard = this.props.card,
			selectCard = (this.props.onClick) ? 'select' : '',
			hover = (this.props.playersReady === 'reveal') ? 'hover' : '',
			active = (this.props.active) ? 'active' : '',
			classes = classNames('Card', selectCard, active, hover),
			output = (typeOfCard === 'questionMark') ? '?' : typeOfCard,
			player = <p className="player">{this.props.player}</p>

		if (this.props.onClick) {
			return (
				<div id={typeOfCard} className={classes} onClick={this.clickHandler}>
					<p>{ output }</p>
				</div>
			)
		} else {
			return (	
				<div id={typeOfCard} className={classes}>
					<div className="flipper">
						<div className="front">
							<p>{output}</p>
						</div>
						<div className="back">
							<img src={logo} alt="Chas logotype" />
						</div>
					</div>
					{player}
				</div>
			)	
		}
		
	}
}

export default Card

Card.propTypes = {
	onClick: React.PropTypes.func,
	card: React.PropTypes.string,
	active: React.PropTypes.bool,
	player: React.PropTypes.string,
	playersReady: React.PropTypes.string
}