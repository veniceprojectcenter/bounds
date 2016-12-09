import Marghera from './comune/Marghera';
import Metropolitan from './MetropolitanArea';
import Mestre from './comune/MestreCarpenedo';
import Venezia from './comune/VeneziaMuranoBurano';
import Comune from './Comune';
import Lido from './comune/LidoPellestrina';
import Jesolo from './outside/Jesolo';
import Favaro from './comune/FavaroVeneto';
import Chioggia from './outside/Chioggia';
import Cavallino from './outside/CavallinoTreporti';
import Cippi from './lagoon/1791';
import Mussolini from './lagoon/1924';
import LatestConterminazione from './lagoon/1990';
import InsularBaby from './models/InsularBaby';
import GreaterVenice from './models/GreaterVenice';
import TwoCities from './models/TwoCities';
import Codevigo from './outside/Codevigo';
import Chirignago from './comune/ChirignagoZelarino';
import CampagnaLupia from './outside/CampagnaLupia';
import Mira from './outside/Mira';
import Pre1883 from './historic/Pre1883';
import AdditionIn1883 from './historic/AdditionIn1883';
import AdditionIn1917 from './historic/AdditionIn1917';
import AdditionIn1924 from './historic/AdditionIn1924';
import AdditionIn1926 from './historic/AdditionIn1926';


module.exports = {
	"Administrative Areas": {
		"Metropolitan Area": Metropolitan,
		"Comune di Venezia": Comune
	},
	"Municipalities: Comune di Venezia": {
		"Venezia-Murano-Burano": Venezia,
	    "Mestre-Carpenedo": Mestre,
	    "Marghera": Marghera,
	    "Lido-Pellestrina": Lido,
	    "Chirignago-Zelarino": Chirignago,
	    "Favaro Veneto": Favaro
	},
	"Other": {
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
	"Historic Venice": {
		"Pre-1883": Pre1883,
		"Addition in 1883": AdditionIn1883,
		"Addition in 1917": AdditionIn1917,
		"Addition in 1924": AdditionIn1924,
		"Addition in 1926": AdditionIn1926
	},
	"Models": {
	    "Insular Venice": InsularBaby,
	    "Greater Venice": GreaterVenice,
	    "Two Cities": TwoCities
	}
};