import { Card } from "../../../interfaces"
import Set from "../CSV5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Capsakid',
		ja: 'Capsakid',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 350671
		}
	}],
}

export default card
