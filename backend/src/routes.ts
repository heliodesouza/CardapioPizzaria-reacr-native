import { Router } from 'express';
import multer from 'multer';


import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

import { isAuthenticate } from './middlewares/isAuthenticate';

import uploadConfig from "./config/multer"


const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));


//ROTAS USER
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticate, new DetailUserController().handle )


//Rotas Categories
router.post('/category', isAuthenticate, new CreateCategoryController().handle )
router.get('/category', isAuthenticate, new ListCategoryController().handle )


//Rotas Product
router.post('/product', isAuthenticate, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticate, new ListByCategoryController().handle )

//Rotas Order
router.post('/order', isAuthenticate, new CreateOrderController().handle)
router.delete('/order', isAuthenticate, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticate, new AddItemController().handle)
router.delete('/order/remove', isAuthenticate, new RemoveItemController().handle)

router.put('/order/send', isAuthenticate, new SendOrderController().handle)
router.get('/orders', isAuthenticate, new ListOrdersController().handle )
router.get('/order/detail', isAuthenticate, new DetailOrderController().handle )
router.put('/order/finish', isAuthenticate, new FinishOrderController().handle)

export { router };

