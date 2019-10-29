class MapForm {
    constructor(target, name) {
        var div = document.createElement("div");
        div.id = "mapForm";
        target.appendChild(div);
        window[name] = this;
        this.updateBtn();
        this.dom = document.getElementById("mapForm");
    }

    // RECUPERE LES INFOS DES STATIONS
    getStation(stationName, address, available_bikes, available_bike_stands) {
        this.dom.innerHTML = this.stationHtml(stationName, address, available_bikes, available_bike_stands);
        var infoStation = document.getElementById("infoStation");
        infoStation.style.border = "1px solid black";
        infoStation.style.borderRadius = "5px";
        infoStation.style.backgroundColor = "rgb(240,240,240)";
        infoStation.style.marginTop = "8px";
        infoStation.style.marginBottom = "8px";
        infoStation.style.fontSize = "12px";
        infoStation.style.textAlign = "center";
    }

    // CONTENU DR MAP FORM
    stationHtml(stationName, address, available_bikes, available_bike_stands) {

        this.dom.style.display = "block";
        var infoStation = document.getElementById("infoStation");
        return ` 
      <div id="infoStation">
        <p id="stationName">${stationName}</p>
        <p id="stationAdress">${address}</p>
        <p id="aBikes">Vélo(s) disponible(s): ${available_bikes}</p>
        <p id="aBikesStands">Place(s) disponible(s): ${available_bike_stands}</p>
      </div>
      <div id="formulaire">
          <p>Nom : <span class="obligatoire"> * </span></p>
          <input type="text" id="name" value="${window.storage.data.name}" required/>
          <p>Prénom :<span class="obligatoire"> * </span></p>
          <input type="text" id="surname" value="${window.storage.data.surname}" required/>
          <p>Signature :<span class="obligatoire"> * </span></p>
          <canvas id="signature" width="200" height="100"></canvas>
          <input type="button" id="recommencer" value="Effacer" />
          <input type="submit" id="submit" value="${this.action}" onclick="${this.todo}()"/>
          <span class="obligatoire"> * Champs obligatoires.</span>
      </div>
      <div id="timer"></div>
      <div id="message"></div>
      `;
    }

    // MET A JOUR INFO STATION ET CHANGE LE BOUTON DE RESERVATION
    updateBtn() {
        this.invertBtn();

        if (!this.hasOwnProperty("dom")) return;
        this.dom.innerHTML = this.stationHtml();
        var infoStation = document.getElementById("infoStation");
        infoStation.innerHTML = `<p>Choisissez une station pour réserver.</p>
                               <p>Vous ne pouvez avoir qu'une réservation en cours.</p>`;
        infoStation.style.height = "84px";
        infoStation.style.border = "1px solid black";
        infoStation.style.backgroundColor = "rgb(240,240,240)";
        infoStation.style.fontSize = "12px";
        infoStation.style.marginTop = "15px";
        infoStation.style.marginBottom = "20px";
        infoStation.style.borderRadius = "5px";
        infoStation.style.padding = "5px";
        infoStation.style.textAlign = "center";
    }

    // CHANGE LE BOUTON DE RESERVATION
    invertBtn() {
        if (this.action == undefined) {
            if (window.storage.getData("stationName") == null) {
                this.allowResa();
            } else {
                this.cancelResa();
            }
        } else {
            switch (this.action) {
                case "Réserver":
                    this.cancelResa();
                    break;
                case "Annuler la réservation":
                    this.allowResa();
                    break;
            }
        }
    }

    // ANNULER LA RESERVATION
    cancelResa() {
        this.action = "Annuler la réservation";
        this.todo = "cancelResa";
    }

    // RESERVER
    allowResa() {
        this.action = "Réserver";
        this.todo = "localStore";
    }
}