const crypto = require('crypto');

// Function To Create Token
function createToken(payload, secretKey, toEncrypt = false){
    const header = {
        alg: "HS256",
        type: "JWT"
    }
    
    const encodedHeader = base64urlencoding(Buffer.from(JSON.stringify(header)))
    let encodedPayload = base64urlencoding(Buffer.from(JSON.stringify(payload)))

    if(toEncrypt){
        const hmacPayload = crypto.createHmac('sha256', secretKey).update(encodedPayload)
        const hmacDigestPayload = hmacPayload.digest('hex');
        encodedPayload = base64urlencoding(Buffer.from(hmacDigestPayload))
    }

    const hmac = crypto.createHmac('sha256', secretKey).update(encodedHeader + '.' + encodedPayload)
    const hmacDigest = hmac.digest('hex');
    const encodedSignature = base64urlencoding(Buffer.from(hmacDigest))

    return encodedHeader + '.' + encodedPayload + '.' + encodedSignature
}


// Function To Verify Token
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

//Function To Decode Payload


// URL ENCODING
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

    return encodedObject
}

exports.verifyToken = verifyToken
exports.createToken = createToken