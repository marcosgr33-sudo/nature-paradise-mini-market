export const tourIntro = [
  'Te recomendamos consultar con dos días de anticipación. Como cada semana referimos huéspedes a los operadores locales, nos ofrecen un pequeño descuento.',
  'We recommend getting in touch two days ahead. Local operators offer us a small discount because we refer guests every week.',
  'Nous vous conseillons de nous contacter deux jours à l’avance. Les prestataires locaux nous accordent une petite remise, car nous leur adressons des voyageurs chaque semaine.',
  'Wir empfehlen, zwei Tage vorher anzufragen. Da wir jede Woche Gäste vermitteln, gewähren uns die örtlichen Anbieter einen kleinen Rabatt.'
];

const timing = {
  advance: ['El operador recomienda coordinar con anticipación.', 'The operator recommends arranging this tour in advance.', 'Le prestataire recommande de prévoir cette sortie à l’avance.', 'Der Anbieter empfiehlt eine frühzeitige Anfrage.'],
  weather: ['Hay vuelos todos los días si el clima lo permite.', 'Flights run daily, weather permitting.', 'Vols tous les jours si la météo le permet.', 'Flüge sind täglich möglich, wenn das Wetter mitspielt.'],
  daily: ['Hay paseos a caballo todos los días.', 'Horseback rides are offered daily.', 'Des balades à cheval sont proposées tous les jours.', 'Ausritte werden täglich angeboten.'],
  two: ['Coordina esta salida con dos días de anticipación.', 'Arrange this outing two days in advance.', 'Prévoyez cette sortie deux jours à l’avance.', 'Bitte diesen Ausflug zwei Tage im Voraus vereinbaren.'],
  duarte: ['Coordina la expedición con dos a tres días de anticipación.', 'Arrange the expedition two to three days ahead.', 'Prévoyez l’expédition deux à trois jours à l’avance.', 'Bitte die Tour zwei bis drei Tage im Voraus vereinbaren.'],
  today: ['Puedes coordinar el recorrido el mismo día.', 'You can arrange this ride on the same day.', 'Vous pouvez organiser cette balade le jour même.', 'Diese Rundfahrt kannst du am selben Tag vereinbaren.']
};

export function tourCard([titles, descriptions, photo, notice], {node, t, language}) {
  const title = t(titles);
  const article = node('article', '', 'item tour-item');
  const img = node('img', '', 'tour-photo');
  img.src = './guide/' + photo + '.webp';
  img.alt = '';
  img.loading = 'lazy';
  const body = node('div', '', 'tour-body');
  const form = node('form', '', 'tour-inquiry');
  const dateLabel = node('label', t(['Fecha', 'Date', 'Date', 'Datum']));
  const date = node('input');
  date.type = 'date';
  date.required = true;
  const today = () => new Intl.DateTimeFormat('sv-SE', {timeZone: 'America/Santo_Domingo'}).format(new Date());
  date.min = today();
  dateLabel.append(date);

  const group = node('fieldset');
  const legend = node('legend', t(['¿Para cuántas personas?', 'How many people?', 'Combien de personnes ?', 'Wie viele Personen?']));
  const stepper = node('div', '', 'tour-stepper');
  const minus = node('button', '−');
  const plus = node('button', '+');
  minus.type = plus.type = 'button';
  minus.setAttribute('aria-label', t(['Quitar una persona', 'Remove one person', 'Retirer une personne', 'Eine Person weniger']));
  plus.setAttribute('aria-label', t(['Añadir una persona', 'Add one person', 'Ajouter une personne', 'Eine Person mehr']));
  const count = node('output', '1');
  minus.disabled = true;
  function change(delta) {
    count.value = String(Math.max(1, Number(count.value) + delta));
    minus.disabled = count.value === '1';
  }
  minus.onclick = () => change(-1);
  plus.onclick = () => change(1);
  stepper.append(minus, count, plus);
  group.append(legend, stepper);

  const submit = node('button', t(['Conocer precio', 'Check price', 'Demander le tarif', 'Preis anfragen']), 'button tour-price');
  submit.type = 'submit';
  const icon = node('img');
  icon.src = './guide/whatsapp.svg';
  icon.alt = '';
  submit.prepend(icon);
  form.append(dateLabel, group, submit);
  form.addEventListener('submit', event => {
    event.preventDefault();
    date.min = today();
    if (!form.reportValidity()) return;
    const day = new Intl.DateTimeFormat(language, {dateStyle: 'long', timeZone: 'UTC'}).format(new Date(date.value + 'T12:00:00Z'));
    const n = Number(count.value);
    const guests = n + ' ' + (n === 1 ? t(['persona','person','personne','Person']) : t(['personas','people','personnes','Personen']));
    const message = t([
      `Hola, me gustaría saber el precio de «${title}» para ${guests} el ${day}. ¿Hay disponibilidad?`,
      `Hello! Could you tell me the price and availability of “${title}” for ${guests} on ${day}?`,
      `Bonjour, quel serait le tarif de « ${title} » pour ${guests} le ${day} ? Y a-t-il de la disponibilité ?`,
      `Hallo! Wie viel kostet „${title}“ für ${guests} am ${day}? Gibt es noch freie Plätze?`
    ]);
    const url = new URL('https://wa.me/18497503039');
    url.searchParams.set('text', message);
    window.open(url.href, '_blank', 'noopener,noreferrer');
  });
  body.append(node('h3', title), node('p', t(descriptions)), node('p', t(timing[notice]), 'time'), form);
  article.append(img, body);
  return article;
}
