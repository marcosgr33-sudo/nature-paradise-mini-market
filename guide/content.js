export const languages = ['es','en','fr','de'];
export const copy = {
  title: ['Guía de Nature Paradise','Nature Paradise Guest Guide','Guide de Nature Paradise','Gästeführer von Nature Paradise'],
  welcome: ['Tu guía para disfrutar Jarabacoa','Your guide to enjoying Jarabacoa','Votre guide pour profiter de Jarabacoa','Ihr Reiseführer für Jarabacoa'],
  intro: ['Lo que necesitas para tu estadía y los lugares que te recomendamos explorar.','Find what you need for your stay and discover our favorite places.','Tous les renseignements pour votre séjour et nos bonnes adresses.','Alles für Ihren Aufenthalt und unsere Empfehlungen vor Ort.'],
  home: ['Inicio','Home','Accueil','Start'],
  sections: ['Menú','Menu','Menu','Menü'],
  language: ['Idioma','Language','Langue','Sprache'],
  explore: ['Explorar la guía','Explore the guide','Explorer le guide','Reiseführer entdecken'],
  hostChat: ['Coordina con el anfitrión por el chat de tu reserva.','Arrange with your host through your booking chat.','Organisez votre demande avec votre hôte dans la messagerie de votre réservation.','Klären Sie Ihre Anfrage im Buchungschat mit Ihrem Gastgeber.'],
  open: ['Abrir Mini Market','Open Mini Market','Ouvrir le Mini Market','Mini Market öffnen'],
  details: ['Ver detalles','View details','Voir les détails','Details ansehen'],
  map: ['Ver en Google Maps','View on Google Maps','Voir sur Google Maps','Auf Google Maps ansehen'],
  drive: ['min aprox. en carro','min approx. by car','min env. en voiture','Min. ca. mit dem Auto'],
  budget: ['Restaurantes económicos','Budget-friendly restaurants','Restaurants abordables','Preiswerte Restaurants'],
  premium: ['Experiencias gastronómicas premium','Premium dining','Expériences gastronomiques haut de gamme','Gehobene Gastronomie'],
};
export const sections = [
  ['stay', ['Alojamiento','Accommodation','Hébergement','Unterkunft'], ['Habitación, cocina, áreas comunes y salida.','Room, kitchen, common areas and checkout.','Chambre, cuisine, espaces communs et départ.','Zimmer, Küche, Gemeinschaftsbereiche und Abreise.']],
  ['market', ['Mini Market','Mini Market','Mini Market','Mini Market'], ['Compra productos esenciales sin salir de Nature Paradise.','Shop for essentials without leaving Nature Paradise.','Achetez vos essentiels sans quitter Nature Paradise.','Kaufen Sie das Nötigste direkt im Nature Paradise.']],
  ['restaurants', ['Restaurantes','Restaurants','Restaurants','Restaurants'], ['Desde una comida casual hasta una cena con vistas.','From a casual meal to dinner with a view.','Du repas décontracté au dîner avec vue.','Vom schnellen Essen bis zum Abendessen mit Aussicht.'],'dining'],
  ['places', ['Lugares turísticos','Places to visit','Lieux à visiter','Sehenswürdigkeiten'], ['Cascadas, montañas y rincones del pueblo.','Waterfalls, mountains and spots around town.','Cascades, montagnes et coins à découvrir en ville.','Wasserfälle, Berge und schöne Ecken im Ort.'],'waterfall'],
  ['tours', ['Excursiones y actividades','Tours and activities','Excursions et activités','Ausflüge und Aktivitäten'], ['Rafting, parapente, senderismo y más.','Rafting, paragliding, hiking and more.','Rafting, parapente, randonnée et plus encore.','Rafting, Gleitschirmfliegen, Wandern und mehr.'],'rafting'],
  ['transport', ['Facilidades de transporte','Transport options','Options de transport','Verkehrsmöglichkeiten'], ['Alquiler de vehículos y traslados locales.','Vehicle rentals and local rides.','Location de véhicules et déplacements locaux.','Fahrzeugvermietung und Fahrten vor Ort.'],'transport'],
  ['shops', ['Supermercados y tiendas','Supermarkets and shops','Supermarchés et commerces','Supermärkte und Geschäfte'], ['Consulta al anfitrión por tiendas y supermercados cercanos.','Ask your host about nearby shops and supermarkets.','Demandez à votre hôte quels commerces sont à proximité.','Fragen Sie Ihren Gastgeber nach Geschäften in der Nähe.']],
  ['health', ['Salud y emergencias','Health and emergencies','Santé et urgences','Gesundheit und Notfälle'], ['Las fichas de centros de salud se añadirán con sus ubicaciones confirmadas.','Healthcare listings will be added once their locations are confirmed.','Les centres de santé seront ajoutés après confirmation de leur emplacement.','Gesundheitseinrichtungen werden nach Bestätigung ihrer Standorte ergänzt.']],
];

export const restaurants = {
  budget: [
    ['Nelda Bistro',2,'Comida al aire libre en un ambiente rústico y campestre.','Open-air dining in a rustic countryside setting.','Cuisine en plein air dans un cadre rustique et champêtre.','Essen im Freien in ländlich-rustikaler Umgebung.'],
    ['Búho',10,'Local bohemio con murales, música y ambiente para compartir.','Bohemian spot with murals, music and a lively atmosphere.','Adresse bohème avec fresques, musique et ambiance conviviale.','Bohème-Lokal mit Wandmalereien, Musik und geselliger Atmosphäre.'],
    ['La Melaza',10,'Sándwiches, comidas ligeras, jugos naturales y batidos.','Sandwiches, light meals, fresh juices and smoothies.','Sandwichs, repas légers, jus frais et smoothies.','Sandwiches, leichte Gerichte, frische Säfte und Smoothies.'],
    ['King Mofongo',12,'Mofongos variados y porciones generosas en el centro de Jarabacoa.','A variety of mofongos and generous portions in downtown Jarabacoa.','Mofongos variés et portions généreuses au centre de Jarabacoa.','Viele Mofongo-Varianten und großzügige Portionen im Zentrum.'],
    ['Pizzería Pepperoni',12,'Una de nuestras pizzerías favoritas, con una amplia variedad de pizzas.','One of our favorite pizzerias, with a wide range of pizzas.','L’une de nos pizzerias préférées, avec un grand choix de pizzas.','Eine unserer Lieblingspizzerien mit großer Pizza-Auswahl.'],
  ],
  premium: [
    ['Herbes',1,'Cocina de autor con ingredientes de su granja, en un ambiente refinado y climatizado.','Creative farm-to-table dining in a refined, air-conditioned setting.','Cuisine créative avec les produits de sa ferme, dans un cadre raffiné et climatisé.','Kreative Küche mit Zutaten vom eigenen Hof in elegantem, klimatisiertem Ambiente.'],
    ['Rivera Country Club',5,'Cocina a orillas del río Jimenoa, rodeada de naturaleza.','Dining beside the Jimenoa River in a natural setting.','Cuisine au bord de la rivière Jimenoa, en pleine nature.','Essen am Fluss Jimenoa mitten in der Natur.'],
    ['Plaza Alterra',5,'Conocida por sus pizzas artesanales al horno de leña.','Known for handmade wood-fired pizzas.','Connue pour ses pizzas artisanales au feu de bois.','Bekannt für handgemachte Holzofenpizza.'],
    ['Café Colao',10,'Un rincón pintoresco, con buenos espacios para fotos y para comer.','A colorful spot for a meal and memorable photos.','Un lieu pittoresque pour manger et prendre des photos.','Ein farbenfroher Ort zum Essen und Fotografieren.'],
    ['Restaurante Pelé',10,'Especialidades internacionales con una presentación cuidada.','International specialties with thoughtful presentation.','Spécialités internationales à la présentation soignée.','Internationale Spezialitäten mit sorgfältiger Präsentation.'],
    ['Restaurante La Tinaja',10,'Repostería y panadería en un ambiente tranquilo.','Pastries and baked goods in a relaxed setting.','Pâtisseries et produits de boulangerie dans un cadre détendu.','Gebäck und Backwaren in entspannter Atmosphäre.'],
    ['Restaurante El Fresco',12,'Restaurante de ambiente elegante con música en vivo en algunas ocasiones.','Elegant restaurant with occasional live music.','Restaurant élégant avec parfois de la musique en direct.','Elegantes Restaurant mit gelegentlicher Livemusik.'],
    ['Plaza del Café',13,'Platos variados y especialidades de café.','A variety of dishes and specialty coffee.','Plats variés et cafés de spécialité.','Abwechslungsreiche Gerichte und Kaffeespezialitäten.'],
    ['Hamaca de Dios',15,'Cocina de montaña con vistas panorámicas de Jarabacoa.','Mountain dining with panoramic views of Jarabacoa.','Cuisine de montagne avec vue panoramique sur Jarabacoa.','Essen in den Bergen mit Panoramablick auf Jarabacoa.'],
  ],
};

export const places = [
  ['Salto de Jimenoa I',15,'Cascada rodeada de vegetación y paisajes montañosos.','A waterfall surrounded by lush vegetation and mountain scenery.','Cascade entourée de végétation et de paysages montagneux.','Wasserfall in üppiger Vegetation und Berglandschaft.'],
  ['Salto de Jimenoa II',6,'Una cascada emblemática conocida por sus senderos y puentes colgantes.','An iconic waterfall known for its trails and hanging bridges.','Cascade emblématique connue pour ses sentiers et ponts suspendus.','Bekannter Wasserfall mit Wanderwegen und Hängebrücken.'],
  ['Salto de Baiguate',15,'Una cascada en un entorno tranquilo para disfrutar del paisaje.','A waterfall in a peaceful setting for enjoying the scenery.','Cascade dans un cadre paisible pour profiter du paysage.','Wasserfall in ruhiger Umgebung mit schöner Landschaft.'],
  ['La Confluencia',15,'El punto donde se encuentran los ríos Jimenoa y Yaque del Norte.','Where the Jimenoa and Yaque del Norte rivers meet.','Au confluent des rivières Jimenoa et Yaque del Norte.','Hier treffen Jimenoa und Yaque del Norte zusammen.'],
  ['Balneario La Cortina',20,'Rincón campestre con una pequeña cascada, camino a Manabao.','Countryside spot with a small waterfall on the road to Manabao.','Coin champêtre avec une petite cascade sur la route de Manabao.','Ländlicher Ort mit kleinem Wasserfall auf dem Weg nach Manabao.'],
  ['El Jacuzzi Natural',20,'Poza de agua fresca rodeada de vegetación.','A natural pool surrounded by greenery.','Bassin naturel d’eau fraîche entouré de verdure.','Naturbecken mit frischem Wasser inmitten von Grün.'],
  ['Calle de las Sombrillas',10,'Una calle colorida en el centro, ideal para fotos.','A colorful downtown street with great photo spots.','Rue colorée du centre-ville, idéale pour les photos.','Bunte Straße im Zentrum, ideal für Fotos.'],
  ['Parque Duarte',10,'El corazón del pueblo, ideal para pasear o descansar.','The heart of town, ideal for a stroll or a break.','Le cœur de la ville, idéal pour une balade ou une pause.','Das Herz des Ortes, ideal zum Spazieren oder Ausruhen.'],
  ['Letrero Municipal de Jarabacoa',15,'Una parada para llevarte una foto de recuerdo de Jarabacoa.','A photo stop for a souvenir of Jarabacoa.','Un arrêt photo pour garder un souvenir de Jarabacoa.','Ein Fotostopp als Erinnerung an Jarabacoa.'],
];

export const tours = [
  [['Four Wheels (ATV)','ATV rides','Balades en quad','Quad-Touren'],['Recorre caminos de montaña y senderos rurales en un todoterreno.','Explore mountain roads and rural trails on an ATV.','Parcourez pistes de montagne et chemins ruraux en quad.','Erkunden Sie Bergstraßen und Landwege mit dem Quad.']],
  [['Rafting en el río Yaque del Norte','Yaque del Norte river rafting','Rafting sur le Yaque del Norte','Rafting auf dem Yaque del Norte'],['Desciende los rápidos en balsa con un guía.','Ride the rapids on a guided raft trip.','Descendez les rapides en radeau avec un guide.','Fahren Sie mit einem Guide im Schlauchboot durch die Stromschnellen.']],
  [['Parapente','Paragliding','Parapente','Gleitschirmfliegen'],['Sobrevuela las montañas y valles en un vuelo tándem.','Fly over the mountains and valleys on a tandem flight.','Survolez les montagnes et les vallées en tandem.','Fliegen Sie im Tandem über Berge und Täler.']],
  [['Paseos a caballo','Horseback riding','Balades à cheval','Ausritte'],['Explora senderos naturales y paisajes rurales a caballo.','Explore nature trails and countryside on horseback.','Découvrez à cheval les sentiers et les paysages ruraux.','Entdecken Sie Naturpfade und ländliche Landschaften zu Pferd.']],
  [['Barranquismo','Canyoning','Canyoning','Canyoning'],['Explora cañones y desciende cascadas con cuerdas en una salida guiada.','Explore canyons and rappel down waterfalls on a guided trip.','Explorez des canyons et descendez des cascades en rappel avec un guide.','Erkunden Sie Schluchten und seilen Sie sich mit einem Guide an Wasserfällen ab.']],
  [['Senderismo a El Mogote','Hike to El Mogote','Randonnée à El Mogote','Wanderung zum El Mogote'],['Caminata exigente entre bosques y senderos, con vistas panorámicas.','A demanding forest hike with panoramic views.','Randonnée exigeante en forêt, avec des vues panoramiques.','Anspruchsvolle Waldwanderung mit Panoramablick.']],
  [['Expedición al Pico Duarte','Pico Duarte expedition','Expédition au Pico Duarte','Expedition zum Pico Duarte'],['Travesía de varios días entre pinares, valles y paisajes de montaña.','A multi-day trek through pine forests, valleys and mountain scenery.','Trek de plusieurs jours entre pinèdes, vallées et montagnes.','Mehrtägige Wanderung durch Kiefernwälder, Täler und Berglandschaften.']],
  [['Guagüita de Café Colao','Café Colao sightseeing ride','Balade en guagüita de Café Colao','Rundfahrt mit der Café-Colao-Guagüita'],['Recorrido por Jarabacoa en la guagüita de Café Colao, con música dominicana.','Tour Jarabacoa in Café Colao’s colorful vehicle with Dominican music.','Parcourez Jarabacoa à bord du véhicule coloré de Café Colao, en musique dominicaine.','Rundfahrt durch Jarabacoa im bunten Fahrzeug von Café Colao mit dominikanischer Musik.']],
];

export const transport = [
  [['Alquiler de carros','Car rental','Location de voiture','Autovermietung'],['Alquiler por día. Se requiere una licencia de conducir válida.','Daily rental. A valid driver’s license is required.','Location à la journée. Permis de conduire valide requis.','Tagesmiete. Ein gültiger Führerschein ist erforderlich.']],
  [['Alquiler de motocicletas','Motorcycle rental','Location de moto','Motorradvermietung'],['Alquiler por día con casco incluido.','Daily rental with a helmet included.','Location à la journée avec casque inclus.','Tagesmiete mit Helm.']],
  [['Taxi local','Local taxi','Taxi local','Taxi vor Ort'],['Traslados privados por Jarabacoa y sus alrededores.','Private rides in and around Jarabacoa.','Trajets privés à Jarabacoa et aux alentours.','Private Fahrten in Jarabacoa und Umgebung.']],
  [['Mototaxi local','Local motorcycle taxi','Moto-taxi local','Motorradtaxi vor Ort'],['Una opción para trayectos cortos dentro de Jarabacoa.','An option for short rides within Jarabacoa.','Une option pour les courts trajets à Jarabacoa.','Eine Option für kurze Strecken innerhalb Jarabacoas.']],
];

export const stay = [
  [['Habitación y baño','Room and bathroom','Chambre et salle de bain','Zimmer und Bad'],[
    ['Si necesitas algo en tu habitación, avísanos por el chat de tu reserva.','If you need anything in your room, let us know through your booking chat.','Pour tout besoin dans votre chambre, contactez-nous dans la messagerie de votre réservation.','Bei Fragen zu Ihrem Zimmer schreiben Sie uns im Buchungschat.'],
  ]],
  [['Cocina y comedor','Kitchen and dining area','Cuisine et salle à manger','Küche und Essbereich'],[
    ['La cocina compartida está equipada. Hay agua potable y café de cortesía. Lava lo que uses y deja el espacio limpio.','The shared kitchen is equipped. Drinking water and coffee are complimentary. Wash what you use and leave the area clean.','La cuisine commune est équipée. Eau potable et café sont offerts. Lavez ce que vous utilisez et laissez les lieux propres.','Die Gemeinschaftsküche ist ausgestattet. Trinkwasser und Kaffee sind inklusive. Spülen Sie benutzte Utensilien und hinterlassen Sie alles sauber.'],
  ]],
  [['Áreas comunes y bicicletas','Common areas and bicycles','Espaces communs et vélos','Gemeinschaftsbereiche und Fahrräder'],[
    ['Consulta al anfitrión por la piscina, las bicicletas y otras actividades en la propiedad.','Ask your host about the pool, bicycles and other activities on the property.','Renseignez-vous auprès de votre hôte sur la piscine, les vélos et les autres activités sur place.','Fragen Sie Ihren Gastgeber nach dem Pool, Fahrrädern und weiteren Aktivitäten auf dem Grundstück.'],
  ]],
  [['Parqueo, tienda y lavandería','Parking, shop and laundry','Parking, boutique et lessive','Parken, Laden und Wäsche'],[
    ['Consulta con el anfitrión por el parqueo y la lavandería. El catálogo de la tienda está en Mini Market.','Ask your host about parking and laundry. Find our shop catalogue in Mini Market.','Demandez à votre hôte pour le parking et la lessive. Le catalogue de la boutique est dans Mini Market.','Fragen Sie Ihren Gastgeber nach Parken und Wäsche. Den Ladenkatalog finden Sie unter Mini Market.'],
  ]],
  [['Llegada y salida','Arrival and checkout','Arrivée et départ','Ankunft und Abreise'],[
    ['Encontrarás los horarios y las instrucciones de tu estadía en el chat de tu reserva.','Your stay times and instructions are in your booking chat.','Les horaires et consignes de votre séjour sont dans la messagerie de votre réservation.','Zeiten und Hinweise zu Ihrem Aufenthalt finden Sie im Buchungschat.'],
  ]],
];

// Add direct place URLs here when the host confirms each location.
export const locations = {};
