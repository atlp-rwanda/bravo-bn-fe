const loginValidation = (email, password) => {
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  emailError.style.display = 'none';
  passwordError.style.display = 'none';
  emailInput.style.border = '1px solid #ced4da';
  passwordInput.style.border = '1px solid #ced4da';

  if (email) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      emailError.style.display = 'block';
      emailError.innerHTML = 'Please enter a valid email';
      emailInput.style.border = '1px solid red';
      emailInput.focus();
      return false;
    }
  } else {
    emailError.style.display = 'block';
    emailError.innerHTML = 'Please enter your email';
    emailInput.style.border = '1px solid red';
    emailInput.focus();
    return false;
  }
  if (password) {
    if (password.length < 5) {
      passwordError.style.display = 'block';
      passwordError.innerHTML = 'Password must be at least 6 characters long';
      passwordInput.style.border = '1px solid red';
      passwordInput.focus();
      return false;
    }
  } else {
    passwordError.style.display = 'block';
    passwordError.innerHTML = 'Please enter your password';
    passwordInput.style.border = '1px solid red';
    passwordInput.focus();
    return false;
  }
  return true;
};
export default loginValidation;
