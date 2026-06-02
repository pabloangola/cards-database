import { Card } from "../../../interfaces"
import Set from "../S3a"

const card: Card = {
	set: Set,

	name: {
		en: 'Zamazenta',
		ja: 'Zamazenta',
	},

	category: 'Pokemon',
	rarity: 'Illustration Rare',

	variants: [{
		type: 'normal',
		thirdParty: {
			cardtrader: 224766
		}
	}],
}

export default card
