import $ from 'jquery'

const user = document.querySelector('input#user')
const qtySelectors = document.querySelector('.qty')
const orderButton = document.querySelector('button[type=submit]')

orderButton.addEventListener('click', (e) => {
	$.post('api/orders/', {
		data: JSON.stringify(getOrder()),
		csrfmiddlewaretoken: csrf
	}, (res) => {
		console.log(res);
	})
})

const getOrder = () => {
	let order = {
		user: user.value,
		items: getProducts()
	}
	console.log(order);
	return order
}

const getProducts = () => {
	let products = []
	Array.from(qtySelectors).map((qty) => {
		if (qty.value != 0) {
			let name = qty.parentNode.parentNode.querySelector('.name').innerText
			products.push({name, quantity: qty.value})
		}
	})
	return products
}