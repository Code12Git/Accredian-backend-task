const { responseManager , referralManager } = require('../services')

const create = async (request, response) => {
  try {
    const result = await referralManager.create(request.body);
    return responseManager.sendSuccessResponse(response, result, 'Referral Successfull.');
  } catch (err) {
    return responseManager.sendErrorResponse(response, err);
  }
};

module.exports = { create };

