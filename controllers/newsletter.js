const Newsletter  = require('../models/newsletter');

function subscribeEmail(req, res) {
    const { email } = req.params;

    const newsletter = new Newsletter();

    if (!email) {
        res.status(404).send({ code: 404, message: "El email es obligatorio" })
    } else {
        newsletter.email = email.toLowerCase();
        newsletter.save((err, newsletterStore) => {
            if (err) {
                res.status(500).send({ code: 500, message: "El email ya existe." });
            } else {
                if (!newsletterStore) {
                    res.status(404).send({ code: 404, message: "Error al registrar email a newsletter." });
                } else {
                    res.status(200).send({ code: 200, message: "Email registrado con éxito." });
                }
            }
        })
    }

}

module.exports = {
    subscribeEmail
}