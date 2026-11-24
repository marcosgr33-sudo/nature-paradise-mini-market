const languages = {
  es: {
    subtitle: 'Tu tienda dentro de Nature Paradise Jarabacoa', shop: 'Ver tienda', admin: 'Administración privada',
    logout: 'Cerrar sesión', language: 'Idioma', search: 'Buscar productos', categories: 'Todas las categorías',
    loading: 'Cargando catálogo…', error: 'No se pudo cargar el catálogo.', empty: 'No se encontraron productos.',
    buy: 'Comprar por WhatsApp', available: 'Disponible', soldOut: 'Agotado', other: 'Otros',
    footer: 'Precios en pesos dominicanos', reference: 'Tasa de venta de referencia del Banco Central',
    order: 'Hola, me interesa comprar este producto del Mini Market: ',
  },
  en: {
    subtitle: 'Your guest shop at Nature Paradise Jarabacoa', shop: 'Shop', admin: 'Private administration',
    logout: 'Sign out', language: 'Language', search: 'Search products', categories: 'All categories',
    loading: 'Loading catalog…', error: 'The catalog could not be loaded.', empty: 'No products found.',
    buy: 'Order on WhatsApp', available: 'In stock', soldOut: 'Out of stock', other: 'Other',
    footer: 'Prices in Dominican pesos', reference: 'Central Bank reference selling rate',
    order: 'Hi, I’d like to buy this item from the Mini Market: ',
  },
  fr: {
    subtitle: 'Votre boutique à Nature Paradise Jarabacoa', shop: 'Boutique', admin: 'Administration privée',
    logout: 'Se déconnecter', language: 'Langue', search: 'Rechercher des produits', categories: 'Toutes les catégories',
    loading: 'Chargement du catalogue…', error: 'Impossible de charger le catalogue.', empty: 'Aucun produit trouvé.',
    buy: 'Commander sur WhatsApp', available: 'Disponible', soldOut: 'En rupture de stock', other: 'Autres',
    footer: 'Prix en pesos dominicains', reference: 'Taux de change de référence à la vente de la Banque centrale',
    order: 'Bonjour, je voudrais acheter ce produit du Mini Market : ',
  },
  de: {
    subtitle: 'Ihr Gästeladen im Nature Paradise Jarabacoa', shop: 'Shop', admin: 'Privater Verwaltungsbereich',
    logout: 'Abmelden', language: 'Sprache', search: 'Produkte suchen', categories: 'Alle Kategorien',
    loading: 'Katalog wird geladen…', error: 'Der Katalog konnte nicht geladen werden.', empty: 'Keine Produkte gefunden.',
    buy: 'Über WhatsApp bestellen', available: 'Verfügbar', soldOut: 'Ausverkauft', other: 'Sonstiges',
    footer: 'Preise in Dominikanischen Pesos', reference: 'Referenz-Verkaufskurs der Zentralbank',
    order: 'Hallo, ich möchte dieses Produkt aus dem Mini Market kaufen: ',
  },
};

const languageKey = 'nature-paradise-shop-language';

function supportedLanguage(preferences) {
  return preferences.map(tag => tag.toLowerCase().split('-')[0])
    .find(tag => Object.hasOwn(languages, tag));
}

export function initialLanguage() {
  let saved;
  try { saved = localStorage.getItem(languageKey); } catch {}
  return supportedLanguage([saved, ...(navigator.languages || []), navigator.language].filter(Boolean)) || 'es';
}

export function saveLanguage(language) {
  try { localStorage.setItem(languageKey, language); } catch {}
}

export const translate = (language, key) => languages[language][key];


// The storefront is also the legacy entry URL shared with guests.
if (typeof document !== 'undefined' && document.getElementById('storefront')) {
  const params = new URLSearchParams(location.search);
  const language = params.get('lang');
  if (params.get('view') !== 'mini-market') {
    location.replace(new URL('./guia.html' + (Object.hasOwn(languages, language) ? '?lang=' + language : ''), location.href));
  } else {
    const entry = document.getElementById('languageEntry');
    if (Object.hasOwn(languages, language)) entry.hidden = true;
    document.addEventListener('DOMContentLoaded', () => {
      const selector = document.getElementById('language');
      const title = {es:'Guía Nature Paradise',en:'Nature Paradise Guide',fr:'Guide Nature Paradise',de:'Nature Paradise Reiseführer'};
      const home = document.createElement('a');
      home.className = 'buy';
      selector.after(home);

      function updateGuideLink() {
        const current = selector.value;
        home.href = './guia.html?lang=' + current;
        home.textContent = title[current];
        document.title = title[current] + ' / Mini Market';
      }

      selector.addEventListener('change', updateGuideLink);
      if (Object.hasOwn(languages, language)) {
        const option = entry.querySelector('button[data-language="' + language + '"]');
        if (option?.closest('#languageOptions')?.onclick) option.click();
        else entry.hidden = false;
      }
      document.getElementById('languageOptions').addEventListener('click', updateGuideLink);
      updateGuideLink();
    }, {once:true});
  }
}
