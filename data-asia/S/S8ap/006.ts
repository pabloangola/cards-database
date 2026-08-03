import { Card } from "../../../interfaces"
import Set from "../S8ap"

const card: Card = {
	set: Set,

	name: {
		en: 'Here Comes Team Rocket!',
		ja: 'Here Comes Team Rocket!',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 171222
		}
	}],
}

export default card
