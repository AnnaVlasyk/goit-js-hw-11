import axios from "axios";

export async function fetchPicture(name, page) {
	const API_KEY = '35180291-5eb2fdc93be8c0d6ffda745d8';
	const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
$.getJSON(URL, function(data){
if (parseInt(data.totalHits) > 0)
    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
else
    console.log('No hits');
});
	try {
		const response = await axios.get(API_URL);
		return response;
	} catch (error) {
		console.error(error);
	}
}



