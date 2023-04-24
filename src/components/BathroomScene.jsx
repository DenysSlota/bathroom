import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { addTilesToWall } from '../utils/addTilesToWall'
import texture from '../assets/tile/tile.png'
import { useState } from 'react'

const BathroomScene = ({ tileTexture, tileWidth, tileHeight, groutColor, groutThickness }) => {
	const modelRef = useRef()

	// Використання хука useGLTF для завантаження моделі
	const gltf = useGLTF('/babylonBathroom.glb', true)
	const wall = gltf.scene
	console.log(wall)
	// Знаходимо стіну ванної кімнати
	// const wallShower = gltf.scene.getObjectByName('Shower_Grout_Wall')
	const wallShower = gltf.scene.getObjectByName('Wall').children[2]
	console.log(wallShower)

	// Отримання boundingBox стіни
	const boundingBox = new THREE.Box3().setFromObject(wallShower)
	// Отримання координат мінімальної та максимальної точок
	const minPoint = boundingBox.min
	const maxPoint = boundingBox.max
	// Отримання розмірів стіни
	const wallWidth = maxPoint.z - minPoint.z
	const wallHeight = maxPoint.y - minPoint.y
	console.log(wallWidth)
	console.log(wallHeight)
	// Отримання центру стіни
	const wallCenterX = maxPoint.x - (maxPoint.x - minPoint.x) / 2
	const wallCenterY = maxPoint.y - (maxPoint.y - minPoint.y) / 2
	const wallCenterZ = maxPoint.z - (maxPoint.z - minPoint.z) / 2
	console.log(wallCenterX, wallCenterY, wallCenterZ)

	// Створення групи для меш-плиток
	const [tilesGroup, setTilesGroup] = useState()

	const createMeshTiles = () => {
		const tilesGroupMesh = addTilesToWall(
			wallWidth,
			wallHeight,
			tileTexture,
			tileWidth,
			tileHeight,
			groutColor,
			groutThickness
		)
		// Встановлюємо позицію групи відносно стіни
		tilesGroupMesh.position.set(wallCenterX + 0.35, wallCenterY, wallCenterZ)

		// повертаємо групу мешів на 90 градусів по осі Y
		tilesGroupMesh.setRotationFromEuler(new THREE.Euler(0, Math.PI / 2, 0))

		setTilesGroup(tilesGroupMesh)
	}

	//Додаємо групу плиток до стіни
	wallShower.add(tilesGroup)

	useEffect(() => {
		createMeshTiles()
	}, [tileWidth, tileHeight, groutColor, groutThickness, texture])

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
