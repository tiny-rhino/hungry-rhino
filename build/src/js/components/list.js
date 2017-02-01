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
			transitionName="zoom"
			transitionEnterTimeout={250}
	      	transitionLeaveTimeout={250}>
				{items ?
					items.map((item, i) => {
						return (
							<Item item={item} key={i} onClick={clickedItem} />
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