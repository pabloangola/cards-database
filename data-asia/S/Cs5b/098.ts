import { Card } from "../../../interfaces"
import Set from "../Cs5b"

const card: Card = {
	set: Set,

	name: {
		en: 'Klink',
		ja: 'Klink',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 346909
		}
	}],
}

export default card
