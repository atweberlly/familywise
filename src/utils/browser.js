// utils/browser.js

export const isCompatible = () => {
  if (typeof window === 'undefined') return false
  return typeof window.navigator.brave !== 'undefined'
}
/* Applying for Multiple Browser
export const isBraveEdgeOrFirefoxBrowser = () => {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();

  return (
    userAgent.includes('edg/') ||
    userAgent.includes('firefox') ||
    typeof window.navigator.brave !== 'undefined'
  );
};
*/
