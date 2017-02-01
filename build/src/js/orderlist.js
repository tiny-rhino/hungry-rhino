import React, { Component } from 'react'
import { render } from 'react-dom'
import $ from 'jquery'

import List from './components/list'
import dummyOrders from './components/dummy'
import utils from './utils'

class OrderList extends Component {
	constructor(props) {
		super()
		this.state = { orders: [] }
	}

	componentDidMount() {
		let orders = utils.dictArrayByValueInObj(dummyOrders, 'state')
		this.setState({ orders })
	}

	render() {
		const { orders } = this.state
		return (
			<div className='lists'>
				<List items={orders.new} list='New Orders' clickedItem={this.clickedItem} />
				<List items={orders.processing} list='Processing Orders' />
				<List items={orders.done} list='Done Orders' />
			</div>
		)
	}

	clickedItem() {
		console.log('yo');
	}
}

render(
	<OrderList orders={dummyOrders} />,
	document.getElementById('order-list')
)