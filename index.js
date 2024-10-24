const crypto = require('crypto');

const header = {
    alg: "HS256",
    type: "JWT"
}

const payload = {
    name: "Hardik Srivastav",
    device: "RealmeC3"
}

const secretKey = "abcde";

//console.log(createToken(header, payload, secretKey))
//console.log(verifyToken("eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJuYW1lIjoiSGFyZGlrIFNyaXZhc3RhdiIsImRldmljZSI6IlJlYWxtZUMzIn0.a2b1407b7ed39cec6f82165c9028e7c591ab9a8d58bc9c9e85686fdc4505b205" , secretKey))

function createToken(header, payload, secretKey){
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url')
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')

    const hmac = crypto.createHmac('sha256', secretKey).update(encodedHeader + '.' + encodedPayload)
    const hmacDigest = hmac.digest('hex');

    return encodedHeader + '.' + encodedPayload + '.' + hmacDigest

}

function verifyToken(token, secretKey){

    const data = token.split(".");

    const hmac = crypto.createHmac('sha256', secretKey).update(data[0] + '.' + data[1])
    const hmacDigest = hmac.digest('hex');

    if(hmacDigest === data[2]){
        return true
    }

    return false;
}

exports.verifyToken = verifyToken
exports.createToken = createToken



