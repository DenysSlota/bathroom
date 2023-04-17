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

	// Знаходимо стіну ванної кімнати та її розміри(на жаль я не зміг знайти параметри, тому написав їх
	// як вони могли бути)
	const wall = gltf.scene.getObjectByName('Shower_Grout_Wall')
	const wallWidth = wall.geometry.parameters.width
	const wallHeight = wall.geometry.parameters.height
	//Для перевірки можна захардкодити розміри
	// const wallWidth = 200
	// const wallHeight = 100
	console.log(wall)

	//Завантаження текстури
	const tileTexture = useLoader(TextureLoader, texture)

	// Створення групи для меш-плиток
	const tilesGroup = addTilesToWall(wallWidth, wallHeight, tileTexture, 30, 30, 0xffffff, 10)
	//Додаємо групу плиток до стіни
	wall.add(tilesGroup)

	return (
		<Canvas
			camera={{
				fov: 90,
				position: [0, 0, 3]
			}}
		>
			<ambientLight intensity={0.1} />
			<directionalLight position={[1, 1, 1]} intensity={0.8} />
			<OrbitControls />
			<group ref={modelRef} position={[0, 4, -2]}>
				<primitive object={gltf.scene} />
				{/* <primitive object={wall} /> */}
			</group>
		</Canvas>
	)
}

export default BathroomScene
