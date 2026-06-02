import { Card } from "../../../interfaces"
import Set from "../CS1.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Applin',
		ja: 'Applin',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 368969
		}
	}],
}

export default card
