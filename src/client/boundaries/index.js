import Marghera from './Marghera';
import Metropolitan from './MetropolitanArea';
import Mestre from './MestreCarpenedo';
import Venezia from './VeneziaMuranoBurano';
import Comune from './Comune';
import Lido from './LidoPellestrina';
import Jesolo from './Jesolo';
import Favaro from './FavaroVeneto';
import Chioggia from './Chioggia';
import Cavallino from './CavallinoTreporti';
import Cippi from './1791';
import Mussolini from './1924';
import LatestConterminazione from './1990';
import InsularBaby from './InsularBaby';
import Codevigo from './Codevigo';
import Chirignago from './ChirignagoZelarino';
import CampagnaLupia from './CampagnaLupia';
import Mira from './Mira';

module.exports = {
	"Top Level": {
		"Metropolitan Area": Metropolitan,
		"Comune di Venezia": Comune
	},
	"Municipalities of Comune di Venezia": {
		"Venezia-Murano-Burano": Venezia,
	    "Mestre-Carpenedo": Mestre,
	    "Marghera": Marghera,
	    "Lido-Pellestrina": Lido,
	    "Chirignago-Zelarino": Chirignago,
	    "Favaro Veneto": Favaro
	},
	"Other Municipalities": {
	    "Jesolo": Jesolo,
	    "Cavallino-Treporti": Cavallino,
	    "Chioggia": Chioggia,
	    "Mira": Mira,
	    "Campagna Lupia": CampagnaLupia,
	    "Codevigo, Padova": Codevigo
	},
	"Lagoon Boundaries": {
	    "1791, Conterminazione Lagunare": Cippi,
	    "1924, Mussolini modification": Mussolini,
	    "1990, Lagoon Boundary of Magistrato alle Acque": LatestConterminazione
	},
	"Models": {
	    "Model Boundary: Insular Venice": InsularBaby
	}
};