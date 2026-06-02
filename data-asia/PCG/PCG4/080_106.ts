import { Card } from "../../../interfaces"
import Set from "../PCG4"

const card: Card = {
	set: Set,

	name: {
		en: 'Porygon',
		ja: 'Porygon',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139166
		}
	}],
}

export default card
