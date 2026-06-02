import { Card } from "../../../interfaces"
import Set from "../CSM1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Wimpod',
		ja: 'Wimpod',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 370040
		}
	}],
}

export default card
