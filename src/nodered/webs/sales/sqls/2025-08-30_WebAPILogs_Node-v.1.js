//------------------------------------------------------------------------------
var libraries = {
  parseUrlApi: function (urlString) {
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
      
      // Zapytanie (query) i Hash
      const queryStartIndex = urlString.indexOf('?', pathStartIndex);
      const hashStartIndex = urlString.indexOf('#', pathStartIndex);

      if (queryStartIndex !== -1) {
          ret.query = urlString.substring(queryStartIndex, hashStartIndex !== -1 ? hashStartIndex : urlString.length);
      } else {
          ret.query = '';
      }

      if (hashStartIndex !== -1) {
          ret.hash = urlString.substring(hashStartIndex);
      } else {
          ret.hash = '';
      }
    } catch (e) {
      console.error("Wystąpił błąd podczas parsowania URL:", e);
      return {};
    }

    return ret;
  }
};

global.set("libraries", libraries);

/*
Usage example:
var urlString = "https://api.example.com:1998/api/v1/orders";
var urlStringWithQuery = "http://example.com/search?q=test&page=1";
var urlStringWithHash = "https://example.com/documents#chapter-2";
var urlStringFull = "https://example.com/api/data?id=123#result";

msg.payload = {
    test1: global.libraries.parseUrlApi(urlString),
    test2: global.libraries.parseUrlApi(urlStringWithQuery),
    test3: global.libraries.parseUrlApi(urlStringWithHash),
    test4: global.libraries.parseUrlApi(urlStringFull)
};
*/

//Usage example:
var urlString = "https://api.example.com:1998/api/v1/orders";
var urlStringWithQuery = "http://example.com/search?q=test&page=1";
var urlStringWithHash = "https://example.com/documents#chapter-2";
var urlStringFull = "https://example.com/api/data?id=123#result";

var libraries = global.get("libraries")
msg.payload = {
    test1: libraries.parseUrlApi(urlString),
    test2: libraries.parseUrlApi(urlStringWithQuery),
    test3: libraries.parseUrlApi(urlStringWithHash),
    test4: libraries.parseUrlApi(urlStringFull)
};
return msg;