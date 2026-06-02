import { Card } from "../../../interfaces"
import Set from "../CS4a"

const card: Card = {
	set: Set,

	name: {
		en: 'Metapod',
		ja: 'Metapod',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 336908
		}
	}],
}

export default card
