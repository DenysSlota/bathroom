import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'
import texture from './assets/tile/tile.png'
import BathroomScene from './components/BathroomScene'
import BathroomSceneNew from './components/BathroomSceneNew'
import Form from './components/Form'
import './App.css'
import { useState } from 'react'

function App() {
	const [wallWidth, setWallWidth] = useState(185)
	const [wallHeight, setWallHeight] = useState(144)
	const [tileWidth, setTileWidth] = useState(15)
	const [tileHeight, setTileHeight] = useState(20)
	const [groutThickness, setGroutThickness] = useState(1)
	const handleSubmit = (wallWidth, wallHeight, tileWidth, tileHeight, groutThickness) => {
		setWallWidth(wallWidth)
		setWallHeight(wallHeight)
		setTileWidth(tileWidth)
		setTileHeight(tileHeight)
		setGroutThickness(groutThickness)
	}
	const tileTexture = useLoader(TextureLoader, texture)
	const groutColor = 0xffffff
	return (
		<div className="App">
			<BathroomScene
				tileTexture={tileTexture}
				tileWidth={tileWidth}
				tileHeight={tileHeight}
				groutColor={groutColor}
				groutThickness={groutThickness}
			/>
			<div className="Scene__new">
				<Form onSubmit={handleSubmit} />
				<BathroomSceneNew
					wallWidth={wallWidth}
					wallHeight={wallHeight}
					tileTexture={tileTexture}
					tileWidth={tileWidth}
					tileHeight={tileHeight}
					groutColor={groutColor}
					groutThickness={groutThickness}
				/>
			</div>
		</div>
	)
}

export default App
