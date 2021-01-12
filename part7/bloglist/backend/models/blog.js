const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {type: String, required:true},
  author: {type: String, required:true},
  url: String,
  likes: {type: Number, default : 0 },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  comments: [String]
})


blogSchema.set('toJSON', {
  transform : (document,  returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)