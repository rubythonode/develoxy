const Router = require('koa-router');

const router = new Router();

const controller = require('./controller');

// const controller = require('./auth.controller');
// router.get('/', (ctx, next) => {
//     ctx.body = 'something'
// });

router.post('/', controller.create);


module.exports = router;