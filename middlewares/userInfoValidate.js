import { Joi, celebrate } from 'celebrate';

export default celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  }),
});
