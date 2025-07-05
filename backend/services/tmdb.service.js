import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
	try {
		const fullUrl = `${url}${url.includes("?") ? "&" : "?"}api_key=${ENV_VARS.TMDB_API_KEY}`;
		const response = await axios.get(fullUrl);

		if (response.status !== 200) {
			throw new Error(`TMDB responded with status ${response.status}: ${response.statusText}`);
		}

		return response.data;
	} catch (error) {
		console.error("TMDB fetch error:", error.message);
		throw error;
	}
};