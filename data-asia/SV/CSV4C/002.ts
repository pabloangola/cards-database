import { Card } from "../../../interfaces"
import Set from "../CSV4C"

const card: Card = {
	set: Set,

	name: {
		en: 'Skiddo',
		ja: 'Skiddo',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 343551
		}
	}],
}

export default card
