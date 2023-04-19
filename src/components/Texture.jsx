import React from 'react'

const Texture = ({ width, height, path }) => {
	return (
		<div>
			<img src={path} alt="texture" width="100 px" height="100 px" />
			<p>
				{width} X {height}
			</p>
		</div>
	)
}

export default Texture
