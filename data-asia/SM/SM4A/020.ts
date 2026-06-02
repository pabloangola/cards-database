import { Card } from "../../../interfaces"
import Set from "../SM4A"

const card: Card = {
	set: Set,

	name: {
		en: 'Grumpig',
		ja: 'Grumpig',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144042
		}
	}],
}

export default card
