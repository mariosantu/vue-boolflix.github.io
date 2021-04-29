var app = new Vue({

	el: '#root',
	data: {
		userInput: '',
		filmsArray: [],
		seriesArray: [],
	},
	methods: {
		searchMovie() {
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
		}
	},
	mounted() {
		//axios
			//.get(`https://api.themoviedb.org/3/search/movie?api_key=b83032af5926b5913fcfb43882f79d28&query=${this.userInput}`)
			//.then((response) => {
				//console.log(response);
				
				//let getData = response.data;
				//console.log(getData);

				//let getobj = getData.results;
				//console.log(getobj);

				//this.filmsArray = getobj;
			//});

		axios
			.get('https://api.themoviedb.org/3/search/tv?api_key=b83032af5926b5913fcfb43882f79d28&query=all')
			.then((response) => {
				
				let getData = response.data;

				let getobj = getData.results;

				this.seriesArray = getobj;
				console.log(this.seriesArray);

			});
	}
});


