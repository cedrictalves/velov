class Carousel{
	constructor(name, target, imgs){
		this.list = imgs;
		this.pointeur = 0;
		this.name = name;
		var diapo = document.createElement("div");
		diapo.id = name;
		target.appendChild(diapo);
		this.dom = document.getElementById(name);
		this.dom.innerHTML = this.baseHtml();
		this.slides = document.getElementById("carousel-slides");
	}

	listImgs(){
		var prev = this.pointeur-1;
		if (prev < 0) prev = this.list.length-1;
		var html = `<img class="imgCarousel" src="${this.list[prev]}">`;
		var current = this.pointeur;
		html += `<img class="imgCarousel" src="${this.list[current]}">`;
		var next = this.pointeur+1;
		if (next > this.list.length-1) next = 0;
		html += `<img class="imgCarousel" src="${this.list[next]}">`;
		return html;
	}

	baseHtml(){
		var html = '<div class="carousel-slides" id="carousel-slides">';
		html += this.listImgs();
		return html + `</div>
			<div id="buttons">
				<i id="prev" class="fas fa-arrow-left"  onclick="${this.name}.prev()"></i>
				<i id="playpause" class="fas fa-play"   onclick="${this.name}.click(this)"></i>
				<i id="next" class="fas fa-arrow-right" onclick="${this.name}.next()"></i>
			</div>
		`;
	}

	click(target){
	        switch(target.className){
	            case "fas fa-pause":
                target.className = "fas fa-play";
                this.stop();
                break;
            default:
                target.className = "fas fa-pause";
                this.play();
                break;
            }
        }

    next(){
		console.log("image actuelle :",this.list[this.pointeur], this.pointeur);
		this.pointeur++;
		if (this.pointeur == this.list.length) this.pointeur = 0;
		console.log("prochaine image :",this.list[this.pointeur], this.pointeur);

		//ajouter la classe pour l'animation vers la gauche 
		this.slides.classList.add("animLeft");
		this.slides.addEventListener("transitionend", this.transitionend.bind(this), false);
		//on ajoute un listener sur la transition
	}


	transitionend(){
		// alert("fini");
		// console.log(this.slides.classList)
		this.slides.classList.add("stopTansition");
		// this.slides.innerHTML = this.listImgs();
		this.slides.classList.remove("animLeft");
	}

	prev(){
           
        }


    play(){
        this.timer = setInterval(this.next, 1000);
    }

    stop(){
        clearInterval(this.timer);
    }


	
}