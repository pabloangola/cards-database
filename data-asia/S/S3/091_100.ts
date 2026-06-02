import { Card } from "../../../interfaces"
import Set from "../S3"

const card: Card = {
	set: Set,

	name: {
		en: 'Rare Fossil',
		ja: 'Rare Fossil',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139819
		}
	}],
}

export default card
