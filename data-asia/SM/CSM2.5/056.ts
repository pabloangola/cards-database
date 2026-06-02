import { Card } from "../../../interfaces"
import Set from "../CSM2.5"

const card: Card = {
	set: Set,

	name: {
		en: 'Rosa',
		ja: 'Rosa',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 369646
		}
	}],
}

export default card
