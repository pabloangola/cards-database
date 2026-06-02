import { Card } from "../../../interfaces"
import Set from "../EBB"

const card: Card = {
	set: Set,

	name: {
		en: 'Terrakion',
		ja: 'Terrakion',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 137744
		}
	}],
}

export default card
