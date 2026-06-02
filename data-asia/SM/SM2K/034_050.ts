import { Card } from "../../../interfaces"
import Set from "../SM2K"

const card: Card = {
	set: Set,

	name: {
		en: 'Probopass',
		ja: 'Probopass',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139974
		}
	}],
}

export default card
