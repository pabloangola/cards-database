import { Card } from "../../../interfaces"
import Set from "../CSV7C"

const card: Card = {
	set: Set,

	name: {
		en: 'Chatot',
		ja: 'Chatot',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 367615
		}
	}],
}

export default card
