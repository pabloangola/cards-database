import { Card } from "../../../interfaces"
import Set from "../Cs5d"

const card: Card = {
	set: Set,

	name: {
		en: 'Mienshao',
		ja: 'Mienshao',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 373525
		}
	}],
}

export default card
