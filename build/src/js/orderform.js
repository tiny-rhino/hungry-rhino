import $ from 'jquery'

const user = document.querySelector('input#user')
const qtySelectors = document.querySelectorAll('.qty')
const orderButton = document.querySelector('button[type=submit]')

orderButton.addEventListener('click', (e) => {
	let data = JSON.stringify(getOrder())
	$.ajax({
		type: 'POST',
		url:'api/orders/',
		data,
		contentType: 'application/json',
		beforeSend: (xhr, settings) => {
			xhr.setRequestHeader("X-CSRFToken", csrf)
		},
		success: (res) => {
			let id = res.id
			window.location.href = '/order/' + id
		}
	})
})

const getOrder = () => {
	let order = {
		user: user.value,
		items: getProducts()
	}
	return order
}

const getProducts = () => {
	let products = []
	Array.from(qtySelectors).map((qty) => {
		if (qty.value != 0) {
			let name = qty.parentNode.querySelector('.name').innerText
			products.push({name, quantity: qty.value})
		}
	})
	return products
}