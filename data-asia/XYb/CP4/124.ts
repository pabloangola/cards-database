import { Card } from "../../../interfaces"
import Set from "../CP4"

const card: Card = {
	set: Set,

	name: {
		en: 'Professor Sycamore',
		ja: 'Professor Sycamore',
	},

	category: 'Pokemon',
	rarity: 'Fixed',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 271933
		}
	}],
}

export default card
