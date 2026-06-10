import { Card } from "../../../interfaces"
import Set from "../M2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Team Rocket\'s Murkrow',
		ja: 'Team Rocket\'s Murkrow',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 359037
		}
	}],
}

export default card
