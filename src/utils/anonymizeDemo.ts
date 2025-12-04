export function anonymizeDemoText(input: string): string {
  if (!input.trim()) {
    return "";
  }

  let text = input;

  // E-Mail-Adressen grob anonymisieren
  text = text.replace(/\b\S+@\S+\.\S+\b/g, "[E-Mail anonymisiert]");

  // Telefonnummern / längere Zahlenfolgen grob anonymisieren
  text = text.replace(/\b\d{5,}\b/g, "[Nummer anonymisiert]");

  // Einfache Name-Platzhalter (nur Demo)
  text = text.replace(/\b(Max|Lisa|Tim|Sarah|Jonas|Emily)\b/gi, "[Name anonymisiert]");

  return text;
}

