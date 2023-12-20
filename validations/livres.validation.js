import Joi from 'joi';

const livresSchema = Joi.object({

    titre: Joi.string().min(3).required(),
    auteurId: Joi.number().integer().required(),
    annee: Joi.string().pattern(/^\d{4}$/),
    genre: Joi.string(),

}).unknown(true);;

export const validateLivres = (req, res, next) => {
    const { error } = livresSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

