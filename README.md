# JWET (JWT with Encrypted Token)

A specialized JWT implementation that provides optional payload encryption before token generation. JWET enhances standard JWT security by allowing payload encryption before the token is created, making it ideal for sensitive data transmission.

## What makes JWET different?

Unlike standard JWT where the payload is only base64url encoded and can be easily decoded, JWET provides an option to encrypt the payload using HMAC-SHA256 before token generation. This adds an extra layer of security for sensitive data.

## Installation

```bash
npm install jwet
```

## Features

- ✨ Optional payload encryption using HMAC-SHA256
- 🔒 Standard JWT token creation and verification
- 🛡️ Custom base64url encoding implementation
- 🚀 Zero external dependencies
- 💪 Built on Node.js crypto module

## Usage

### Import the module

```javascript
const { createToken, verifyToken } = require('jwet');
```

### Create Tokens

#### Standard JWT Token (Without Payload Encryption)
```javascript
const secretKey = 'your-secret-key';
const payload = {
  userId: "123",
  role: "admin",
  exp: Date.now() + 3600000
};

const token = createToken(payload, secretKey);
// Result: header.payload.signature
```

#### Encrypted Payload Token (JWET)
```javascript
const secretKey = 'your-secret-key';
const payload = {
  userId: "123",
  role: "admin",
  exp: Date.now() + 3600000
};

const encryptedToken = createToken(payload, secretKey, true);
// Result: header.encryptedPayload.signature
```

### Verify Tokens

```javascript
const isValid = verifyToken(token, secretKey);
if (isValid) {
    console.log('Token is valid');
} else {
    console.log('Token verification failed');
}
```

## API Reference

### createToken(payload, secretKey[, toEncrypt])

Creates a token with optional payload encryption.

Parameters:
- `payload` (Object): The data to be encoded in the token
- `secretKey` (String): The secret key used for signing and encryption
- `toEncrypt` (Boolean, optional): When true, encrypts the payload before token creation. Defaults to false

Returns:
- (String): The generated token

### verifyToken(token, secretKey)

Verifies token authenticity.

Parameters:
- `token` (String): The token to verify
- `secretKey` (String): The secret key used during token creation

Returns:
- (Boolean): Token validity status

## Token Structure

### Standard Mode (toEncrypt = false)
```
header.payload.signature
```
- Header: Contains algorithm (HS256) and token type
- Payload: Base64url encoded JSON data
- Signature: HMAC-SHA256 hash of header and payload

### Encrypted Mode (toEncrypt = true)
```
header.encryptedPayload.signature
```
- Header: Contains algorithm (HS256) and token type
- EncryptedPayload: HMAC-SHA256 encrypted and base64url encoded data
- Signature: HMAC-SHA2
