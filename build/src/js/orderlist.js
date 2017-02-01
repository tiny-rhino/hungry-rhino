import React, { Component } from 'react'
import { render } from 'react-dom'

import List from './components/list'
import dummyOrders from './components/dummy'

class OrderList extends Component {
	constructor(props) {
		super()
		this.state = { orders: [] }
	}

	componentDidMount() {
		const { orders } = this.props
		this.setState({ orders })
	}

	render() {
		const { orders } = this.state
		return (
			<div id='order-list'>
				<List items={orders} list='new orders' />
				<List items={orders} list='processing orders' />
				<List items={orders} list='done orders' />
			</div>
		)
	}
}

render(
	<OrderList orders={dummyOrders} />,
	document.getElementById('order-list')
)