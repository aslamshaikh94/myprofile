import Axios from './axios'

/** Sign up user using user email, username, password
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.email
 * @param {string} payload.password
 */
export const callUserSignup = (payload) => {
  return Axios.post('/users/signup', payload)
}

/** Sign in user using user email, password
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */
export const callUserSignin = (payload) => {
  return Axios.post('/users/signin', payload)
}

/**  Check username is exist
 * @param {Object} payload
 * @param {string} payload.username
 */
export const callIsUsername = (payload) => {
  return Axios.get(`/users/${payload.username}`)
}

/**  Check username is exist

 */
export const callGetUserCout = () => {
  return Axios.get('/users/usercout')
}

/**  Set user contact information
 * @param {Object} payload
 */
export const callSetContactInfo = (payload) => {
  return Axios.post('/userdetails/contactinfo', payload)
}

/**  Get Full detail of user using username
 * @param {Object} payload
 * @param {string} payload.username
 */
export const callGetUserFullGetails = (payload) => {
  return Axios.get(`/userdetails/profile${payload.username}`)
}

/**  Get Full detail of user using username
 * @param {Object} payload
 * @param {string} payload.username
 */
export const callGetUsersList = (payload) => {
  return Axios.post(`/userdetails/userslist`)
}

/**  Set user skills
 * @param {Object} payload
 */
export const callSetUserSkills = (payload) => {
  return Axios.post('/userdetails/skills', payload)
}

/**  Get user skills
 * @param {Object} payload
 */
export const callGetUserSkills = (payload) => {
  return Axios.get('/userdetails/skills')
}

/**  Get user Languages
 * @param {Object} payload
 */
export const callSetUserLanguages = (payload) => {
  return Axios.post('/userdetails/languages', payload)
}

/**  Get user Languages
 * @param {Object} payload
 */
export const callSetUserEmployment = (payload) => {
  return Axios.post('/userdetails/employment', payload)
}

/**  Delete user Languages
 * @param {Object} payload
 * @param {Object} payload._id
 */
export const callDeleteUserEmployment = (payload) => {
  const { _id } = payload
  return Axios.delete(`/userdetails/employment/${_id}`)
}

/**  Set user Education
 * @param {Object} payload
 */
export const callSetUserEducation = (payload) => {
  return Axios.post('/userdetails/education', payload)
}

/**  Set user Education
 * @param {Object} payload
 */
export const callDeleteEducationAction = (payload) => {
  const { _id } = payload
  return Axios.delete(`/userdetails/education/${_id}`)
}

/**  Set user Education
 * @param {Object} payload
 */
export const callSetUserProjectAction = (payload) => {
  return Axios.post('/userdetails/project', payload)
}

/**  Check username is exist
 * @param {Object} payload
 * @param {string} payload.username
 */
export const callgetUserContactInfo = (payload) => {
  return Axios.get(`/userdetails`)
}
