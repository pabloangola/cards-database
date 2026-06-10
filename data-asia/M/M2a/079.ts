import { Card } from "../../../interfaces"
import Set from "../M2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Team Rocket\'s Mimikyu',
		ja: 'Team Rocket\'s Mimikyu',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 359034
		}
	}],
}

export default card
