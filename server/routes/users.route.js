import { Router } from 'express';
import IndexCtrl from '../controllers/indexController'

const router = Router();

router.post('/signup', IndexCtrl.UsersCtrl.signup);
router.post('/signin', IndexCtrl.UsersCtrl.signin);
router.post('/signout', IndexCtrl.UsersCtrl.signout);
router.get('/account', IndexCtrl.UsersCtrl.findAll);
router.get('/', IndexCtrl.UsersCtrl.findAll);
router.get('/:id', IndexCtrl.UsersCtrl.findOne);
router.delete('/:id',IndexCtrl.UsersCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.UsersCtrl.rawSQL);
router.put('/:id', IndexCtrl.UsersCtrl.update);

export default router;