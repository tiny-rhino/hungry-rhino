import React, { Component } from 'react'
import { render } from 'react-dom'
import NotificationBar from './components/notification-bar'
import { getOrder } from './tools/utils'

render(
	<NotificationBar el={document.getElementById('notification-bar')} />,
	document.getElementById('notification-bar')
)

let socket = new WebSocket('ws://' + window.location.host + '/dashboard/')

const stateElm = document.getElementById('state')

socket.onmessage = (res) => {
	let data = JSON.parse(res.data)
	let order = getOrder(data, orderId)

	stateElm.innerText = order.state
	stateElm.classList = order.state
}
