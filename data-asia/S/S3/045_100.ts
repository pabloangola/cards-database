import { Card } from "../../../interfaces"
import Set from "../S3"

const card: Card = {
	set: Set,

	name: {
		en: 'Vibrava',
		ja: 'Vibrava',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139773
		}
	}],
}

export default card
