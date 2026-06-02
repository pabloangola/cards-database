import { Card } from "../../../interfaces"
import Set from "../PCG5"

const card: Card = {
	set: Set,

	name: {
		en: 'Spheal',
		ja: 'Spheal',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 140439
		}
	}],
}

export default card
