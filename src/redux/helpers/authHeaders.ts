export function authHeader() {
    let headers = {
      'X-CSRFToken': getCookie('csrftoken')
    };
    return { headers: headers }
}

export function formDataHeader() {
    let headers = {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Tranfer-Encoding': 'multipart/form-data',
      'Content-Type': 'application/graphql',
    };
    return { headers: headers }
}

export function getCookie(cname: string) {
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