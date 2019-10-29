class Map {
	constructor(name, target, lat, lon, zoom){
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
		    accessToken: 'pk.eyJ1IjoidHJlaXplN3JlY29yZHMiLCJhIjoiY2p2d2NtMmFvMW5waDQ0cG5uYnp0cW1oOSJ9.3baT8W4YLTG1TT6-8RAFXw'
		}).addTo(mymap);

		// var xmlHttp = new XMLHttpRequest();
		//     xmlHttp.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=5f987e7088951f1db12278f23de27c68650f15e2", true); 
		//     xmlHttp.send(null);
		//     console.log(xmlHttp);
		// }

		var marker = L.marker([45.750945, 4.83927]).addTo(mymap)
		 .bindPopup('<div style="width:200px; height:200px; background-color:white; text-align:center;"><p>Nom</p><p>Adresse</p></div>');


 //    makeRequest(url, callback){
	//     var xmlHttp = new XMLHttpRequest();
	//     xmlHttp.onreadystatechange = function() { 
	//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	//             callback(xmlHttp.responseText);
	//     }
	//     xmlHttp.open("GET", url, true); 
	//     xmlHttp.send(null);
	}

}


