const bcrypt = require("bcrypt-nodejs");
// const jwt = require("jwt-simple");
const User = require("../models/user");

function signUp(req, res) {
    console.log("entre");

    const user = new User();

    const { name, lastname, email, password, repeat_password } = req.body;

    user.name = name;
    user.lastname = lastname;
    user.email = email.toLowerCase();
    user.role = "admin";
    user.active = false;


    if (!password || !repeat_password) {
        res.status(404).send({ message: "Las contraseñas son obligatorias." })
    } else {
        if (password !== repeat_password) {
            res.status(404).send({ message: "Las contraseñas ingresadas no coinciden. Tienen que ser iguales." });
        } else {
            bcrypt.hash(password, null, null, function(err, hash) {
                if(err) {
                    res.status(500).send({message: "Error al encriptar la contraseña."})
                } else {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: "El usuario ya existe." });
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: "Error al crear el usuario." });
                            } else {
                                res.status(200).send({ user: userStored });
                            }
                        }
                    });
                }
            });
        }
    }
}

module.exports = {
    signUp
};