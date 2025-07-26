const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const telephoneInput = document.getElementById('telephone')
const emailInput = document.getElementById('email')

/**
 *
 * FORMATTING FUNCTIONS
 *
 */

const formatTelephone = (text) => {
  //remove all non-digit characters and anything written after the 10th digit
  const cleanedText = text.replace(/\D/g, '').substring(0, 10)

  //touch area code, middle digits, and last digits
  const areaCode = cleanedText.substring(0, 3)
  const middle = cleanedText.substring(3, 6)
  const last = cleanedText.substring(6, 10)

  if (cleanedText.length > 6) {
    return `(${areaCode}) ${middle}-${last}`
  } else if (cleanedText.length > 3) {
    return `(${areaCode}) ${middle}`
  } else if (cleanedText.length > 0) {
    return `(${areaCode})`
  } else {
    return ''
  }
}

/**
 *
 * VALIDATORS
 *
 */

// Can only contain letters a-z in lowercase
const isValidUsername = (username) => {
  return /^[a-z]+$/.test(username)
}

// Must contain a lowercase, uppercase letter and a number (used lookahead) - I also required it to have at least 8 characters because password
const isValidPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
}

// The telephone number must be in the format of (555) 555-5555
const isValidTelephone = (telephone) => {
  const formatted = formatTelephone(telephone)
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(formatted)
}

// Must be a valid email address
const isValidEmail = (email) => {}

/**
 *
 * SET UP EVENTS
 *
 */

const showOrHideTip = (show, element) => {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = 'inherit'
  } else {
    element.style.display = 'none'
  }
}

const createListener = (validator) => {
  return (e) => {
    const text = e.target.value
    const valid = validator(text)
    const showTip = text !== '' && !valid
    const tooltip = e.target.nextElementSibling
    showOrHideTip(showTip, tooltip)
  }
}

usernameInput.addEventListener('input', createListener(isValidUsername))

passwordInput.addEventListener('input', createListener(isValidPassword))

telephoneInput.addEventListener('input', createListener(isValidTelephone))

emailInput.addEventListener('input', createListener(isValidEmail))
