import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { addTilesToWall } from '../utils/addTilesToWall'

const BathroomScene = ({ tileTexture, tileWidth, tileHeight, groutColor, groutThickness }) => {
	const modelRef = useRef()

	// Використання хука useGLTF для завантаження моделі
	const gltf = useGLTF('/babylonBathroom.glb', true)
	const wall = gltf.scene

	// Знаходимо стіну ванної кімнати
	const wallShower = gltf.scene.getObjectByName('Wall').children[2]
	console.log(wallShower)

	// Отримання boundingBox стіни
	const boundingBox = new THREE.Box3().setFromObject(wallShower)
	// Отримання координат мінімальної та максимальної точок
	const minPoint = boundingBox.min
	const maxPoint = boundingBox.max
	// Отримання розмірів стіни
	const wallWidth = maxPoint.y - minPoint.y
	const wallHeight = maxPoint.z - minPoint.z

	// Отримання центру стіни
	const wallCenterX = maxPoint.x - (maxPoint.x - minPoint.x) / 2
	const wallCenterY = maxPoint.y - (maxPoint.y - minPoint.y) / 2
	const wallCenterZ = maxPoint.z - (maxPoint.z - minPoint.z) / 2

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
	// Встановлюємо позицію групи відносно стіни
	tilesGroup.position.set(wallCenterX + 0.35, wallCenterY, wallCenterZ)

	// повертаємо групу мешів на 90 градусів по осі Y
	tilesGroup.setRotationFromEuler(new THREE.Euler(Math.PI / 2, Math.PI / 2, 0))

	//Додаємо групу плиток до стіни
	wallShower.add(tilesGroup)

	//
	// Обробляємо іншу стіну за аналогією
	const wallShower2 = gltf.scene.getObjectByName('Wall').children[1]

	// Отримання boundingBox стіни
	const boundingBox2 = new THREE.Box3().setFromObject(wallShower2)
	// Отримання координат мінімальної та максимальної точок
	const minPoint2 = boundingBox2.min
	const maxPoint2 = boundingBox2.max
	// Отримання розмірів стіни
	const wallWidth2 = maxPoint2.x - minPoint2.x
	const wallHeight2 = maxPoint2.z - minPoint2.z

	// Отримання центру стіни
	const wallCenterX2 = maxPoint2.x - (maxPoint2.x - minPoint2.x) / 2
	const wallCenterY2 = maxPoint2.y - (maxPoint2.y - minPoint2.y) / 2
	const wallCenterZ2 = maxPoint2.z - (maxPoint2.z - minPoint2.z) / 2
	// Створення групи для меш-плиток
	const tilesGroup2 = addTilesToWall(
		wallWidth2,
		wallHeight2,
		tileTexture,
		tileWidth,
		tileHeight,
		groutColor,
		groutThickness
	)
	// Встановлюємо позицію групи відносно стіни
	tilesGroup2.position.set(wallCenterX2, wallCenterY2 - 4, wallCenterZ2)

	// повертаємо групу мешів на 90 градусів по осі Y
	tilesGroup2.setRotationFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))

	//Додаємо групу плиток до стіни
	wallShower2.add(tilesGroup2)

	return (
		<Canvas
			camera={{
				position: [0, 1, -4],
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
