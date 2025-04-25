const { getConnection } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const Hospital = require('../models/Hospital');
const { getConsultasDelHospital } = require('../services/hospitalProxyService');

exports.createHospital = async (req, res) => {
  try {
    const { nombre, direccion, urlApi } = req.body;
    const hospitalId = uuidv4();
    await Hospital.create({ id: hospitalId, nombre, direccion, urlApi });
    res.status(201).json({ id: hospitalId, nombre, urlApi });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHospitales = async (req, res) => {
  try {
    const hospitales = await Hospital.findAll();
    res.json(hospitales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital no encontrado' });
    }
    res.json(hospital);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, urlApi } = req.body;
    await Hospital.update(id, { nombre, direccion, urlApi });
    res.json({ message: 'Hospital actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    await Hospital.delete(id);
    res.json({ message: 'Hospital eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.enviarConsulta = async (req, res) => {
  const { hospitalId } = req.params;
  const  consultaData  = req.body;

  if (!hospitalId) {
    return res.status(400).json({ error: 'El ID del hospital es requerido en la ruta.' });
  }

  try {
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital no encontrado' });
    }

    let baseUrl = hospital.url_api;
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = 'http://' + baseUrl;
    }

    const fullUrl = new URL('/consultas', baseUrl).href;

    const payload = {
      fecha: consultaData.fecha,
      diagnostico: consultaData.diagnostico,
      tratamiento: consultaData.tratamiento,
      hospitalId: hospital.id,
      medico: { id: consultaData.medicoId },
      paciente: { id: consultaData.pacienteId }
    };
    
    const response = await axios.post(fullUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error al enviar consulta:', error.message);
    if (error.response) {
      console.error('📄 Detalles del error:', error.response.data);
      return res.status(error.response.status).json({ 
        error: error.response.data,
        status: error.response.status
      });
    }
    res.status(500).json({ error: 'Error al comunicarse con la API del hospital.' });
  }
};


exports.getConsultasExternas = async (req, res) => {
  const { hospitalId } = req.params;  // Obtener el hospitalId desde los parámetros de la URL
  try {
    const consultas = await getConsultasDelHospital(hospitalId);  // Usar el servicio para obtener las consultas
    res.json(consultas);  // Devolver la respuesta
  } catch (error) {
    res.status(500).json({ error: error.message });  // En caso de error, devolver mensaje
  }
};

