import { Card } from "../../../interfaces"
import Set from "../SM8"

const card: Card = {
	set: Set,

	name: {
		en: 'Mantine',
		ja: 'Mantine',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 143228
		}
	}],
}

export default card
