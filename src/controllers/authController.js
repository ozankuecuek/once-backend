const { createOrganization, createUser } = require('../services/auth0Service');

async function createOrganizationAndUser(req, res) {
  try {
    const { organizationName, userEmail, userPassword } = req.body;

    const organization = await createOrganization(organizationName);
    const user = await createUser(userEmail, userPassword, organization.id);

    res.status(201).json({ organization, user });
  } catch (error) {
    console.error('Error in createOrganizationAndUser:', error);
    res.status(500).json({ error: 'An error occurred while creating the organization and user', details: error.message });
  }
}

module.exports = { createOrganizationAndUser };
