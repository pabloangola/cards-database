import { Card } from "../../../interfaces"
import Set from "../Sek"

const card: Card = {
	set: Set,

	name: {
		en: 'Blastoise VMAX',
		ja: 'Blastoise VMAX',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 154071
		}
	}],
}

export default card
