import {connect} from "mongoose";

export const connectDB = async () => {
    try {
        await connect(`${process.env.DB_URI}`)
        console.log(`Db connected...`)
    } catch (e: any) {
        console.log(e.message)
        process.exit(1)
    }
}