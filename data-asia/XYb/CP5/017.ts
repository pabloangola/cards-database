import { Card } from "../../../interfaces"
import Set from "../CP5"

const card: Card = {
	set: Set,

	name: {
		en: 'Mew',
		ja: 'Mew',
	},

	category: 'Pokemon',
	rarity: 'Promo',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 157028
		}
	}],
}

export default card
