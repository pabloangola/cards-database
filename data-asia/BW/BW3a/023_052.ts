import { Card } from "../../../interfaces"
import Set from "../BW3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Pikachu',
		ja: 'Pikachu',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139412
		}
	}],
}

export default card
