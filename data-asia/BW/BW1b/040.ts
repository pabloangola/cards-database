import { Card } from "../../../interfaces"
import Set from "../BW1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Patrat',
		ja: 'Patrat',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144214
		}
	}],
}

export default card
