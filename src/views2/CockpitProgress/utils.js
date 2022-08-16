export function getCockpitEditUrl(url) {
  const c_token = localStorage.getItem('systemCToken');
  if (c_token) {
    const e_url = new URL(url);
    const e_url_search = e_url.search;
    if (e_url_search) {
      return `${url}&c_token=${c_token}`;
    }
    return `${url}?c_token=${c_token}`;
  }
}

export function goCockpitEditUrl(url) {
  const e_url = getCockpitEditUrl(url);
  window.open(e_url, '_blank');
}
