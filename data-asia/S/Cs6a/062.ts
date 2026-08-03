import { Card } from "../../../interfaces"
import Set from "../Cs6a"

const card: Card = {
	set: Set,

	name: {
		en: 'Luxio',
		ja: 'Luxio',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 345645
		}
	}],
}

export default card
