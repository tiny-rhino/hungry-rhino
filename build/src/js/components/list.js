import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const List = (props) => {
	const { items, list } = props
	return (
		<div>
			<ReactCSSTransitionGroup className='list'
			transitionName="zoom"
			transitionEnterTimeout={250}
	      	transitionLeaveTimeout={250}>
				{items ?
					items.map((item, i) => {
						return (
							<Item item={item} key={i} />
						)
					})
					: <span style={{textAlign: 'center'}}>Loading {list}...</span>
				}
			</ReactCSSTransitionGroup> 
		</div>
	)
}

const Item = (props) => {
	const { item } = props
	return (
		<div className="item">
			<p>id: {item.id}</p>
			<p>name: {item.name}</p>
			<ul>
				{item.products.map((product) => {
					<li>
						{product.name}
						{product.qty}
						{product.price}
					</li>
				})}
			</ul>
		</div>
	)
}

module.exports = List