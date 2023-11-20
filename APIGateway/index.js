const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const {createProxyMiddleware} = require('http-proxy-middleware')
const axios = require('axios')

const app = express()

const port =3005
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000,
	limit: 5
})


app.use(morgan('combined'))
// app.use(limiter)

app.use('/bookingservice',async (req,res,next)=>{
  try {
    console.log()
    const response = await axios.get('http://localhost:3001/api/v1/isAuth',{
      headers:{
        'x-access-token': req.rawHeaders[1]
      }
    })
    if(!response.data.success){
      return res.status(401).json({
      message:'Unauthenticated'
    })
  }
  next()
    
  } catch (error) {
    console.log('hello')
  }
})

app.use('/bookingservice',createProxyMiddleware({target: 'http://localhost:3002', changeOrigin: true}))

app.get('/home',(req,res)=>{
  return res.json({message: 'Ok'})
})


app.listen(port,()=>{
  console.log('Server started at port 3005')
})