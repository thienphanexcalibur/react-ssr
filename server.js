import express from 'express'
import React from 'react'

import * as ReactDOMServer from 'react-dom/server'
import App from './frontend/app.jsx'

import path from 'path'

const app = express()

app.use(express.static(path.resolve(__dirname, "./frontend/dist/assets")))


const htmlTemplate = function(root) {
  return`
  <!DOCTYPE HTML>
  <html>
    <head>
    </head>
    <body>
      <div id="app">${root}</div>
      <script src="index.js"></script>
    </body>
  </html>
  `
}


app.get("/", (req, res) => {
  //const stream = ReactDOMServer.renderToPipeableStream(<Layout/>, {
    //onShellReady() {
      //res.statusCode = 200
      //res.setHeader('Content-Type', 'text/html')
      //stream.pipe(res)
    //},
    //onShellError() {
      //res.statusCode = 500;
      //res.send('Error')
    //}
  //})
  const root = ReactDOMServer.renderToString(<App />)
  res.setHeader('Content-Type', 'text/html')
  res.end(htmlTemplate(root))
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log('SSR server start at ', PORT);
})

