import { Card } from "../../../interfaces"
import Set from "../CSV1C"

const card: Card = {
	set: Set,

	name: {
		en: 'Fidough',
		ja: 'Fidough',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 340167
		}
	}],
}

export default card
