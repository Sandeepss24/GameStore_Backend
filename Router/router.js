// path to resolve client

// import express
const express = require('express')

// import controller
const userController = require('../Controller/userController')

// import middleWare
const jwtMiddleware = require('../Middlewares/jwtMiddleware')

// import multer
const multerMiddleware = require('../Middlewares/multerMiddleware')


// 2) create an object for the class

const router = new express.Router()

// 3) Path for resolving  a request

//     a) Register
router.post('/user/register', userController.register)