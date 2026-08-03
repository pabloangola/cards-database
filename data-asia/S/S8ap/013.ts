import { Card } from "../../../interfaces"
import Set from "../S8ap"

const card: Card = {
	set: Set,

	name: {
		en: 'Rocket\'s Admin',
		ja: 'Rocket\'s Admin',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 171230
		}
	}],
}

export default card
