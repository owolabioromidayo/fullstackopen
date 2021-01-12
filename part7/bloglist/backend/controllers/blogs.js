const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


blogsRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user')
   res.json(blogs)
   
})

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate('user')
   res.json(blog)
   
})


blogsRouter.post('/',  async (req, res, next) => {
    const user = await User.findById(req.body.user)
    const token = res.locals.token
    const decodedToken = jwt.verify(token, config.SECRET)

    if (!token || !decodedToken){
      res.status(401),json({err : "token missing or invalid"})
    }

    const blog = new Blog({
      title : req.body.title,
      author : req.body.author,
      user : user._id,
      url : req.body.url
    })

    const savedBlog  = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return res.status(201).json(savedBlog)
  })



blogsRouter.post('/:id/comments', async(req,res,next) => {
  let blog = await Blog.findById(req.params.id)
  blog.comments.push(req.body.comment)
  const savedBlog = await blog.save()
  return res.status(200).json(savedBlog)
})


// blogsRouter.post('/like', async (req,res,next) => {

//   const token = res.locals.token
//   const decodedToken = jwt.verify(token, config.SECRET)

//   if (!token || !decodedToken){
//     res.status(401),json({err : "token missing or invalid"})
//   }

//   let newBlog = Blog.findById(req.body.blogId)
//   newBlog.likes += 1
//   const savedBlog =  await newBlog.save()


// })


blogsRouter.put('/:id', async(req,res,next) => {
  const body = req.body
  const token = res.locals.token
  const decodedToken = jwt.verify(token, config.SECRET)

  if (!token || !decodedToken){
    res.status(401),json({err : "token missing or invalid"})
  }else{

  const blog = {
    user: body.user,
    title : body.title,
    author : body.author,
    url : body.url,
    likes : body.likes
    }
  console.log(blog)
  const updatedBlog = await Blog.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, blog , {new:true, runValidators:true})
  return res.json(updatedBlog)

  }

})


blogsRouter.delete('/:id', async(req,res,next) => {
    const token = res.locals.token
    const decodedToken = jwt.verify(token, config.SECRET)

    const blogToDelete = await Blog.findById(req.params.id).populate('user')

    if(!token || !decodedToken){
      res.status(401).json({err: "token missing or invalid"})
    }else if (blogToDelete.user._id.toString() !== decodedToken.id ){
      res.status(401).json({err: "unauthorized user"})
    }else{
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
    }

    next()

})



module.exports = blogsRouter