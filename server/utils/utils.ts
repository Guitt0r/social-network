import jwt from 'jsonwebtoken'



export const generateToken = (payload: object) => {
    return jwt.sign(payload, `${process.env.JWT_SECRET}`, {expiresIn: '1d'})

}
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, `${process.env.JWT_SECRET}`)
    } catch (e) {
        return null
    }
}