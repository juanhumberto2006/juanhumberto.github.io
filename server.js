// Requerir las dependencias necesarias
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;  // Puedes usar el puerto que prefieras

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',    // Dirección del servidor de MySQL (localhost en este caso)
    user: 'root',         // Usuario predeterminado de MySQL en XAMPP
    password: '',         // Contraseña predeterminada de MySQL en XAMPP (vacía por defecto)
    database: 'usuarios'  // El nombre de la base de datos que creaste en phpMyAdmin
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.log('Error al conectar a la base de datos: ', err); // Si hay un error, lo mostramos
        return;
    }
    console.log('Conectado a la base de datos MySQL');  // Si la conexión es exitosa, mostramos este mensaje
});

// Middleware para analizar los datos enviados desde el formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Definir la ruta para registrar usuarios
app.post('/registro', (req, res) => {
    const { nombre, email, password } = req.body;

    // Verificar si los campos están vacíos
    if (!nombre || !email || !password) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Crear la consulta SQL para insertar los datos del usuario en la tabla 'registros'
    const query = 'INSERT INTO registros (nombre, email, password) VALUES (?, ?, ?)';

    // Ejecutar la consulta
    db.query(query, [nombre, email, password], (err, result) => {
        if (err) {
            console.log('Error al insertar el registro: ', err);  // Mostrar error si falla la inserción
            return res.status(500).send('Error al registrar el usuario.');
        }
        res.status(200).send('¡Registro exitoso!');  // Si la inserción es exitosa, enviar respuesta
    });
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
