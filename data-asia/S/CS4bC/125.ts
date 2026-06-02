import { Card } from "../../../interfaces"
import Set from "../CS4bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Schoolboy',
		ja: 'Schoolboy',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337735
		}
	}],
}

export default card
