import React, { createContext, ReactElement, useEffect, useState } from 'react'

interface ThemeContextValue {
  isDarkTheme: boolean
  toggleThemeHandler: () => void
}

const MyThemeContext = createContext<ThemeContextValue>({
  isDarkTheme: true,
  toggleThemeHandler: () => {},
})

interface ThemePropsInterface {
  children?: ReactElement | ReactElement[]
}

export function MyThemeContextProvider(props: ThemePropsInterface): ReactElement {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  useEffect(() => {
    initialThemeHandler()
  }, [])

  function initialThemeHandler(): void {
    const isDarkThemeFromLocalStorage = localStorage.getItem('isDarkTheme')
    const parsedIsDarkTheme = isDarkThemeFromLocalStorage
      ? JSON.parse(isDarkThemeFromLocalStorage)
      : null

    if (parsedIsDarkTheme !== null) {
      setIsDarkTheme(parsedIsDarkTheme)
      toggleDarkClassToBody(parsedIsDarkTheme)
    }
  }

  function toggleThemeHandler(): void {
    setIsDarkTheme((prevIsDarkTheme) => {
      const newIsDarkTheme = !prevIsDarkTheme
      toggleDarkClassToBody(newIsDarkTheme)
      setValueToLocalStorage(newIsDarkTheme)
      return newIsDarkTheme
    })
  }

  function toggleDarkClassToBody(isDark: boolean): void {
    document.body.classList.toggle('dark', isDark)
  }

  function setValueToLocalStorage(isDark: boolean): void {
    localStorage.setItem('isDarkTheme', JSON.stringify(isDark))
  }

  return (
    <MyThemeContext.Provider value={{ isDarkTheme, toggleThemeHandler }}>
      {props.children}
    </MyThemeContext.Provider>
  )
}

export default MyThemeContext
