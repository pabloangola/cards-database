import { Card } from "../../../interfaces"
import Set from "../S3"

const card: Card = {
	set: Set,

	name: {
		en: 'Ducklett',
		ja: 'Ducklett',
	},

	category: 'Pokemon',
	rarity: 'Common',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 139813
		}
	}],
}

export default card
