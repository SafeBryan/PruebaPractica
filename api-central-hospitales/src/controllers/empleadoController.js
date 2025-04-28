
const Empleado = require('../models/Empleado');
const { getConnection } = require('../config/database');

exports.createEmpleado = async (req, res) => {
    try {
        const { nombre, cargo, hospital_id } = req.body;
        const id = await Empleado.create({ nombre, cargo, hospital_id });
        res.status(201).json({ id, nombre, cargo, hospital_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEmpleadosPorHospital = async (req, res) => {
    try {
        const { hospital_id } = req.params;
        console.log(String(hospital_id))
        const empleados = await Empleado.findAllByHospital(hospital_id);
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cargo, hospital_id } = req.body;
        await Empleado.update(id, { nombre, cargo, hospital_id });
        res.json({ message: 'Empleado actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        await Empleado.delete(id);
        res.json({ message: 'Empleado eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};