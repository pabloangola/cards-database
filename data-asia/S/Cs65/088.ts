import { Card } from "../../../interfaces"
import Set from "../Cs65"

const card: Card = {
	set: Set,

	name: {
		en: 'Melony',
		ja: 'Melony',
	},

	category: 'Pokemon',
	rarity: 'Special Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 338812
		}
	}],
}

export default card
