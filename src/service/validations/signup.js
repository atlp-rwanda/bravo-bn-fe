

export const signupValidation = (email, password,repeatPassword,phoneNumber,username,firstName,lastName,gender) => {

  const emailError = document.getElementById('email-error');
const emailInput = document.getElementById('email');
const passwordError = document.getElementById('password-error');
const passwordInput = document.getElementById('password');
const repeatpasswordError = document.getElementById('repeatpassword-error');
const repeatpasswordInput = document.getElementById('repeatpassword');
const firstnameError = document.getElementById('firstname-error');
const firstnameInput = document.getElementById('firstname');
const lastnameError = document.getElementById('lastname-error');
const lastnameInput = document.getElementById('lastname');
const usernameError = document.getElementById('username-error');
const usernameInput = document.getElementById('username');
const phonenumberError = document.getElementById('phonenumber-error');
const phonenumberInput = document.getElementById('phonenumber');
const genderError = document.getElementById('gender-error');
const genderInput = document.getElementById('gender');

emailError.style.display = 'none';
emailInput.style.border = '1px solid #ced4da';

passwordError.style.display = 'none';
passwordInput.style.border = '1px solid #ced4da';

repeatpasswordError.style.display = 'none';
repeatpasswordInput.style.border = '1px solid #ced4da';

firstnameError.style.display = 'none';
firstnameInput.style.border = '1px solid #ced4da';

lastnameError.style.display = 'none';
lastnameInput.style.border = '1px solid #ced4da';

usernameError.style.display = 'none';
usernameInput.style.border = '1px solid #ced4da';

phonenumberError.style.display = 'none';
phonenumberInput.style.border = '1px solid #ced4da';

genderError.style.display = 'none';
genderInput.style.border = '1px solid #ced4da';

  if (email.trim()) {
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
  if (password.trim()) {
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
  if (repeatPassword.trim()) {
    if (password != repeatPassword) {
      repeatpasswordError.style.display = 'block';
      repeatpasswordError.innerHTML = 'Your passwords does not match';
      repeatpasswordInput.style.border = '1px solid red';
      repeatpasswordInput.focus();
      return false;
    }
  } else {
    repeatpasswordError.style.display = 'block';
    repeatpasswordError.innerHTML = 'Please repeat your password';
    repeatpasswordInput.style.border = '1px solid red';
    repeatpasswordInput.focus();
    return false;
  }
  if (`${phoneNumber}`.length !=10) {
    phonenumberError.style.display = 'block';
    phonenumberError.innerHTML = 'Phone number must have 10 digits.';
    phonenumberInput.style.border = '1px solid red';
    phonenumberInput.focus();
    return false;
  }

  if (!username.trim()) {
    usernameError.style.display = 'block';
    usernameError.innerHTML = 'Please enter username';
    usernameInput.style.border = '1px solid red';
    usernameInput.focus();
    return false;
  }
if (!lastName.trim()) {
    lastnameError.style.display = 'block';
    lastnameError.innerHTML = 'Please enter your last name';
    lastnameInput.style.border = '1px solid red';
    lastnameInput.focus();
    return false;
  }
if (!firstName.trim()) {
    firstnameError.style.display = 'block';
    firstnameError.innerHTML = 'Please enter first name';
    firstnameInput.style.border = '1px solid red';
    firstnameInput.focus();
    return false;
  }

  if (gender == "select") {
      genderError.style.display = 'block';
      genderError.innerHTML = 'Please choose gender';
      genderInput.style.border = '1px solid red';
      genderInput.focus();
      return false;
    }
  

  return true;
};

export const responseValidator = (identify,message) =>{

  const emailError = document.getElementById('email-error');
const emailInput = document.getElementById('email');
const passwordError = document.getElementById('password-error');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const phonenumberError = document.getElementById('phonenumber-error');
const phonenumberInput = document.getElementById('phonenumber');
const usernameError = document.getElementById('username-error');

emailError.style.display = 'none';
emailInput.style.border = '1px solid #ced4da';

passwordError.style.display = 'none';
passwordInput.style.border = '1px solid #ced4da';

usernameError.style.display = 'none';
usernameInput.style.border = '1px solid #ced4da';

phonenumberError.style.display = 'none';
phonenumberInput.style.border = '1px solid #ced4da';

  switch(identify){
    case "username":
      usernameError.style.display = 'block';
usernameError.innerHTML = message;
usernameInput.style.border = '1px solid red';
usernameInput.focus();
      break;
    case "phoneNumber":
      phonenumberError.style.display = 'block';
      phonenumberError.innerHTML = message;
      phonenumberInput.style.border = '1px solid red';
      phonenumberInput.focus();
      break;
    case "password":
      passwordError.style.display = 'block';
      passwordError.innerHTML = message;
      passwordInput.style.border = '1px solid red';
      passwordInput.focus();
      break;
    case "email":
      emailError.style.display = 'block';
      emailError.innerHTML = message;
      emailInput.style.border = '1px solid red';
      emailInput.focus();
      break;
    default: "";
      break;
  }
}
