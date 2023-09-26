exports.UserValidator = function(req, res, next){
    req.check('email', 'Invalid email.').isEmail();
    req.check('email', 'Email is required.').not().isEmpty();
    req.check('username', 'Username is required.').not().isEmpty();
    req.check('username', 'Username must be more than 1 characters').isLength({min:2});
    req.check('password', 'Password is required.').not().isEmpty();
    req.check('password', 'Password must be more than 6 characters').isLength({min:6});
    req.check('password_confirm', 'Password confirm is required.').not().isEmpty();
    req.check('password_confirm','Password mismatch').equals(req.body.password);
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.ProjectValidator = function(req, res, next){
    req.check('title_vi', 'Title VI is required.').not().isEmpty();
    req.check('sapo_vi', 'Sapo VI is required.').not().isEmpty();
    req.check('detail_vi', 'Detail VI is required.').not().isEmpty();
    req.check('title_en', 'Title EN is required.').not().isEmpty();
    req.check('detail_en', 'Detail EN is required.').not().isEmpty();
    req.check('sapo_en', 'Sapo EN is required.').not().isEmpty();
    req.check('title_vi', 'Title VI must be more than 6 characters').isLength({min: 6});
    req.check('sapo_vi', 'Sapo VI must be more than 6 characters').isLength({min: 6});
    req.check('detail_vi', 'Detail VI must be more than 6 characters').isLength({min: 6});
    req.check('title_en', 'Title EN must be more than 6 characters').isLength({min: 6});
    req.check('detail_en', 'Detail EN must be more than 6 characters').isLength({min: 6});
    req.check('sapo_en', 'Sapo EN must be more than 6 characters').isLength({min: 6});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.ServiceValidator = function(req, res, next){
    req.check('title_vi', 'Title VI is required.').not().isEmpty();
    req.check('sapo_vi', 'Sapo VI is required.').not().isEmpty();
    req.check('detail_vi', 'Detail VI is required.').not().isEmpty();
    req.check('title_en', 'Title EN is required.').not().isEmpty();
    req.check('detail_en', 'Detail EN is required.').not().isEmpty();
    req.check('sapo_en', 'Sapo EN is required.').not().isEmpty();
    req.check('title_vi', 'Title VI must be more than 6 characters').isLength({min: 6});
    req.check('sapo_vi', 'Sapo VI must be more than 6 characters').isLength({min: 6});
    req.check('detail_vi', 'Detail VI must be more than 6 characters').isLength({min: 6});
    req.check('title_en', 'Title EN must be more than 6 characters').isLength({min: 6});
    req.check('detail_en', 'Detail EN must be more than 6 characters').isLength({min: 6});
    req.check('sapo_en', 'Sapo EN must be more than 6 characters').isLength({min: 6});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.OutstandingValidator = function(req, res, next){
    req.check('title_vi', 'Title VI is required.').not().isEmpty();
    req.check('title_en', 'Title EN is required.').not().isEmpty();
    req.check('count', 'Count is required.').not().isEmpty();
    req.check('title_vi', 'Title VI must be more than 6 characters').isLength({min: 6});
    req.check('title_en', 'Title EN must be more than 6 characters').isLength({min: 6});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.InformationValidator = function(req, res, next){
    req.check('key', 'KEY is required.').not().isEmpty();
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.ActivityValidator = function(req, res, next){
    req.check('title_vi', 'Title VI is required.').not().isEmpty();
    req.check('sapo_vi', 'Sapo VI is required.').not().isEmpty();
    req.check('detail_vi', 'Detail VI is required.').not().isEmpty();
    req.check('title_en', 'Title EN is required.').not().isEmpty();
    req.check('detail_en', 'Detail EN is required.').not().isEmpty();
    req.check('sapo_en', 'Sapo EN is required.').not().isEmpty();
    req.check('title_vi', 'Title VI must be more than 6 characters').isLength({min: 6});
    req.check('sapo_vi', 'Sapo VI must be more than 6 characters').isLength({min: 6});
    req.check('detail_vi', 'Detail VI must be more than 6 characters').isLength({min: 6});
    req.check('title_en', 'Title EN must be more than 6 characters').isLength({min: 6});
    req.check('detail_en', 'Detail EN must be more than 6 characters').isLength({min: 6});
    req.check('sapo_en', 'Sapo EN must be more than 6 characters').isLength({min: 6});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.PartnerValidator = function(req, res, next){
    req.check('title', 'Title is required.').not().isEmpty();
    req.check('title', 'Title must be more than 3 characters').isLength({min: 3});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.ProgramValidator = function(req, res, next){
    req.check('title', 'Title is required.').not().isEmpty();
    req.check('title', 'Title must be more than 3 characters').isLength({min: 3});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.AchievementValidator = function(req, res, next){
    req.check('title', 'Title is required.').not().isEmpty();
    req.check('title', 'Title must be more than 3 characters').isLength({min: 3});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.CapacityValidator = function(req, res, next){
    req.check('title_vi', 'Title VI is required.').not().isEmpty();
    req.check('detail_vi', 'Detail VI is required.').not().isEmpty();
    req.check('title_en', 'Title EN is required.').not().isEmpty();
    req.check('detail_en', 'Detail EN is required.').not().isEmpty();
    req.check('title_vi', 'Title VI must be more than 6 characters').isLength({min: 6});
    req.check('detail_vi', 'Detail VI must be more than 6 characters').isLength({min: 6});
    req.check('title_en', 'Title EN must be more than 6 characters').isLength({min: 6});
    req.check('detail_en', 'Detail EN must be more than 6 characters').isLength({min: 6});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.RatingValidator = function(req, res, next){
    req.check('name_vi', 'Name VI is required.').not().isEmpty();
    req.check('review_vi', 'Review VI is required.').not().isEmpty();
    req.check('name_en', 'Name EN is required.').not().isEmpty();
    req.check('review_en', 'Review EN is required.').not().isEmpty();
    req.check('name_vi', 'Name VI must be more than 6 characters').isLength({min: 3});
    req.check('review_en', 'Review VI must be more than 6 characters').isLength({min: 3});
    req.check('name_en', 'Name EN must be more than 6 characters').isLength({min: 3});
    req.check('review_en', 'Review EN must be more than 6 characters').isLength({min: 3});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}

exports.TeamValidator = function(req, res, next){
    req.check('name', 'Name is required.').not().isEmpty();
    req.check('name', 'Name must be more than 3 characters').isLength({min: 3});
    
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.send({
            status: 400,
            success: false,
            results: {
                message: firstError
            }
        });
    }
    next();
}