import React, { useState } from 'react'

const Form = ({ onSubmit }) => {
	const [wallWidth, setWallWidth] = useState('')
	const [wallHeight, setWallHeight] = useState('')
	const [tileWidth, setTileWidth] = useState('')
	const [tileHeight, setTileHeight] = useState('')
	const [groutThickness, setGroutThickness] = useState('')

	function handleSubmit(event) {
		event.preventDefault()
		onSubmit(wallWidth, wallHeight, tileWidth, tileHeight, groutThickness)
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Enter wall width:
				<input
					type="number"
					value={wallWidth}
					onChange={(event) => setWallWidth(event.target.value)}
				/>
			</label>
			<label>
				Enter wall height:
				<input
					type="number"
					value={wallHeight}
					onChange={(event) => setWallHeight(event.target.value)}
				/>
			</label>
			<label>
				Enter tile width:
				<input
					type="number"
					value={tileWidth}
					onChange={(event) => setTileWidth(event.target.value)}
				/>
			</label>
			<label>
				Enter tile height:
				<input
					type="number"
					value={tileHeight}
					onChange={(event) => setTileHeight(event.target.value)}
				/>
			</label>
			<label>
				Enter grout thickness:
				<input
					type="number"
					value={groutThickness}
					onChange={(event) => setGroutThickness(event.target.value)}
				/>
			</label>
			<button type="submit">Submit</button>
		</form>
	)
}

export default Form
