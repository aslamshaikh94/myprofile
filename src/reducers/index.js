import {
  USER_LOGIN_SUCCESS,
  SET_THEME_MODE,
  SET_USER_CONTACT_INFO,
  SET_USER_FULL_DETAILS,
  SET_USER_SKILLS,
  SET_USER_LANGUAGES,
  SET_USER_EMPLOYMENT,
  SET_USER_EDUCATION,
  SET_USERS_LIST,
} from '@constants/actionTypes'

import { setAppStore } from '@store'

export const initialState = {
  loggedInUserData: {},
  usersList: [],
  userDetails: {
    contactInfo: {},
    educations: [],
    employments: [],
    languages: { languages: [] },
    skills: { skills: [] },
  },
  themeMode: 'dark',
  snackbarData: {
    visible: false,
    message: '',
    type: '',
  },
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  let updatedState
  switch (type) {
    case USER_LOGIN_SUCCESS:
      updatedState = { ...state, loggedInUserData: payload }
      break
    case SET_USER_FULL_DETAILS:
      updatedState = { ...state, userDetails: payload }
      break
    case SET_USER_CONTACT_INFO:
      updatedState = {
        ...state,
        userDetails: { ...state.userDetails, ...payload },
      }
      break
    case SET_USER_SKILLS:
      updatedState = {
        ...state,
        userDetails: { ...state.userDetails, ...payload },
      }
      break
    case SET_USER_LANGUAGES:
      updatedState = {
        ...state,
        userDetails: { ...state.userDetails, ...payload },
      }
      break
    case SET_USER_EMPLOYMENT:
      updatedState = {
        ...state,
        userDetails: { ...state.userDetails, ...payload },
      }
      break
    case SET_USER_EDUCATION:
      updatedState = {
        ...state,
        userDetails: { ...state.userDetails, ...payload },
      }
      break
    case SET_USERS_LIST:
      updatedState = { ...state, usersList: payload }
      break
    case SET_THEME_MODE:
      updatedState = { ...state, themeMode: payload }
      break
    default:
      updatedState = state
      break
  }
  setAppStore(updatedState)
  return updatedState
}
