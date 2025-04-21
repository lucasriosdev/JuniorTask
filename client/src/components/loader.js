/**
 * Toggles the visibility of the loader
 * @param {boolean} show - Whether to show or hide the loader
 */
export function toggleLoader(show) {
  const loader = document.getElementById('loader');
  loader.style.display = show ? 'flex' : 'none';
}