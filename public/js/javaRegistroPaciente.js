const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

abailitar(true);

const expresiones = {
  //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  cedula: /^[1-9]-?\d{4}-?\d{4}$/,
};

const campos = {
  //usuario: false,
  nombre: false,
  apellidos: false,
  password: false,
  correo: false,
  telefono: false,
  cedula: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    // case "usuario":
    // 	validarCampo(expresiones.usuario, e.target, 'usuario');
    // break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "apellidos":
      validarCampo(expresiones.apellidos, e.target, "apellidos");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      validarPassword2();
      break;
    case "password2":
      validarPassword2();
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;
    case "cedula":
      validarCampo(expresiones.cedula, e.target, "cedula");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos["password"] = false;
  } else {
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos["password"] = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

document.querySelector("#btnGuardarR").disabled = true;

const btn = document.querySelector("#btnRegistrar");
const btnGuardarR = document.querySelector("#btnGuardarR");

document.querySelector("#btnGuardarR").style.display = "none";
document.querySelector("#btnAct").style.display = "none";

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  document.querySelector("#btnGuardarR").disabled = false;
  document.querySelector("#btnGuardarR").style.display = "block";
  document.querySelector("#btnRegistrar").disabled = true;
  habiliatBTN(true);
  abailitar(false);
});

function habiliatBTN(params) {
  document.querySelector("#btnActualizar").disabled = params;
  document.querySelector("#btnEliminar").disabled = params;
}

function abailitar(params) {
  document.querySelector("#identificacion").disabled = params;
  document.querySelector("#nombre").disabled = params;
  document.querySelector("#peso").disabled = params;
  document.querySelector("#edad").disabled = params;
  document.querySelector("#altura").disabled = params;
  document.querySelector("#enfermedades").disabled = params;
  document.querySelector("#tipoSangre").disabled = params;
  document.querySelector("#medicamentosAlergicos").disabled = params;
  document.querySelector("#nombreCompleto").disabled = params;
  document.querySelector("#relacion").disabled = params;
  document.querySelector("#telefono").disabled = params;
  document.querySelector("#direccion").disabled = params;
  document.querySelector("#apellidos").disabled = params;
  document.querySelector("#presion").disabled = params;
}

btnGuardarR.addEventListener("click", async (e) => {
  e.preventDefault();
  await axios
    .post("https://clinica.onrender.com/pacientes/registrarPaciente", {
      cedula: document.querySelector("#identificacion").value,
      nombreCompleto:
        document.querySelector("#nombre").value +
        " " +
        document.querySelector("#apellidos").value,
      peso: [
        {
          fecha: new Date(),
          peso: document.querySelector("#peso").value,
        },
      ],
      presionArterial: [
        {
          fecha: new Date(),
          presionArterial: document.querySelector("#presion").value,
        },
      ],
      edad: document.querySelector("#edad").value,
      altura: document.querySelector("#altura").value,
      enfermedades: [document.querySelector("#enfermedades").value],
      tipoDeSangre: document.querySelector("#tipoSangre").value,
      medicamentosAlergicos: [
        document.querySelector("#medicamentosAlergicos").value,
      ],
      contactoDeEmergencia: [
        {
          nombreCompleto: document.querySelector("#nombreCompleto").value,
          relacionFamiliar: document.querySelector("#relacion").value,
          telefono: document.querySelector("#telefono").value,
          direccion: document.querySelector("#direccion").value,
        },
      ],
    })
    .then((result) => {
      const { data } = result;
      window.alert("Registro Guardado");
    })
    .catch((result) => {
      console.log(result);
      const { response } = result;
      const { data } = response;
      window.alert("No se pudo guardar el registro");
    });
  habiliatBTN(false);
  abailitar(true);
  document.querySelector("#btnGuardarR").disabled = true;
  document.querySelector("#btnGuardarR").style.display = "none";
  document.querySelector("#btnRegistrar").disabled = false;
});

const buscarP = document.querySelector("#busquedaP");
const eliminar = document.querySelector("#btnEliminar");
const actualizar = document.querySelector("#btnActualizar");
const btnAct = document.querySelector("#btnAct");

buscarP.addEventListener("click", async (e) => {
  e.preventDefault();
  await axios("https://clinica.onrender.com/pacientes/getPacientes")
    .then((result) => {
      const { data } = result;
      let paciente = data.pacientes;
      console.log(paciente);
      paciente.forEach((element) => {
        if (element.cedula === document.querySelector("#busq").value) {
          let arr = element.nombreCompleto.split(' ')
          document.querySelector("#identificacion").value = element.cedula;
          document.querySelector("#nombre").value = arr[0];
          document.querySelector("#apellidos").value = arr[1];
          document.querySelector("#peso").value = element.peso[0].peso;
          document.querySelector("#presion").value = element.presionArterial[0].presionArterial;
          document.querySelector("#edad").value = element.edad;
          document.querySelector("#altura").value = element.altura;
          document.querySelector("#enfermedades").value = element.enfermedades;
          document.querySelector("#tipoSangre").value = element.tipoDeSangre;
          document.querySelector("#medicamentosAlergicos").value =
            element.medicamentosAlergicos;
          document.querySelector("#nombreCompleto").value =
            element.contactoDeEmergencia[0].nombreCompleto;
          document.querySelector("#relacion").value = element.contactoDeEmergencia[0].relacionFamiliar;
          document.querySelector("#telefono").value = element.contactoDeEmergencia[0].telefono;
          document.querySelector("#direccion").value = element.contactoDeEmergencia[0].direccion;
        }
      });
    })
    .catch((result) => {
      console.log(result);
      window.alert("No se encontro el paciente.");
    });
});

eliminar.addEventListener("click", async (e) => {
  e.preventDefault();

  await axios
    .delete(
      "https://clinica.onrender.com/pacientes/eliminarPaciente/" +
        document.querySelector("#busq").value
    )
    .then((result) => {
      const { data } = result;
      window.alert(data.message);
    })
    .catch((result) => {
      console.log(result);
      window.alert("No se encontro el paciente.");
    });
});

actualizar.addEventListener("click", async (e) => {
  e.preventDefault();
  abailitar(false)
  document.querySelector("#identificacion").disabled = true;
  document.querySelector("#nombre").disabled = true;
  document.querySelector("#btnAct").style.display = "block";
});

btnAct.addEventListener("click", async (e) => {
  e.preventDefault();
  await axios
    .put("https://clinica.onrender.com/pacientes/actualizarPaciente/", {
      cedula: document.querySelector("#identificacion").value,
      nombreCompleto:
        document.querySelector("#nombre").value +
        " " +
        document.querySelector("#apellidos").value,
      peso: [
        {
          fecha: new Date(),
          peso: document.querySelector("#peso").value,
        },
      ],
      presionArterial: [
        {
          fecha: new Date(),
          presionArterial: document.querySelector("#presion").value,
        },
      ],
      edad: document.querySelector("#edad").value,
      altura: document.querySelector("#altura").value,
      enfermedades: [document.querySelector("#enfermedades").value],
      tipoDeSangre: document.querySelector("#tipoSangre").value,
      medicamentosAlergicos: [
        document.querySelector("#medicamentosAlergicos").value,
      ],
      contactoDeEmergencia: [
        {
          nombreCompleto: document.querySelector("#nombreCompleto").value,
          relacionFamiliar: document.querySelector("#relacion").value,
          telefono: document.querySelector("#telefono").value,
          direccion: document.querySelector("#direccion").value,
        },
      ],
    })
    .then((result) => {
      const { data } = result;
      window.alert("Registro Guardado");
    })
    .catch((result) => {
      console.log(result);
      const { response } = result;
      const { data } = response;
      window.alert("No se pudo guardar el registro");
    });
  abailitar(true);
  document.querySelector("#btnAct").style.display = "none";
});