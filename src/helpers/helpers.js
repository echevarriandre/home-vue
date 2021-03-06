export const sortPropertyAlphabetically = (list, prop) => {
	if (!list) return list

	return list.sort((a, b) => {
		let first = a[prop].toUpperCase()
		let second = b[prop].toUpperCase()

		if (first < second) return -1
		if (first > second) return 1

		return 0
	})
}