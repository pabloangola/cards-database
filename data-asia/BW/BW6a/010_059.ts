import { Card } from "../../../interfaces"
import Set from "../BW6a"

const card: Card = {
	set: Set,

	name: {
		en: 'Charmander',
		ja: 'Charmander',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 138500
		}
	}],
}

export default card
