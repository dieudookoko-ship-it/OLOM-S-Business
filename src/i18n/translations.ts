import { AxisId, Language } from '../types/logistics';

export interface TranslationContent {
  nav: {
    home: string;
    about: string;
    services: string;
    corridor: string;
    tracking: string;
    quote: string;
    contact: string;
    login: string;
    quoteCta: string;
  };
  hero: {
    legalKicker: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    portalBtn: string;
    coordinates: string;
  };
  metrics: {
    axesValue: string;
    axesLabel: string;
    countriesValue: string;
    countriesLabel: string;
    modesValue: string;
    modesLabel: string;
    presenceValue: string;
    presenceLabel: string;
    configurableHint: string;
  };
  services: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaLink: string;
    items: {
      id: 'sea' | 'air' | 'road' | 'warehouse';
      title: string;
      description: string;
      mode?: 'sea' | 'air' | 'road';
    }[];
  };
  corridor: {
    kicker: string;
    title: string;
    subtitle: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    axesHeading: string;
    leadTimeLabel: string;
    rateLabel: string;
    notConfigured: string;
    requestAxisQuote: string;
    axes: Record<
      AxisId,
      {
        title: string;
        originHub: string;
        destinationHub: string;
        modes: string;
        summary: string;
      }
    >;
  };
  about: {
    kicker: string;
    title: string;
    lead: string;
    body: string;
    managerLabel: string;
    headOfficeLabel: string;
    rccmLabel: string;
    hoursLabel: string;
    configurableBadge: string;
    learnMoreCta: string;
    spotlights: {
      num: string;
      title: string;
      desc: string;
      mode: 'air' | 'sea';
    }[];
  };
  whyUs: {
    kicker: string;
    title: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  tracking: {
    kicker: string;
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    sampleLabel: string;
    notFoundTitle: string;
    notFoundDesc: string;
    statusLabels: {
      received_origin: string;
      in_transit: string;
      customs_clearance: string;
      arrived_hub: string;
      delivered: string;
    };
    originLabel: string;
    destinationLabel: string;
    volumeLabel: string;
    updatedLabel: string;
  };
  quote: {
    bannerTitle: string;
    bannerSubtitle: string;
    formTitle: string;
    formSubtitle: string;
    fields: {
      fullName: string;
      company: string;
      phone: string;
      email: string;
      axis: string;
      mode: string;
      branch: string;
      cargo: string;
      weight: string;
    };
    modes: {
      air: string;
      sea: string;
      road: string;
    };
    submitBtn: string;
    whatsappBtn: string;
    successTitle: string;
    successDesc: string;
    validationError: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    filters: {
      all: string;
      rdc: string;
      bzv: string;
      angola: string;
      china: string;
    };
    manager: string;
    landline: string;
    addressConfigurable: string;
    copySuccess: string;
    callAction: string;
  };
  auth: {
    title: string;
    subtitle: string;
    clientTab: string;
    adminTab: string;
    identifierLabel: string;
    passwordLabel: string;
    loginBtn: string;
    logoutBtn: string;
    demoNote: string;
    clientDashboard: {
      title: string;
      myQuotes: string;
      noQuotes: string;
      quickTrack: string;
    };
    adminDashboard: {
      configTab: string;
      shipmentsTab: string;
      quotesTab: string;
      configIntro: string;
      saveConfigBtn: string;
      savedToast: string;
      addShipmentTitle: string;
      createShipmentBtn: string;
    };
  };
  footer: {
    tagline: string;
    navTitle: string;
    servicesTitle: string;
    officesTitle: string;
    rights: string;
    configurableNotice: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationContent> = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      corridor: 'Chine – RDC',
      tracking: 'Suivi',
      quote: 'Devis',
      contact: 'Contact',
      login: 'Connexion',
      quoteCta: 'Demander un devis',
    },
    hero: {
      legalKicker: "OLOM'S INTERNATIONAL BUSINESS CO. LTD.",
      headline: 'Transport international et fret Chine – RDC sans frontières.',
      subheadline:
        "Fret aérien et maritime, import-export et logistique complète entre Guangzhou, Kinshasa, Lubumbashi, Brazzaville et l'Angola.",
      primaryCta: 'Demander un devis',
      secondaryCta: 'Suivre un colis',
      portalBtn: 'Connexion',
      coordinates: 'Guangzhou (Chine) · Kinshasa (RDC) · Lubumbashi (RDC) · Brazzaville · Angola',
    },
    metrics: {
      axesValue: '4 Axes',
      axesLabel: 'Chine ↔ Kinshasa & Lubumbashi',
      countriesValue: '4 Pays',
      countriesLabel: 'RDC · Chine · Congo-BZV · Angola',
      modesValue: 'Air & Mer',
      modesLabel: 'Fret aérien, maritime & routier',
      presenceValue: '3 Langues',
      presenceLabel: 'Français · English · 简体中文',
      configurableHint: 'Configurable par admin',
    },
    services: {
      kicker: 'Nos services',
      title: 'Une logistique structurée autour de vos expéditions.',
      subtitle:
        "De la réception de vos marchandises en Chine à la livraison finale en RDC, nous coordonnons chaque étape du transport international.",
      ctaLink: 'Demander un devis pour ce service',
      items: [
        {
          id: 'sea',
          title: 'Fret Maritime',
          description:
            'Expédition par conteneurs complets (FCL) et groupage maritime (LCL) depuis la Chine vers la RDC et la sous-région.',
          mode: 'sea',
        },
        {
          id: 'air',
          title: 'Fret Aérien',
          description:
            'Acheminement rapide et sécurisé pour vos colis commerciaux, échantillons et cargaisons urgentes Chine – RDC.',
          mode: 'air',
        },
        {
          id: 'road',
          title: 'Corridors & Transport Routier',
          description:
            'Liaisons intérieures Kinshasa ↔ Lubumbashi et dessertes transfrontalières vers Brazzaville et l’Angola.',
          mode: 'road',
        },
        {
          id: 'warehouse',
          title: 'Entreposage & Import-Export',
          description:
            'Réception à notre bureau de Guangzhou, vérification des colis, consolidation et accompagnement douanier à destination.',
        },
      ],
    },
    corridor: {
      kicker: 'Import-Export Chine – RDC',
      title: 'Connectés sur les axes commerciaux stratégiques.',
      subtitle:
        "Avec notre bureau de gestion à Guangzhou et nos implantations directes à Kinshasa et Lubumbashi, OLOM'S Business sécurise vos flux d'approvisionnement.",
      stat1Label: 'Bureau Chine (Guangzhou)',
      stat2Label: 'Bureaux RDC (Kinshasa & Lubumbashi)',
      stat3Label: 'Relais Régionaux (BZV & Angola)',
      axesHeading: 'Sélectionnez un axe de transport',
      leadTimeLabel: 'Délai indicatif',
      rateLabel: 'Tarif indicatif',
      notConfigured: 'À configurer (selon volume & nature)',
      requestAxisQuote: 'Chiffrer cet axe',
      axes: {
        'cn-kin': {
          title: 'Chine → Kinshasa',
          originHub: 'Guangzhou (Yue Xiu District)',
          destinationHub: 'Kinshasa (Av. Usoke N°132)',
          modes: 'Fret Aérien & Fret Maritime',
          summary:
            'Collecte et consolidation à Guangzhou avec acheminement aérien ou maritime jusqu’à notre agence de la Commune de Kinshasa.',
        },
        'cn-lub': {
          title: 'Chine → Lubumbashi',
          originHub: 'Guangzhou (Yue Xiu District)',
          destinationHub: 'Lubumbashi (Av. Maniema N°54)',
          modes: 'Fret Aérien & Fret Maritime',
          summary:
            'Expéditions dédiées aux opérateurs économiques du Grand Katanga, livrées au bureau de l’Avenue Maniema.',
        },
        'kin-lub': {
          title: 'Kinshasa → Lubumbashi',
          originHub: 'Kinshasa (Croisement Wangata)',
          destinationHub: 'Lubumbashi (Coin Kambove)',
          modes: 'Fret Aérien intérieur & Corridor Routier',
          summary:
            'Transfert interurbain sécurisé de marchandises commerciales et équipements entre la capitale et Lubumbashi.',
        },
        'lub-kin': {
          title: 'Lubumbashi → Kinshasa',
          originHub: 'Lubumbashi (Av. Maniema N°54)',
          destinationHub: 'Kinshasa (Av. Usoke N°132)',
          modes: 'Fret Aérien intérieur & Corridor Routier',
          summary:
            'Acheminement régulier au départ de Lubumbashi vers notre plateforme logistique de Kinshasa.',
        },
      },
    },
    about: {
      kicker: "À propos d'OLOM'S Business",
      title: "Une présence opérationnelle directe en Chine et en RDC.",
      lead: "OLOM'S International business CO. LTD. relie les centres d'approvisionnement chinois aux marchés d'Afrique Centrale.",
      body: "Implantée à Kinshasa (Avenue Usoke N°132) et à Lubumbashi (Avenue Maniema N°54), ainsi qu'à Brazzaville et en Angola, notre équipe coordonne directement vos opérations avec notre bureau de Guangzhou dirigé par le Manager Emile.",
      managerLabel: 'Bureau Manager Chine',
      headOfficeLabel: 'Siège Kinshasa',
      rccmLabel: 'RCCM / Enregistrement',
      hoursLabel: 'Horaires',
      configurableBadge: 'À configurer dans Admin',
      learnMoreCta: 'Consulter nos bureaux',
      spotlights: [
        {
          num: '01',
          title: 'Fret Aérien Prioritaire',
          desc: 'Départs réguliers depuis Guangzhou vers Kinshasa et Lubumbashi pour vos cargaisons à rotation rapide.',
          mode: 'air',
        },
        {
          num: '02',
          title: 'Fret Maritime & Groupage',
          desc: 'Solutions conteneurisées économiques pour volumes commerciaux, matériaux et équipements industriels.',
          mode: 'sea',
        },
      ],
    },
    whyUs: {
      kicker: "Pourquoi choisir OLOM'S Business",
      title: 'Des engagements opérationnels concrets.',
      items: [
        {
          title: 'Double implantation physique',
          desc: 'Un interlocuteur direct à Guangzhou (Chine) et des bureaux permanents à Kinshasa et Lubumbashi.',
        },
        {
          title: 'Maîtrise des 4 corridors',
          desc: 'Couverture intégrée Chine → Kinshasa, Chine → Lubumbashi et liaisons Kinshasa ↔ Lubumbashi.',
        },
        {
          title: 'Service trilingue FR / EN / 中文',
          desc: 'Communication fluide avec vos fournisseurs chinois et suivi clair en français ou en anglais.',
        },
        {
          title: 'Réactivité WhatsApp & Suivi',
          desc: 'Prise en charge directe de vos demandes de cotation par téléphone, email et WhatsApp.',
        },
      ],
    },
    tracking: {
      kicker: 'Suivi des marchandises',
      title: 'Suivez l’acheminement de votre cargaison.',
      subtitle:
        'Entrez votre numéro de bordereau pour consulter l’étape actuelle de votre expédition.',
      placeholder: 'Ex : OLM-GZ-KIN-1042',
      button: 'Rechercher le colis',
      sampleLabel: 'Exemples configurés :',
      notFoundTitle: 'Numéro de suivi introuvable',
      notFoundDesc:
        'Vérifiez le numéro saisi ou contactez notre bureau de Kinshasa, Lubumbashi ou Guangzhou. Les administrateurs peuvent enregistrer de nouveaux suivis via Connexion.',
      statusLabels: {
        received_origin: 'Reçu à l’origine',
        in_transit: 'En transit',
        customs_clearance: 'En dédouanement',
        arrived_hub: 'Arrivé au bureau de destination',
        delivered: 'Livré',
      },
      originLabel: 'Origine',
      destinationLabel: 'Destination',
      volumeLabel: 'Poids / Volume',
      updatedLabel: 'Dernière mise à jour',
    },
    quote: {
      bannerTitle: 'Prêt à expédier vos marchandises ?',
      bannerSubtitle:
        'Obtenez une cotation personnalisée pour vos importations depuis la Chine ou vos transferts en RDC, ou échangez directement sur WhatsApp.',
      formTitle: 'Demande de devis & Contact WhatsApp',
      formSubtitle:
        'Précisez votre axe, le mode de transport et la nature de votre cargaison. Notre équipe vous répond rapidement.',
      fields: {
        fullName: 'Nom complet / Entreprise *',
        company: 'Société (optionnel)',
        phone: 'Téléphone / WhatsApp *',
        email: 'Email (optionnel)',
        axis: 'Axe logistique *',
        mode: 'Mode de transport *',
        branch: 'Bureau de traitement WhatsApp',
        cargo: 'Nature de la marchandise *',
        weight: 'Poids ou volume estimé (kg / CBM)',
      },
      modes: {
        air: 'Fret Aérien',
        sea: 'Fret Maritime',
        road: 'Transport Routier / Inter-RDC',
      },
      submitBtn: 'Enregistrer la demande de devis',
      whatsappBtn: 'Envoyer sur WhatsApp',
      successTitle: 'Demande enregistrée',
      successDesc:
        'Votre demande a été enregistrée dans le portail client/admin. Vous pouvez aussi l’ouvrir directement sur WhatsApp.',
      validationError: 'Veuillez renseigner votre nom, votre téléphone et la description de la marchandise.',
    },
    contact: {
      kicker: 'Implantations & Contacts',
      title: 'Nos bureaux par pays.',
      subtitle:
        'Retrouvez toutes nos coordonnées officielles en RDC, au Congo-Brazzaville, en Angola et en Chine.',
      filters: {
        all: 'Tous les pays',
        rdc: 'RDC (Kinshasa & Lubumbashi)',
        bzv: 'Congo-Brazzaville',
        angola: 'Angola',
        china: 'Chine (Guangzhou)',
      },
      manager: 'Manager',
      landline: 'Téléphone fixe',
      addressConfigurable: 'Adresse locale configurable via l’espace Administrateur',
      copySuccess: 'Copié',
      callAction: 'Appeler',
    },
    auth: {
      title: 'Espace Connexion — Portail Opérations',
      subtitle:
        'Accédez à l’espace Utilisateur (suivi de vos demandes) ou à l’espace Administrateur (configuration des informations manquantes et gestion du suivi).',
      clientTab: 'Utilisateur',
      adminTab: 'Administrateur',
      identifierLabel: 'Nom ou Email',
      passwordLabel: 'Code d’accès',
      loginBtn: 'Se connecter',
      logoutBtn: 'Déconnexion',
      demoNote:
        'Portail interactif local : connectez-vous en tant qu’Utilisateur ou Administrateur pour gérer le suivi des colis et compléter les paramètres configurables.',
      clientDashboard: {
        title: 'Espace Client',
        myQuotes: 'Demandes de devis enregistrées',
        noQuotes: 'Aucune demande de devis soumise pour le moment.',
        quickTrack: 'Suivre une expédition',
      },
      adminDashboard: {
        configTab: 'Informations configurables',
        shipmentsTab: 'Gestion du suivi colis',
        quotesTab: 'Demandes de devis',
        configIntro:
          'Les informations non communiquées initialement (RCCM, horaires, délais et tarifs indicatifs) restent configurables ici sans valeurs inventées.',
        saveConfigBtn: 'Enregistrer la configuration',
        savedToast: 'Configuration enregistrée et appliquée sur le site.',
        addShipmentTitle: 'Ajouter un bordereau de suivi',
        createShipmentBtn: 'Créer le suivi',
      },
    },
    footer: {
      tagline:
        "OLOM'S International business CO. LTD. — Transport international, fret aérien & maritime et import-export Chine – RDC.",
      navTitle: 'Navigation',
      servicesTitle: 'Axes & Services',
      officesTitle: 'Bureaux Principaux',
      rights: "OLOM'S Business. Tous droits réservés.",
      configurableNotice: 'Certaines données opérationnelles (tarifs, délais, RCCM) sont configurables via l’espace Administrateur.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      corridor: 'China – DRC',
      tracking: 'Tracking',
      quote: 'Quote',
      contact: 'Contact',
      login: 'Sign In',
      quoteCta: 'Request Quote',
    },
    hero: {
      legalKicker: "OLOM'S INTERNATIONAL BUSINESS CO. LTD.",
      headline: 'International Freight & China – DRC Logistics Without Limits.',
      subheadline:
        'Air and ocean freight, import-export, and end-to-end logistics connecting Guangzhou, Kinshasa, Lubumbashi, Brazzaville, and Angola.',
      primaryCta: 'Request a Quote',
      secondaryCta: 'Track Shipment',
      portalBtn: 'Sign In',
      coordinates: 'Guangzhou (China) · Kinshasa (DRC) · Lubumbashi (DRC) · Brazzaville · Angola',
    },
    metrics: {
      axesValue: '4 Corridors',
      axesLabel: 'China ↔ Kinshasa & Lubumbashi',
      countriesValue: '4 Countries',
      countriesLabel: 'DRC · China · Congo-BZV · Angola',
      modesValue: 'Air & Sea',
      modesLabel: 'Air, Ocean & Road Freight',
      presenceValue: '3 Languages',
      presenceLabel: 'Français · English · 简体中文',
      configurableHint: 'Admin configurable',
    },
    services: {
      kicker: 'Our Services',
      title: 'Logistics built around your China – DRC operations.',
      subtitle:
        'From supplier reception in Guangzhou to final handover in DRC, we coordinate every stage of international freight.',
      ctaLink: 'Request quote for this service',
      items: [
        {
          id: 'sea',
          title: 'Ocean Freight',
          description:
            'Full container loads (FCL) and consolidated sea cargo (LCL) from China to DRC and Central Africa.',
          mode: 'sea',
        },
        {
          id: 'air',
          title: 'Air Freight',
          description:
            'Fast, reliable air transport for time-sensitive cargo, commercial parcels, and urgent shipments.',
          mode: 'air',
        },
        {
          id: 'road',
          title: 'Corridors & Ground Transport',
          description:
            'Dedicated domestic routes Kinshasa ↔ Lubumbashi and regional links to Brazzaville and Angola.',
          mode: 'road',
        },
        {
          id: 'warehouse',
          title: 'Warehousing & Import-Export',
          description:
            'Cargo receiving at our Guangzhou office, inspection, consolidation, and customs clearance support.',
        },
      ],
    },
    corridor: {
      kicker: 'China – DRC Import-Export',
      title: 'Connected across key trade corridors.',
      subtitle:
        'With our management office in Guangzhou and branches in Kinshasa and Lubumbashi, OLOM’S Business secures your supply chain.',
      stat1Label: 'China Office (Guangzhou)',
      stat2Label: 'DRC Branches (Kinshasa & Lubumbashi)',
      stat3Label: 'Regional Desks (BZV & Angola)',
      axesHeading: 'Select a trade corridor',
      leadTimeLabel: 'Indicative transit',
      rateLabel: 'Indicative rate',
      notConfigured: 'Configurable (depends on cargo & volume)',
      requestAxisQuote: 'Quote this route',
      axes: {
        'cn-kin': {
          title: 'China → Kinshasa',
          originHub: 'Guangzhou (Yue Xiu District)',
          destinationHub: 'Kinshasa (Av. Usoke N°132)',
          modes: 'Air Freight & Ocean Freight',
          summary:
            'Receiving and consolidation in Guangzhou with air or sea shipping directly to our Kinshasa branch.',
        },
        'cn-lub': {
          title: 'China → Lubumbashi',
          originHub: 'Guangzhou (Yue Xiu District)',
          destinationHub: 'Lubumbashi (Av. Maniema N°54)',
          modes: 'Air Freight & Ocean Freight',
          summary:
            'Dedicated import routes for businesses in Katanga, delivered to our Avenue Maniema office.',
        },
        'kin-lub': {
          title: 'Kinshasa → Lubumbashi',
          originHub: 'Kinshasa (Wangata Intersection)',
          destinationHub: 'Lubumbashi (Maniema / Kambove)',
          modes: 'Domestic Air & Road Corridor',
          summary:
            'Secure domestic freight transfers for commercial goods and equipment between Kinshasa and Lubumbashi.',
        },
        'lub-kin': {
          title: 'Lubumbashi → Kinshasa',
          originHub: 'Lubumbashi (Av. Maniema N°54)',
          destinationHub: 'Kinshasa (Av. Usoke N°132)',
          modes: 'Domestic Air & Road Corridor',
          summary:
            'Regular outbound logistics from Lubumbashi to our Kinshasa distribution hub.',
        },
      },
    },
    about: {
      kicker: "About OLOM'S Business",
      title: 'Direct operational footprint in China and DRC.',
      lead: "OLOM'S International business CO. LTD. bridges Chinese manufacturing hubs with Central African markets.",
      body: 'Established in Kinshasa (Avenue Usoke N°132) and Lubumbashi (Avenue Maniema N°54), as well as Brazzaville and Angola, our team coordinates directly with our Guangzhou office led by Manager Emile.',
      managerLabel: 'China Manager Office',
      headOfficeLabel: 'Kinshasa Head Office',
      rccmLabel: 'Registration / RCCM',
      hoursLabel: 'Business Hours',
      configurableBadge: 'Configurable in Admin',
      learnMoreCta: 'View our offices',
      spotlights: [
        {
          num: '01',
          title: 'Priority Air Freight',
          desc: 'Regular departures from Guangzhou to Kinshasa and Lubumbashi for high-priority commercial stock.',
          mode: 'air',
        },
        {
          num: '02',
          title: 'Ocean Freight & Consolidation',
          desc: 'Cost-effective container and LCL shipping for bulk goods, equipment, and commercial inventory.',
          mode: 'sea',
        },
      ],
    },
    whyUs: {
      kicker: "Why OLOM'S Business",
      title: 'Practical operational advantages.',
      items: [
        {
          title: 'Dual Physical Presence',
          desc: 'Direct coordination between our Guangzhou management office and permanent branches in Kinshasa and Lubumbashi.',
        },
        {
          title: '4 Core Corridors',
          desc: 'Integrated routes covering China → Kinshasa, China → Lubumbashi, and Kinshasa ↔ Lubumbashi.',
        },
        {
          title: 'Trilingual Support (FR / EN / 中文)',
          desc: 'Smooth coordination with Chinese suppliers and clear reporting in French or English.',
        },
        {
          title: 'Direct WhatsApp & Tracking',
          desc: 'Fast quote intake via phone, email, or WhatsApp and structured shipment milestone tracking.',
        },
      ],
    },
    tracking: {
      kicker: 'Cargo Tracking',
      title: 'Know where your shipment stands.',
      subtitle: 'Enter your waybill reference number to check the current transit milestone.',
      placeholder: 'e.g. OLM-GZ-KIN-1042',
      button: 'Track Shipment',
      sampleLabel: 'Configured samples:',
      notFoundTitle: 'Tracking number not found',
      notFoundDesc:
        'Please double-check your code or contact our Kinshasa, Lubumbashi, or Guangzhou offices. Admins can register new shipments via Sign In.',
      statusLabels: {
        received_origin: 'Received at origin',
        in_transit: 'In transit',
        customs_clearance: 'Customs clearance',
        arrived_hub: 'Arrived at destination hub',
        delivered: 'Delivered',
      },
      originLabel: 'Origin',
      destinationLabel: 'Destination',
      volumeLabel: 'Weight / Volume',
      updatedLabel: 'Last updated',
    },
    quote: {
      bannerTitle: 'Ready to ship your cargo?',
      bannerSubtitle:
        'Request a tailored freight quote from China to DRC or domestic transfers, or message our team directly on WhatsApp.',
      formTitle: 'Quote Request & WhatsApp Dispatch',
      formSubtitle:
        'Provide your route, transport mode, and cargo details so our logistics desk can prepare your quotation.',
      fields: {
        fullName: 'Full Name / Company *',
        company: 'Company (optional)',
        phone: 'Phone / WhatsApp *',
        email: 'Email (optional)',
        axis: 'Shipping Corridor *',
        mode: 'Transport Mode *',
        branch: 'Target WhatsApp Office',
        cargo: 'Cargo Description *',
        weight: 'Estimated Weight / Volume (kg / CBM)',
      },
      modes: {
        air: 'Air Freight',
        sea: 'Ocean Freight',
        road: 'Road / Domestic DRC',
      },
      submitBtn: 'Submit Quote Request',
      whatsappBtn: 'Send via WhatsApp',
      successTitle: 'Quote request saved',
      successDesc:
        'Your request has been logged in the client/admin portal. You may also open it directly in WhatsApp.',
      validationError: 'Please enter your name, phone number, and cargo description.',
    },
    contact: {
      kicker: 'Offices & Contacts',
      title: 'Our offices by country.',
      subtitle:
        'Verified addresses and direct phone lines across DRC, Congo-Brazzaville, Angola, and China.',
      filters: {
        all: 'All Countries',
        rdc: 'DRC (Kinshasa & Lubumbashi)',
        bzv: 'Congo-Brazzaville',
        angola: 'Angola',
        china: 'China (Guangzhou)',
      },
      manager: 'Manager',
      landline: 'Landline',
      addressConfigurable: 'Local street address configurable in Admin Portal',
      copySuccess: 'Copied',
      callAction: 'Call',
    },
    auth: {
      title: 'Sign In — Operations Portal',
      subtitle:
        'Access the User Portal (view submitted quotes) or the Admin Portal (configure missing company details and manage shipment tracking).',
      clientTab: 'User',
      adminTab: 'Administrator',
      identifierLabel: 'Name or Email',
      passwordLabel: 'Access Code',
      loginBtn: 'Sign In',
      logoutBtn: 'Sign Out',
      demoNote:
        'Interactive local portal: sign in as User or Administrator to manage shipment tracking and fill configurable fields.',
      clientDashboard: {
        title: 'Client Portal',
        myQuotes: 'Submitted Quote Requests',
        noQuotes: 'No quote requests submitted yet.',
        quickTrack: 'Track a shipment',
      },
      adminDashboard: {
        configTab: 'Configurable Company Info',
        shipmentsTab: 'Shipment Tracking Manager',
        quotesTab: 'Quote Requests',
        configIntro:
          'Unspecified corporate details (registration numbers, hours, indicative lead times and rates) remain configurable here without invented defaults.',
        saveConfigBtn: 'Save Configuration',
        savedToast: 'Configuration saved and applied across the site.',
        addShipmentTitle: 'Register New Tracking Waybill',
        createShipmentBtn: 'Create Tracking',
      },
    },
    footer: {
      tagline:
        "OLOM'S International business CO. LTD. — International transport, air & sea freight, and China – DRC import-export.",
      navTitle: 'Navigation',
      servicesTitle: 'Corridors & Services',
      officesTitle: 'Main Offices',
      rights: "OLOM'S Business. All rights reserved.",
      configurableNotice: 'Operational fields such as indicative rates, lead times, and RCCM are configurable via the Admin Portal.',
    },
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      services: '服务项目',
      corridor: '中刚专线',
      tracking: '货物追踪',
      quote: '获取报价',
      contact: '联系我们',
      login: '登录',
      quoteCta: '申请报价',
    },
    hero: {
      legalKicker: "OLOM'S INTERNATIONAL BUSINESS CO. LTD.",
      headline: '中国至刚果（金）国际空运海运与进出口物流。',
      subheadline:
        '专业提供广州至金沙萨、卢本巴希、布拉柴维尔及安哥拉的国际空运、海运、清关与进出口物流服务。',
      primaryCta: '申请报价',
      secondaryCta: '货物追踪',
      portalBtn: '登录系统',
      coordinates: '中国广州 · 金沙萨 · 卢本巴希 · 布拉柴维尔 · 安哥拉',
    },
    metrics: {
      axesValue: '4 条专线',
      axesLabel: '中国 ↔ 金沙萨与卢本巴希',
      countriesValue: '4 个国家',
      countriesLabel: '刚果(金) · 中国 · 刚果(布) · 安哥拉',
      modesValue: '空运 & 海运',
      modesLabel: '空运、海运及陆运走廊',
      presenceValue: '3 种语言',
      presenceLabel: '法语 · 英语 · 简体中文',
      configurableHint: '管理员可配置',
    },
    services: {
      kicker: '核心服务',
      title: '围绕您的中非贸易打造高效物流体系。',
      subtitle: '从广州仓库收货验货到刚果（金）目的地交付，全程协调国际运输的每一个环节。',
      ctaLink: '咨询此项服务报价',
      items: [
        {
          id: 'sea',
          title: '国际海运',
          description: '提供中国至刚果（金）及中非地区的整柜 (FCL) 与散货拼箱 (LCL) 海运服务。',
          mode: 'sea',
        },
        {
          id: 'air',
          title: '国际空运',
          description: '针对急件、商业包裹与高时效货物的中国 — 金沙萨 / 卢本巴希快速空运专线。',
          mode: 'air',
        },
        {
          id: 'road',
          title: '境内走廊与陆运',
          description: '金沙萨 ↔ 卢本巴希境内直达运输，以及通往布拉柴维尔和安哥拉的区域配送。',
          mode: 'road',
        },
        {
          id: 'warehouse',
          title: '仓储集货与进出口',
          description: '广州办事处收货、核对清点、集货打包以及目的港清关协同服务。',
        },
      ],
    },
    corridor: {
      kicker: '中国 – 刚果（金）进出口',
      title: '四大核心贸易运输走廊全面贯通。',
      subtitle: '依托广州经理办公室及金沙萨、卢本巴希直属网点，OLOM’S Business 保障您的供应链稳定运行。',
      stat1Label: '中国办事处（广州）',
      stat2Label: '刚果(金)网点（金沙萨/卢本巴希）',
      stat3Label: '区域联络处（布拉柴维尔/安哥拉）',
      axesHeading: '选择运输路线查看详情',
      leadTimeLabel: '参考时效',
      rateLabel: '参考运价',
      notConfigured: '待管理员配置（按货物品类与体积核算）',
      requestAxisQuote: '获取该专线报价',
      axes: {
        'cn-kin': {
          title: '中国 → 金沙萨',
          originHub: '中国广州（越秀区麓景路）',
          destinationHub: '金沙萨（Av. Usoke N°132）',
          modes: '国际空运 & 国际海运',
          summary: '广州仓库统一集货装柜或空运直发，安全运抵金沙萨市区办事处交付。',
        },
        'cn-lub': {
          title: '中国 → 卢本巴希',
          originHub: '中国广州（越秀区麓景路）',
          destinationHub: '卢本巴希（Av. Maniema N°54）',
          modes: '国际空运 & 国际海运',
          summary: '专为加丹加地区客商打造的进出口通道，直达卢本巴希 Maniema 大道办事处。',
        },
        'kin-lub': {
          title: '金沙萨 → 卢本巴希',
          originHub: '金沙萨（Usoke N°132）',
          destinationHub: '卢本巴希（Maniema N°54）',
          modes: '刚果(金)境内空运与陆运',
          summary: '首都金沙萨与矿业重镇卢本巴希之间的商业货物及设备安全调拨。',
        },
        'lub-kin': {
          title: '卢本巴希 → 金沙萨',
          originHub: '卢本巴希（Maniema N°54）',
          destinationHub: '金沙萨（Usoke N°132）',
          modes: '刚果(金)境内空运与陆运',
          summary: '从卢本巴希出发前往金沙萨物流中心的稳定双向运输服务。',
        },
      },
    },
    about: {
      kicker: "关于 OLOM'S Business",
      title: '扎根中国与刚果（金）的直营物流网络。',
      lead: "OLOM'S International business CO. LTD. 专注于搭建中国采购中心与中非市场之间的直连桥梁。",
      body: '公司在金沙萨（Usoke大道132号）、卢本巴希（Maniema大道54号）、布拉柴维尔及安哥拉设有服务点，并与广州经理 EMILE 团队无缝对接。',
      managerLabel: '中国区经理办公室',
      headOfficeLabel: '金沙萨总部',
      rccmLabel: '注册号 / RCCM',
      hoursLabel: '营业时间',
      configurableBadge: '可在后台配置',
      learnMoreCta: '查看各地办事处',
      spotlights: [
        {
          num: '01',
          title: '优先航空货运',
          desc: '广州直发金沙萨与卢本巴希的定期空运方案，满足高周转商业货物需求。',
          mode: 'air',
        },
        {
          num: '02',
          title: '海运整柜与拼箱',
          desc: '经济可靠的集装箱与拼箱方案，适合大宗商品、建材与机械设备运输。',
          mode: 'sea',
        },
      ],
    },
    whyUs: {
      kicker: "为什么选择 OLOM'S Business",
      title: '切实可靠的运营优势。',
      items: [
        {
          title: '中刚双边实体网点',
          desc: '广州直属办公室与金沙萨、卢本巴希当地团队直接对接，沟通零障碍。',
        },
        {
          title: '四大核心线路覆盖',
          desc: '全面覆盖中国→金沙萨、中国→卢本巴希及金沙萨↔卢本巴希双向调拨。',
        },
        {
          title: '法 / 英 / 中 三语服务',
          desc: '方便对接中国供应商工厂，并为刚果本地客户提供清晰法语/英语服务。',
        },
        {
          title: 'WhatsApp 直连与包裹追踪',
          desc: '支持电话、邮件及 WhatsApp 快速报价，并提供结构化货物节点查询。',
        },
      ],
    },
    tracking: {
      kicker: '货物追踪',
      title: '实时掌握您的货物运输节点。',
      subtitle: '输入您的运单编号，查询货物当前所处阶段。',
      placeholder: '例如：OLM-GZ-KIN-1042',
      button: '查询货物',
      sampleLabel: '系统示例单号：',
      notFoundTitle: '未找到该运单号',
      notFoundDesc: '请核对运单编号，或联系金沙萨、卢本巴希及广州办事处。管理员可通过登录界面录入新运单。',
      statusLabels: {
        received_origin: '始发地已收货',
        in_transit: '国际运输中',
        customs_clearance: '清关处理中',
        arrived_hub: '已抵达目的网点',
        delivered: '已签收交付',
      },
      originLabel: '始发地',
      destinationLabel: '目的地',
      volumeLabel: '重量 / 体积',
      updatedLabel: '最近更新',
    },
    quote: {
      bannerTitle: '准备发货了吗？',
      bannerSubtitle: '提交中国至刚果（金）或境内调拨的报价需求，或通过 WhatsApp 直接联系对应网点。',
      formTitle: '在线申请报价 & WhatsApp 直连',
      formSubtitle: '请填写路线、运输方式及货物信息，我们的团队将尽快回复您。',
      fields: {
        fullName: '联系人姓名 / 公司 *',
        company: '公司名称（选填）',
        phone: '联系电话 / WhatsApp *',
        email: '电子邮箱（选填）',
        axis: '运输路线 *',
        mode: '运输方式 *',
        branch: '选择 WhatsApp 受理网点',
        cargo: '货物名称及描述 *',
        weight: '预估重量或体积 (kg / CBM)',
      },
      modes: {
        air: '国际空运',
        sea: '国际海运',
        road: '陆运 / 刚果境内专线',
      },
      submitBtn: '提交报价申请',
      whatsappBtn: '通过 WhatsApp 发送',
      successTitle: '报价申请已记录',
      successDesc: '您的请求已保存至客户与管理后台，您也可以直接跳转 WhatsApp 对接。',
      validationError: '请填写您的姓名、联系电话及货物描述。',
    },
    contact: {
      kicker: '全球网点与联系方式',
      title: '各国办事处详情。',
      subtitle: '刚果（金）、刚果（布）、安哥拉及中国广州直属办事处官方联系方式。',
      filters: {
        all: '全部国家',
        rdc: '刚果(金) 金沙萨/卢本巴希',
        bzv: '刚果(布) 布拉柴维尔',
        angola: '安哥拉',
        china: '中国（广州）',
      },
      manager: '经理',
      landline: '座机',
      addressConfigurable: '当地详细街道地址可在管理员后台配置',
      copySuccess: '已复制',
      callAction: '拨打电话',
    },
    auth: {
      title: '登录系统 — 业务运营门户',
      subtitle: '进入用户中心（查看已提交的报价）或管理员中心（配置缺失信息及管理运单追踪）。',
      clientTab: '用户',
      adminTab: '管理员',
      identifierLabel: '姓名或邮箱',
      passwordLabel: '访问密码',
      loginBtn: '立即登录',
      logoutBtn: '退出登录',
      demoNote: '本地交互门户：可切换用户或管理员身份，实时配置缺失字段与管理运单节点。',
      clientDashboard: {
        title: '客户工作台',
        myQuotes: '已提交的报价请求',
        noQuotes: '暂无报价请求记录。',
        quickTrack: '前往查询运单',
      },
      adminDashboard: {
        configTab: '可配置公司信息',
        shipmentsTab: '货物追踪管理',
        quotesTab: '客户报价收件箱',
        configIntro: '未提供的企业补充信息（RCCM、营业时间、参考时效与运价）均可在此配置，不虚构任何未知数据。',
        saveConfigBtn: '保存配置',
        savedToast: '配置已保存并同步更新至全站。',
        addShipmentTitle: '新增运单追踪记录',
        createShipmentBtn: '创建运单',
      },
    },
    footer: {
      tagline: "OLOM'S International business CO. LTD. — 中国至刚果（金）国际空运、海运及进出口物流专家。",
      navTitle: '网站导航',
      servicesTitle: '专线与服务',
      officesTitle: '核心办事处',
      rights: "OLOM'S Business. 保留所有权利。",
      configurableNotice: '参考运价、时效及公司注册号等缺失项均可通过管理员门户配置。',
    },
  },
};
