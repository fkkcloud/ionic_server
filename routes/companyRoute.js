const express = require('express');
const router = express.Router();
const CompanyCtrl = require('../controllers/companyCtrl');

router.post('/company/create', CompanyCtrl.createCompany)

module.exports = router;