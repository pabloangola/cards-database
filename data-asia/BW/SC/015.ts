import { Card } from "../../../interfaces"
import Set from "../SC"

const card: Card = {
	set: Set,

	name: {
		en: 'Teddiursa',
		ja: 'Teddiursa',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 272942
		}
	}],
}

export default card
