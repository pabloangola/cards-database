import { Card } from "../../../interfaces"
import Set from "../CS4a"

const card: Card = {
	set: Set,

	name: {
		en: 'Drampa',
		ja: 'Drampa',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337065
		}
	}],
}

export default card
