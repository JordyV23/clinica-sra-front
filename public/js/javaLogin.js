const vec = ["Keylortrejos@gmail.com", "KTC123"];
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btn = document.querySelector("#iniciar");
const eyePassd = document.querySelector("#eye");
const btnGoogle = document.querySelector("#btnGoogle");

// get, post, delete, put
// get->te jala datos
// post->enviar datos
// delete->elimina
// put->actualizar
// post = login
// https://clinica.onrender.com/login
// https://clinica.onrender.com/register
validarCorreo();

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  await axios
    .post("https://clinica.onrender.com/clinica/login", {
      email: email.value,
      password: password.value,
    })
    .then((result) => {
      const { data } = result;
      let token = data.token;
      let rol = data.rol;
      localStorage.setItem("rol", rol);
      localStorage.setItem("token", token);
      mostrarHtml(data.success);
    })
    .catch((result) => {
      console.log(result);
      const { response } = result;
      const { data } = response;
      mostrarHtml(data.success);
    });
});

function mostrarHtml(estado) {
  if (estado === true) {
    window.open("./home.html", "_self");
  }
  if (estado === false) {
    window.alert("Email o Password incorrecto.");
  }
}
btnGoogle.addEventListener("click", () => {
  btnGoogle.href = "public/codigo.html";
});

function validarCorreo() {
  email.addEventListener("input", (e) => {
    campo = e.target;
    emailRex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRex.test(campo.value)) {
      email.style.borderBottom = "2px solid rgb(3, 3, 3)";
    } else {
      email.style.borderBottom = "2px solid rgb(239, 24, 24)";
    }
  });
}

eyePassd.addEventListener("click", (e) => {
  if (password.type == "password") {
    password.type = "text";
    eyePassd.className = "fa-solid fa-eye";
  } else {
    password.type = "password";
    eyePassd.className = "fa-solid fa-eye-slash";
  }
});
