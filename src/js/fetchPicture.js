import axios from "axios";

export async function fetchPhotos(name, page) {
	const API_KEY = '35180291-5eb2fdc93be8c0d6ffda745d8';
	const API_URL = `https://pixabay.com/api/?key=35180291-5eb2fdc93be8c0d6ffda745d8&q=yellow+flowers&image_type=photo`

	try {
		const response = await axios.get(API_URL);
		return response;
	} catch (error) {
		console.error(error);
	}
}


