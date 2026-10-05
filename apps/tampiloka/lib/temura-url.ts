const configuredTemuraUrl = process.env.NEXT_PUBLIC_TEMURA_URL;
const defaultTemuraUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3001"
  : "https://temura.adihnursyam.com";

export const TEMURA_URL = (configuredTemuraUrl || defaultTemuraUrl).replace(/\/$/, "");
export const TEMURA_DEMO_URL = `${TEMURA_URL}/demo/nara-aruna`;
