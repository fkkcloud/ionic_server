const User = require("../models/user");
const Company = require("../models/company");

exports.createCompany = async (req, res) => {

    if (req.body.name === undefined || req.body.address === undefined || req.body.city === undefined 
        || req.body.country === undefined || req.body.sector === undefined || req.body.website === undefined
        || req.body.userId === undefined)
    {
        return res.status(200).json({error:'You can not create company with empty data: Error(1023)'});
    }

    if (req.body.name === '' || req.body.address === '' || req.body.city === ''
        || req.body.country === '' || req.body.sector === '' || req.body.website === ''
        || req.body.userId === '')
    {
        return res.status(200).json({error:'You can not create company with empty data: Error(1024)'});
    }


    const newCompany = new Company();
    newCompany.companyName = req.body.name;
    newCompany.address = req.body.address;
    newCompany.city = req.body.city;
    newCompany.country = req.body.country;
    newCompany.sector = req.body.sector;
    newCompany.website = req.body.website;
    newCompany.admin = req.body.userId;    

    const company = await newCompany.save();

    return res.status(200).json({message:'Company created successfully.'});
}