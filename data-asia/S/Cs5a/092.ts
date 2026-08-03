import { Card } from "../../../interfaces"
import Set from "../Cs5a"

const card: Card = {
	set: Set,

	name: {
		en: 'Radiant Eevee',
		ja: 'Radiant Eevee',
	},

	category: 'Pokemon',
	rarity: 'Shiny Holo Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 311048
		}
	}],
}

export default card
