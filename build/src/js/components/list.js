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
			{order.state == 'done' ? 
				<div className='close' onClick={() => {clickedItem(order.id, order.state, true)}}>x</div> : null
			}
			<p>Order from {order.user} (#{order.id})</p>
				{order.items.map((product) => {
					return (
						<p>{product.quantity} x {product.name}</p>
					)
				})}
			<div className='actions'>
				{order.state != 'new' ? 
					<button 
						onClick={ () => {
							clickedItem(order.id, order.state, [order.state != 'new'])}
						}>
						&#9664;
					</button> : null 
				}
				{order.state != 'done' ?
					<button onClick={() => {clickedItem(order.id, order.state, [order.state != 'done'])}}>&#9654;</button> : null
				}
				
			</div>
		</div>
	)
}

module.exports = List