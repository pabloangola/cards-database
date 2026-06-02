import { Card } from "../../../interfaces"
import Set from "../SM4A"

const card: Card = {
	set: Set,

	name: {
		en: 'Jigglypuff',
		ja: 'Jigglypuff',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 144056
		}
	}],
}

export default card
