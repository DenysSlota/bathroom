import * as THREE from 'three'
import { createBathroomTiles } from './createBathroomTiles'

export function addTilesToWall(
	wallWidth,
	wallHeight,
	texture,
	tileWidth,
	tileHeight,
	groutColor,
	groutThickness
) {
	// Ширина та висота плитки та міжплиткового проміжка
	const tileGroutWidth = tileWidth + groutThickness
	const tileGroutHeight = tileHeight + groutThickness
	// Створюємо групу для мешів плиток
	const tilesGroup = new THREE.Group()

	// Кількість плиток по горизонталі та вертикалі
	const numTilesHorizontal = Math.floor(wallWidth / tileGroutWidth)
	const numTilesVertical = Math.floor(wallHeight / tileGroutHeight)

	// Зміщення плиток по горизонталі та вертикалі
	const offsetX = -wallWidth / 2 + tileGroutWidth / 2
	const offsetY = -wallHeight / 2 + tileGroutHeight / 2

	// Додаємо плитки до стіни
	for (let i = 0; i < numTilesHorizontal; i++) {
		for (let j = 0; j < numTilesVertical; j++) {
			// Створюємо меш плитки
			const tileMesh = createBathroomTiles(
				texture,
				tileWidth,
				tileHeight,
				groutColor,
				groutThickness
			)

			// Встановлюємо позицію плитки відносно стіни
			tileMesh.position.set(offsetX + i * tileGroutWidth, offsetY + j * tileGroutHeight, 0)

			// Додаємо меш плитки до групи
			tilesGroup.add(tileMesh)
		}
	}

	// Розраховуємо залишок від ділення для ширини та висоти стіни
	const remainingWidth = wallWidth % tileGroutWidth
	const remainingHeight = wallHeight % tileGroutHeight

	// Розраховуємо розмір кусочка плитки, який потрібно додати до краю стіни, якщо потрібно
	const tilePieceWidth = remainingWidth - groutThickness
	const tilePieceHeight = remainingHeight - groutThickness

	// Додаємо кусочки плитки до кожного краю стіни по вертикалі
	if (remainingWidth > 0) {
		for (let j = 0; j < numTilesVertical; j++) {
			// Зміщення кусочка плиток по горизонталі та вертикалі
			const pieceOffsetX = wallWidth / 2 - remainingWidth / 2
			const pieceOffsetY = -wallHeight / 2 + tileGroutHeight / 2

			// Створюємо меш кусочка плитки
			const tilePiece = createBathroomTiles(
				texture,
				tilePieceWidth,
				tileHeight,
				groutColor,
				groutThickness
			)

			// Встановлюємо позицію плитки відносно стіни
			tilePiece.position.set(pieceOffsetX, pieceOffsetY + j * tileGroutHeight, 0)

			// Додаємо меш кусочка плитки до групи
			tilesGroup.add(tilePiece)
		}
	}

	// Додаємо кусочки плитки до кожного краю стіни по горизонталі
	if (remainingHeight > 0) {
		for (let i = 0; i < numTilesHorizontal; i++) {
			// Зміщення кусочка плиток по горизонталі та вертикалі
			const pieceOffsetX = -wallWidth / 2 + tileGroutWidth / 2
			const pieceOffsetY = wallHeight / 2 - remainingHeight / 2

			// Створюємо меш кусочка плитки
			const tilePiece = createBathroomTiles(
				texture,
				tileWidth,
				tilePieceHeight,
				groutColor,
				groutThickness
			)

			// Встановлюємо позицію плитки відносно стіни
			tilePiece.position.set(pieceOffsetX + i * tileGroutWidth, pieceOffsetY, 0)

			// Додаємо меш кусочка плитки до групи
			tilesGroup.add(tilePiece)
		}
	}

	// Якщо по ширині та висоті треба додати кусочек
	if ((remainingWidth > 0) & (remainingHeight > 0)) {
		// Зміщення кусочка плитки по горизонталі та вертикалі
		const pieceOffsetX = wallWidth / 2 - remainingWidth / 2
		const pieceOffsetY = wallHeight / 2 - remainingHeight / 2

		// Створюємо меш кусочка плитки
		const tilePiece = createBathroomTiles(
			texture,
			tilePieceWidth,
			tilePieceHeight,
			groutColor,
			groutThickness
		)

		// Встановлюємо позицію плитки відносно стіни
		tilePiece.position.set(pieceOffsetX, pieceOffsetY, 0)

		// Додаємо меш кусочка плитки до групи
		tilesGroup.add(tilePiece)
	}
	// Повертаємо групу мешів плиток
	return tilesGroup
}
