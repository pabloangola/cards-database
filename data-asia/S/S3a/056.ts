import { Card } from "../../../interfaces"
import Set from "../S3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Rayquaza',
		ja: 'Rayquaza',
	},

	category: 'Pokemon',
	rarity: 'Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 224794
		}
	}],
}

export default card
