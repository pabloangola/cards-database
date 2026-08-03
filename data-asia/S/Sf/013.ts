import { Card } from "../../../interfaces"
import Set from "../Sf"

const card: Card = {
	set: Set,

	name: {
		en: 'Ordinary Rod',
		ja: 'Ordinary Rod',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 240236
		}
	}],
}

export default card
