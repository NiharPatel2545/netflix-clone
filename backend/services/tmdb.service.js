import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  const fullUrl = url.includes("?")
    ? `${url}&api_key=${ENV_VARS.TMDB_API_KEY}`
    : `${url}?api_key=${ENV_VARS.TMDB_API_KEY}`;

  try {
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (err) {
    console.error("TMDB fetch error:", err.message);
    throw err;
  }
};