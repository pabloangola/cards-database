import { Card } from "../../../interfaces"
import Set from "../BW1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Snivy',
		ja: 'Snivy',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144168
		}
	}],
}

export default card
