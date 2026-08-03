import { Card } from "../../../interfaces"
import Set from "../Cs6a"

const card: Card = {
	set: Set,

	name: {
		en: 'Tynamo',
		ja: 'Tynamo',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345650
		}
	}],
}

export default card
