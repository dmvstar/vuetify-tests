var urlString = "https://api.example.com:1998/api/v1/orders";


var payload = {
    "requestid": "b9c7d0e5-a2f8-4b1c-9e2d-3f5c7b9a1d2e",
    "clientip": "192.168.1.10",
    "process": "order_processing",
    "method": "POST",
    "direction": "REQUEST",
    "statuscode": "201",
    "host": "api.example.com",
    "path": "/api/v1/orders",
    "result": "SUCCESS",
    "contenttext": "Order created successfully with ID 12345.",
    "contentbody": {
        "customer": {
            "id": "c1234",
            "name": "Jan Kowalski"
        },
        "order": {
            "items": [
                { "product_id": "p987", "quantity": 2 }
            ]
        }
    },
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer abcdef12345"
    },
    "exception": null,
    "duration": 500
}

/**
 * Parsuje adres URL i zwraca obiekt z jego składowymi.
 * @param {string} urlString - Adres URL do parsowania.
 * @returns {object} - Obiekt z właściwościami takimi jak href, protocol, host, path.
 */
function parseUrlApiU(urlString) {
  var ret = {};
  try {
    const url = new URL(urlString);
    var port = url.port || 'none';    
    if(!url.port){
        port = url.protocol == 'http'?80:443;
    }
    // Przypisujemy poszczególne części URL do obiektu `ret`.
    ret.href = url.href;
    ret.protocol = url.protocol;
    ret.host = url.hostname;
    ret.port = port;
    ret.path = url.pathname;    
  } catch (e) {
    console.error("Wystąpił błąd podczas parsowania URL:", e);
    // W przypadku błędu zwracamy pusty obiekt.
    return {};
  }
  return ret;
}

/**
 * Parsuje adres URL i zwraca obiekt z jego składowymi,
 * uwzględniając domyślne porty dla HTTP i HTTPS.
 * Ta wersja funkcji nie używa wbudowanego obiektu URL.
 * @param {string} urlString - Adres URL do parsowania.
 * @returns {object} - Obiekt z właściwościami takimi jak href, protocol, host, port i path.
 */
function parseUrlApi(urlString) {
  var ret = {};
  
  try {
    ret.href = urlString;
    
    // Protokół
    const protocolEndIndex = urlString.indexOf('://');
    if (protocolEndIndex !== -1) {
      ret.protocol = urlString.substring(0, protocolEndIndex + 1);
    } else {
      ret.protocol = '';
    }
    
    // Host i port
    const hostStartIndex = protocolEndIndex !== -1 ? protocolEndIndex + 3 : 0;
    const pathStartIndex = urlString.indexOf('/', hostStartIndex);
    const hostAndPort = urlString.substring(hostStartIndex, pathStartIndex !== -1 ? pathStartIndex : urlString.length);
    const portStartIndex = hostAndPort.indexOf(':');

    if (portStartIndex !== -1) {
      ret.host = hostAndPort.substring(0, portStartIndex);
      ret.port = parseInt(hostAndPort.substring(portStartIndex + 1), 10);
    } else {
      ret.host = hostAndPort;
      // Ustawia domyślne porty, jeśli nie zostały podane.
      if (ret.protocol === 'http:') {
        ret.port = 80;
      } else if (ret.protocol === 'https:') {
        ret.port = 443;
      } else {
        ret.port = null;
      }
    }
    
    // Ścieżka (path)
    ret.path = pathStartIndex !== -1 ? urlString.substring(pathStartIndex) : '/';
        

  } catch (e) {
    console.error("Wystąpił błąd podczas parsowania URL:", e);
    // W przypadku błędu zwracamy pusty obiekt.
    return {};
  }
  
  return ret;
}


// Używamy zaktualizowanej funkcji do przeanalizowania adresu URL.
const parsedUrl = parseUrlApi(urlString);

// Wypisujemy wyniki, aby zweryfikować działanie funkcji.
console.log("Wyniki parsowania URL:");
console.log("Pełny URL:", parsedUrl.href);
console.log("Protokół:", parsedUrl.protocol);
console.log("Host:", parsedUrl.host);
console.log("Port:", parsedUrl.port || "brak");
console.log("Ścieżka:", parsedUrl.path);
