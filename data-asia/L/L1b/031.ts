import { Card } from "../../../interfaces"
import Set from "../L1b"

const card: Card = {
	set: Set,

	name: {
		en: 'Pichu',
		ja: 'Pichu',
	},

	category: 'Pokemon',
	rarity: 'Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 142652
		}
	}],
}

export default card
