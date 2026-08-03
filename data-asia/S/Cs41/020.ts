import { Card } from "../../../interfaces"
import Set from "../Cs41"

const card: Card = {
	set: Set,

	name: {
		en: 'Eternatus V',
		ja: 'Eternatus V',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 342020
		}
	}],
}

export default card
