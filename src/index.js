import React from 'react';
import { render } from 'react-dom';
import PlanningDeck from './components/PlanningDeck'
import './index.css';

// The apps state. Phase is used for rendering changes, from select phase to waiting, and from waiting to reveal. 
// I put players ins state, since they will select a card, and I want to do render changes when they do select a card.
// Last is selectedCard for the user. 
const state = {
	phase: 'select',
	players: [
		{
			id: 101,
			nickname: 'Mr Pink',
			role: 'Team Leader',
			selectedCard: null
		}, 
		{
			id: 102,
			nickname: 'Mr Green',
			role: 'Backend developer',
			selectedCard: null
		},
		{
			id: 103,
			nickname: 'Mr Yellow',
			role: 'Product owner',
			selectedCard: null
		},
	],
	selectedCard: null
}

// The planning deck
const deck = {
	cards: ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'coffee', 'questionMark']
}

// External stylesheets used.
const stylesheets = [
	'https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700'
]

// loadCss 
const loadCss = (url) => new Promise((resolve, reject) => {
	let link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = url
	link.onload = () => resolve()
	link.onerror = () => reject()
	document.getElementsByTagName('head')[0].appendChild(link)
})

// Load all external css files async
Promise.all(stylesheets.map(loadCss)).then(() => {
	render((
		<PlanningDeck state={state} deck={deck} />
	), document.getElementById('planningDeck'))	
})
