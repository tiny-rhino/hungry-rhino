import React, { Component } from 'react'
import { getOrder } from '../tools/utils'

let socket = new WebSocket('ws://' + window.location.host + '/dashboard/')

export default class NotificationBar extends Component {
	constructor() {
		super()
		this.state = { status: ''}
	}

	componentDidMount() {
		socket.onmessage = (res) => {
			let data = JSON.parse(res.data)
			let order = getOrder(data, orderId)
			this.setState({ status: order.state })
			
			this.timeoutNotification()
		}
	}

	timeoutNotification() {
		this.props.el.classList.add('visible')
		let notification = setTimeout(() =>{
			const bar = this.props.el
			bar.classList.remove('visible')
		}, 5000)
		clearTimeout(notification)
	}

	render() {
		const { status } = this.state
		return (
			<div className={status}>
				<p>Your order status is now: {status}</p>
			</div>
			)
	}
}