import { Card } from "../../../interfaces"
import Set from "../XY11b"

const card: Card = {
	set: Set,

	name: {
		en: 'Persian',
		ja: 'Persian',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 136899
		}
	}],
}

export default card
