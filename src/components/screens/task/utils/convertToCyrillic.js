const latinToCyrillicMap = {
	a: 'ф',
	b: 'и',
	c: 'с',
	d: 'в',
	e: 'у',
	f: 'А',
	g: 'п',
	h: 'р',
	i: 'ш',
	j: 'о',
	k: 'л',
	l: 'д',
	m: 'ь',
	n: 'т',
	o: 'щ',
	p: 'з',
	q: 'й',
	r: 'к',
	s: 'л',
	t: 'м',
	u: 'й',
	v: 'ц',
	w: 'ж',
	x: 'х',
	y: 'э',
	z: 'я',
}
const CyrillicToLatinMap = {
	ф: 'a',
	и: 'b',
	с: 'c',
	в: 'd',
	у: 'e',
	а: 'f',
	п: 'g',
	р: 'h',
	ш: 'i',
	о: 'j',
	л: 'k',
	д: 'l',
	ь: 'm',
	т: 'n',
	щ: 'o',
	з: 'p',
	й: 'q',
	к: 'r',
	л: 's',
	м: 't',
	й: 'u',
	ц: 'v',
	ж: 'w',
	х: 'x',
	э: 'y',
	я: 'z',
}
export const convertToLatin = char => {
	let newChar = null
	if (latinToCyrillicMap[char.toLowerCase()]) {
		newChar = char.toUpperCase()
	} else newChar = CyrillicToLatinMap[char.toLowerCase()].toUpperCase()
	return newChar
}

export const convertToCyrillic = char => {
	let newChar = null
	if (CyrillicToLatinMap[char.toLowerCase()]) {
		newChar = char.toUpperCase()
	} else newChar = latinToCyrillicMap[char.toLowerCase()].toUpperCase()

	return newChar
}
