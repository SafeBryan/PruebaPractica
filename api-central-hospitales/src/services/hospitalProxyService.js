const axios = require('axios');
const Hospital = require('../models/Hospital');

exports.getConsultasDelHospital = async (hospitalId) => {
  const hospital = await Hospital.findById(hospitalId);
  if (!hospital) {
    throw new Error('Hospital no encontrado');
  }

  let baseUrl = hospital.url_api;  // Usar url_api, ya que parece ser el campo correcto

  // Asegurarse de que la URL tiene el prefijo correcto
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = 'http://' + baseUrl;  // Si no tiene http:// o https://, lo añadimos
  }

  const fullUrl = new URL('/consultas', baseUrl).href;  // Agregar la ruta '/consultas' a la URL base

  try {
    const response = await axios.get(fullUrl);  // Hacer la petición GET
    return response.data;
  } catch (error) {
    console.error('Error al obtener consultas del hospital:', error.message);
    throw new Error('Error al obtener las consultas del hospital');
  }
};
