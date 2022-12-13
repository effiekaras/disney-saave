// Global constants in this file.

// This will get the correct API URL
const prefix = process.env.NODE_ENV === 'development' ? 'http' : 'https';
export const API_URL = window ? `${prefix}://${window.location.hostname}:4000/api` : "http://localhost:4000/api"
export const MOVIE_API_KEY = "59dd51057d034c78c09b0129b62b2de9";
export const MOVIE_API_URL = "https://api.themoviedb.org/3";