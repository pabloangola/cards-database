import { Card } from "../../../interfaces"
import Set from "../SV8"

const card: Card = {
	set: Set,

	name: {
		en: 'Spheal',
		ja: 'Spheal',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 305434
		}
	}],
}

export default card
