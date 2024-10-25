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
const token = "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJuYW1lIjoiSGFyZGlrIFNyaXZhc3RhdiIsImRldmljZSI6IlJlYWxtZUMzIn0.YTJiMTQwN2I3ZWQzOWNlYzZmODIxNjVjOTAyOGU3YzU5MWFiOWE4ZDU4YmM5YzllODU2ODZmZGM0NTA1YjIwNQ"
console.log(createToken(payload, secretKey))
//console.log(verifyToken(token , secretKey))
//console.log(base64encoding(header))

function createToken(payload, secretKey){
    const header = {
        alg: "HS256",
        type: "JWT"
    }
    
    const encodedHeader = base64urlencoding(Buffer.from(JSON.stringify(header)))
    const encodedPayload = base64urlencoding(Buffer.from(JSON.stringify(payload)))

    const hmac = crypto.createHmac('sha256', secretKey).update(encodedHeader + '.' + encodedPayload)
    const hmacDigest = hmac.digest('hex');
    const mySignature = base64urlencoding(Buffer.from(hmacDigest))

    console.log(mySignature)
    console.log(encodedSignature)

    return encodedHeader + '.' + encodedPayload + '.' + encodedSignature
}

function verifyToken(token, secretKey){

    const data = token.split(".");
    const hmac = crypto.createHmac('sha256', secretKey).update(data[0] + '.' + data[1])
    const hmacDigest = hmac.digest('hex');
    const encodedSignature = base64urlencoding(Buffer.from(hmacDigest))

    if(encodedSignature === data[2]){
        return true
    }

    return false;
}

function base64urlencoding(byte){
    
    const binary = Array.from(byte)
    .map(byte => byte.toString(2).padStart(8, '0')) 
    .join('');

    let encodedObject = ""

    for(let i = 0; i < binary.length; i = i+6){
        let num = parseInt(binary.substring(i, i+6).padEnd(6, '0') , 2)
        
        if(num <= 25 && num >= 0){
            num = num + 'A'.charCodeAt(0)
            encodedObject = encodedObject + String.fromCharCode(num);
        }

        if(num <= 51 && num >= 26){
            num = num + 'a'.charCodeAt(0) - 26
            encodedObject = encodedObject + String.fromCharCode(num);
        }

        if(num <= 61 && num >= 52){
            num = num + '0'.charCodeAt(0) - 52
            encodedObject = encodedObject + String.fromCharCode(num);
        }

        if(num == 62){
            encodedObject = encodedObject + '-'
        }

        if(num == 63){
            encodedObject = encodedObject + '_'
        }

        
    }

    // while (encodedObject.length % 4 !== 0) {
    //     encodedObject += '=';
    // }

    return encodedObject
}

exports.verifyToken = verifyToken
exports.createToken = createToken



