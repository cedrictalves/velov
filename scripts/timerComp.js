class TimerComp {
	constructor(target,name){
    window[name] = this;
    this.dom = target;
    var ref = localStorage.getItem("data");	
    ref = JSON.parse(ref);
    ref = ref.stationName;
    if (ref == null) return this.dom.innerHTML = this.noReservation();
    this.expire();
    window.tempo = setInterval(this.expire.bind(this), 1000);
  }

  noReservation(){
  	return `<p>N'attendez plus pour réserver votre velo'v.</p>`;
  }

  expire(){
  	var newDate = new Date();
  	var data = localStorage.getItem("data");
  	data = JSON.parse(data);
  	data.dateTime = new Date(data.dateTime);
  	data.dateTime.setMinutes(data.dateTime.getMinutes() + 20);
  	var secondes = Math.floor((data.dateTime - newDate) / 1000);
  	var minutes = Math.floor(secondes / 60);
  	secondes -= minutes * 60;
    if (minutes < 10) minutes = "0" + minutes;
    if (secondes < 10) secondes = "0" + secondes;
    var resaData = data.name + " " + data.surname;
    this.dom.innerHTML = `<p>Temps avant annulation de la réservation au nom de  ${resaData} à la station : 
    ${data.stationName}.
    ${data.stationAdress}.</br>
    ${minutes} : ${secondes}.</p>`;
    if (minutes == 0 && secondes == 0 ) {
      this.clearTimer();
      window.mapForm.updateBtn();
    }
  }

  clearTimer(){
  	clearInterval(window.tempo);
  	alert("Réservation annulée.");
  	window.storage.update({"dateTime" : null});
  	window.storage.update({"stationName" : null});
    window.storage.update({"stationAdress" : null});
  }

}