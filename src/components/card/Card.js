import React, { Component } from 'react'
import classNames from 'classnames'

//import logo from './chas-logo.png'
import './Card.css'

class Card extends Component {

	clickHandler = (e) => {
		this.props.onClick(e.target.id)	
	}
	
	render() {

		let typeOfCard = this.props.card,
			active = (this.props.active) ? 'active' : '',
			classes = classNames('Card', typeOfCard, active),
			output = (typeOfCard === 'questionMark') ? '?' : typeOfCard,
			player = <p className="playersCard">{this.props.player}</p>

		return (
			<div>
				{this.props.onClick && (
					<li id={typeOfCard} className={classes} onClick={this.clickHandler}>
						<p>{ output }</p>
					</li>
				)}
				{!this.props.onClick && (
					<li id={typeOfCard} className={classes}>
						<p>{ output }</p>
					</li>
				)}
				{player}
			</div>
		)
	}
}

export default Card

Card.propTypes = {
	onClick: React.PropTypes.func,
	card: React.PropTypes.string,
	active: React.PropTypes.bool,
	player: React.PropTypes.string
}