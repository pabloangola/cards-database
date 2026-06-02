import { Card } from "../../../interfaces"
import Set from "../PCG4"

const card: Card = {
	set: Set,

	name: {
		en: 'Ampharos',
		ja: 'Ampharos',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139123
		}
	}],
}

export default card
