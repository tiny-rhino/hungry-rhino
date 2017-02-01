import React, { Component } from 'react'
import { render } from 'react-dom'
import $ from 'jquery'

import List from './components/list'
import dummyOrders from './components/dummy'
import utils from './tools/utils'

socket.onopen = () => { socket.send(JSON.stringify({})) }
if (socket.readyState == WebSocket.OPEN) socket.onopen()

class OrderList extends Component {
	constructor(props) {
		super()
		this.state = { orders: [], status: ['new', 'processing', 'done', 'removed'], loading: true }
	}

	componentDidMount() {
		socket.onmessage = (res) => {
			let data = JSON.parse(res.data)
			this.handleData(data)
		}
	}

	handleData(data) {
		let orders = utils.dictArrayByValueInObj(data, 'state')
		this.setState({ orders, loading: false })
	}

	updateState(id, state, forward) {
		const { status } = this.state
		let direction = forward ? 1 : -1
		let index = status.indexOf(state) + (direction * 1); 
		let newState = status[index]
		console.log(JSON.stringify({ id, newState }));
		socket.send(JSON.stringify({ id, state: newState }))
	}

	render() {
		const { orders } = this.state
		return (
			<div className='lists'>
				<List items={orders.new} list='New Orders' clickedItem={this.updateState.bind(this)} />
				<List items={orders.processing} list='Processing Orders' clickedItem={this.updateState.bind(this)} />
				<List items={orders.done} list='Done Orders' clickedItem={this.updateState.bind(this)} />
			</div>
		)
	}
}

render(
	<OrderList orders={dummyOrders} />,
	document.getElementById('order-list')
)