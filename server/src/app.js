import express from 'express'
import categoria_routes from '../routes/categoria_routes.js'
const app =express()

app.use(express.json())

app.use(categoria_routes)
export default app;
