import {tourCard, tourIntro} from './tours.js?v=tarifas';
import {reviewLink} from './review.js';
import * as roomGuide from './room.js?v=xuper-tv';
import {languages,copy,sections,restaurants,places,tours,stay,checkout,arrival,locations,healthServices,nearbyShops} from './content.js?v=tarifas';
import {renderTransport} from './transport.js?v=toyota-aeropuerto';

const placePhotos = {
  "Salto de Jimenoa I": [
    "place-photos/jimenoa-1.webp",
    "https://visitdominicanrepublic.com/things-to-do/hike-salto-de-jimenoa-uno-waterfall/"
  ],
  "Salto de Jimenoa II": [
    "place-photos/jimenoa-2.webp",
    "https://traphil.com/2020/07/03/salto-jimenoa-dos-en-jarabacoa/"
  ],
  "La Confluencia": [
    "place-photos/confluencia.webp",
    "https://www.tripadvisor.nl/Attraction_Review-g675009-d4978569-Reviews-La_Confluencia-Jarabacoa_La_Vega_Province_Dominican_Republic.html"
  ],
  "Balneario La Cortina": [
    "place-photos/cortina-cascada.webp?v=2"
  ],
  "Calle de las Sombrillas": [
    "place-photos/sombrillas.webp",
    "https://x.com/TurismoRD/status/1667912044174098433"
  ],
  "Parque Duarte": [
    "place-photos/duarte.webp",
    "https://www.conectate.com.do/articulo/la-vega/"
  ],
  "Letrero Municipal de Jarabacoa": [
    "place-photos/letrero.webp",
    "https://travelsbymike.com/travel-blog/f/jarabacoa-dominican-republic"
  ],
  "Salto de Aguas Blancas · Constanza": [
    "place-photos/aguas-blancas.webp",
    "https://www.explore-share.com/trip/salto-de-aguas-blancas-half-day-hike-in-the-valle-nuevo-national-park-near-constanza/"
  ],
  "Salto de Baiguate": [
    "salto-baiguate.webp"
  ]
};

const params = new URLSearchParams(location.search);
const language = params.get('lang');
const index = languages.indexOf(language);
if (index >= 0) showGuide();
else {
  const footer = document.createElement('p');
  footer.append(reviewLink('es'));
  document.querySelector('.entry-panel').append(footer);
}

function showGuide() {
  const get = id => document.getElementById(id);
  const t = values => values[index];
  const section = sections.find(([id]) => id === params.get('section') && id !== 'market');
  const route = id => id === 'market'
    ? './mini-market/?lang=' + language
    : './guia.html?lang=' + language + (id ? '&section=' + id : '');

  function node(tag, text, className) {
    const result = document.createElement(tag);
    if (text) result.textContent = text;
    if (className) result.className = className;
    return result;
  }

  function link(text, href, className) {
    const result = node('a', text, className);
    result.href = href;
    return result;
  }

  function row(title, paragraphs, minutes, action) {
    const article = node('article', '', 'item');
    article.append(node('h3', title));
    for (const paragraph of paragraphs) article.append(node('p', paragraph));
    if (minutes) article.append(node('p', minutes + ' ' + t(copy.drive), 'time'));
    if (action) article.append(action);
    return article;
  }

  function placeCard([name,minutes,...description]) {
    const locationUrl = locations[name];
    const searchOnly = ['Balneario La Cortina', 'El Jacuzzi Natural', 'Letrero Municipal de Jarabacoa'].includes(name);
    const mapLabel = searchOnly
      ? t(['Buscar en Google Maps', 'Search Google Maps', 'Rechercher sur Google Maps', 'Auf Google Maps suchen'])
      : t(copy.map);
    const card = row(name, [t(description)], minutes,
      locationUrl ? link(mapLabel, locationUrl, 'button') : null);
    const photo = placePhotos[name];
    if (photo) {
      const [file, source] = photo;
      const figure = node('figure', '', 'place-photo');
      const image = node('img');
      image.src = './guide/' + file;
      image.alt = name;
      image.loading = 'lazy';
      if (name === 'Balneario La Cortina') image.style.aspectRatio = 'auto';
      figure.append(image);
      if (source) {
        const caption = node('figcaption');
        caption.append(link(t(['Fuente de la foto', 'Photo source', 'Source de la photo', 'Bildquelle']), source));
        figure.append(caption);
      }
      card.classList.add('place-with-photo');
      card.firstElementChild.after(figure);
    }
    return card;
  }

  const content = get('content');
  document.documentElement.lang = language;
  document.title = (section ? t(section[1]) + ' | ' : '') + t(copy.title) + ' | Jarabacoa';
  get('home-link').href = route();
  get('language-link').textContent = t(copy.language);
  get('section-label').textContent = t(copy.sections);
  for (const [id,title] of [[null,copy.home],...sections]) {
    const item = link(t(title), route(id));
    if ((section?.[0] ?? null) === id) item.setAttribute('aria-current','page');
    get('section-links').append(item);
  }
  document.addEventListener('click', event => {
    const navigation = get('navigation');
    if (!navigation.contains(event.target)) navigation.open = false;
  });
  if (!section) {
    const hero = node('div', '', 'hero');
    const heading = node('div', '', 'frame');
    heading.append(node('h1', t(copy.welcome)),node('p', t(copy.intro)));
    hero.append(heading);
    const list = node('section', '', 'frame list');
    list.id = 'sections';
    list.append(node('h2', t(copy.title)));
    const cards = node('div', '', 'cards');
    for (const [id,title,description,photo,coverDescription = description] of sections) {
      const card = link('', route(id), 'card');
      if (photo) {
        const image = node('img');
        image.src = './guide/' + photo + '.webp';
        image.alt = '';
        image.loading = 'lazy';
        if (id === 'places') image.alt = 'Salto de Baiguate, Jarabacoa';
        if (id === 'restaurants') image.style.objectPosition = 'center 28%';
        if (id === 'transport') image.className = 'transport-cover';
        if (id === 'market') image.className = 'market-display';
        card.append(image);
      }
      const body = node('div', '', 'card-body');
      const descriptionText = id === 'tours'
        ? new Intl.ListFormat(language).format(tours.map(([titles]) => t(titles))) + '. ' + t(coverDescription)
        : t(coverDescription);
      body.append(node('h3', t(title)),node('p', descriptionText),
        node('span', t(id === 'market' ? copy.open : copy.details) + ' →', 'more'));
      card.append(body);
      cards.append(card);
    }
    list.append(cards);
    content.append(hero,list);
  } else {
    const [id,title,description] = section;
    const heading = node('div', '', 'frame subhead');
    heading.append(link('← ' + t(copy.home), route()),node('h1', t(title)));
    if (id !== 'stay' && id !== 'shops' && id !== 'restaurants' && id !== 'places' && id !== 'tours' && id !== 'transport') heading.append(node('p', t(description)));
    const list = node('div', '', 'frame item-list');
    switch (id) {
      case 'stay': {
        const shortcuts = node('nav', '', 'stay-shortcuts');
        shortcuts.setAttribute('aria-label', t(title));
        heading.append(shortcuts);
        function addStop(card, anchor, label) {
          card.id = anchor;
          card.classList.add('stay-stop');
          list.append(card);
          shortcuts.append(link(label || card.firstElementChild.textContent, '#' + anchor));
        }
        const checkIn = row(t(arrival.title), arrival.steps.map(t), null,
          link(t(arrival.mapLabel), arrival.location, 'button'));
        const gate = node('img', '', 'arrival-gate');
        gate.src = './guide/nature-paradise-gate.webp';
        gate.alt = t(arrival.photoAlt);
        gate.width = 1050;
        gate.height = 654;
        const roomAccess = node('p');
        roomAccess.append(node('strong', t(arrival.roomAccess)));
        checkIn.append(gate, roomAccess);
        addStop(checkIn, 'check-in', 'Check-in');
        const parking = row(t(arrival.parkingTitle), [t(arrival.parkingText)]);
        const photo = node('img', '', 'arrival-gate');
        photo.src = './guide/parqueos.webp';
        photo.alt = t(arrival.parkingAlt);
        photo.width = 1100;
        photo.height = 825;
        parking.append(photo);
        addStop(parking, 'parqueo');
        const departure = row(t(checkout.title), checkout.steps.map(t));
        const sign = node('img', '', 'arrival-gate');
        sign.src = './guide/check-out.webp';
        sign.alt = '';
        sign.loading = 'lazy';
        sign.width = 1216;
        sign.height = 1293;
        departure.append(sign);
        addStop(departure, 'check-out', 'Check-out');
        const room = row(t(roomGuide.title), []);
        for (const group of roomGuide.groups) {
          const section = node('section');
          section.append(node('h4', t(group.heading)));
          for (const [icon, label, detail] of group.items) {
            const marker = node('span', icon + ' ');
            marker.setAttribute('aria-hidden', 'true');
            const paragraph = node('p');
            paragraph.append(marker, node('strong', t(label)), node('br'), t(detail));
            section.append(paragraph);
          }
          room.append(section);
        }
        const options = node('aside', '', 'room-options');
        options.append(node('h4', t(roomGuide.privateBath.title)));
        for (const paragraph of roomGuide.privateBath.paragraphs) options.append(node('p', t(paragraph)));
        const bookingNote = node('p');
        bookingNote.append(node('strong', t(roomGuide.privateBath.note)));
        options.append(bookingNote);
        for (const [file, name] of [['shared', 'A · B · C'], ['sunset', 'Sunset'], ['fresas', 'Fresas']]) {
          const figure = node('figure', '', 'room-photo');
          const image = node('img');
          image.src = './guide/' + file + '.webp';
          image.alt = name;
          image.loading = 'lazy';
          image.width = 1024;
          image.height = 1536;
          const caption = node('figcaption');
          caption.append(node('strong', name), node('br'), t(file === 'shared' ? roomGuide.sharedCaption : roomGuide.privateCaption));
          figure.append(caption, image);
          options.append(figure);
        }
        room.append(options);
        addStop(room, 'dormitorio-y-bano');
        for (const [name, paragraphs, imageFile, shop, activities = []] of stay) {
          const card = row(t(name), paragraphs.map(t));
          if (imageFile) {
            const photo = node('img', '', 'arrival-gate');
            photo.src = './guide/' + imageFile;
            photo.alt = t(name);
            photo.loading = 'lazy';
            photo.width = 1200;
            photo.height = 900;
            card.firstElementChild.after(photo);
          }
          if (shop) {
            card.append(node('p', t(shop.text)), link(t(shop.label), route('market'), 'button'));
          }
          for (const [heading, detail] of activities) {
            card.append(node('h4', t(heading)), node('p', t(detail)));
          }
          addStop(card, name[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(' ', '-'));
        }
        const [, marketTitle, marketDescription] = sections.find(([id]) => id === 'market');
        addStop(row(t(marketTitle), [t(marketDescription)], null,
          link(t(copy.open), route('market'), 'button')), 'mini-market');
        break;
      }
      case 'restaurants':
        for (const [tier,items] of Object.entries(restaurants)) {
          list.append(node('h2', t(copy[tier])),...items.map(placeCard));
        }
        break;
      case 'places':
        list.append(...places.map(placeCard));
        list.append(node('p', t(['Antes de visitar ríos y cascadas, consulta el clima y confirma que el acceso esté abierto, especialmente en Jimenoa II.', 'Before visiting rivers and waterfalls, check the weather and confirm that access is open, especially at Jimenoa II.', 'Avant de visiter les rivières et les cascades, vérifiez la météo et l’ouverture des accès, surtout à Jimenoa II.', 'Prüfe vor dem Besuch von Flüssen und Wasserfällen das Wetter und ob der Zugang geöffnet ist, besonders bei Jimenoa II.']), 'host-note'));
        break;
      case 'tours':
        list.append(node('p', t(tourIntro), 'host-note'), ...tours.map(tour => tourCard(tour, {node, t, language})));
        break;
      case 'transport':
        renderTransport(list, {node, link, row, t, language});
        break;
      case 'health': {
        const call = t(['Llamar al 911', 'Call 911', 'Appeler le 911', '911 anrufen']);
        list.append(row(t(['Emergencias', 'Emergency services', 'Urgences', 'Notruf']), [], null, link(call, 'tel:911', 'button')));
        for (const [name, details, minutes, placeId, mapUrl] of healthServices) {
          const address = details[0].split(' · ')[1] || '';
          const query = new URLSearchParams({api: '1', query: [name, address, 'Jarabacoa, República Dominicana'].filter(Boolean).join(', ')});
          if (placeId) query.set('query_place_id', placeId);
          list.append(row(name, [t(details)], minutes, link(t(copy.map), mapUrl || 'https://www.google.com/maps/search/?' + query, 'button')));
        }
        for (const [name, service, phone] of [
          ['Edison Cruz', ['Mecánico automotriz', 'Automotive mechanic', 'Mécanicien automobile', 'Kfz-Mechaniker'], '809-849-8185'],
          ['Grúa Elciades', ['Servicio de grúas', 'Towing service', 'Service de remorquage', 'Abschleppdienst'], '829-573-3832']
        ]) {
          const digits = '1' + phone.replaceAll('-', '');
          const actions = node('div', '', 'contact-actions');
          const chat = link('', 'https://wa.me/' + digits, 'whatsapp-link');
          const label = 'WhatsApp · ' + name;
          chat.setAttribute('aria-label', label);
          chat.title = label;
          const icon = node('img');
          icon.src = './guide/whatsapp.svg';
          icon.alt = '';
          icon.width = icon.height = 26;
          chat.append(icon);
          actions.append(link(phone, 'tel:+' + digits, 'button'), chat);
          list.append(row(name, [t(service)], null, actions));
        }
        break;
      }
      case 'shops': {
        const logos = {'Hipermercados Olé': 'ole', 'Supermercados Nacional': 'nacional', 'La Sirena': 'sirena'};
        const icons = {
          'Plaza MEI · Tienda y ferretería': '👕🔧',
          'Gimnasio Élite': '🏋️', 'Gimnasio Rústico': '🏋️',
          'Salón de belleza': '💇🏽‍♀️', 'Barbería': '💈',
          'Colmados locales': '🛒', 'Pica pollo local': '🍗',
          'Colmado con entrega a domicilio': '🛵🥡'
        };
        for (const [name, minutes, query, walk] of nearbyShops) {
          const card = row(typeof name === 'string' ? name : t(name), []);
          const key = typeof name === 'string' ? name : name[0];
          const logo = logos[key];
          if (logo || icons[key]) {
            const badge = node('span', icons[key], 'shop-badge');
            badge.setAttribute('aria-hidden', 'true');
            if (logo) {
              const img = node('img');
              img.src = './guide/shop-logos/' + logo + '.webp';
              img.alt = '';
              badge.append(img);
            }
            card.classList.add('shop-item');
            card.prepend(badge);
          }
          const unit = walk ? t(['min aprox. a pie', 'min approx. on foot', 'min env. à pied', 'Min. ca. zu Fuß']) : t(copy.drive);
          card.append(node('p', minutes + ' ' + unit, 'time'));
          if (query) {
            const params = new URLSearchParams({api: '1', query: query + ', Jarabacoa, República Dominicana'});
            card.append(link(t(copy.map), 'https://www.google.com/maps/search/?' + params, 'button'));
          }
          list.append(card);
        }
        const note = row('Nature Paradise Mini Market', [t([
          'En la cocina de nuestra casa de huéspedes encontrarás el Mini Market. Puedes comprar bebidas, snacks y otros productos esenciales durante tu estadía.',
          'Our Mini Market is in the guesthouse kitchen. Stop by for drinks, snacks and other essentials during your stay.',
          'Notre Mini Market se trouve dans la cuisine de la maison d’hôtes. Vous y trouverez des boissons, des en-cas et des produits de première nécessité.',
          'Unser Mini Market befindet sich in der Küche des Gästehauses. Hier bekommst du Getränke, Snacks und Dinge des täglichen Bedarfs.'
        ])], null, link(t(['Pulsa aquí para ver nuestros productos', 'View our products', 'Voir nos produits', 'Unsere Produkte ansehen']), route('market'), 'button'));
        note.classList.add('room-options');
        list.append(note);
        break;
      }
    }
    content.append(heading,list);
  }
  const invitation = node('div');
  const review = reviewLink(language);
  review.className = 'button';
  invitation.append(node('p', t([
    '¿Cómo fue tu estadía en Nature Paradise? Califícanos y cuéntanos tu experiencia.',
    'How was your stay at Nature Paradise? Leave a rating and tell us about your experience.',
    'Comment s’est passé votre séjour à Nature Paradise ? Donnez-nous une note et partagez votre expérience.',
    'Wie war dein Aufenthalt im Nature Paradise? Gib uns eine Bewertung und erzähl von deinen Erfahrungen.'
  ])), review);
  document.querySelector('#guide footer').prepend(invitation);
  get('entry').hidden = true;
  get('guide').hidden = false;
  if (location.hash === '#traslados-aeropuerto') requestAnimationFrame(() => get('traslados-aeropuerto')?.scrollIntoView());
}
