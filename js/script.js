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
		getCover(posterPath) {
			return this.pathCoverImg + posterPath;
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


