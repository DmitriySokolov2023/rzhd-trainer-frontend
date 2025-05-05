const latinToCyrillicMap = {
	q: 'й',
	w: 'ц',
	e: 'у',
	r: 'к',
	t: 'е',
	y: 'н',
	u: 'г',
	i: 'ш',
	o: 'щ',
	p: 'з',
	'[': 'х',
	']': 'ъ',
	a: 'ф',
	s: 'ы',
	d: 'в',
	f: 'а',
	g: 'п',
	h: 'р',
	j: 'о',
	k: 'л',
	l: 'д',
	';': 'ж',
	"'": 'э',
	z: 'я',
	x: 'ч',
	c: 'с',
	v: 'м',
	b: 'и',
	n: 'т',
	m: 'ь',
	',': 'б',
	'.': 'ю',
}

const CyrillicToLatinMap = {
	й: 'q',
	ц: 'w',
	у: 'e',
	к: 'r',
	е: 't',
	н: 'y',
	г: 'u',
	ш: 'i',
	щ: 'o',
	з: 'p',
	ф: 'a',
	ы: 's',
	в: 'd',
	а: 'f',
	п: 'g',
	р: 'h',
	о: 'j',
	л: 'k',
	д: 'l',
	я: 'z',
	ч: 'x',
	с: 'c',
	м: 'v',
	и: 'b',
	т: 'n',
	ь: 'm',
}
export const convertToLatin = char => {
	let newChar = null
	if (latinToCyrillicMap[char.toLowerCase()]) {
		newChar = char.toUpperCase()
	} else if (CyrillicToLatinMap[char.toLowerCase()]) {
		newChar = CyrillicToLatinMap[char.toLowerCase()].toUpperCase()
	}
	return newChar
}

export const convertToCyrillic = char => {
	let newChar = null
	if (CyrillicToLatinMap[char.toLowerCase()]) {
		newChar = char.toUpperCase()
	} else if (latinToCyrillicMap[char.toLowerCase()]) {
		newChar = latinToCyrillicMap[char.toLowerCase()].toUpperCase()
	} else newChar = char.toUpperCase()

	return newChar
}
