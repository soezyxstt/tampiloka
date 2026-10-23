const configuredTemuraUrl = process.env.NEXT_PUBLIC_TEMURA_URL;
const defaultTemuraUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3001"
  : "https://temura.tampiloka.site";

export const TEMURA_URL = (configuredTemuraUrl || defaultTemuraUrl).replace(/\/$/, "");
export const TEMURA_DEMO_URL = process.env.NEXT_PUBLIC_TEMURA_DEMO_URL || (
  process.env.NODE_ENV === "development"
    ? `${TEMURA_URL}/preview/adat-sunda`
    : "https://demo-undangan.tampiloka.site/preview/adat-sunda"
);
