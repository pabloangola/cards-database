import { Card } from "../../../interfaces"
import Set from "../Sgg"

const card: Card = {
	set: Set,

	name: {
		en: 'Morpeko',
		ja: 'Morpeko',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 158578
		}
	}],
}

export default card
