class Storage {
	constructor() {
		this.data = {};
		this.data = {
			...{
				"name": "",
				"surname": "",
			},
			...JSON.parse(localStorage.getItem("data")),
			...JSON.parse(sessionStorage.getItem("data"))
		}
	}

	// RECUPERE LES DONNEES STOCKEES
	getData(key = null) {
		if (key == null) return this.data;
		return this.data[key];
	}

	// UPDATE STORAGE
	update(argsData) {
		var data = {
			"session" : {},
			"local" : {}
		};
		if (argsData.hasOwnProperty("name")){
			if (!data.hasOwnProperty("local")) data.local = {};
			data.local.name = argsData.name;
		}
		if (argsData.hasOwnProperty("surname")){
			if (!data.hasOwnProperty("local")) data.local = {};
			data.local.surname = argsData.surname;
		}
		if (argsData.hasOwnProperty("stationName")){
			if (!data.hasOwnProperty("session")) data.session = {};
			data.session.stationName = argsData.stationName;
		}
		if (argsData.hasOwnProperty("stationAdress")){
			if (!data.hasOwnProperty("session")) data.session = {};
			data.session.stationAdress = argsData.stationAdress;
		}
		if (argsData.hasOwnProperty("dateTime")){
			if (!data.hasOwnProperty("session")) data.session = {};
			data.session.dateTime      = argsData.dateTime;
		}
		this.setData(data);
	}

	setData(data){
		if (data.hasOwnProperty("session")) this.updateSession(data.session);
		if (data.hasOwnProperty("local"))   this.updateLocal(data.local);
		this.data = {...this.data, ...data.session, ...data.local };
	}

	updateSession(data){
		sessionStorage.setItem("data", JSON.stringify(data));
	}
	updateLocal(data){
		localStorage.setItem("data", JSON.stringify(data));
	}

}