import * as THREE from 'three'

export function createBathroomTiles(texture, tileWidth, tileHeight, groutColor, groutThickness) {
	// Створюємо геометрію плитки
	const tileGeometry = new THREE.PlaneGeometry(tileWidth, tileHeight)

	// Створюємо блискучий матеріал плитки з використанням переданої текстури
	const tileMaterial = new THREE.MeshPhongMaterial({ map: texture, shininess: 100 })

	// Створюємо меш плитки з використанням геометрії та матеріалу
	const tileMesh = new THREE.Mesh(tileGeometry, tileMaterial)

	// Створюємо геометрію міжплиткових проміжків
	const groutGeometry = new THREE.PlaneGeometry(
		tileWidth + groutThickness,
		tileHeight + groutThickness
	)

	// Створюємо матовий матеріал міжплиткових проміжків з використанням переданого кольору
	const groutMaterial = new THREE.MeshStandardMaterial({
		color: groutColor,
		roughness: 1,
		metalness: 0
	})

	// Створюємо меш міжплиткових проміжків з використанням геометрії та матеріалу
	const groutMesh = new THREE.Mesh(groutGeometry, groutMaterial)

	// Додаємо міжплитковий проміжок до мешу плитки
	tileMesh.add(groutMesh)

	// Встановлюємо позицію міжплиткового проміжку відносно плитки
	groutMesh.position.set(groutThickness / 2, groutThickness / 2, -1)

	// Повертаємо меш плитки з міжплитковими проміжками
	return tileMesh
}
