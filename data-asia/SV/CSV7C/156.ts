import { Card } from "../../../interfaces"
import Set from "../CSV7C"

const card: Card = {
	set: Set,

	name: {
		en: 'Lickilicky',
		ja: 'Lickilicky',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 367605
		}
	}],
}

export default card
