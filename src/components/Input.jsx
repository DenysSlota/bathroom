import React from 'react'

const Input = ({ nameLabel, onChange }) => {
	return (
		<div>
			<label htmlFor="number-input">{nameLabel}</label>
			<input type="number" id="number-input" onChange={onChange} />
		</div>
	)
}

export default Input
