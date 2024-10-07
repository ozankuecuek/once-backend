require('dotenv').config();
const { ManagementClient } = require('auth0');

console.log('Environment variables:', {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE
});

const managementClient = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  scope: 'create:organizations create:users',
});

async function createOrganization(name) {
  try {
    const organization = await managementClient.organizations.create({ name });
    return organization;
  } catch (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
}

async function createUser(email, password, organizationId) {
  try {
    const user = await managementClient.users.create({
      email,
      password,
      connection: 'Username-Password-Authentication',
    });

    await managementClient.organizations.addMembers(
      { id: organizationId },
      { members: [user.user_id] }
    );

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

module.exports = { createOrganization, createUser };
