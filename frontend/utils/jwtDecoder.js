const DecodeJwtTokenPayload = async (token) =>
{
const [decodedHeader, decodedPayload, signature] = token.split('.')
const [header, payload] = [decodedHeader, decodedPayload].map(DecodeTokenComponent)
return payload
}

const DecodeTokenComponent = (value) =>
{
const buff = new Buffer(value, 'base64')
const text = buff.toString('ascii')
return JSON.parse(text)
}

export default DecodeJwtTokenPayload