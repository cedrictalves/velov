class Map {
    // MAP
    constructor(name, target, lat, lon, zoom, apiKey) {
        var div = document.createElement("div");
        this.name = name;
        div.id = name;
        target.appendChild(div);
        this.dom = document.getElementById(name);
        this.lat = lat;
        this.lon = lon;
        this.zoom = zoom;
        var mymap = L.map(this.name).setView([this.lat, this.lon], this.zoom);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: apiKey
        }).addTo(mymap);


        var request = new XMLHttpRequest();

        // MARQUEURS ET FORMULAIRE DE RESERVATION
        request.onreadystatechange = function() {

            // MARQUEUR VERT
            var greenIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            // MARQUEUR ROUGE
            var redIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            // MARQUEUR NOIR
            var blackIcon = new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            // SI LA REQUETE EST PRETE, ET QUE SON STATUT EST OK ON CREER UNE BOUCLE
            if (this.readyState == 4 && this.status == 200) {

                window.response = JSON.parse(this.responseText);
                for (let i = 0; i < response.length; i++) {
                    // SI LA STATION EST OUVERT ET QU'IL Y A ENCORE DES VELOS DISPONIBLE ON UTILISE LE MARQUEUR VERT
                    if ((response[i].status === "OPEN") && (response[i].available_bikes > 0)) {
                        window.marker = L.marker([response[i].position.lat, response[i].position.lng], { icon: greenIcon }).on('click', markerOnClick).addTo(mymap)

                        function markerOnClick(e) {
                            window.mapForm.getStation(response[i].name, response[i].address, response[i].available_bikes, response[i].available_bike_stands);
                        }
                    }
                    // SI LA STATION N'A PLUS DE VELO ON UTILISE LE MARQUEUR ROUGE
                    else if (response[i].available_bikes === 0) {
                        window.marker = L.marker([response[i].position.lat, response[i].position.lng], { icon: redIcon }).on('click', markerOnClick).addTo(mymap)

                        function markerOnClick(e) {
                            alert("La station " + response[i].name + " n'a aucun velo disponible.");
                        }
                    }
                    // SINON LA STATION EST INDISPONIBLE ON UTILISE LE MARQUEUR NOIR
                    else window.marker = L.marker([response[i].position.lat, response[i].position.lng], { icon: blackIcon }).on('click', markerOnClick).addTo(mymap)

                    function markerOnClick(e) {
                        alert("La station " + response[i].name + " n'est pas disponible.");
                    }
                }
            }
        };

        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=5f987e7088951f1db12278f23de27c68650f15e2");
        request.send();
    }

}