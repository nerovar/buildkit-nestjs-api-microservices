import * as jwks from 'jwks-rsa';
import * as moment from 'moment';

export const getJwksKey = (header, callback) => {
    const jwksClient = jwks({ jwksUri: process.env.SSO_JWKS });
    jwksClient.getSigningKey(header.kid, (err, key: any) => {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    })
};

export const validateToken = (idToken) => {
    if (idToken == null) return false;
    switch (idToken) {
        case moment.utc().isBefore(moment.unix(idToken.iat)):
            return false
        case moment.utc().isBefore(moment.unix(idToken.nbf)):
            return false
        case moment.utc().isAfter(moment.unix(idToken.exp)):
            return false
        case idToken.tid !== process.env.SSO_TID:
            return false
        case idToken.aud !== process.env.SSO_CLIENT_ID:
            return false
        default:
            return true
    }
}