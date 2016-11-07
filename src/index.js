import React from 'react';
import { render } from 'react-dom';
import PlanningDeck from './components/PlanningDeck'
import './index.css';

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
	playersReady: false,
	selectedCard: null
}

const deck = {
	cards: ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'coffee', 'questionMark']
}
const stylesheets = [
	'https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700'
]

const loadCss = (url) => new Promise((resolve, reject) => {
	let link = document.createElement('link')
	link.rel = 'stylesheet'
	link.href = url
	link.onload = () => resolve()
	link.onerror = () => reject()
	document.getElementsByTagName('head')[0].appendChild(link)
})

Promise.all(stylesheets.map(loadCss)).then(() => {
	render((
		<PlanningDeck state={state} deck={deck} />
	), document.getElementById('planningDeck'))	
})

/*
ReactDOM.render(
  <PlanningDeck state={state} deck={deck} />,
  document.getElementById('planningDeck')
);*/
