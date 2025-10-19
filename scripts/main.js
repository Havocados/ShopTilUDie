// Fetch JSON data from a given filename
// Returns a promise that resolves to the parsed JSON object
// ((Try not to overuse this function to avoid excessive network requests))
function fetchJSON(filename) {
  return fetch(filename)       
    .then(response => response.json())
    .then(json => {
      return json;
    });
}

export { fetchJSON };