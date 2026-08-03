import { Card } from "../../../interfaces"
import Set from "../Cs5b"

const card: Card = {
	set: Set,

	name: {
		en: 'Klang',
		ja: 'Klang',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 346910
		}
	}],
}

export default card
