import { icon_colors } from '@shared/icon-colors.shared'

let availableIconColors = [...icon_colors]

export function getUniqueRandomIconColor() {
	if (availableIconColors.length === 0) {
		availableIconColors = [...icon_colors]
	}

	const index = Math.floor(Math.random() * availableIconColors.length)
	const color = availableIconColors[index]

	availableIconColors.splice(index, 1)

	return color
}
