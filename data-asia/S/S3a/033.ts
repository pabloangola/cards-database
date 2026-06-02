import { Card } from "../../../interfaces"
import Set from "../S3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Zacian',
		ja: 'Zacian',
	},

	category: 'Pokemon',
	rarity: 'Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 224748
		}
	}],
}

export default card
