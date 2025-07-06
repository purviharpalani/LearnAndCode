export function inferCategory(text: string): string {
  const lower = text.toLowerCase();

  if (/startup|business|market|stocks|finance|investment/.test(lower)) return 'business';
  if (/ai|software|technology|tech|app|gadget|internet/.test(lower)) return 'technology';
  if (/movie|film|celebrity|tv|entertainment|music/.test(lower)) return 'entertainment';
  if (/football|cricket|nba|tennis|olympic|match|sports/.test(lower)) return 'sports';
  if (/health|covid|vaccine|medicine|doctor|mental/.test(lower)) return 'health';
  if (/science|research|space|nasa|physics/.test(lower)) return 'science';
  if (/election|politics|government|policy|minister/.test(lower)) return 'politics';

  return 'general';
}
