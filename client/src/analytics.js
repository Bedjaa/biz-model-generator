export function trackEvent(name, props = {}) {
  if (window.plausible) {
    window.plausible(name, { props });
  }
}
