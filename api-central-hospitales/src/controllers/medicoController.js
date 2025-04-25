const Medico = require('../models/Medico');
const { getConnection } = require('../config/database');

exports.createMedico = async (req, res) => {
  try {
    const { nombre, especialidadId, hospitalId } = req.body;
    const medicoId = await Medico.create({ nombre, especialidadId, hospitalId });
    res.status(201).json({ id: medicoId, nombre, hospitalId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicos = async (req, res) => {
  try {
    const medicos = await Medico.findAll();
    res.json(medicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicoById = async (req, res) => {
  try {
    const { id } = req.params;
    const medico = await Medico.findById(id);
    res.json(medico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especialidadId, hospitalId } = req.body;
    await Medico.update(id, { nombre, especialidadId, hospitalId });
    res.status(200).json({ message: 'Médico actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMedico = async (req, res) => {
  try {
    const { id } = req.params;
    await Medico.delete(id);
    res.status(200).json({ message: 'Médico eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};