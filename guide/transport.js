const publicRoutes = [
  {
    name: 'Caribe Tours · Jarabacoa → La Vega / Santo Domingo',
    photo: 'caribe-bus', stop: 'Calle Luperón 6',
    map: 'Caribe Tours Jarabacoa, Calle Luperón 6',
    placeId: 'ChIJr-Rxs8oxsI4RKIMfonPfTlI',
    phone: '+18095744796',
    site: 'https://caribetours.com.do/'
  },
  {name: 'Jarabacoa → La Vega', photo: 'expreso-montana', illustrative: true, stop: 'La Vega / Expreso (SICHOUJA)', map: '19.12426,-70.64203'},
  {name: 'Jarabacoa → Constanza', photo: 'constanza-valle', illustrative: true, stop: 'Parada de Constanza', map: 'Parada de Constanza (Bus stop to Constanza), Jarabacoa', searchOnly: true},
  {name: 'Jarabacoa → Manabao', photo: 'manabao-ruta', illustrative: true, stop: 'Parada Manabao / La Ciénaga', map: '19.12077,-70.64402'}
];

const rides = [
  {name: ['Taxi de confianza', 'Trusted taxi', 'Taxi de confiance', 'Vertrauenswürdiges Taxi'], button: ['Solicitar un taxi', 'Request a taxi', 'Demander un taxi', 'Taxi anfragen'], photo: true},
  {name: ['Mototaxi de confianza', 'Trusted motorcycle taxi', 'Moto-taxi de confiance', 'Vertrauenswürdiges Motorradtaxi'], button: ['Solicitar un mototaxi', 'Request a motorcycle taxi', 'Demander un moto-taxi', 'Motorradtaxi anfragen']}
];

const rentals = [
  {name: ['Alquiler de carro', 'Car rental', 'Location de voiture', 'Mietwagen'], photo: 'renta-carro', detail: ['Presenta una licencia de conducir válida.', 'Bring a valid driver’s license.', 'Présentez un permis de conduire valide.', 'Bitte einen gültigen Führerschein vorlegen.'], min: 1800, max: 2000},
  {name: ['Alquiler de motocicleta', 'Motorcycle rental', 'Location de moto', 'Motorradvermietung'], photo: 'renta-moto', detail: ['Incluye un casco protector.', 'A helmet is included.', 'Un casque est fourni.', 'Ein Helm ist inbegriffen.'], min: 1500, max: 1800}
];

function whatsapp(message) {
  const url = new URL('https://wa.me/18497503039');
  url.searchParams.set('text', message);
  return url.href;
}

function addWhatsAppIcon(button, node) {
  const icon = node('img');
  icon.src = './guide/whatsapp.svg';
  icon.alt = '';
  button.prepend(icon);
}

export function renderTransport(list, {node, link, row, t, language}) {
  function addPhoto(card, file, caption) {
    const figure = node('figure', '', 'transport-figure');
    const image = node('img');
    image.src = './guide/' + file + '.webp';
    image.alt = '';
    image.loading = 'lazy';
    figure.append(image);
    if (caption) figure.append(node('figcaption', caption));
    card.firstElementChild.after(figure);
  }
  const shortcut = node('nav', '', 'stay-shortcuts');
  shortcut.append(link(t(['Ir a renta de carros y motos', 'Go to car and motorcycle rentals', 'Voir les locations de voitures et motos', 'Zur Auto- und Motorradvermietung']), '#renta'));
  shortcut.append(link(t(['Traslados al aeropuerto', 'Airport transfers', 'Transferts aéroport', 'Flughafentransfers']), '#traslados-aeropuerto'));
  list.append(shortcut);
  list.append(node('h2', t(['Transporte público', 'Public transportation', 'Transports en commun', 'Öffentliche Verkehrsmittel'])));
  list.append(node('p', t(['Las estaciones de autobuses quedan a unos 10 min en carro desde Nature Paradise. Consulta el horario y el precio del pasaje antes de salir.', 'The bus stations are about 10 minutes by car from Nature Paradise. Check departure times and fares before leaving.', 'Les gares routières sont à environ 10 min en voiture de Nature Paradise. Vérifiez les horaires et les tarifs avant de partir.', 'Die Busbahnhöfe liegen etwa 10 Autominuten von Nature Paradise entfernt. Prüfe Abfahrtszeiten und Preise vor der Fahrt.']), 'host-note'));
  for (const route of publicRoutes) {
    const query = new URLSearchParams({api: '1', query: route.map});
    if (route.placeId) query.set('query_place_id', route.placeId);
    const label = route.searchOnly
      ? t(['Buscar parada en Google Maps', 'Search for the stop on Google Maps', 'Chercher l’arrêt sur Google Maps', 'Haltestelle auf Google Maps suchen'])
      : t(['Ver parada en Google Maps', 'View stop on Google Maps', 'Voir l’arrêt sur Google Maps', 'Haltestelle auf Google Maps ansehen']);
    const actions = node('div', '', 'transport-actions');
    actions.append(link(label, 'https://www.google.com/maps/search/?' + query, 'button'));
    if (route.phone) {
      actions.append(link(t(['Consultar horario y tarifa', 'Check schedules and fares', 'Consulter les horaires et tarifs', 'Fahrplan und Fahrpreis erfragen']), 'tel:' + route.phone, 'button'));
      actions.append(link('Caribe Tours', route.site, 'button'));
    }
    const card = row(route.name, [route.stop], null, actions);
    if (route.photo) addPhoto(card, route.photo, route.illustrative && t(['Imagen de referencia', 'Illustrative photo', 'Photo indicative', 'Beispielfoto']));
    list.append(card);
  }

  list.append(node('h2', t(['Traslados locales', 'Local rides', 'Trajets locaux', 'Fahrten vor Ort'])));
  for (const ride of rides) {
    const message = t([
      'Hola, me gustaría solicitar ' + (ride.photo ? 'un taxi' : 'un mototaxi') + ' en Jarabacoa. ¿Me ayudan a coordinarlo?',
      'Hello, I’d like to request a ' + (ride.photo ? 'taxi' : 'motorcycle taxi') + ' in Jarabacoa. Could you help arrange it?',
      'Bonjour, je voudrais demander un ' + (ride.photo ? 'taxi' : 'moto-taxi') + ' à Jarabacoa. Pouvez-vous m’aider à organiser le trajet ?',
      'Hallo, ich möchte in Jarabacoa ein ' + (ride.photo ? 'Taxi' : 'Motorradtaxi') + ' anfragen. Könnt ihr mir bei der Organisation helfen?'
    ]);
    const button = link(t(ride.button), whatsapp(message), 'button transport-wa');
    addWhatsAppIcon(button, node);
    const card = row(t(ride.name), [t(['Te ayudamos a coordinar tu traslado.', 'We can help arrange your ride.', 'Nous vous aidons à organiser votre trajet.', 'Wir helfen dir, die Fahrt zu organisieren.'])], null, button);
    addPhoto(card, ride.photo ? 'taxi-montana' : 'mototaxi');
    list.append(card);
  }

  const heading = node('h2', t(['Alquiler de vehículos', 'Vehicle rentals', 'Location de véhicules', 'Fahrzeugvermietung']));
  heading.id = 'renta';
  heading.className = 'stay-stop';
  list.append(heading);
  list.append(node('p', t(['Tarifas diarias estimadas. Pueden variar según la temporada.', 'Estimated daily rates may vary by season.', 'Les tarifs journaliers estimés peuvent varier selon la saison.', 'Die geschätzten Tagespreise können je nach Saison variieren.']), 'host-note'));
  for (const rental of rentals) {
    const card = row(t(rental.name), [t(rental.detail), formatRange(rental.min, rental.max, language)], null, rentalForm(rental, {node, t, language}));
    addPhoto(card, rental.photo);
    list.append(card);
  }
  const airport = node('aside', '', 'item host-note');
  airport.id = 'traslados-aeropuerto';
  airport.classList.add('stay-stop');
  airport.append(node('h2', t(['Traslados al aeropuerto', 'Airport transfers', 'Transferts aéroport', 'Flughafentransfers'])));
  airport.append(node('p', t([
    'Podemos recogerte en cualquiera de los aeropuertos de la República Dominicana y llevarte a Nature Paradise. También coordinamos el traslado de regreso. Trabajamos con choferes de confianza que han recibido muy buenos comentarios de nuestros huéspedes.',
    'We can arrange pickup at any airport in the Dominican Republic and take you to Nature Paradise. We can also arrange your return trip. Our guests have shared very positive feedback about the drivers we work with.',
    'Nous pouvons organiser votre transfert depuis n’importe quel aéroport de la République dominicaine jusqu’à Nature Paradise, ainsi que le trajet retour. Nos hôtes nous ont fait de très bons retours sur nos chauffeurs de confiance.',
    'Wir organisieren deine Abholung an jedem Flughafen der Dominikanischen Republik und die Fahrt zu Nature Paradise. Auch die Rückfahrt zum Flughafen übernehmen unsere zuverlässigen Fahrer, von denen unsere Gäste sehr positiv berichten.'
  ])));
  airport.append(node('p', t([
    'Indícanos el aeropuerto, la fecha y cuántas personas viajan. Te cotizaremos el traslado con antelación para que puedas comparar nuestra tarifa con las opciones del aeropuerto.',
    'Tell us the airport, your travel date and the number of passengers. We’ll quote you a fare in advance so you can compare it with the options at the airport.',
    'Indiquez-nous l’aéroport, la date et le nombre de passagers. Nous vous communiquerons le tarif à l’avance pour que vous puissiez le comparer aux options proposées à l’aéroport.',
    'Nenne uns den Flughafen, das Reisedatum und die Anzahl der Reisenden. Du erhältst vorab ein Angebot und kannst es mit den Preisen am Flughafen vergleichen.'
  ])));
  const contact = link(t(['Chatear con el anfitrión', 'Chat with your host', 'Discuter avec votre hôte', 'Mit dem Gastgeber chatten']), whatsapp(t([
    'Hola, quisiera consultar la disponibilidad y el precio de un traslado al aeropuerto o desde el aeropuerto.',
    'Hello, could you tell me the availability and fare for an airport transfer?',
    'Bonjour, je souhaiterais connaître les disponibilités et le tarif d’un transfert aéroport.',
    'Hallo, ich möchte nach der Verfügbarkeit und dem Preis für einen Flughafentransfer fragen.'
  ])), 'button transport-wa');
  addWhatsAppIcon(contact, node);
  airport.append(contact);
  list.append(airport);
}

function formatRange(min, max, language) {
  const locale = language === 'es' ? 'es-DO' : language;
  const money = new Intl.NumberFormat(locale);
  const dollars = new Intl.NumberFormat(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2});
  const rate = 60.225;
  return 'RD$' + money.format(min) + '–' + money.format(max)
    + ' · US$' + dollars.format(min / rate) + '–' + dollars.format(max / rate);
}

function rentalForm(rental, {node, t, language}) {
  const form = node('form', '', 'tour-inquiry');
  const startLabel = node('label', t(['Fecha de recogida', 'Pickup date', 'Date de retrait', 'Abholdatum']));
  const endLabel = node('label', t(['Fecha de devolución', 'Return date', 'Date de retour', 'Rückgabedatum']));
  const start = node('input');
  const end = node('input');
  const today = () => new Intl.DateTimeFormat('sv-SE', {timeZone: 'America/Santo_Domingo'}).format(new Date());
  start.type = end.type = 'date';
  start.required = end.required = true;
  start.min = end.min = today();
  const estimate = node('output', '', 'rental-estimate');
  estimate.setAttribute('aria-live', 'polite');
  const dayCount = () => Math.max(1, (Date.parse(end.value) - Date.parse(start.value)) / 86400000);
  function updateEstimate() {
    end.min = start.value || today();
    if (!start.value || !end.value || !start.validity.valid || !end.validity.valid) {
      estimate.textContent = '';
      return;
    }
    const days = dayCount();
    const unit = days === 1 ? t(['día', 'day', 'jour', 'Tag']) : t(['días', 'days', 'jours', 'Tage']);
    estimate.textContent = t(['Total estimado', 'Estimated total', 'Total estimé', 'Geschätzter Gesamtpreis'])
      + ' (' + days + ' ' + unit + ') · ' + formatRange(rental.min * days, rental.max * days, language);
  }
  start.addEventListener('change', updateEstimate);
  end.addEventListener('change', updateEstimate);
  startLabel.append(start);
  endLabel.append(end);
  const button = node('button', t(['Solicitar disponibilidad', 'Check availability', 'Demander la disponibilité', 'Verfügbarkeit anfragen']), 'button tour-price transport-wa');
  button.type = 'submit';
  addWhatsAppIcon(button, node);
  form.append(node('h4', t(['¿Para qué fechas deseas consultar la disponibilidad?', 'Which dates would you like to check?', 'Pour quelles dates souhaitez-vous vérifier la disponibilité ?', 'Für welchen Zeitraum möchtest du die Verfügbarkeit prüfen?']), 'rental-question'));
  form.append(startLabel, endLabel, button, estimate);
  form.addEventListener('submit', event => {
    event.preventDefault();
    start.min = today();
    updateEstimate();
    if (!form.reportValidity()) return;
    const date = new Intl.DateTimeFormat(language, {dateStyle: 'long', timeZone: 'UTC'});
    const from = date.format(new Date(start.value));
    const to = date.format(new Date(end.value));
    const name = t(rental.name);
    const message = t([
      `Hola, quisiera solicitar «${name}» del ${from} al ${to}. ¿Me confirman la disponibilidad y el precio?`,
      `Hello, I’d like to request “${name}” from ${from} to ${to}. Can you confirm availability and the price?`,
      `Bonjour, je souhaite demander « ${name} » du ${from} au ${to}. Pouvez-vous confirmer la disponibilité et le tarif ?`,
      `Hallo, ich möchte „${name}“ vom ${from} bis ${to} anfragen. Könnt ihr Verfügbarkeit und Preis bestätigen?`
    ]);
    window.open(whatsapp(message + '\n' + estimate.textContent), '_blank', 'noopener,noreferrer');
  });
  return form;
}
