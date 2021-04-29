import { Router } from 'express';
import IndexCtrl from '../controllers/indexController'

const router = Router();

//router.post('/', IndexCtrl.coursecontentCtrl.create);
router.get('/', IndexCtrl.coursecontentCtrl.findAll);
router.get('/:id', IndexCtrl.coursecontentCtrl.findOne);
router.delete('/:id',IndexCtrl.coursecontentCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.coursecontentCtrl.rawSQL);
router.put('/:id', IndexCtrl.coursecontentCtrl.update);
//router.post('/course/:id', IndexCtrl.uploadCtrl.upload,IndexCtrl.courseCtrl.updated);
//router.post('/multipart/', IndexCtrl.uploadCtrl.uploadMultipart,IndexCtrl.courseCtrl.create);
router.get('/image/:filename', IndexCtrl.downloadCtrl.download);
router.post('/', IndexCtrl.uploadCourseContentCtrl.uploadMultipartType, IndexCtrl.coursecontentCtrl.created);

export default router;