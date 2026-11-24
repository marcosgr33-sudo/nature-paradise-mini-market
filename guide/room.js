export const title = ['Dormitorio y baño', 'Bedroom and bathroom', 'Chambre et salle de bain', 'Zimmer und Bad'];
export const intro = [
  'Según tu reserva, el baño puede ser privado o compartido. En tu anuncio de Airbnb puedes comprobar el tipo de baño y los servicios que incluye tu habitación.',
  'Your bathroom may be private or shared. Check your Airbnb listing for the bathroom type and the amenities included with your room.',
  'Selon votre réservation, la salle de bain peut être privative ou partagée. Votre annonce Airbnb précise le type de salle de bain et les équipements de votre chambre.',
  'Je nach Buchung hast du ein eigenes Bad oder nutzt ein Gemeinschaftsbad. In deinem Airbnb-Inserat findest du die Badart und die Ausstattung deines Zimmers.'
];

export const privateBath = {
  title: ['¿Prefieres un baño privado?', 'Would you prefer a private bathroom?', 'Vous préférez une salle de bain privative ?', 'Lieber ein eigenes Bad?'],
  detail: [
    'En Nature Paradise tenemos seis habitaciones. Si te gustaría cambiar a una con baño privado, escríbenos por el chat de Airbnb. Con gusto te mostraremos las opciones disponibles para las fechas de tu estadía.',
    'Nature Paradise has six rooms. If you would like to switch to one with a private bathroom, message us on Airbnb. We’ll be happy to show you what’s available for your dates.',
    'Nature Paradise compte six chambres. Si vous souhaitez changer pour une chambre avec salle de bain privative, écrivez-nous sur Airbnb. Nous vous présenterons avec plaisir les options disponibles aux dates de votre séjour.',
    'Nature Paradise hat sechs Zimmer. Wenn du in ein Zimmer mit eigenem Bad wechseln möchtest, schreib uns im Airbnb-Chat. Wir zeigen dir gerne, welche Zimmer für deinen Aufenthalt verfügbar sind.'
  ]
};

export const groups = [
  {
    heading: ['Tu dormitorio', 'Your bedroom', 'Votre chambre', 'Dein Zimmer'],
    items: [
      ['📋', ['Al llegar', 'On arrival', 'À votre arrivée', 'Bei der Ankunft'],
        ['Revisa tu habitación. Si encuentras algo roto o manchado, avísanos enseguida.', 'Check your room. If anything is broken or stained, let us know right away.', 'Vérifiez votre chambre. Si vous remarquez un dégât ou une tache, prévenez-nous aussitôt.', 'Schau dich im Zimmer um. Melde uns Schäden oder Flecken bitte gleich.']],
      ['🛏️', ['Sábanas y toallas blancas', 'White sheets and towels', 'Draps et serviettes blancs', 'Weiße Bettwäsche und Handtücher'],
        ['Si se manchan, avísanos cuanto antes para que podamos tratar la mancha. Si no sale, se cobrará el costo de la pieza.', 'Tell us as soon as possible about any stains so we can treat them. If a stain cannot be removed, you will be charged for the item.', 'Signalez-nous rapidement toute tache pour que nous puissions la traiter. Si elle ne part pas, le linge concerné vous sera facturé.', 'Gib uns bei Flecken möglichst schnell Bescheid, damit wir sie behandeln können. Lässt sich ein Fleck nicht entfernen, berechnen wir den Ersatz.']],
      ['🚭', ['Habitación libre de humo', 'Smoke-free room', 'Chambre non-fumeur', 'Rauchfreies Zimmer'],
        ['Por favor, no fumes en la habitación. Si el humo obliga a lavar las cortinas, ese lavado tendrá un cargo adicional.', 'Please do not smoke in the room. If smoke makes it necessary to wash the curtains, an extra cleaning charge applies.', 'Merci de ne pas fumer dans la chambre. Si la fumée impose un lavage des rideaux, ce lavage sera facturé en supplément.', 'Bitte rauche nicht im Zimmer. Müssen die Vorhänge wegen Rauch gewaschen werden, fallen zusätzliche Reinigungskosten an.']],
      ['🎛️', ['Control del portón', 'Gate remote', 'Télécommande du portail', 'Fernbedienung für das Tor'],
        ['Para abrir el portón al entrar o salir, presiona el primer botón, marcado con la letra A.', 'To open the gate when entering or leaving, press the first button, marked A.', 'Pour ouvrir le portail à l’entrée ou à la sortie, appuyez sur le premier bouton, marqué A.', 'Drücke beim Ein- oder Ausfahren die erste Taste (A), um das Tor zu öffnen.']],
      ['❄️', ['Aire acondicionado, si tu dormitorio lo incluye', 'Air conditioning, if included', 'Climatisation, si votre chambre en est équipée', 'Klimaanlage, falls vorhanden'],
        ["Por el tamaño del dormitorio, te recomendamos ajustar el aire entre 20 y 24 °C para dormir. Por favor, apágalo cuando estés en la cocina, en otra área común o fuera de la propiedad.", "Given the size of the bedroom, we recommend setting the air conditioning to 20–24 °C (68–75 °F) for sleeping. Please turn it off when you are in the kitchen, in another shared area or away from the property.", "Compte tenu de la taille de la chambre, nous recommandons un réglage entre 20 et 24 °C pour dormir. Éteignez la climatisation lorsque vous êtes dans la cuisine, dans un autre espace commun ou hors de la propriété.", "Für die Größe des Zimmers empfehlen wir zum Schlafen 20 bis 24 °C. Schalte die Klimaanlage bitte aus, wenn du in der Küche, in einem anderen Gemeinschaftsbereich oder außer Haus bist."]],
      ['📶', ['Wi-Fi', 'Wi-Fi', 'Wi-Fi', 'WLAN'],
        ['El nombre de la red y la contraseña están en el chat de tu reserva de Airbnb.', 'Find the network name and password in your Airbnb booking messages.', 'Le nom du réseau et le mot de passe figurent dans la messagerie de votre réservation Airbnb.', 'Netzwerkname und Passwort findest du im Airbnb-Chat zu deiner Buchung.']],
      ['🔋', ['Electricidad e inversor', 'Backup power', 'Électricité de secours', 'Strom bei einem Netzausfall'],
        ["Si se corta la electricidad local, nuestro inversor mantiene el suministro básico y sigue habiendo agua caliente para la ducha. El aire acondicionado, la nevera, la lavadora y la piscina quedan fuera de ese suministro.", "During a local power outage, our inverter supplies basic power and hot water is still available for showers. The air conditioning, refrigerator, washing machine and pool do not run on this backup supply.", "En cas de coupure du réseau local, notre onduleur assure une alimentation de base et l’eau chaude reste disponible pour la douche. La climatisation, le réfrigérateur, le lave-linge et la piscine ne sont pas alimentés par ce système.", "Bei einem örtlichen Stromausfall sichert unser Wechselrichter die Grundversorgung. Zum Duschen gibt es weiterhin warmes Wasser. Klimaanlage, Kühlschrank, Waschmaschine und Pool werden nicht mit Ersatzstrom versorgt."]],
      ['🤝', ['Cuidado y limpieza', 'Keeping spaces clean', 'Propreté des lieux', 'Sauberkeit'],
        ["No cobramos una tarifa adicional de limpieza. Por favor, ayúdanos a mantener limpios los espacios que utilices.", "We do not charge a separate cleaning fee. Please help us keep the spaces you use clean.", "Nous ne facturons pas de frais de ménage supplémentaires. Merci de nous aider à garder propres les espaces que vous utilisez.", "Wir erheben keine zusätzliche Reinigungsgebühr. Bitte hilf uns, die Bereiche sauber zu halten, die du nutzt."]]
    ]
  },
  {
    heading: ['El baño', 'The bathroom', 'La salle de bain', 'Das Bad'],
    items: [
      ['🧴', ['Dispensadores', 'Shower dispensers', 'Distributeurs de douche', 'Spender in der Dusche'],
        ['En la ducha encontrarás jabón corporal, shampoo y acondicionador.', 'The shower dispensers contain body wash, shampoo and conditioner.', 'Les distributeurs contiennent du gel douche, du shampoing et de l’après-shampoing.', 'In der Dusche findest du Duschgel, Shampoo und Spülung.']],
      ['💧', ['Agua caliente', 'Hot water', 'Eau chaude', 'Warmwasser'],
        ["En algunos baños, el agua caliente se abre girando la llave de la ducha hacia la derecha. Sigue las flechas. Si el agua no se calienta, cierra y vuelve a abrir la llave unas cuantas veces.", "In some bathrooms, turn the shower tap to the right for hot water. Follow the arrows. If the water does not warm up, turn the tap off and back on a few times.", "Dans certaines salles de bain, tournez le robinet de douche vers la droite pour obtenir de l’eau chaude. Suivez les flèches. Si l’eau ne chauffe pas, fermez puis rouvrez le robinet plusieurs fois.", "In manchen Bädern drehst du den Duschgriff für warmes Wasser nach rechts. Folge den Pfeilen. Falls das Wasser nicht warm wird, drehe es ein paarmal zu und wieder auf."]],
      ['🧹', ['Si compartes el baño', 'If you share a bathroom', 'Si vous partagez la salle de bain', 'Wenn du ein Gemeinschaftsbad nutzt'],
        ["Limpiamos el baño compartido cada dos días. Después de usarlo, por favor, descarga el inodoro y seca el piso si está mojado. Así todos encontraremos el baño limpio y listo para usar.", "We clean the shared bathroom every two days. After using it, please flush the toilet and dry the floor if it is wet. This helps keep the bathroom clean and ready for everyone.", "Nous nettoyons la salle de bain partagée tous les deux jours. Après utilisation, merci de tirer la chasse et de sécher le sol s’il est mouillé. Ainsi, chacun retrouve une salle de bain propre et prête à l’emploi.", "Wir reinigen das Gemeinschaftsbad alle zwei Tage. Spüle bitte nach dem Toilettengang und trockne den Boden, wenn er nass ist. So finden alle ein sauberes Bad vor."]]
    ]
  }
];
