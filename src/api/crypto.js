import crypto from 'crypto'

const enableEncryption = process.env.ENABLE_ENCRYPTION
const clientKey = process.env.CLIENT_KEY
const cleanKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n')

const generateRandomHexString = (size) => {
  return crypto.randomBytes(size / 2).toString('hex')
}

/**
 * Generates encrypted cipher text and IV
 * @param {Object} data The data to encrypt using the cipher
 */
const getCipherTextAndIV = (data) => {
  let encryptedClientKey, cipherText
  let iv = generateRandomHexString(16)
  let cipher = crypto.createCipheriv('aes-256-ctr', clientKey, iv)
  cipherText = cipher.update(JSON.stringify(data), 'utf8', 'hex')
  cipherText += cipher.final('hex')
  encryptedClientKey = crypto
    .publicEncrypt(cleanKey, Buffer.from(clientKey))
    .toString('hex')
  return { cipherText, encryptedClientKey, iv, clientKey }
}

//Decrypt your payload
const decryptPayload = (data) => {
  if (data) {
    const [payload, iv] = data.split('|')
    const decipher = crypto.createDecipheriv('aes-256-ctr', clientKey, iv)
    let dec = decipher.update(payload, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return JSON.parse(dec)
  }
  return data
}

/**
 * Encrpyts outgoing request payloads using the static CLIENT_KEY and
 * a dynamic IV.
 * In case of OCR if req.data is a FormData it got nullified due to
 * the creation of the cipher text and hence the if condition needs to be
 * added to preserve that data.
 * @param {Object} req The request object
 */
export const encryptRequest = (req) => {
  if (req && enableEncryption === 'Y') {
    let fd
    if (req.data instanceof FormData) {
      fd = req.data
    }
    const { cipherText, encryptedClientKey, iv } = getCipherTextAndIV(
      req.data || '',
    )
    const payload = {
      payload: cipherText,
    }
    req.headers['apptoken'] = `${encryptedClientKey}|${iv}`
    req.data = fd || payload
    return req
  } else return req
}

export const decryptResponse = (res) => {
  if (enableEncryption === 'Y') {
    return decryptPayload(res.data)
  } else {
    return res
  }
}
