import { Card } from "../../../interfaces"
import Set from "../S8b"

const card: Card = {
	set: Set,

	name: {
		en: 'Peony',
		ja: 'Peony',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 232911
		}
	}],
}

export default card
