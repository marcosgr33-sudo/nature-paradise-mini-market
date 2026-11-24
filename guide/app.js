import * as roomGuide from './room.js?v=gallery';
import {languages,copy,sections,restaurants,places,tours,transport,stay,checkout,arrival,locations} from './content.js?v=room-guide';

const params = new URLSearchParams(location.search);
const language = params.get('lang');
const index = languages.indexOf(language);
if (index >= 0) showGuide();

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
    return row(name, [t(description)], minutes,
      locationUrl ? link(t(copy.map), locationUrl, 'button') : null);
  }

  function serviceCard([title,description]) {
    return row(t(title), [t(description)]);
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
    for (const [id,title,description,photo] of sections) {
      const card = link('', route(id), 'card');
      if (photo) {
        const image = node('img');
        image.src = './guide/' + photo + '.webp';
        image.alt = '';
        image.loading = 'lazy';
        if (id === 'market') image.className = 'market-display';
        card.append(image);
      }
      const body = node('div', '', 'card-body');
      body.append(node('h3', t(title)),node('p', t(description)),
        node('span', t(id === 'market' ? copy.open : copy.details) + ' →', 'more'));
      card.append(body);
      cards.append(card);
    }
    list.append(cards);
    content.append(hero,list);
  } else {
    const [id,title,description] = section;
    const heading = node('div', '', 'frame subhead');
    heading.append(link('← ' + t(copy.home), route()),node('h1', t(title)),node('p', t(description)));
    const list = node('div', '', 'frame item-list');
    switch (id) {
      case 'stay': {
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
        list.append(checkIn);
        const parking = row(t(arrival.parkingTitle), [t(arrival.parkingText)]);
        const photo = node('img', '', 'arrival-gate');
        photo.src = './guide/parqueos.webp';
        photo.alt = t(arrival.parkingAlt);
        photo.width = 1100;
        photo.height = 825;
        parking.append(photo);
        list.append(parking);
        const departure = row(t(checkout.title), checkout.steps.map(t));
        const sign = node('img', '', 'arrival-gate');
        sign.src = './guide/check-out.webp';
        sign.alt = '';
        sign.loading = 'lazy';
        sign.width = 1216;
        sign.height = 1293;
        departure.append(sign);
        list.append(departure);
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
        list.append(room);
        list.append(...stay.map(([name,paragraphs]) => row(t(name),paragraphs.map(t))));
        break;
      }
      case 'restaurants':
        for (const [tier,items] of Object.entries(restaurants)) {
          list.append(node('h2', t(copy[tier])),...items.map(placeCard));
        }
        break;
      case 'places':
        list.append(...places.map(placeCard));
        break;
      case 'tours':
        list.append(node('p', t(copy.hostChat), 'host-note'), ...tours.map(serviceCard));
        break;
      case 'transport':
        list.append(node('p', t(copy.hostChat), 'host-note'), ...transport.map(serviceCard));
        break;
      case 'shops':
        list.append(link(t(copy.open), route('market'), 'button'));
        break;
    }
    content.append(heading,list);
  }
  get('entry').hidden = true;
  get('guide').hidden = false;
}
