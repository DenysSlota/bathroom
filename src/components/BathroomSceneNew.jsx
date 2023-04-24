import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
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

	const wall = new THREE.Group()
	// Створюємо групу для стіни та плиток
	const createWall = () => {
		console.log(wallWidth, wallHeight, tileTexture, tileWidth, tileHeight)
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

		console.log(tilesGroup)
		setWallGroup(tilesGroup)
	}

	useEffect(() => {
		createWall()
		//Додаємо групу плиток до стіни
		wall.add(wallGroup)
	}, [wallWidth, wallHeight, tileWidth, tileHeight, groutColor, groutThickness, texture])

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
