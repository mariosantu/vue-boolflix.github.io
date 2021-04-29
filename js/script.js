var app = new Vue({

	el: '#root',
	data: {
		filmsArray: [],
	},
	methods: {
	},
	mounted() {
		axios
			.get('https://api.themoviedb.org/3/search/movie?api_key=b83032af5926b5913fcfb43882f79d28&query=all')
			.then((response) => {
				console.log(response);
				
				let getData = response.data;
				console.log(getData);

				let getobj = getData.results;
				console.log(getobj);

				this.filmsArray = getobj;
			});
	}
});


