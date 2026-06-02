import { Card } from "../../../interfaces"
import Set from "../S3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Clefable',
		ja: 'Clefable',
	},

	category: 'Pokemon',
	rarity: 'Uncommon',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 224739
		}
	}],
}

export default card
