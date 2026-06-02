import { Card } from "../../../interfaces"
import Set from "../L3"

const card: Card = {
	set: Set,

	name: {
		en: 'Ponyta',
		ja: 'Ponyta',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136233
		}
	}],
}

export default card
