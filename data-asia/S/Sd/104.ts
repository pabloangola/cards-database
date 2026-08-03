import { Card } from "../../../interfaces"
import Set from "../Sd"

const card: Card = {
	set: Set,

	name: {
		en: 'Drampa',
		ja: 'Drampa',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284531
		}
	}],
}

export default card
