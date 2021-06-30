const Post = require('../models/post');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.createThing = (req, res, next) => {
    const postObject = req.body;
    console.log(postObject)
    delete postObject._id;
    const post = new Post({
        ...postObject
    });
    post.save()
    .then(() => res.status(201).json({message: 'Objet enregistré!'}))
    .catch(error => res.status(400).json({error}));
};

exports.modifyThing = (req,res,next) =>{
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.post),
    }:{ ...req.body};
    Post.updateOne ({_id: req.params.id}, {...postObject, _id: req.params.id })
    .then(() => res.status(200).json({message: 'objet modifié!'}))
    .catch(error => res.status(400).json({error}))
    
};

exports.deleteThing = (req, res, next) => {
    console.log(req.params.id)
    Post.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message:'objet supprimé!'}))
        .catch(error => res.status(404).json({error}));

   
};

exports.getOneThing = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}))
}

exports.getAllThings = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Post.find({userId: userId })
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
  }



exports.getMyThings = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Post.find({userId: userId })
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
  }

 // exports.getAllThings = (req, res, next) => {
 //   Post.find()
 //   .then(things => res.status(200).json(things))
 //   .catch(error => res.status(400).json({error}));
 // }