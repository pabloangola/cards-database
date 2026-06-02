import { Card } from "../../../interfaces"
import Set from "../CSV1C"

const card: Card = {
	set: Set,

	name: {
		en: 'Quaxwell',
		ja: 'Quaxwell',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 339421
		}
	}],
}

export default card
