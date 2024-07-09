const _ = require('lodash')
const {BAD_REQUEST} = require('../utils/errors')
const { AppError } = require('../utils')
const prisma = require('../plugins/connection')
const sendReferrerEmail = require('./EmailManager')

const create = async(body) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail } = body;
    try{
        if(_.isEmpty(referrerName) || _.isEmpty(referrerEmail) || _.isEmpty(refereeName) || _.isEmpty(refereeEmail)){
            const error = {...BAD_REQUEST , message:"All fields are required"}
            throw new AppError(error.code, error.message,error.statusCode)
        }
        const referral = await prisma.referral.create({
            data: { referrerName , referrerEmail , refereeName , refereeEmail }
        })
        sendReferrerEmail( referrerEmail, refereeName )
        return referral;
    } catch(err){
        throw err;
    }
}

module.exports = { create };