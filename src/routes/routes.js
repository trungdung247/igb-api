const express = require('express');
const router = express.Router();
const {
    UserValidator, ProjectValidator, OutstandingValidator, ServiceValidator, 
    InformationValidator, ActivityValidator, PartnerValidator, ProgramValidator,
    AchievementValidator, CapacityValidator, RatingValidator, TeamValidator
} = require('../validators/validator');
const {register, login, logout} = require('../controllers/UserControllers');
const {uploadImage} = require('../controllers/ImageControllers');
const {getConfig} = require('../controllers/MainControllers');
const {
    createInformation, listInformationAdmin, 
    detailInformationAdmin, editInformation
} = require('../controllers/InformationControllers');
const {
    listProject, listProjectAdmin, 
    detailProject, detailProjectAdmin,
    createProject, editProject, deleteProject
} = require('../controllers/ProjectControllers');
const {
    listService, listServiceAdmin, 
    detailService, detailServiceAdmin,
    createService, editService, deleteService
} = require('../controllers/ServiceControllers');
const {
    listOutstanding, listOutstandingAdmin, 
    detailOutstandingAdmin, createOutstanding, 
    editOutstanding, deleteOutstanding
} = require('../controllers/OutstandingControllers');
const {
    listActivity, listActivityAdmin, 
    detailActivity, detailActivityAdmin,
    createActivity, editActivity, deleteActivity
} = require('../controllers/ActivityControllers');
const {
    listPartner, listPartnerAdmin, detailPartnerAdmin,
    createPartner, editPartner, deletePartner
} = require('../controllers/PartnerControllers');
const {
    listProgram, listProgramAdmin, 
    detailProgramAdmin, createProgram, 
    editProgram, deleteProgram
} = require('../controllers/ProgramControllers');
const {
    listAchievement, listAchievementAdmin, 
    detailAchievementAdmin, createAchievement, 
    editAchievement, deleteAchievement
} = require('../controllers/AchievementControllers');
const {
    listCapacity, listCapacityAdmin, 
    detailCapacityAdmin, createCapacity, 
    editCapacity, deleteCapacity
} = require('../controllers/CapacityControllers');
const {
    listRating, listRatingAdmin, 
    detailRatingAdmin, createRating, 
    editRating, deleteRating
} = require('../controllers/RatingControllers');
const {
    listTeam, listTeamAdmin, detailTeamAdmin,
    createTeam, editTeam, deleteTeam
} = require('../controllers/TeamControllers');

// ------ Config multer ---------
const multer = require("multer");
const { multerStorage, multerFilter } = require('../../config/configMulter');
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
// ------------------------------

// ----- API User -----
function requiresLogout(req, res, next){
    if (req.session && req.session.user) {
        return res.send({
            status: res.statusCode,
            success: false,
            results: {
                data: null,
                message: 'You must be Logout in to Login continue',
            }
        });      
    } else {
        return next();
    }
}

function requiresLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.send({
            status: res.statusCode,
            success: false,
            results: {
                data: null,
                message: 'You must be logged in to view this page.',
            }
        });  
    }
}

router.post('/register', UserValidator, register);
router.post('/login', requiresLogout, login);
router.get('/logout', requiresLogin, logout);
// --------------------

// ----- API Upload -----
function requiresUploadImage(req, res, next) {
    upload.single("image")(req, res, function (err) {
        if (err) {
            return res.send({
                status: 500,
                success: false,
                results: {
                    data: null,
                    message: (err instanceof multer.MulterError ? multer.MulterError : "Error: You not Upload Image!!")
                }
            });
        }
        return next();
    })
}

router.post('/upload-image', requiresUploadImage, uploadImage);
// ------------------------

// ------- API Main -----------
router.get('/get-config', getConfig);
// ----------------------------

// ------------ API Information ---------
router.post('/create-information', requiresLogin, InformationValidator, createInformation);
router.get('/admin-information', requiresLogin, listInformationAdmin);
router.get('/admin-detail-information',requiresLogin, detailInformationAdmin);
router.post('/edit-information', requiresLogin, editInformation);
// -----------------------------------

// ------------ API Project ---------
router.get('/project', listProject);
router.get('/detail-project', detailProject);
router.get('/admin-project', requiresLogin, listProjectAdmin);
router.get('/admin-detail-project',requiresLogin, detailProjectAdmin);
router.post('/create-project', requiresLogin, ProjectValidator, createProject);
router.post('/edit-project', requiresLogin, ProjectValidator, editProject);
router.post('/delete-project', requiresLogin, deleteProject);
// -----------------------------------

// ------------ API Service ---------
router.get('/service', listService);
router.get('/detail-service', detailService);
router.get('/admin-service', requiresLogin, listServiceAdmin);
router.get('/admin-detail-service',requiresLogin, detailServiceAdmin);
router.post('/create-service', requiresLogin, ServiceValidator, createService);
router.post('/edit-service', requiresLogin, ServiceValidator, editService);
router.post('/delete-service', requiresLogin, deleteService);
// -----------------------------------

// ------------ API Outstanding ---------
router.get('/outstanding', listOutstanding);
router.get('/detail-outstanding', detailOutstandingAdmin);
router.get('/admin-outstanding', requiresLogin, listOutstandingAdmin);
router.post('/create-outstanding', requiresLogin, OutstandingValidator, createOutstanding);
router.post('/edit-outstanding', requiresLogin, OutstandingValidator, editOutstanding);
router.post('/delete-outstanding', requiresLogin, deleteOutstanding);
// --------------------------------------

// ------------ API Activity ---------
router.get('/activity', listActivity);
router.get('/detail-activity', detailActivity);
router.get('/admin-activity', requiresLogin, listActivityAdmin);
router.get('/admin-detail-activity', requiresLogin, detailActivityAdmin);
router.post('/create-activity', requiresLogin, ActivityValidator, createActivity);
router.post('/edit-activity', requiresLogin, ActivityValidator, editActivity);
router.post('/delete-activity', requiresLogin, deleteActivity);
// -----------------------------------

// ------------ API Partner ---------
router.get('/partner', listPartner);
router.get('/admin-partner', requiresLogin, listPartnerAdmin);
router.get('/admin-detail-partner', requiresLogin, detailPartnerAdmin);
router.post('/create-partner', requiresLogin, PartnerValidator, createPartner);
router.post('/edit-partner', requiresLogin, PartnerValidator, editPartner);
router.post('/delete-partner', requiresLogin, deletePartner);
// -----------------------------------

// ------------ API Program ---------
router.get('/program', listProgram);
router.get('/admin-program', requiresLogin, listProgramAdmin);
router.get('/admin-detail-program', requiresLogin, detailProgramAdmin);
router.post('/create-program', requiresLogin, ProgramValidator, createProgram);
router.post('/edit-program', requiresLogin, ProgramValidator, editProgram);
router.post('/delete-program', requiresLogin, deleteProgram);
// -----------------------------------

// ------------ API Achievement ---------
router.get('/achievement', listAchievement);
router.get('/admin-achievement', requiresLogin, listAchievementAdmin);
router.get('/admin-detail-achievement', requiresLogin, detailAchievementAdmin);
router.post('/create-achievement', requiresLogin, AchievementValidator, createAchievement);
router.post('/edit-achievement', requiresLogin, AchievementValidator, editAchievement);
router.post('/delete-achievement', requiresLogin, deleteAchievement);
// -----------------------------------

// ------------ API Capacity ---------
router.get('/capacity', listCapacity);
router.get('/admin-capacity', requiresLogin, listCapacityAdmin);
router.get('/admin-detail-capacity', requiresLogin, detailCapacityAdmin);
router.post('/create-capacity', requiresLogin, CapacityValidator, createCapacity);
router.post('/edit-capacity', requiresLogin, CapacityValidator, editCapacity);
router.post('/delete-capacity', requiresLogin, deleteCapacity);
// -----------------------------------

// ------------ API Rating ---------
router.get('/rating', listRating);
router.get('/admin-rating', requiresLogin, listRatingAdmin);
router.get('/admin-detail-rating', requiresLogin, detailRatingAdmin);
router.post('/create-rating', requiresLogin, RatingValidator, createRating);
router.post('/edit-rating', requiresLogin, RatingValidator, editRating);
router.post('/delete-rating', requiresLogin, deleteRating);
// -----------------------------------

// ------------ API Team ---------
router.get('/team', listTeam);
router.get('/admin-team', requiresLogin, listTeamAdmin);
router.get('/admin-detail-team', requiresLogin, detailTeamAdmin);
router.post('/create-team', requiresLogin, TeamValidator, createTeam);
router.post('/edit-team', requiresLogin, TeamValidator, editTeam);
router.post('/delete-team', requiresLogin, deleteTeam);
// -----------------------------------


// ------ API Check Url found --------
router.all("*", function (req, res) {
    return res.send({
        status: 404,
        success: false,
        results: {
            data: null,
            message: "Page not found"
        }
    });
});

module.exports = router;