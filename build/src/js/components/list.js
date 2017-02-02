import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const List = (props) => {
	const { items, list, clickedItem } = props
	return (
		<div className='list'>
			<h2>{list}</h2>
			<ReactCSSTransitionGroup 
			className='item-list'
			component='div'
			transitionName='drop'
			transitionEnterTimeout={250}
	      	transitionLeaveTimeout={250}>
				{items ?
					items.map((order, i) => {
						return (
							<Order order={order} key={i} clickedItem={clickedItem} />
						)
					})
					: null
				}
			</ReactCSSTransitionGroup> 
		</div>
	)
}

const Order = (props) => {
	const { order, clickedItem } = props
	console.log(order);
	return (
		<div className='item'>
			<p>Order from {order.user} (#{order.id})</p>
				{order.items.map((product) => {
					return (
						<p>{product.quantity} x {product.name}</p>
					)
				})}
			<div className='actions'>
				<button onClick={() => {clickedItem(order.id, order.state, false)}}>Back</button>
				<button onClick={() => {clickedItem(order.id, order.state, true)}}>Next</button>
			</div>
		</div>
	)
}

module.exports = List