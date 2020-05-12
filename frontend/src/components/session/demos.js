const demoUser = {
  email: 'demo@user.com',
  pass: '12345678'
}

const demoArtist = {
  email: 'demo@artist.com',
  pass: '12345678'
}

export const demo = (formType, loginFunc) => {

  const info = formType === "userLogin" ? demoUser : demoArtist;

  const eInput = document.getElementById('email-hook');
  const pInput = document.getElementById('password-hook');
  let ei = 0;
  let pi = 0;

  const typeEmail = () => {
    if (ei <= info.email.length) {
      eInput.value = info.email.substr(0, ei++);
      setTimeout(() => typeEmail(), 75);
    } else typePass()
  }

  const typePass = () => {
    if (pi <= info.pass.length) {
      pInput.value = info.pass.substr(0, pi++);
      setTimeout(() => typePass(), 75);
    } else {
      loginFunc({
        email: info.email,
        password: info.pass
      })
    }
  }

  typeEmail();
}