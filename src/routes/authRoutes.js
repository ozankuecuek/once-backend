const express = require('express');
const { createOrganizationAndUser } = require('../controllers/authController');

const router = express.Router();

router.post('/create-organization-and-user', createOrganizationAndUser);

module.exports = router;
