import { Card } from "../../../interfaces"
import Set from "../SM4A"

const card: Card = {
	set: Set,

	name: {
		en: 'Jangmo-o',
		ja: 'Jangmo-o',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144060
		}
	}],
}

export default card
