import { Card } from "../../../interfaces"
import Set from "../S8ap"

const card: Card = {
	set: Set,

	name: {
		en: 'Blastoise',
		ja: 'Blastoise',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 171221
		}
	}],
}

export default card
