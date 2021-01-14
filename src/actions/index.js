import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  SET_THEME_MODE,
  SET_USER_CONTACT_INFO,
  SET_USER_FULL_DETAILS,
  SET_USER_SKILLS,
  SET_USER_LANGUAGES,
  SET_USER_EMPLOYMENT,
  SET_USER_EDUCATION,
  SET_USERS_LIST,
  SET_USER_PROJECT,
} from '@constants/actionTypes'

/**
 * Set theme mode
 * @param {String} payload
 */
export const setThemeAction = (payload) => ({
  type: SET_THEME_MODE,
  payload,
})

/**
 * Set theme mode
 * @param {String} payload
 */
export const setLodingStatusAction = (payload) => {
  const loader = document.querySelector('.Loader')

  if (payload === true) {
    loader.classList.add('ShowLoader')
  } else {
    loader.classList.remove('ShowLoader')
  }
}

/**
 * Sets user info and token in the context store
 * @param {Object} payload The user login data
 */
export const userLoginSuccessAction = (payload) => ({
  type: USER_LOGIN_SUCCESS,
  payload,
})

/**
 * Sets user info and token in the context store
 * @param {Object} payload The user login data
 */
export const setUserContactInfoAction = (payload) => ({
  type: SET_USER_CONTACT_INFO,
  payload,
})

/**
 * Set user Skills
 * @param {Object} payload The user login data
 */
export const setUserSkillsAction = (payload) => ({
  type: SET_USER_SKILLS,
  payload,
})

/**
 * Set user Skills
 * @param {Object} payload The user login data
 */
export const setUserLanguagesAction = (payload) => ({
  type: SET_USER_LANGUAGES,
  payload,
})

/**
 * Set user Employment
 * @param {Object} payload The user login data
 */
export const setUserEmploymentAction = (payload) => ({
  type: SET_USER_EMPLOYMENT,
  payload,
})

/**
 * Set user Employment
 * @param {Object} payload The user login data
 */
export const setUserEducationAction = (payload) => ({
  type: SET_USER_EDUCATION,
  payload,
})

/**
 * Set user Project
 * @param {Object} payload The user login data
 */
export const setUserProjectAction = (payload) => ({
  type: SET_USER_PROJECT,
  payload,
})

/**
 * Sets user info and token in the context store
 * @param {Object} payload The user login data
 */
export const setUserFullDetailsAction = (payload) => ({
  type: SET_USER_FULL_DETAILS,
  payload,
})

/**
 * Sets user info and token in the context store
 * @param {Object} payload The user login data
 */
export const setUsersListAction = (payload) => ({
  type: SET_USERS_LIST,
  payload,
})

/**
 * Logs out the user. Removes user data from store
 */
export const userLogoutAction = () => ({
  type: USER_LOGOUT,
})
