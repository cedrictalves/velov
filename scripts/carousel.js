class Carousel {
    constructor(name, target, list) {
        this.pointer = 0; // pointeur (incrémente et décrémente)
        window[name] = this; // this = le nom de l'objet
        this.name = name; // nom de la variable
        this.list = list; // liste des images et textes correspondants
        var div = document.createElement("div"); // creation de  la div
        div.id = name; // id de la div 
        div.innerHTML = this.baseHtml(); // contenu de la div
        target.appendChild(div); // où va etre créée la div
        this.dom = document.getElementById(name); // div carousel
        this.slides = document.getElementById("carousel-slides"); // div contenant le diaporama
        this.text = document.getElementById("imgText"); // div contenant le texte du diaporama
        document.onload = this.play(); // lancement du diaporama au chargement de la page
        document.addEventListener("keydown", function(e) { // manipulation du diaporama avec les touches 
            switch (e.keyCode) {
                case 37:
                    carousel.prev(true);
                    break;
                case 39:
                    carousel.next(true);
                    break;
            }
        });
    }

    // CONTENU DE LA DIV PRINCIPALE
    baseHtml() {
        var html = `<div id="carousel-slides">` + this.showImgsListFrom(0);
        return html + `</div>
        <div id="buttons">
            <i id="prev" class="fas fa-arrow-left"   onclick="${this.name}.prev(true)"></i>
            <i id="playpause" class="fas fa-pause"   onclick="${this.name}.click(this)"></i>
            <i id="next" class="fas fa-arrow-right"  onclick="${this.name}.next(true)"></i>
        </div>
        <div id="imgText">${this.list[0].text}</div>
        `;
    }

    // CREE LA LISTE DES IMAGES
    showImgsListFrom(id) {
        var html = "";
        for (let i = 0; i < this.list.length; i++) {
            html += `<div class="imgSlide" style="background-image: url(img/${this.list[id].img})"></div>`;
            id++;
            if (id == this.list.length) id = 0;
        }
        return html;
    }

    // DIAPO SUIVANTE
    next(stop = false) {
        if (stop) this.stopTimer();
        this.pointer++;
        if (this.pointer == this.list.length) this.pointer = 0;
        this.slides.innerHTML = this.showImgsListFrom(this.pointer);
        this.text.innerHTML = this.list[this.pointer].text;

    }

    // DIAPO PRECEDENTE
    prev(stop = false) {
        if (stop) this.stopTimer();
        this.pointer--;
        if (this.pointer < 0) this.pointer = this.list.length - 1;
        this.slides.innerHTML = this.showImgsListFrom(this.pointer);
        this.text.innerHTML = this.list[this.pointer].text;
    }

    // CHANGE LE LOGO PLAY/PAUSE
    click(target) {
        switch (target.className) {
            case "fas fa-pause":
                this.stopTimer();
                break;
            default:
                target.className = "fas fa-pause";
                this.play();
                break;
        }
    }

    // ARRETE LE TIMER
    stopTimer() {
        clearInterval(this.timer);
        var changeLogo = document.getElementById("playpause");
        changeLogo.className = "fas fa-play";
    }

    // LANCE LE TIMER
    play() {
        this.timer = setInterval(
            this.next.bind(this),
            5000
        );
    }
}