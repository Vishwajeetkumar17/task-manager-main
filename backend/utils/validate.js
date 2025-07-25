function validateEmail(email){
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
}
function validatePassword(password) {
  return typeof password === 'string' && password.trim().length >= 6;
}


module.exports = {
    validateEmail,
    validatePassword
}