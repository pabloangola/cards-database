import { Card } from "../../../interfaces"
import Set from "../S3"

const card: Card = {
	set: Set,

	name: {
		en: 'Klang',
		ja: 'Klang',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139798
		}
	}],
}

export default card
