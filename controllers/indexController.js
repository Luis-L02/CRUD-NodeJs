import e from "express";
import Cliente from "../models/cliente.js";
import { check, validationResult } from 'express-validator';
const principal =(req, res)=>{
    res.render('principal',{
        pagina: "CRUD | Pagina Principal"
    });
}

const listado = async (req, res)=>{
    const clientes = await Cliente.findAll();

    res.render('listado',{
        pagina: "CRUD | Listado",
        clientes: clientes,
    });
}
const registro =(req, res)=>{
    res.render('registro',{
        pagina: "CRUD | Registro"
    
    });
}


const crearCliente = async (req, res) => {
    const { nombre, apellido, email, telefono } = req.body;

    // Validaciones
    const String_space_regex = /^[A-Za-z\s]+$/;
    await check('nombre', 'El Nombre es obligatorio y solo debe incluir letras').notEmpty().matches(String_space_regex).run(req);
    await check('apellido', 'El Apellido es obligatorio y solo debe incluir letras').notEmpty().matches(String_space_regex).run(req);
    await check('email', 'El email es obligatorio').notEmpty().run(req);
    await check('email', 'El email no es valido').isEmail().run(req);
    await check('telefono', 'El telefono es obligatorio').notEmpty().run(req);
    await check('telefono', 'Solo se pueden ingresar numeros en el campo Telefono').isNumeric().run(req);
    await check('telefono', 'El telefono debe tener 10 digitos').isLength({ min: 10 }).isLength({ max: 10 }).run(req);
    
    // Validar si el email ya esta registrado
    const emailRegistrado = await Cliente.findOne({ where: { email } });
    if (emailRegistrado) {
        return res.render('registro', {
            pagina: 'CRUD | Registro',
            errores: [{ msg: 'El email ya esta registrado' }]
        });
        
    }
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.render('registro', {
            pagina: 'CRUD | Registro',
            errores: errores.array()
        });
    }

    const cliente = await Cliente.create({
        nombre,
        apellido,
        email,
        telefono
    });

    res.render('registro', {
        pagina: 'CRUD | Registro',
        mensaje: 'El cliente se agregó correctamente'
    });
}

const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    const resultado = await Cliente.destroy({ where: { id } }); // eliminar el cliente
    const clientes = await Cliente.findAll(); // consultar clientes

    res.render('listado', {
        pagina: 'CRUD | Listado',
        clientes: clientes,
        eliminado: ` Se elimino el cliente con id:${id}`
    });
}

const editarCliente = async (req, res) => {
    const { id } = req.params;
    //console.log(id);
    const cliente = await Cliente.findByPk(id); // Buscar cliente por id
    //console.log(cliente.nombre);
    res.render('editar', {
        pagina: 'CRUD | Editar',
        cliente
    });
};

const guardar = async (req, res) => {
    const {nombre, apellido, email, telefono } = req.body;
    const {id} = req.params;

    // Validaciones
    const String_space_regex = /^[A-Za-z\s]+$/;
    await check('nombre', 'El Nombre es obligatorio y solo debe incluir letras').notEmpty().matches(String_space_regex).run(req);
    await check('apellido', 'El Apellido es obligatorio y solo debe incluir letras').notEmpty().matches(String_space_regex).run(req);
    await check('email', 'El email es obligatorio').notEmpty().run(req);
    await check('email', 'El email no es valido').isEmail().run(req);
    await check('telefono', 'El telefono es obligatorio').notEmpty().run(req);
    await check('telefono', 'Solo se pueden ingresar numeros en el campo Telefono').isNumeric().run(req);
    await check('telefono', 'El telefono debe tener 10 digitos').isLength({ min: 10 }).isLength({ max: 10 }).run(req);
    
    // Validar si el email ya esta registrado
    const emailRegistrado = await Cliente.findOne({ where: { email } });
    //console.log(emailRegistrado.id.toString());
    //console.log(id);

    const errores = validationResult(req);

    /*if (emailRegistrado && id !== emailRegistrado.id.toString()) {
        return res.redirect('editar')
    }*/


    if (!errores.isEmpty()) {
        return res.render('editar', {
            pagina: 'CRUD | Editar',
            errores: errores.array(),
            cliente: req.body
        });
    }

    //const clientes = await Cliente.findAll();
    try {
        const cliente = await Cliente.findByPk(id);
        
        cliente.nombre = nombre;
        cliente.apellido = apellido;
        cliente.email = email;
        cliente.telefono = telefono;

        await cliente.save();

        return res.redirect('/listado');    

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el cliente' });
    }
}

export{
    principal,
    listado,
    registro,
    crearCliente,
    eliminarCliente,
    editarCliente,
    guardar
}