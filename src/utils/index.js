import { getAppStore } from '@store'

import { MONTH_SHORT_NAME } from '@constants'

export const setThemeMode = (themeMode) => {
  if (themeMode === 'dark') {
    document.documentElement.style.setProperty('--bgcolor', '#131c20')
    document.documentElement.style.setProperty('--textcolor', '#c1baba')
    document.documentElement.style.setProperty('--bordercolor', '#44494c')
    document.documentElement.style.setProperty('--reversebg', '#fff')
  } else {
    document.documentElement.style.setProperty('--bgcolor', '#fff')
    document.documentElement.style.setProperty('--textcolor', '#000')
    document.documentElement.style.setProperty('--bordercolor', '#424d521a')
    document.documentElement.style.setProperty('--reversebg', '#131c20')
  }
}

export const isUserLoggedIn = () => {
  const { loggedInUserData = {} } = getAppStore()
  return Object.keys(loggedInUserData).length
}

export const dateWithMonthName = (date) => {
  const monthYear = new Date(date)

  return monthYear.toLocaleDateString(undefined, {
    month: 'short',
    year: 'numeric',
  })
}
