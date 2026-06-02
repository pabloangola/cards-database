import { Card } from "../../../interfaces"
import Set from "../CSM2bC"

const card: Card = {
	set: Set,

	name: {
		en: 'Glameow',
		ja: 'Glameow',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 353050
		}
	}],
}

export default card
