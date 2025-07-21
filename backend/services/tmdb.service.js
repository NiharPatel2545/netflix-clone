import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

const axiosInstance = axios.create({ timeout: 7000 });

export const fetchFromTMDB = async (url, retries = 3) => {
  const fullUrl = url.includes("?")
    ? `${url}&api_key=${ENV_VARS.TMDB_API_KEY}`
    : `${url}?api_key=${ENV_VARS.TMDB_API_KEY}`;

  try {
    const response = await axiosInstance.get(fullUrl);
    return response.data;
  } catch (err) {
    if (err.code === "ECONNRESET" && retries > 0) {
      console.warn(`Retrying TMDB fetch... (${4 - retries}/3)`);
      return fetchFromTMDB(url, retries - 1);
    }
    console.error("TMDB fetch error:", err.message);
    throw err;
  }
};