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
import BuranoMazzorboTorcello from './quartieri/BuranoMazzorboTorcello';
import CarpenedoBissuola from './quartieri/CarpenedoBissuola';
import ChirignagoGazzera from './quartieri/ChirignagoGazzera';
import Cipressina from './quartieri/CipressinaZelarinoTrivignano';
import Dorsoduro from './quartieri/DorsoduroPoloCroceGiudeccaSaccaFisola';
import FavaroQuartiero from './quartieri/FavaroVeneto';
import LidoMalamoccoAlberoni from './quartieri/LidoMalamoccoAlberoni';
import MarcoCastello from './quartieri/MarcoCastelloElenaCannaregio';
import MargheraCateneMalcontenta from './quartieri/MargheraCateneMalcontenta';
import MestreCentro from './quartieri/MestreCentro';
import MuranoErasmo from './quartieri/MuranoErasmo';
import Pellestrina from './quartieri/PellestrinaPietroInVolta';


module.exports = {
	"Lagoon Boundaries": {
	    "1791, Conterminazione Lagunare": Cippi,
	    "1924, Mussolini modification": Mussolini,
	    "1990, Lagoon Boundary of Magistrato alle Acque": LatestConterminazione
	},
	"Administrative Areas": {
		"Metropolitan Area": Metropolitan,
		"Comune di Venezia": Comune
	},
	"Municipalities": {
		"Venezia-Murano-Burano": Venezia,
	    "Mestre-Carpenedo": Mestre,
	    "Marghera": Marghera,
	    "Lido-Pellestrina": Lido,
	    "Chirignago-Zelarino": Chirignago,
	    "Favaro Veneto": Favaro
	},
	"Quartieri": {
		"Pellestrina, S. Pietro In Volta": Pellestrina,
	    "Lido, Malamocco, Alberoni": LidoMalamoccoAlberoni,
	    "Dorsoduro, S. Polo, S. Croce, Giudecca, Sacca Fisola": Dorsoduro,
	    "S. Marco, Castello, S. Elena, Cannaregio": MarcoCastello,
	    "Murano, S. Erasmo": MuranoErasmo,
	    "Burano, Mazzorbo, Torcello": BuranoMazzorboTorcello,
	    "Marghera, Catene, Malcontenta": MargheraCateneMalcontenta,
	    "Mestre Centro": MestreCentro,
	    "Carpenedo, Bissuola": CarpenedoBissuola,
	    "Favaro Veneto": FavaroQuartiero,
	    "Chirignago, Gazzera": ChirignagoGazzera,
	    "Cipressina, Zelarino, Trivignano": Cipressina
	},
	"Surrounding Comuni”": {
	    "Jesolo": Jesolo,
	    "Cavallino-Treporti": Cavallino,
	    "Chioggia": Chioggia,
	    "Mira": Mira,
	    "Campagna Lupia": CampagnaLupia,
	    "Codevigo, Padova": Codevigo
	},
	"Historic Administrative Boundaries": {
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