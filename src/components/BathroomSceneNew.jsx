import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { addTilesToWall } from '../utils/addTilesToWall'
import texture from '../assets/tile/tile.png'

const BathroomSceneNew = ({
	wallWidth,
	wallHeight,
	tileTexture,
	tileWidth,
	tileHeight,
	groutColor,
	groutThickness,
}) => {
	const [wallGroup, setWallGroup] = useState(null)
	const modelRef = useRef()

	// Створюємо групу для стіни та плиток
	function createWall() {
		// Створення групи для меш-плиток
		const tilesGroup = addTilesToWall(
			wallWidth,
			wallHeight,
			tileTexture,
			tileWidth,
			tileHeight,
			groutColor,
			groutThickness
		)
		setWallGroup(tilesGroup)
	}

	useEffect(() => {
		createWall()
	}, [wallWidth, wallHeight, tileWidth, texture, tileHeight, groutColor, groutThickness])

	return (
		<Canvas
			camera={{
				fov: 120,
				position: [0, 0, 3],
			}}
		>
			<ambientLight intensity={0.1} />
			<directionalLight position={[1, 1, 1]} intensity={0.8} />
			<OrbitControls />
			<group ref={modelRef} position={[0, 0, -80]}>
				<primitive object={wallGroup} />
			</group>
		</Canvas>
	)
}

export default BathroomSceneNew
