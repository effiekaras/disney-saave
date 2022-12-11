// Global constants in this file.

// This will get the correct API URL
const prefix = process.env.NODE_ENV === 'development' ? 'http' : 'https';
export const API_URL = window ? `${prefix}://${window.location.hostname}:4000/api` : "http://localhost:4000/api";