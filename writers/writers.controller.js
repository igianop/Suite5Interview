const mongoose = require('mongoose');
const WritersModel = require('./writers.model');
const { isNil, isEmpty } = require('lodash');


const WritersController = {
    async createWriter(req, res){
        const writer = new WritersModel({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        });

        await writer.save();
        return res.status(200).json({message: "Writer created", id: writer._id});
    },
    async updateWriter(req, res){
        const writer = await WritersModel.findByIdAndUpdate({ _id: req.params.id }, req.body );
        if(isNil(writer)){
            return res.status(404).json('Writer not found');
        }
        return res.status(200).json({message: "Writer updated", id: writer._id});
    },
    async deleteWriter(req, res){
        const writer = await WritersModel.findByIdAndDelete({ _id: req.params.id });
        if(isNil(writer)){
            return res.status(404).json('Writer not found');
        }
        return res.status(200).json("Writer deleted");
    },
    async findWriter(req, res){
        const writers = await WritersModel.findById( req.params.id )

        if(isNil(writers)){
            return res.status(404).json("Writer not found");
        }

        return res.status(200).json({message: 'Writer for specific id', writer: writers});
    },
    async findAllWriters(req, res){
        const page = Number.parseInt(req.query.page ? req.query.page : '0');
        const itemsPerPage = Number.parseInt(req.query.itemsPerPage ? req.query.itemsPerPage : '20');
        const writers = await WritersModel.find({})/*.sort({ updatedAt: -1}).limit(itemsPerPage).skip(itemsPerPage * page);*/

        if(isEmpty(writers)){
            return res.status(404).json("Writers not found");
        }

        return res.status(200).json({message:"You receive all writers", writers: writers});
    }
};

module.exports = WritersController;