const btn = document.querySelector("#actualizar");
const btnB = document.querySelector("#buscar");
const btnG = document.querySelector("#guardar");
const medic = document.querySelector("#medicamentos");
const sangre = document.querySelector("#option1");
const orina = document.querySelector("#option2");
let sangre1;
let orina1;

validadUser();

obtenerLocalS();
function obtenerLocalS() {
  let rol = localStorage.getItem("token");
  console.log(rol);
}

function validarC() {
  if (sangre.checked) {
    sangre1 = sangre.value;
  }
  if (orina.checked) {
    orina1 = sangre.value;
  }
}

//res.data.headers["Content-Type"];

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  await axios
    .post(
      "https://clinica.onrender.com/consultas/inicializarConsulta",
      {
        cedulaPaciente: document.querySelector("#cedula").value,
        nombrePaciente: document.querySelector("#nombrePaciente").value,
        fecha: document.querySelector("#fechaConsulta").value,
        peso: document.querySelector("#peso").value,
        presion: document.querySelector("#presion").value,
        altura: document.querySelector("#altura").value,
        sintomas: document.querySelector("#sintomas").value,
      },
      {
        headers: {
          "user-token": localStorage.getItem("token"),
        },
      }
    )
    .then((result) => {
      const { data } = result;
      window.alert("Consulta Actualizada");
    })
    .catch((result) => {
      console.log(result);
      const { response } = result;
      const { data } = response;
      window.alert("Error al actualizar la consulta");
    });
});

btnG.addEventListener("click", async (e) => {
  e.preventDefault();
  validarC()
  await axios
    .post(
      "https://clinica.onrender.com/consultas/diagnostico",
      {
        idConsulta: localStorage.getItem("dato"),
        diagnostico: document.querySelector("#diagnostico").value,
        medicamentos: medic.value,
        examenes: { sangre: sangre1, orina: orina1},
      },
      {
        headers: {
          "user-token": localStorage.getItem("token"),
        },
      }
    )
    .then((result) => {
      const { data } = result;
      window.alert("Consulta Actualizada");
    })
    .catch((result) => {
      console.log(result);
      const { response } = result;
      const { data } = response;
      window.alert("Error al actualizar la consulta");
    });
});

function validadUser() {
  if (localStorage.getItem("rol") === "Enfermero") {
    document.querySelector("#medicamentos").disabled = true;
    document.querySelector("#option1").disabled = true;
    document.querySelector("#option2").disabled = true;
    document.querySelector("#guardar").disabled = true;
    document.querySelector("#diagnostico").disabled = true;
    document.querySelector("#verConsultas").disabled = true;
    document.querySelector("#verConsultas").style.display = "none";
  } else if (localStorage.getItem("rol") === "Medico") {
    document.querySelector("#nombrePaciente").disabled = true;
    document.querySelector("#fechaConsulta").disabled = true;
    document.querySelector("#presion").disabled = true;
    document.querySelector("#peso").disabled = true;
    document.querySelector("#altura").disabled = true;
    document.querySelector("#sintomas").disabled = true;
    document.querySelector("#actualizar").disabled = true;
  }
}

btnB.addEventListener("click", async (e) => {
  e.preventDefault();
  await axios("https://clinica.onrender.com/consultas/getAll")
    .then((result) => {
      const { data } = result;
      consultas = data.consultas;
      consultas.forEach((element) => {
        if (
          element.cedulaPaciente === document.querySelector("#cedula").value
        ) {
          localStorage.setItem("dato", element._id);
          localStorage.setItem("cedulaP", element.cedulaPaciente);
        }
      });
    })
    .catch((result) => {
      const { response } = result;
      const { data } = response;
      window.alert("No se encontro el paciente.");
    });
  await axios(
    "https://clinica.onrender.com/consultas/get/" + localStorage.getItem("dato")
  )
    .then((result) => {
      const { data } = result;
      consulta = data.consulta;
      if (consulta.cedulaPaciente === document.querySelector("#cedula").value) {
        document.querySelector("#nombrePaciente").value =
          consulta.nombrePaciente;
        document.querySelector("#presion").value = consulta.presion;
        document.querySelector("#peso").value = consulta.peso;
        document.querySelector("#altura").value = consulta.altura;
        document.querySelector("#fechaConsulta").value = "";
        document.querySelector("#sintomas").value = consulta.sintomas;
      }
    })
    .catch((result) => {
      console.log(result);
      const { response } = result;
      const { data } = response;
      window.alert("No se encontro el paciente.");
    });
});
