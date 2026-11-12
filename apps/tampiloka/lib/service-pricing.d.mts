export type Plan = [string, string, string, string, number, number, number, number];
export type Family = {id:string; name:[string,string]; scope:[string,string]; plans:Plan[]; rows: [[string,string], (string|number)[]][]};
export const families: Family[];
export function totals(setup:number, monthly:number): {setup:number;monthly:number;quarterly:number;firstYear:number};
