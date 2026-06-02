import { Card } from "../../../interfaces"
import Set from "../S3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Pineco',
		ja: 'Pineco',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 224722
		}
	}],
}

export default card
