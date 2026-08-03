import { Card } from "../../../interfaces"
import Set from "../Sef"

const card: Card = {
	set: Set,

	name: {
		en: 'Hop',
		ja: 'Hop',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154069
		}
	}],
}

export default card
