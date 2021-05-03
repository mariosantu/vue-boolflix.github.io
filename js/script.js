var app = new Vue({

	el: '#root',
	data: {
		userInput: '',
		pathCoverImg: 'https://image.tmdb.org/t/p/w342',
		filmsArray: [],
		seriesArray: [],
		langFlagsArray: ['it','en','de','ja','fr','es','kr','us'],
	},
	methods: {
		// funzione che cerca film e serie
		// inseriti da utente mediante la libreria
		search() {
          axios
			   .get(`https://api.themoviedb.org/3/search/movie?api_key=b83032af5926b5913fcfb43882f79d28&query=${this.userInput}`)
		       .then((response) => {
				//console.log(response);
				
				let getData = response.data;
				//console.log(getData);

				let getobj = getData.results;
				//console.log(getobj);

				this.filmsArray = getobj;
				console.log(this.filmsArray);
			});

		  axios
			.get(`https://api.themoviedb.org/3/search/tv?api_key=b83032af5926b5913fcfb43882f79d28&query=${this.userInput}`)
			.then((response) => {
				
				let getData = response.data;

				let getobj = getData.results;

				this.seriesArray = getobj;
				console.log(this.seriesArray);

			});
		},
		// la funzione ritorna l'immagine della lingua 
		// corrispondente al film/serie ricercato
		flagCheck(langFlag) {

			if(this.langFlagsArray.includes(langFlag)) {
				// se la bandiera è presente ritorno
				// l'immagine corrispettiva 
				return "img/" + langFlag + ".svg";
			} else {
				// altrimenti ritorno un 'immagine 
				// di default ove mancasse la bandiera
				return "img/default.png";
			}
		},
		// la funzione mi permette di ritornare
		// il link completo per ottenere 
		// la copertina dei film/series
		getCover(posterPath) {

			if( posterPath == null) {
				return "img/blank.png";
			} else {
				return this.pathCoverImg + posterPath;
			}	
		},
		// la funzione mi permette di trasmormare 
		// i voti da 1 a 10 in voti da 1 a 5
		// e restituisce i tag icons stars
		voteToStar(vote) {

			// resultYellowStar contiene il voto medio
			// arrotondato per eccesso del
			// film/serie corrente
			let resultYellowStar;

			// noRateStar contiene l'eventuale mancanza
			// di voto del film/serie corrente
			let noRateStar;

			// conterrà le 5 stelle con i rispettivi colori 
			var starsIcon = ``;
			
			// effettuo l'arrotondamento per eccesso
			// con la funzione Math.ceil 
			resultYellowStar = Math.ceil(vote / 2);

			// assegno a noRateStar l'eventuale numero 
			// di stelle da non colorare di giallo 
			// esempio: 
			// se il film ha 4 stelle su 5 resultYellowStar 
			// conterrà 4, mentre noRateStar conterrà 1
			noRateStar = 5 - resultYellowStar;

			// il for itera resultYellowStar e assegna 
			// a starsIcon l'icona gialla da inserire 
			// nell'html
			for(let i = 0; i < resultYellowStar; i++) {
				starsIcon += 
				`
				<i class="fas fa-star" style="color: yellow"></i>
				`
			}

			// il for itera noRateStar e assegna 
			// a starsIcon l'icona bianca da inserire 
			// nell'html
			for(let i = 0; i < noRateStar; i++) {
				starsIcon += 
				`
				<i class="fas fa-star" style="color: white"></i>
				`
			}

			// ritorno la quantità di stelle gialle e bianche
			// che dovranno essere stampate tramite
			// il richiamo della funzione a riga 59 tramite v-html 
			// (file html)
			return starsIcon;
		},
		cuttedOverview(myArray,indexOverview) {

			let overviewToPrint;
			let thisObj = myArray[indexOverview].overview;
			overviewToPrint = thisObj.slice(0,100);
			
			return overviewToPrint+'...';
		}
	},
	mounted() {
        // mostra di default i film più popolari
		axios
			   .get(`https://api.themoviedb.org/3/movie/popular?api_key=b83032af5926b5913fcfb43882f79d28`)
		       .then((response) => {
				
				let getData = response.data;

				let getobj = getData.results;

				this.filmsArray = getobj;
			});
	}
});


