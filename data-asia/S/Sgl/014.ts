import { Card } from "../../../interfaces"
import Set from "../Sgl"

const card: Card = {
	set: Set,

	name: {
		en: 'Pokégear 3.0',
		ja: 'Pokégear 3.0',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 158515
		}
	}],
}

export default card
