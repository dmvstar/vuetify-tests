/**
 * @WHAT JS funkcje do strony wyszukiwania dokumentów 
 * @AUTHOR StarDust
 * @DATE 2025-06-27 11:42:54
 * @VER 0.0.25-39
 * @INFO
*/
// docFinderMain
const { createApp, ref } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

createApp({
    setup() {
        //const searchText = ref('');
        const versionInfo = ref("v.0.0.25-39");
        const loading = ref(false);
        const response = ref(null);
        var responseImage = ref(null);
        var base64Image = ref("");

        const error = ref(null);
        var isShowMainAlert = ref(false);
        var alertMessage = ref("");
        var alertMessageColor = ref("green");

        var document = Vue.reactive(
            {
                content: null,
                image: null,
                filename: null,
                doctype: null,
            }
        );

        var dicts = ref(
            {
                baseVers: ["v1","v2","v3"],
                baseUrls: [
                    { name: "nr-identification", url: "https://nr-identification.mb-stage.ukrgasbank.com", vers : ["v1","v2"] },
                    { name: "nr-clients", url: "https://nr-clients.dev.ukrgasaws.com", vers : ["v2"] },
                    { name: "nr-localhost", url: "http://localhost:1880", vers : ["v1","v2","v3"] },
                ],
                // https://nr-identification.mb.ukrgasbank.com/api/v2/commons/dija/docs/content/get?inn=3133702525&from=2025-05-20&into=2025-05-25&index=0
                // https://nr-identification.mb-stage.ukrgasbank.com/api/v2/commons/dija/docs/content/get?inn=3069610375&from=2025-03-23&into=2025-03-25
                basePaths: [
                    { name: "content/b64", method: "GET", path: "/api/{ver}/commons/dija/docs/content/b64" },
                    { name: "content/test", method: "GET", path: "/api/{ver}/commons/dija/docs/content/test" },
                    { name: "content/info", method: "POST", path: "/api/{ver}/commons/dija/docs/content/info" },
                    { name: "content/check", method: "POST", path: "/api/{ver}/commons/dija/docs/content/check" },
                    { name: "content/b64", method: "POST", path: "/api/{ver}/commons/dija/docs/content/send" },
                ],
                baseApis: [
                    { "ver" : "v1",
                        "apis" :[
                            { name: "content/test", method: "GET", path: "/api/{ver}/commons/dija/docs/content/test" },
                            { name: "content/info", method: "POST", path: "/api/{ver}/commons/dija/docs/content/info" },
                        ]
                    },
                    { "ver" : "v2",
                        "apis" :[
                            { name: "content/b64", method: "GET", path: "/api/{ver}/commons/dija/docs/content/b64" },
                            { name: "content/test", method: "GET", path: "/api/{ver}/commons/dija/docs/content/test" },
                            { name: "content/info", method: "POST", path: "/api/{ver}/commons/dija/docs/content/info" },
                            { name: "content/check", method: "POST", path: "/api/{ver}/commons/dija/docs/content/check" },
                        ]
                    },
                    { "ver" : "v3",
                        "apis" :[
                            { name: "content/b64", method: "GET", path: "/api/{ver}/commons/dija/docs/content/b64" },
                            { name: "content/test", method: "GET", path: "/api/{ver}/commons/dija/docs/content/test" },
                            { name: "content/info", method: "POST", path: "/api/{ver}/commons/dija/docs/content/info" },
                            { name: "content/check", method: "POST", path: "/api/{ver}/commons/dija/docs/content/check" },
                            { name: "content/send", method: "POST", path: "/api/{ver}/commons/dija/docs/content/send" },
                            { name: "content/arc/b64", method: "POST", path: "/api/{ver}/commons/dija/docs/content/arc/b64" },
                        ]
                    }
                ]
            }
        );
        var modes = Vue.reactive(
            {
                baseUrl: null,
                basePath: null,
                baseVer: "v3",
                baseMethod: null,
                apiPath: null,
            }
        );
        var search = Vue.reactive(
            {
                dateFromDateMenu: false,
                selectedDateFrom: '2025-03-23',// '2025-05-01',
                selectedDateFromFull: '2025-03-23',
                dateIntoDateMenu: false,
                selectedDateInto: "2025-03-25",
                selectedDateIntoFull: "2025-03-25",
                searchText: "3069610375"// "3133702525"
            }
        );

        const login = () => {
            //this.showMainAlert('Przekierowanie do strony logowania...');
            //alert('Przekierowanie do strony logowania...');
            // Tutaj możesz dodać logikę logowania, np. otwarcie modala, przekierowanie
        };

        return {
            //searchText,
            response, error, responseImage, base64Image, document, versionInfo,
            loading, login, search, modes, dicts,
            isShowMainAlert, alertMessage, alertMessageColor
        };
    },
    mounted() {
        this.makeApiListByVersion(this.modes.baseVer);
        this.modes.basePath = this.dicts.basePaths[0];
        this.modes.baseUrl = this.dicts.baseUrls[0];
    },
    watch: {
        group() {
            this.drawer = false;
        },
        "modes.baseUrl": function (newQuestion, oldQuestion) {
            if (newQuestion) {
                this.makeListVersionByUrl(this.modes.baseUrl);
                this.makeApiListByVersion(this.modes.baseVer);
                this.modes.apiPath = this.modes.baseUrl.url + this.modes.basePath.path.replace("{ver}",this.modes.baseVer);
            }
        },
        "modes.basePath": function (newQuestion, oldQuestion) {
            if (newQuestion) {
                this.modes.apiPath = this.modes.baseUrl.url + this.modes.basePath.path.replace("{ver}",this.modes.baseVer);
            }
        },
        "modes.baseVer": function (newQuestion, oldQuestion) {
            if (newQuestion) {
                this.makeApiListByVersion(this.modes.baseVer);
                this.modes.apiPath = this.modes.baseUrl.url + this.modes.basePath.path.replace("{ver}",this.modes.baseVer);
            }
        },
        "search.selectedDateFromFull": function (newQuestion, oldQuestion) {
            //alert(newQuestion);
            this.search.selectedDateFrom = this.formatDate(newQuestion);
        },
        "search.selectedDateIntoFull": function (newQuestion, oldQuestion) {
            //alert(newQuestion);
            this.search.selectedDateInto = this.formatDate(newQuestion);
        }
    },
    methods: {
        urlProps(item) {
            return {
                title: item.name,
                subtitle: item.url,
            }
        },
        pathProps(item) {
            return {
                title: `[${item.method}] ${item.path}`,
                //subtitle: item.path,
            }
        },
        formatDate(date) {
            if (!date) {
                return null
            }
            console.log(date);
            console.log(date.getDate());
            const [year, month, day] = [
                date.getFullYear(),
                date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            ];
            //date.toISOString().replace('T', '-').split('-');
            //console.log(date.toISOString());
            var ret = `${day}-${month}-${year}`;
            //console.log(ret);
            return ret;
        },
        async goToLogin() {

            this.showMainAlert('Przekierowanie do strony logowania...');

            //alert('Przekierowanie do strony logowania...');
            // Przykład przekierowania: window.location.href = '/login';
        },
        async showMainAlert(message, color) {
            this.isShowMainAlert = true;
            this.alertMessageColor = color || "green";
            this.alertMessage = message; `Przekierowanie do strony logowania...`

            console.log(message, this.isShowMainAlert);

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (error) {
            } finally {
                this.isShowMainAlert = false;
                console.log(message, this.isShowMainAlert);
            }
        },
        async performSearch() {
            if (!this.search.searchText) {
                alert('Proszę wprowadzić wartość do wyszukiwania.');
                return;
            }
            this.loading = true;
            this.clearSearchData();

            try {
                console.log('Rozpoczynam wyszukiwanie dla:', this.modes);
                console.log('Rozpoczynam wyszukiwanie dla:', this.search.searchText);
                this.modes.apiPath = this.modes.baseUrl.url + this.modes.basePath.path;
                this.modes.apiPath = this.modes.baseUrl.url + this.modes.basePath.path.replace("{ver}",this.modes.baseVer);
                console.log('Rozpoczynam wyszukiwanie dla:', this.modes.apiPath);

                // Symulacja opóźnienia sieciowego
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log('Wyszukiwanie zakończone dla:', this.search.searchText);

                this.fetchDiiaDataInfo();

                if (this.search.searchText == "0") {
                    this.showMainAlert(`Wyszukiwanie NIE udało się dla: ${this.search.searchText}`, "error");
                } else {
                    this.showMainAlert(`Wyszukiwanie zakończone dla: ${this.search.searchText} ${this.modes.apiPath}`, "info");
                }
                // Tutaj dodaj logikę po wyszukaniu, np.
                // przekierowanie na inną stronę, wyświetlenie wyników,
                // lub wywołanie API, które następnie otworzy detale zlecenia.

            } catch (error) {
                console.error("Błąd podczas wyszukiwania:", error);
                alert('Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.');
            } finally {
                this.loading = false;
            }
        },
        async fetchDiiaDataInfo() {
            this.loading = true;
            this.response = null;
            this.error = null;
            this.base64Image = null;

            var baseUrl;
            //baseUrl = 'https://nr-clients.dev.ukrgasaws.com/api/v2/commons/dija/docs/content/test'
            //baseUrl = 'https://nr-identification.mb-stage.ukrgasbank.com/api/v2/commons/dija/docs/content/test';
            this.modes.apiPath = this.modes.baseUrl.url + this.modes.basePath.path.replace("{ver}",this.modes.baseVer);
            baseUrl = this.modes.apiPath;

            console.log('baseUrl', baseUrl);

            const params = new URLSearchParams({
                inn: this.search.searchText,
                from: this.search.selectedDateFrom,
                into: this.search.selectedDateInto
            });
            var url = `${baseUrl}?${params.toString()}`;
            //url = 'https://nr-identification.mb-stage.ukrgasbank.com/api/v2/commons/dija/docs/content/info?inn=3069610375&from=2025-03-23&into=2025-03-25'

            var request = {
                inn: this.search.searchText,
                from: this.search.selectedDateFrom,
                into: this.search.selectedDateInto
            };

            this.showMainAlert(`URL: ${baseUrl}`, "info");

            var headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Host": "nr-identification.mb.ukrgasbank.com",
                "Access-Control-Allow-Origin": "*",
                "x-auth-token": "PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8"
            };

            var requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(request)
            };

            var haveImage = false;
            try {
                const response = await fetch(baseUrl, requestOptions);
                //await fetch(url);
                //const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Błąd serwera: ${response.status} ${response.statusText}`);
                }
                this.response = await response.json();
                console.log(this.response);
                var text = JSON.stringify(this.response, null, 2);
                console.log(text);
                this.error = text.length < 220 ? text : (text.slice(0, 220) + " ...");

                if (this.response.result == "ok") {
                    if (this.response.data) {
                        if (this.response.data[0] && this.response.data[0].image) {
                            this.base64Image = "data:image/jpeg;base64," + this.response.data[0].image;
                            this.document.image = this.response.data[0].image;
                            haveImage = true;
                        }
                        if (this.response.data[0] && this.response.data[0].content) {
                            this.document.content = this.response.data[0].content;
                            this.document.filename = this.response.data[0].filename;
                            this.document.doctype = this.response.data[0].doctype;
                            this.document.result = this.response.result;
                            this.document.inn = this.search.searchText;
                        }
                    }
                }

            } catch (e) {
                console.error('Błąd podczas pobierania danych:', e);
                this.error = `Wystąpił błąd [fetchDiiaDataInfo]: ${e.message}. Sprawdź konsolę przeglądarki.`;
            } finally {
                this.loading = false;
            }

            if (!haveImage) {
                try {
                    headers = {
                        "X-Api-Key": "gS4ZdhQceKREl/F4pEEVNA==CcUuQDcYZB13Q946"
                    };

                    this.loading = false;

                    requestOptions = {
                        method: "GET",
                        headers: headers
                    };
                    const response = await fetch('https://api.api-ninjas.com/v1/randomimage', requestOptions);
                    //await fetch(url);
                    //const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Błąd serwera: ${response.status} ${response.statusText}`);
                    }
                    var arrayBuffer = await response.text();

                    //const buffer = Buffer.from(yourArrayBuffer);
                    //const base64String = buffer.toString('base64');
                    //const base64String = btoa('base64');

                    this.responseImage = arrayBuffer;
                    this.base64Image = "data:image/jpeg;base64," + this.responseImage

                    //this.base64Image = 'https://randomuser.me/api/portraits/men/77.jpg';
                    console.log(this.base64Image);
                } catch (e) {
                    console.error('Błąd podczas pobierania danych:', e);
                    this.error = `Wystąpił błąd: ${e.message}. Sprawdź konsolę przeglądarki.`;
                } finally {
                    this.loading = false;
                }
            }
        },
        async performUpload() {
            if (!this.document.content & !this.document.image) {
                return;
            }
            this.uploadDiiaDokument();
        },
        async uploadDiiaDokument() {
            this.loading = true;
            this.response = null;
            this.error = null;

            var baseUrl;
            baseUrl = this.modes.baseUrl.url + `/api/${this.modes.baseVer}/commons/dija/docs/content/send`;
            console.log('baseUrl', baseUrl);

            var request = {
                inn: this.document.inn,
                content: this.document.content,
                image: this.document.image,
                filename: this.document.filename,
                doctype: this.document.doctype,
                sendPhoto: true
            };

            this.showMainAlert(`URL: ${baseUrl}`, "info");

            var headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Host": "nr-identification.mb.ukrgasbank.com",
                "Access-Control-Allow-Origin": "*",
                "x-auth-token": "PTzQlEIYZVslkOyzKh41cJCfJCSuhJJ8"
            };

            var requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(request)
            };

            try {
                const response = await fetch(baseUrl, requestOptions);
                if (!response.ok) {
                    throw new Error(`Błąd serwera: ${response.status} ${response.statusText}`);
                }
                this.response = await response.json();
                console.log(this.response);
                var text = JSON.stringify(this.response, null, 2);
                console.log(text);
                this.error = text.length < 220 ? text : (text.slice(0, 220) + " ...");
                if (this.response.result == "ok") {

                }
            } catch (e) {
                console.error('Błąd podczas wysylania danych:', e);
                this.error = `Wystąpił błąd: ${e.message}. Sprawdź konsolę przeglądarki.`;
            } finally {
                this.loading = false;
            }

        },
        clearSearchData() {
            //this.search.searchText = null;
            this.base64Image = null;
            this.document.content = null;
            this.document.image = null;
            this.document.filename = null;
            this.document.doctype = null;
            this.document.result = null;
        },
        makeListVersionByUrl(url) {
            console.log(1,'makeListVersionByUrl', url.url);
            var verList = this.dicts.baseUrls.find(x => x.url == url.url);
            console.log(2,'makeListVersionByUrl', JSON.stringify(verList));
            if(verList) {
                this.dicts.baseVers = verList.vers;
                this.modes.baseVer = this.dicts.baseVers[ this.dicts.baseVers.length - 1];
            }
        },
        makeApiListByVersion(version) {
            console.log(1,'makeApiListByVersion', version);
            var apiList = this.dicts.baseApis.find(x => x.ver == version);
            console.log(2,'makeApiListByVersion', JSON.stringify(apiList));
            if(apiList) {
                this.dicts.basePaths = apiList.apis;
            }
            console.log(3,'makeApiListByVersion', JSON.stringify(this.dicts.basePaths));
            return;
        }
    }
})
    .use(vuetify)
    .mount('#app');