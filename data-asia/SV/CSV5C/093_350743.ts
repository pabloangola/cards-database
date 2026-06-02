import { Card } from "../../../interfaces"
import Set from "../CSV5C"

const card: Card = {
	set: Set,

	name: {
		en: 'Probopass',
		ja: 'Probopass',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 350743
		}
	}],
}

export default card
