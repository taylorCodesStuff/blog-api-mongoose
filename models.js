"use strict";

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; 

let authorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName : {
        type: String,
        unique: true
    }
});

let commentSchema = mongoose.Schema({ content: String});

let blogPostSchema = mongoose.Schema({
   title: {type: String, required: true},
   content: {type: String},
   author: {
       firstName: String,
       lastName: String
   },
   created: {type: Date, default: Date.now} 
});

blogPostSchema.pre('find', function(next){
    this.populate('author');
    next();
});

blogPostSchema.pre('findOne', function(next){
    this.populate('author');
    next();
});

blogPostSchema.virtual("authorName").get(function(){
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.authorName,
        comments: this.comments
    };
};


// module.exports = mongoose.model('Post', blogPostSchema);

// module.exports = { Post };


let Author = mongoose.model('Author', authorSchema);
let Post = mongoose.model('Post', blogPostSchema);

module.exports = {Author, Post};
