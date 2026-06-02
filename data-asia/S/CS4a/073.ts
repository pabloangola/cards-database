import { Card } from "../../../interfaces"
import Set from "../CS4a"

const card: Card = {
	set: Set,

	name: {
		en: 'Sandygast',
		ja: 'Sandygast',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337031
		}
	}],
}

export default card
