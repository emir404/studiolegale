/**
 * All client copy and facts, sourced from clients/studiolegalelomunno.it/
 * (pages/home.md, WIKI.md). Nothing here is invented: every claim, date and
 * list traces back to the firm’s own published text.
 */

export const contact = {
  lawyer: "Avv. Laura Lo Munno",
  street: "Via Santo Stefano n. 20",
  cap: "40125",
  city: "Bologna (BO)",
  floor: "1\u00B0 piano",
  tel: "051 239626",
  telHref: "tel:+39051239626",
  fax: "051 260843",
  email: "avvlomunno@gmail.com",
};

/** The 14 practice areas, exactly as listed under MATERIE TRATTATE. */
export const materie: { title: string; detail?: string }[] = [
  {
    title: "Diritto Civile",
    detail:
      "Consulenza e assistenza nei diversi ambiti del diritto civile, in sede giudiziale e stragiudiziale.",
  },
  {
    title: "Diritto di Famiglia",
    detail:
      "Separazione consensuale e giudiziale, divorzio, affidamento, eredit\u00E0 e donazioni, amministrazione di sostegno.",
  },
  {
    title: "Diritto Condominiale",
    detail: "Controversie condominiali e rapporti tra condomini, locazioni comprese.",
  },
  {
    title: "Risarcimento Danni",
    detail:
      "Responsabilit\u00E0 civile derivante da circolazione stradale, da custodia e da attivit\u00E0 medica.",
  },
  {
    title: "Diritto Ereditario",
    detail: "Successioni, eredit\u00E0 e donazioni.",
  },
  {
    title: "Diritto Sanitario",
    detail: "Assistenza nelle controversie in ambito sanitario.",
  },
  {
    title: "Tutela della Salute",
  },
  {
    title: "Infortunistica",
    detail: "Assistenza per infortuni e sinistri, in giudizio e fuori.",
  },
  {
    title: "Tutela del Consumatore",
    detail: "Protezione del consumatore nei rapporti contrattuali.",
  },
  {
    title: "Tutela di Minori e soggetti Deboli",
    detail: "Tutela dei minori e amministrazione di sostegno.",
  },
  {
    title: "Diritto del Lavoro",
    detail: "Assistenza nei rapporti e nelle controversie di lavoro.",
  },
  {
    title: "Recupero Crediti e Procedure Fallimentari",
    detail: "Obbligazioni, contrattualistica, recupero crediti e procedure concorsuali.",
  },
  {
    title: "Multe e Sanzioni",
    detail: "Opposizioni a sanzioni amministrative.",
  },
  {
    title: "Esecuzioni mobiliari e immobiliari",
    detail: "Procedure esecutive su beni mobili e immobili.",
  },
];

/** Domiciliazioni e sostituzioni processuali (Bologna e Ferrara). */
export const domiciliazioni = [
  "Diritto civile",
  "Diritto di famiglia",
  "Diritto del lavoro",
  "Esecuzioni mobiliari e immobiliari",
  "Recupero crediti",
  "Infortunistica",
  "Condominio e locazioni",
  "Contrattualistica",
  "Opposizioni a sanzioni amministrative",
  "Mediazione",
];

/** FORMAZIONE Avv. Laura Lo Munno, dal pi\u00F9 recente. */
export const formazione = [
  {
    date: "Luglio 2011",
    title: "Iscrizione nell’elenco dei Mediatori",
    body: "Organismo di Mediazione dell’Ordine degli Avvocati di Bologna.",
  },
  {
    date: "Dicembre 2007",
    title: "Iscrizione all’Albo degli Avvocati di Bologna",
    body: "Consiglio dell’Ordine degli Avvocati di Bologna.",
  },
  {
    date: "Novembre 2007",
    title: "Superamento dell’esame di Avvocato",
    body: "Commissione Esami Avvocato presso la Corte di Appello di Bologna.",
  },
  {
    date: "2004 \u2013 2006",
    title: "Diploma di Specialista in Professioni Legali",
    body: "Scuola di Specializzazione per le Professioni Legali, Universit\u00E0 degli Studi di Bologna.",
  },
  {
    date: "2003 \u2013 2005",
    title: "Compiuta pratica forense",
    body: "Consiglio dell’Ordine degli Avvocati di Bologna.",
  },
  {
    date: "1997 \u2013 2003",
    title: "Laurea in Giurisprudenza",
    body: "Universit\u00E0 degli Studi di Bologna.",
  },
];

export const attivitaCorrelate = [
  "Componente Eletto del Comitato pari opportunit\u00E0 dell’Ordine degli avvocati di Bologna",
  "Socio AMI (Associazione avvocati matrimonialisti italiani)",
];

export const manifesto =
  "L’avvocato \u00E8 colui che diffida dai facili risultati ed evita di promettere immediate soluzioni; \u00E8 colui che, nonostante anni di attivit\u00E0, studia, approfondisce e riflette prima di emettere un parere, consapevole della responsabilit\u00E0 che si assume nei confronti del cliente.";
