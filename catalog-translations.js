const categories = {
  "Alimentos": [
    "Food",
    "Alimentation",
    "Lebensmittel"
  ],
  "Bebidas": [
    "Drinks",
    "Boissons",
    "Getränke"
  ],
  "Botiquín": [
    "First aid",
    "Premiers secours",
    "Erste Hilfe"
  ],
  "Cuidado personal": [
    "Personal care",
    "Soins personnels",
    "Körperpflege"
  ],
  "Higiene": [
    "Hygiene",
    "Hygiène",
    "Hygiene"
  ],
  "Otros": [
    "Other",
    "Autres",
    "Sonstiges"
  ],
  "Snacks": [
    "Snacks",
    "En-cas",
    "Snacks"
  ]
};

const names = {
  "Aceite Crisol 8 oz": [
    "Crisol cooking oil, 8 oz",
    "Huile Crisol, 8 oz",
    "Crisol-Speiseöl, 8 oz"
  ],
  "Aceite de oliva Goya": [
    "Goya olive oil",
    "Huile d’olive Goya",
    "Goya-Olivenöl"
  ],
  "Aceite de oliva virgen extra Goya, 3 oz": [
    "Goya extra virgin olive oil, 3 oz",
    "Huile d’olive vierge extra Goya, 3 oz",
    "Natives Olivenöl extra von Goya, 3 oz"
  ],
  "Aceitunas Goya Manzanilla": [
    "Goya Manzanilla olives",
    "Olives Manzanilla Goya",
    "Goya-Manzanilla-Oliven"
  ],
  "Acetaminofén MK": [
    "MK acetaminophen",
    "Paracétamol MK",
    "Paracetamol MK"
  ],
  "Aleve 220 mg": [
    "Aleve 220 mg",
    "Aleve 220 mg",
    "Aleve 220 mg"
  ],
  "Almendras Price Choice": [
    "Price Choice almonds",
    "Amandes Price Choice",
    "Price Choice Mandeln"
  ],
  "Antigripal Broncochem": [
    "Broncochem cold remedy",
    "Broncochem contre le rhume",
    "Broncochem-Erkältungsmittel"
  ],
  "Arroz Bisonó Super 2 libras": [
    "Bisonó Super rice, 2 lb",
    "Riz Bisonó Super, 2 lb",
    "Bisonó Super Reis, 2 lb"
  ],
  "Arroz Campos 1 lb": [
    "Campos rice, 1 lb",
    "Riz Campos, 1 lb",
    "Campos-Reis, 1 lb"
  ],
  "Arroz La Garza 1 lb": [
    "La Garza rice, 1 lb",
    "Riz La Garza, 1 lb",
    "La Garza Reis, 1 lb"
  ],
  "Atún en trozos Jajá": [
    "Jajá tuna chunks",
    "Thon en morceaux Jajá",
    "Thunfischstücke von Jajá"
  ],
  "Atún en trozos Olé en aceite": [
    "Olé tuna chunks in oil",
    "Thon en morceaux à l’huile Olé",
    "Thunfischstücke in Öl von Olé"
  ],
  "Bandas adhesivas IFA": [
    "IFA adhesive bandages",
    "Pansements adhésifs IFA",
    "IFA-Wundpflaster"
  ],
  "Bebida de aloe vera Olé": [
    "Olé aloe vera drink",
    "Boisson à l’aloe vera Olé",
    "Olé-Aloe-Vera-Getränk"
  ],
  "Bruschette Maretti": [
    "Maretti bruschette",
    "Bruschette Maretti",
    "Maretti Bruschette"
  ],
  "Café Pilón, 200 g": [
    "Pilón coffee, 200 g",
    "Café Pilón, 200 g",
    "Pilón-Kaffee, 200 g"
  ],
  "Café Santo Domingo": [
    "Santo Domingo coffee",
    "Café Santo Domingo",
    "Santo-Domingo-Kaffee"
  ],
  "Canela entera Olé": [
    "Olé cinnamon sticks",
    "Bâtons de cannelle Olé",
    "Olé-Zimtstangen"
  ],
  "Cap’n Crunch Quaker": [
    "Quaker Cap’n Crunch",
    "Quaker Cap’n Crunch",
    "Quaker Cap’n Crunch"
  ],
  "Cepillo dental Olé": [
    "Olé toothbrush",
    "Brosse à dents Olé",
    "Olé-Zahnbürste"
  ],
  "Cereal de maíz Nestlé": [
    "Nestlé corn cereal",
    "Céréales de maïs Nestlé",
    "Nestlé-Maisflocken"
  ],
  "Cerveza Corona, 7 oz": [
    "Corona beer, 7 oz",
    "Bière Corona, 7 oz",
    "Corona-Bier, 7 oz"
  ],
  "Cerveza Presidente": [
    "Presidente beer",
    "Bière Presidente",
    "Presidente-Bier"
  ],
  "Champú Head & Shoulders": [
    "Head & Shoulders shampoo",
    "Shampooing Head & Shoulders",
    "Head & Shoulders Shampoo"
  ],
  "Cheetos Curls familiar": [
    "Cheetos Curls family pack",
    "Cheetos Curls format familial",
    "Cheetos Curls Familienpackung"
  ],
  "Chocolate Cortés Más Más": [
    "Cortés Más Más chocolate",
    "Chocolat Cortés Más Más",
    "Cortés Más Más Schokolade"
  ],
  "Chocolate Cortés Rocki Kid": [
    "Cortés Rocki Kid chocolate",
    "Chocolat Cortés Rocki Kid",
    "Cortés Rocki Kid Schokolade"
  ],
  "Chocolate Hershey’s": [
    "Hershey’s chocolate",
    "Chocolat Hershey’s",
    "Hershey’s Schokolade"
  ],
  "Chokis rellenas Gamesa": [
    "Gamesa Chokis filled cookies",
    "Biscuits fourrés Gamesa Chokis",
    "Gefüllte Gamesa-Chokis-Kekse"
  ],
  "Clavo dulce Olé": [
    "Olé whole cloves",
    "Clous de girofle entiers Olé",
    "Ganze Nelken von Olé"
  ],
  "Cocoa dulce Munné": [
    "Munné sweetened cocoa",
    "Cacao sucré Munné",
    "Gesüßter Kakao von Munné"
  ],
  "Compresas de gasa": [
    "Gauze pads",
    "Compresses de gaze",
    "Mullkompressen"
  ],
  "Cortado de leche": [
    "Curdled milk confection",
    "Confiserie au lait caillé",
    "Süßspeise aus geronnener Milch"
  ],
  "Crema corporal Body Milk": [
    "Body Milk body lotion",
    "Lait corporel Body Milk",
    "Body Milk Körperlotion"
  ],
  "Crema de leche con coco": [
    "Coconut milk cream",
    "Crème de lait à la noix de coco",
    "Milchcreme mit Kokos"
  ],
  "Crema de leche Olé": [
    "Olé cream",
    "Crème de lait Olé",
    "Olé-Sahne"
  ],
  "Crema humectante Lubriderm": [
    "Lubriderm moisturizing lotion",
    "Lotion hydratante Lubriderm",
    "Lubriderm-Feuchtigkeitslotion"
  ],
  "Desodorante Axe Body Spray": [
    "Axe body spray",
    "Déodorant spray Axe",
    "Axe-Deospray"
  ],
  "Desodorante Lady Speed Stick": [
    "Lady Speed Stick deodorant",
    "Déodorant Lady Speed Stick",
    "Lady Speed Stick Deo"
  ],
  "Desodorante Nivea en spray": [
    "Nivea spray deodorant",
    "Déodorant spray Nivea",
    "Nivea-Deospray"
  ],
  "Dulce Jomisardys (variante M)": [
    "Jomisardys confection (variant M)",
    "Confiserie Jomisardys (variante M)",
    "Jomisardys-Süßigkeit (Variante M)"
  ],
  "Enjuague Colgate Plax Ice": [
    "Colgate Plax Ice mouthwash",
    "Bain de bouche Colgate Plax Ice",
    "Colgate Plax Ice Mundspülung"
  ],
  "Espaguetis Princesa": [
    "Princesa spaghetti",
    "Spaghettis Princesa",
    "Princesa-Spaghetti"
  ],
  "Froot Loops Kellogg’s": [
    "Kellogg’s Froot Loops",
    "Froot Loops de Kellogg’s",
    "Kellogg’s Froot Loops"
  ],
  "Frosted Flakes Kellogg’s": [
    "Kellogg’s Frosted Flakes",
    "Frosted Flakes de Kellogg’s",
    "Kellogg’s Frosted Flakes"
  ],
  "Galleta Club Social": [
    "Club Social cracker",
    "Cracker Club Social",
    "Club Social Cracker"
  ],
  "Galleta Oreo Original": [
    "Original Oreo cookie",
    "Biscuit Oreo Original",
    "Oreo Original Keks"
  ],
  "Galletas Gamesa": [
    "Gamesa cookies",
    "Biscuits Gamesa",
    "Gamesa-Kekse"
  ],
  "Galletas Lavigne": [
    "Lavigne cookies",
    "Biscuits Lavigne",
    "Lavigne-Kekse"
  ],
  "Gelatina de pelo hombre": [
    "Men’s hair gel",
    "Gel coiffant pour homme",
    "Haargel für Männer"
  ],
  "Guandules Victorina": [
    "Victorina pigeon peas",
    "Pois d’Angole Victorina",
    "Victorina-Straucherbsen"
  ],
  "Habichuelas negras La Famosa": [
    "La Famosa black beans",
    "Haricots noirs La Famosa",
    "Schwarze Bohnen von La Famosa"
  ],
  "Hershey’s Cookies": [
    "Hershey’s Cookies",
    "Hershey’s Cookies",
    "Hershey’s Cookies"
  ],
  "Jabón de avena": [
    "Oatmeal soap",
    "Savon à l’avoine",
    "Haferseife"
  ],
  "Jabón Dove blanco": [
    "Dove Original soap",
    "Savon Dove Original",
    "Dove Original Seife"
  ],
  "Jabón herbal": [
    "Herbal soap",
    "Savon aux plantes",
    "Kräuterseife"
  ],
  "Jabón íntimo Nosotras": [
    "Nosotras intimate wash",
    "Gel intime Nosotras",
    "Nosotras-Intimwaschlotion"
  ],
  "Jugo Santal": [
    "Santal juice",
    "Jus Santal",
    "Santal-Saft"
  ],
  "Kit Colgate de cepillo y crema dental": [
    "Colgate toothbrush and toothpaste kit",
    "Kit brosse à dents et dentifrice Colgate",
    "Colgate-Zahnbürsten- und Zahnpastasatz"
  ],
  "Lay’s Chicharrón": [
    "Lay’s pork crackling",
    "Croustillants de porc Lay’s",
    "Lay’s Schweinekrusten"
  ],
  "Lay’s Stax cheddar, 155 g": [
    "Lay’s Stax cheddar, 155 g",
    "Lay’s Stax cheddar, 155 g",
    "Lay’s Stax Cheddar, 155 g"
  ],
  "Leche condensada Olé": [
    "Olé condensed milk",
    "Lait concentré Olé",
    "Olé-Kondensmilch"
  ],
  "Leche de coco La Famosa": [
    "La Famosa coconut milk",
    "Lait de coco La Famosa",
    "Kokosmilch von La Famosa"
  ],
  "Leche entera": [
    "Whole milk",
    "Lait entier",
    "Vollmilch"
  ],
  "Leche Rica UHT sin lactosa": [
    "Rica lactose-free UHT milk",
    "Lait UHT sans lactose Rica",
    "Laktosefreie H-Milch von Rica"
  ],
  "Lemisol lavado íntimo": [
    "Lemisol intimate wash",
    "Gel intime Lemisol",
    "Lemisol-Intimwaschlotion"
  ],
  "Lip Ice coco y vainilla": [
    "Lip Ice coconut and vanilla",
    "Lip Ice coco et vanille",
    "Lip Ice Kokos und Vanille"
  ],
  "Lip Ice mentolado": [
    "Lip Ice menthol",
    "Lip Ice mentholé",
    "Lip Ice Menthol"
  ],
  "Maíz dulce La Famosa": [
    "La Famosa sweet corn",
    "Maïs doux La Famosa",
    "Zuckermais von La Famosa"
  ],
  "Malvaviscos Sweeto": [
    "Sweeto marshmallows",
    "Guimauves Sweeto",
    "Sweeto-Marshmallows"
  ],
  "Marqués de Sitches": [
    "Marqués de Sitches",
    "Marqués de Sitches",
    "Marqués de Sitches"
  ],
  "Mioflex Forte": [
    "Mioflex Forte",
    "Mioflex Forte",
    "Mioflex Forte"
  ],
  "Nosotras Natural": [
    "Nosotras Natural",
    "Nosotras Natural",
    "Nosotras Natural"
  ],
  "Nueces Star Snacks": [
    "Star Snacks nuts",
    "Fruits à coque Star Snacks",
    "Star Snacks Nüsse"
  ],
  "Nuez de macadamia caramelizada": [
    "Caramelized macadamia nuts",
    "Noix de macadamia caramélisées",
    "Karamellisierte Macadamianüsse"
  ],
  "Nuez de macadamia natural": [
    "Plain macadamia nuts",
    "Noix de macadamia nature",
    "Macadamianüsse natur"
  ],
  "Nuez de macadamia salada": [
    "Salted macadamia nuts",
    "Noix de macadamia salées",
    "Gesalzene Macadamianüsse"
  ],
  "Palomitas ACT II Caramelo": [
    "ACT II caramel popcorn",
    "Pop-corn au caramel ACT II",
    "ACT II Karamellpopcorn"
  ],
  "Palomitas ACT II salted": [
    "ACT II salted popcorn",
    "Pop-corn salé ACT II",
    "ACT II Salzpopcorn"
  ],
  "Pañitos íntimos Nosotras": [
    "Nosotras intimate wipes",
    "Lingettes intimes Nosotras",
    "Nosotras-Intimtücher"
  ],
  "Pañitos Nosotras (variante F)": [
    "Nosotras wipes (variant F)",
    "Lingettes Nosotras (variante F)",
    "Nosotras-Feuchttücher (Variante F)"
  ],
  "Pepto-Bismol": [
    "Pepto-Bismol",
    "Pepto-Bismol",
    "Pepto-Bismol"
  ],
  "Pilas AA paquete de 2": [
    "AA batteries, pack of 2",
    "Piles AA, lot de 2",
    "AA-Batterien, 2er-Pack"
  ],
  "Polvo Mexana": [
    "Mexana powder",
    "Poudre Mexana",
    "Mexana-Puder"
  ],
  "Price Choice Baby": [
    "Price Choice Baby",
    "Price Choice Baby",
    "Price Choice Baby"
  ],
  "Pringles Original": [
    "Pringles Original",
    "Pringles Original",
    "Pringles Original"
  ],
  "Pringles Queso": [
    "Pringles Cheese",
    "Pringles fromage",
    "Pringles Käse"
  ],
  "Protector Nosotras": [
    "Nosotras liner",
    "Protège-slip Nosotras",
    "Nosotras-Slipeinlage"
  ],
  "Protector solar Nivea FPS 50, 125 ml": [
    "Nivea SPF 50 sunscreen, 125 ml",
    "Protection solaire Nivea FPS 50, 125 ml",
    "Nivea-Sonnenschutz LSF 50, 125 ml"
  ],
  "Protectores diarios Nosotras": [
    "Nosotras daily liners",
    "Protège-slips quotidiens Nosotras",
    "Nosotras-Slipeinlagen"
  ],
  "Rasuradora BIC": [
    "BIC razor",
    "Rasoir BIC",
    "BIC-Rasierer"
  ],
  "Red Bull": [
    "Red Bull",
    "Red Bull",
    "Red Bull"
  ],
  "Refresco en lata 12 oz": [
    "Canned soft drink, 12 oz",
    "Soda en canette, 12 oz",
    "Erfrischungsgetränk in der Dose, 12 oz"
  ],
  "Repelente": [
    "Insect repellent",
    "Répulsif anti-insectes",
    "Insektenschutzmittel"
  ],
  "Ron Barceló Blanco, 350 ml": [
    "Barceló white rum, 350 ml",
    "Rhum blanc Barceló, 350 ml",
    "Weißer Barceló-Rum, 350 ml"
  ],
  "Ron Brugal Doble Reserva": [
    "Brugal Doble Reserva rum",
    "Rhum Brugal Doble Reserva",
    "Brugal Doble Reserva Rum"
  ],
  "Sal Andrews Original": [
    "Sal Andrews Original",
    "Sal Andrews Original",
    "Sal Andrews Original"
  ],
  "Salchicha de pollo Induveca": [
    "Induveca chicken sausage",
    "Saucisse de poulet Induveca",
    "Induveca-Hähnchenwurst"
  ],
  "Salchicha Induveca": [
    "Induveca sausage",
    "Saucisse Induveca",
    "Induveca-Wurst"
  ],
  "Salchichas Jajá": [
    "Jajá sausages",
    "Saucisses Jajá",
    "Jajá-Würstchen"
  ],
  "Sardinas Fresca": [
    "Fresca sardines",
    "Sardines Fresca",
    "Fresca-Sardinen"
  ],
  "Sardinas Pacofish": [
    "Pacofish sardines",
    "Sardines Pacofish",
    "Pacofish-Sardinen"
  ],
  "Sopa Choice de pollo de vaso": [
    "Choice chicken noodle cup",
    "Nouilles instantanées au poulet Choice en gobelet",
    "Choice-Hühnernudelsuppe im Becher"
  ],
  "Sopa instantánea": [
    "Instant soup",
    "Soupe instantanée",
    "Instantsuppe"
  ],
  "SueroX": [
    "SueroX",
    "SueroX",
    "SueroX"
  ],
  "Tampones Nosotras": [
    "Nosotras tampons",
    "Tampons Nosotras",
    "Nosotras-Tampons"
  ],
  "Toallas Nosotras Buenas Noches": [
    "Nosotras overnight pads",
    "Serviettes de nuit Nosotras",
    "Nosotras-Nachtbinden"
  ],
  "Toallas Nosotras Ultrainvisible": [
    "Nosotras Ultrainvisible pads",
    "Serviettes Nosotras Ultrainvisible",
    "Nosotras Ultrainvisible Binden"
  ],
  "Trident Cool Bubble": [
    "Trident Cool Bubble",
    "Trident Cool Bubble",
    "Trident Cool Bubble"
  ],
  "Trident Splash hierbabuena": [
    "Trident Splash spearmint",
    "Trident Splash menthe verte",
    "Trident Splash Grüne Minze"
  ],
  "Twix Caramel": [
    "Twix Caramel",
    "Twix Caramel",
    "Twix Karamell"
  ],
  "Vegetales mixtos La Famosa": [
    "La Famosa mixed vegetables",
    "Légumes mélangés La Famosa",
    "Mischgemüse von La Famosa"
  ],
  "Vino tinto Cabernet": [
    "Cabernet red wine",
    "Vin rouge Cabernet",
    "Cabernet-Rotwein"
  ],
  "Vino tinto La Fuerza": [
    "La Fuerza red wine",
    "Vin rouge La Fuerza",
    "La Fuerza Rotwein"
  ]
};

const descriptions = {
  "Precio por 2 pastillas.": [
    "Price per 2 tablets.",
    "Prix pour 2 comprimés.",
    "Preis für 2 Tabletten."
  ],
  "Precio por sobre.": [
    "Price per sachet.",
    "Prix par sachet.",
    "Preis pro Beutel."
  ],
  "Precio por cada banda": [
    "Price per bandage.",
    "Prix par pansement.",
    "Preis pro Pflaster."
  ],
  "Precio por cada cepillo.": [
    "Price per toothbrush.",
    "Prix par brosse à dents.",
    "Preis pro Zahnbürste."
  ],
  "Precio por pastilla.": [
    "Price per tablet.",
    "Prix par comprimé.",
    "Preis pro Tablette."
  ],
  "Makaribe Jarabacoa · Bolsa de 3 oz.": [
    "Makaribe Jarabacoa · 3 oz bag.",
    "Makaribe Jarabacoa · Sachet de 3 oz.",
    "Makaribe Jarabacoa · 3-oz-Beutel."
  ],
  "Precio por paquete de 2 pilas AA": [
    "Price per pack of 2 AA batteries.",
    "Prix par lot de 2 piles AA.",
    "Preis pro 2er-Pack AA-Batterien."
  ],
  "Precio por sobre": [
    "Price per sachet.",
    "Prix par sachet.",
    "Preis pro Beutel."
  ]
};

const languageIndex = {en:0, fr:1, de:2};
const localized = (entries, value, language) =>
  Object.hasOwn(entries, value) ? entries[value][languageIndex[language]] ?? value : value;

export const categoryLabel = (value, language) => localized(categories, value, language);
export const productName = (value, language) => localized(names, value, language);
export const productDescription = (value, language) => localized(descriptions, value, language);
