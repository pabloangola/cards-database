import { Card } from "../../../interfaces"
import Set from "../Sef"

const card: Card = {
	set: Set,

	name: {
		en: 'Celebi',
		ja: 'Celebi',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154055
		}
	}],
}

export default card
