import React, { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { addTilesToWall } from '../utils/addTilesToWall'
import texture from '../assets/tile/tile.png'

const BathroomSceneNew = () => {
	const modelRef = useRef()

	// Створюємо групу для стіни та плиток
	const wall = new THREE.Group()

	//Для перевірки можна захардкодити розміри
	const wallWidth = 242
	const wallHeight = 240
	console.log(wall)

	//Завантаження текстури
	const tileTexture = useLoader(TextureLoader, texture)

	// Створення групи для меш-плиток
	const tilesGroup = addTilesToWall(wallWidth, wallHeight, tileTexture, 30, 50, 0xffffff, 2)
	//Додаємо групу плиток до стіни
	wall.add(tilesGroup)

	return (
		<Canvas
			camera={{
				fov: 120,
				position: [0, 0, 3]
			}}
		>
			<ambientLight intensity={0.1} />
			<directionalLight position={[1, 1, 1]} intensity={0.8} />
			<OrbitControls />
			<group ref={modelRef} position={[0, 0, -60]}>
				<primitive object={wall} />
			</group>
		</Canvas>
	)
}

export default BathroomSceneNew
