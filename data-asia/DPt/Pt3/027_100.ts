import { Card } from "../../../interfaces"
import Set from "../Pt3"

const card: Card = {
	set: Set,

	name: {
		en: 'Mudkip',
		ja: 'Mudkip',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 135908
		}
	}],
}

export default card
