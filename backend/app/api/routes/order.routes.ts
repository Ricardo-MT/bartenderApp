import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import OrderController from '../../controllers/order.controllers';
import { drinks } from '../../models/Drink/drink';
const route = Router();

export default (app: Router) => {
    const orderController = new OrderController();
    app.use('/order', route);

    route.post('/',
        celebrate({
            body: Joi.object({
                user: Joi.number().empty('').required(),
                drink: Joi.string().empty('').valid(...drinks).required(),
            }),
        }),
        orderController.handleIncomingOrder);

    route.get('/',
        celebrate({
            query: Joi.object({
                skip: Joi.number().empty('').allow(null),
                limit: Joi.number().empty('').allow(null),
            }),
        }),
        orderController.getOrders);
}