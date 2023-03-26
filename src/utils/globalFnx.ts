// program to convert first letter of a string to uppercase
const capitalizeFirstLetter = (str: string): string => {
  // converting first letter to uppercase
  return str.charAt(0).toUpperCase() + str.slice(1)
}

//function to check if dates are equal
const isSameDate = (date1: Date, date2: Date): Boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export { capitalizeFirstLetter, isSameDate }
