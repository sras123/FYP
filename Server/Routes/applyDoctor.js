const router = require('express').Router()
const psychCtrl = require('../controller/psychController')

router.route('/psych')
.get(psychCtrl.getApplication)
.post(psychCtrl.applyDoctor)

router.route('/psych/:id')
.delete(psychCtrl.deleteApplication)
.patch(psychCtrl.updatedoctorApplication)

module.exports = router