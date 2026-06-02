import { Card } from "../../../interfaces"
import Set from "../XY1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Electrode',
		ja: 'Electrode',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136747
		}
	}],
}

export default card
