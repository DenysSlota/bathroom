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

	// Знаходимо стіну ванної кімнати та її розміри(на жаль я не зміг знайти параметри, тому написав їх
	// як вони могли бути)
	const wallShower = gltf.scene.getObjectByName('Shower_Grout_Wall')
	console.log(wallShower)
	// const wallWidth = wall.geometry.parameters.width
	// const wallHeight = wall.geometry.parameters.height
	//Для перевірки можна захардкодити розміри
	const wallWidth = 320
	const wallHeight = 270
	console.log(wall)

	// Отримання bounding box стіни
	const wallBoundingBox = new THREE.Box3().setFromObject(wallShower)

	// Отримання центру стіни
	const wallCenter = new THREE.Vector3()
	wallBoundingBox.getCenter(wallCenter)

	//Завантаження текстури
	const tileTexture = useLoader(TextureLoader, texture)

	// Створення групи для меш-плиток
	const tilesGroup = addTilesToWall(wallWidth, wallHeight, tileTexture, 8, 15, 0xffffff, 2)

	//Додаємо групу плиток до стіни
	tilesGroup.position.set(wallCenter.x, wallCenter.y, wallCenter.z)
	wallShower.add(tilesGroup)

	return (
		<Canvas
			camera={{
				position: [0, 0, -3],
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
