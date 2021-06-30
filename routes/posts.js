const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');



router.post('/',auth, postsCtrl.createThing );
router.put('/:id', auth, postsCtrl.modifyThing);
router.delete('/:id', auth, postsCtrl.deleteThing);
router.get('/:id', auth, postsCtrl.getOneThing);
router.get('/', auth, postsCtrl.getAllThings);
router.get('/me', auth, postsCtrl.getMyThings);

  module.exports = router; 