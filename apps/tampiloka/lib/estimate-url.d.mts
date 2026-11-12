import type { PricingFlag } from './pricing-engine.mjs';
export type EstimateState = {
 levels: Record<string, number>;
 values: { outlets: string; stock: string; cashiers: string; staff: string; providers: string; students: string };
 shared: boolean; sku: boolean; membership: boolean; gateway: boolean; site: string; flags: PricingFlag[];
};
export const estimateDefaults: EstimateState;
export function decodeEstimate(raw: string | null): EstimateState | null;
export function encodeEstimate(state: EstimateState): string | null;
