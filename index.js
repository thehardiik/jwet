
const {verifyToken, createToken} = require('./jwetFunctions')


const header = {
    alg: "HS256",
    type: "JWT"
}

const payload = {
    name: "Hardik Srivastav",
    device: "RealmeC3"
}

const secretKey = "abcde";
const token = "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJuYW1lIjoiSGFyZGlrIFNyaXZhc3RhdiIsImRldmljZSI6IlJlYWxtZUMzIn0.YTJiMTQwN2I3ZWQzOWNlYzZmODIxNjVjOTAyOGU3YzU5MWFiOWE4ZDU4YmM5YzllODU2ODZmZGM0NTA1YjIwNQ"
console.log(createToken(payload, secretKey, true))
//console.log(verifyToken(token , secretKey))
//console.log(base64encoding(header))



exports.verifyToken = verifyToken
exports.createToken = createToken



