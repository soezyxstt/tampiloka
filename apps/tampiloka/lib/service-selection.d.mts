export function familyForField(field: string): string | null;
export function selectedFamily(value: unknown): string;
export function familyUrl(href: string, family: string): string;
export function representativeDemos<T extends { family: string; featured?: boolean }>(entries: T[], family: string): T[];
export function matchesIllustrationUrl(href: string, source: string): boolean;
