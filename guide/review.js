const labels = {
  es: 'Dejar una reseña en Google Maps',
  en: 'Leave a review on Google Maps',
  fr: 'Laisser un avis sur Google Maps',
  de: 'Auf Google Maps bewerten'
};

export function reviewLink(language) {
  const link = document.createElement('a');
  link.href = 'https://maps.app.goo.gl/4FZGzpACQENSAini8';
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = labels[language] || labels.es;
  return link;
}
