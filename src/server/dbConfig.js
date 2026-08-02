import mongoose from "mongoose";

try {
    mongoose.connect(process.env.MONGODB).then(() => {
        console.info(`BD conectada!`)
    })
} catch (error) {
    console.error("No se pudo conectar la base", error)
}

export default mongoose