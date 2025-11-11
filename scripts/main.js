// Fetch JSON data from a given filename
// Returns a promise that resolves to the parsed JSON object
// ((Try not to overuse this function to avoid excessive network requests))
export function fetchJSON(filename) {
  return fetch(filename)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}

// Scroll the page to the top, used when swapping out content (navigating to a new page)
// so as to not leave the user in the middle or at the end of the "new page"
export function scrollToTop() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}