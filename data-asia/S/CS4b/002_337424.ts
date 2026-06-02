import { Card } from "../../../interfaces"
import Set from "../CS4b"

const card: Card = {
	set: Set,

	name: {
		en: 'Skiploom',
		ja: 'Skiploom',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 337424
		}
	}],
}

export default card
