import { Router } from 'express';
import IndexCtrl from '../controllers/indexController'

const router = Router();

router.post('/', IndexCtrl.ordersCtrl.create);
router.get('/', IndexCtrl.ordersCtrl.findAll);
router.get('/:id', IndexCtrl.ordersCtrl.findOne);
router.delete('/:id',IndexCtrl.ordersCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.ordersCtrl.rawSQL);
router.put('/:id', IndexCtrl.ordersCtrl.update);

export default router;