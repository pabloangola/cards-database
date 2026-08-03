import { Card } from "../../../interfaces"
import Set from "../Sd"

const card: Card = {
	set: Set,

	name: {
		en: 'Charmeleon',
		ja: 'Charmeleon',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 284052
		}
	}],
}

export default card
