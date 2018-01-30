const app = require('express');
const router = app.Router();

/* Public routes */
router.post('/sign-up', require('./user-create'));
router.post('/authenticate', require('./user-authenticate'));
router.post('/refresh-token', require('./token-refresh'));
/* Protected routes */
router.get('/app/rooms-list', require('./rooms-list'));
router.get('/app/room/:id/info', require('./room-info'));
router.get('/app/user/authorize', require('./user-authorize'));
router.post('/app/create-room', require('./room-create'));
router.post('/app/file-download', require('./file-download'));

module.exports = router;