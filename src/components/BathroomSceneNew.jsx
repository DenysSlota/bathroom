import React, { useEffect, useRef, useState } from 'react'
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
	const wallWidth = 165
	const wallHeight = 145

	//Завантаження текстури
	const tileTexture = useLoader(TextureLoader, texture)

	// // Створення групи для меш-плиток
	const tilesGroup = addTilesToWall(wallWidth, wallHeight, tileTexture, 10, 15, 0xffffff, 2)
	console.log(tilesGroup)
	//Додаємо групу плиток до стіни
	// tilesGroup1.position.set(wallWidth / 2, wallHeight / 2, 0.1)
	wall.add(tilesGroup)

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
				<primitive object={wall} />
			</group>
		</Canvas>
	)
}

export default BathroomSceneNew
