import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { addTilesToWall } from '../utils/addTilesToWall'
import texture from '../assets/tile/tile.png'

const BathroomScene = () => {
	const modelRef = useRef()

	// Використання хука useGLTF для завантаження моделі
	const gltf = useGLTF('/babylonBathroom.glb', true)
	const wall = gltf.scene

	// Знаходимо стіну ванної кімнати
	const wallShower = gltf.scene.getObjectByName('Shower_Grout_Wall')
	console.log(wallShower)
	console.log(wall)

	// Отримання boundingBox стіни
	const boundingBox = new THREE.Box3().setFromObject(wallShower)
	// Отримання координат мінімальної та максимальної точок
	const minPoint = boundingBox.min
	const maxPoint = boundingBox.max
	// Отримання розмірів стіни
	const wallWidth = maxPoint.x - minPoint.x
	const wallHeight = maxPoint.y - minPoint.y
	console.log(wallWidth)
	console.log(wallHeight)
	// Отримання центру стіни
	const wallCenterX = maxPoint.x - (maxPoint.x - minPoint.x) / 2
	const wallCenterY = maxPoint.y - (maxPoint.y - minPoint.y) / 2
	const wallCenterZ = maxPoint.z - (maxPoint.z - minPoint.z) / 2

	//Завантаження текстури
	const tileTexture = useLoader(TextureLoader, texture)

	// Створення групи для меш-плиток
	const tilesGroup = addTilesToWall(wallWidth, wallHeight, tileTexture, 8, 15, 0xffffff, 2)

	// Встановлюємо позицію групи відносно стіни
	tilesGroup.position.set(wallCenterX, wallCenterY, wallCenterZ)

	// повертаємо групу мешів на 90 градусів по осі X
	tilesGroup.setRotationFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))
	//Додаємо групу плиток до стіни
	wallShower.add(tilesGroup)

	return (
		<Canvas
			camera={{
				position: [0, 0, -4],
				fov: 120,
			}}
		>
			<ambientLight intensity={0.1} />
			<directionalLight position={[1, 1, 1]} intensity={0.8} />
			<OrbitControls />
			<group ref={modelRef} position={[0, 0, 0]}>
				<primitive object={wall} />
			</group>
		</Canvas>
	)
}

export default BathroomScene
