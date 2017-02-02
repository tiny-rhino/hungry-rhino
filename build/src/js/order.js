let socket = new WebSocket('ws://' + window.location.host + '/dashboard/')

const stateElm = document.getElementById('state')

socket.onmessage = (res) => {
	let data = JSON.parse(res.data)
	let order = getOrder(data, orderId)
	
	stateElm.innerText = order.state
}

const getOrder = (orders, id) => {
	let obj = {}
	orders.filter((order) => {
		if (order.id == id) Object.assign(obj, order)
	})
	return obj
}