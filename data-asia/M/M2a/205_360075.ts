import { Card } from "../../../interfaces"
import Set from "../M2a"

const card: Card = {
	set: Set,

	name: {
		en: 'Team Rocket\'s Mimikyu',
		ja: 'Team Rocket\'s Mimikyu',
	},

	category: 'Pokemon',
	rarity: 'Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 360075
		}
	}],
}

export default card
