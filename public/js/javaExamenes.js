const btnRE = document.querySelector("#btnRE");
const btnV = document.querySelector("#btnVal");
let orina;
let sangre;

validarO(true);
validarS(true);

btnV.addEventListener("click", async (e) => {
  e.preventDefault();
  await axios(
    "https://clinica.onrender.com/consultas/get/"+localStorage.getItem(
      "dato"
    )
  )
    .then((result) => {
      const { data } = result;
      let examen = data.consulta.examenes;
      if (examen[0].orina === "si") {
        validarO(false);
        orina = "Si";
      }
      if (examen[0].sangre === "si") {
        validarS(false);
        sangre = "Si";
      }
    })
    .catch((result) => {
      console.log(result);
      window.alert("No se encontro el paciente.");
    });
});
btnRE.addEventListener("click", async (e) => {
  e.preventDefault();

  if (orina === "Si") {
    await axios
      .post(
        `https://clinica.onrender.com/examenes/registrarExamen/orina/?cedula=${localStorage.getItem(
          "cedulaP"
        )}`,
        {
          fechaRealizado: new Date(),
          glucosa: document.querySelector("#glucosa").value,
          eritrocitos: document.querySelector("#eritrocitos").value,
          color: document.querySelector("#color").value,
          leucocitos: document.querySelector("#leucocitos").value,
        },
        {
          headers: {
            "user-token": localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        console.log(result)
        const { data } = result;
        window.alert("Examenes de sangre Registrado");
      })
      .catch((result) => {
        console.log(result);
        const { response } = result;
        const { data } = response;
        window.alert("Error al registrar los examenes");
      });
  }
  if (sangre === "Si") {
    await axios
      .post(
        `https://clinica.onrender.com/examenes/registrarExamen/sangre/?cedula=${localStorage.getItem(
          "cedulaP"
        )}`,
        {
          fechaRealizado: new Date(),
          hemoglobina: document.querySelector("#hemoglobina").value,
          hematocrito: document.querySelector("#hematocrito").value,
          trigliceridos: document.querySelector("#trigliceridos").value,
          colesterolTotal: document.querySelector("#colesterolTotal").value,
          acidoUrico: document.querySelector("#acidoUrico").value,
          creatinina: document.querySelector("#creatinina").value,
        },
        {
          headers: {
            "user-token": localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        const { data } = result;
        window.alert("Examenes de orina Registrado");
      })
      .catch((result) => {
        console.log(result);
        const { response } = result;
        const { data } = response;
        window.alert("Error al registrar los examenes");
      });
  }
});

function validarS(params) {
  document.querySelector("#hemoglobina").disabled = params;
  document.querySelector("#hematocrito").disabled = params;
  document.querySelector("#trigliceridos").disabled = params;
  document.querySelector("#colesterolTotal").disabled = params;
  document.querySelector("#acidoUrico").disabled = params;
  document.querySelector("#creatinina").disabled = params;
}
function validarO(params) {
  document.querySelector("#glucosa").disabled = params;
  document.querySelector("#color").disabled = params;
  document.querySelector("#leucocitos").disabled = params;
  document.querySelector("#eritrocitos").disabled = params;
}
