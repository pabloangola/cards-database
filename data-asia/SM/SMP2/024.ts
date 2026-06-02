import { Card } from "../../../interfaces"
import Set from "../SMP2"

const card: Card = {
	set: Set,

	name: {
		en: 'Slaking',
		ja: 'Slaking',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 255296
		}
	}],
}

export default card
