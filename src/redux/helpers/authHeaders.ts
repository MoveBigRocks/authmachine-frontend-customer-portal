export function authHeader() {
    // let token = localStorage.getItem('access_token');
    let headers = {
      'X-CSRFToken': getCookie('csrftoken')
    };
    return { headers: headers }
}

function getCookie(cname: string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function getStringifyObject(obj: any) {
  return JSON.stringify(JSON.stringify(obj))
}