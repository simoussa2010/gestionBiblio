import Joi from 'joi';

const utilisateursSchema = Joi.object({
    email: Joi.string().email().required(),

    motDePasse: Joi.string().min(8).required(),

    role: Joi.string().valid('admin', 'utilisateur').required(),

}).unknown(true);;

export const validateUtilisateurs = (req, res, next) => {
    const { error } = utilisateursSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};



