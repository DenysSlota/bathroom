import React from 'react'

const Texture = ({ width, height, path, onClick }) => {
	return (
		<div onClick={onClick} data-width={width} data-height={height}>
			<img src={path} alt="texture" width="100 px" height="100 px" />
			<p>
				{width} X {height}
			</p>
		</div>
	)
}

export default Texture
