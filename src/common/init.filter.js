/**
 * Created by senthil on 16/01/17.
 */

var renderConstants = require('../../src/common/render.constants');


exports.initValidation = function (req, res, next) {
    next();
    /*if (req.path.endsWith('auth') || req.path.endsWith('mappings') || req.session.user != null) {
        // Pass control to the next handler
        next();
    } else {
        // Redirects to Login Page
        res.render(renderConstants.LOGIN_PAGE, { layout: 'home-layout' });
    }*/
};