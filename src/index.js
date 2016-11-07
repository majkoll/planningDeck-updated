import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
  <PlanningDeck state={state} deck={deck} />,
  document.getElementById('planningDeck')
);
