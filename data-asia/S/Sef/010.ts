import { Card } from "../../../interfaces"
import Set from "../Sef"

const card: Card = {
	set: Set,

	name: {
		en: 'Zarude',
		ja: 'Zarude',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154060
		}
	}],
}

export default card
