import { Router } from 'express';
import IndexCtrl from '../controllers/indexController'

const router = Router();

router.post('/', IndexCtrl.courseCtrl.create);
router.get('/', IndexCtrl.courseCtrl.findAll);
router.get('/:id', IndexCtrl.courseCtrl.findOne);
router.delete('/:id',IndexCtrl.courseCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.courseCtrl.rawSQL);
router.put('/:id', IndexCtrl.courseCtrl.update);
router.post('/image/:id', IndexCtrl.uploadCtrl.upload,IndexCtrl.courseCtrl.updated);
router.post('/multipart/', IndexCtrl.uploadCtrl.uploadMultipart,IndexCtrl.courseCtrl.created,IndexCtrl.courseCtrl.findAll);
router.get('/image/:filename', IndexCtrl.downloadCtrl.download);
router.post('/',IndexCtrl.uploadCtrl.upload,IndexCtrl.courseCtrl.created,IndexCtrl.courseCtrl.findAll);


export default router;