const Post = require('../models/post');

exports.createThing = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
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
    Post.findOne({_id: req.params.id})
    .then(thing => {
        fs.unlink( () => {

            Post.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message:'objet supprimé!'}))
            .catch(error => res.status(404).json({error}));

        })
    })
    .catch(error => res.status(500).json({error}));

   
};

exports.getOneThing = (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}))
}

exports.getAllThings = (req, res, next) => {
    Post.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
  }