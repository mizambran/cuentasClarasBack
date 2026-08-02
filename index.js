import Server from './src/server/config.js'
import router from './src/routes/index.routes.js'
import './src/server/dbConfig.js'

const server = new Server()

server.app.use("/api", router)

if(process.env.NODE_ENV !== 'production'){
    server.listen()
}

export default server.app