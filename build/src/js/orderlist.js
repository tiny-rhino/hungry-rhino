import React, { Component } from 'react'
import { render } from 'react-dom'
import $ from 'jquery'

import List from './components/list'
import utils from './tools/utils'

let socket = new WebSocket('ws://' + window.location.host + '/dashboard/')

class OrderList extends Component {
	constructor() {
		super()
		this.state = { orders: [], status: ['new', 'processing', 'done', 'removed'], loading: true }
	}

	componentDidMount() {
		socket.onmessage = (res) => {
			let data = JSON.parse(res.data)
			this.handleOrders(data)
		}
	}

	handleOrders(data) {
		let orders = utils.dictArrayByValueInObj(data, 'state')
		this.setState({ orders, loading: false })
	}

	updateState(id, state, forward) {
		const { status } = this.state
		let direction = forward ? 1 : -1
		let index = status.indexOf(state) + (direction * 1); 
		let newState = status[index]
		socket.send(JSON.stringify({ id, state: newState }))
	}

	render() {
		const { orders } = this.state
		return (
			<div className='lists'>
				<List items={orders.new} 
					list='New Orders' 
					clickedItem={this.updateState.bind(this)} />
				<List items={orders.processing} 
					list='Processing Orders' 
					clickedItem={this.updateState.bind(this)} />
				<List items={orders.done} 
					list='Done Orders' 
					clickedItem={this.updateState.bind(this)} />
			</div>
		)
	}
}

render(
	<OrderList />,
	document.getElementById('order-list')
)