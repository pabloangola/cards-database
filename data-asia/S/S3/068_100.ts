import { Card } from "../../../interfaces"
import Set from "../S3"

const card: Card = {
	set: Set,

	name: {
		en: 'Skarmory',
		ja: 'Skarmory',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139796
		}
	}],
}

export default card
