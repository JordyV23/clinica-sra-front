const btnAgendar = document.querySelector("#AgendarCita");

const obtenerCitas = async (date) => {
  const { data } = await axios.post(
    "https://clinica.onrender.com/citas/solicitar",
    {
      especialidad: date,
    }
  );
  const { citas } = data;
  console.log(data);
  try {
    citas.forEach(function (cita, i) {
      //agregarCita(cita.nombreMedico, cita.fecha, cita.hora,cita._id);
      agregarCita(
        cita.nombreMedico,
        cita.fecha,
        cita.hora,
        `solicitarCita('${cita._id}')`
      );
    });
  } catch (error) {}
};

const eventoSelect = () => {
  const selectElement = document.querySelector("#especialidad");
  selectElement.addEventListener("change", (event) => {
    obtenerCitas(event.target.value);
  });
};

const agregarCita = (medico, fecha, hora, onClick) => {
  const tabla = $("#citas").DataTable();
  tabla.row
    .add([
      medico,
      fecha,
      hora,
      `<button type="button" id="AgendarCita" class="btn btn-primary hvr-grow-shadow" onclick="${onClick}"><i class="fa-solid fa-file-signature"></i> Agendar Cita</button>`,
    ])
    .draw(false);
};

const crearDataTable = () => {
  $(document).ready(function () {
    $("#citas").DataTable({
      language: {
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        sSearch: "Buscar",
        oPaginate: {
          sFirst: "Primero",
          sLast: "Último",
          sNext: "Siguiente",
          sPrevious: "Anterior",
          scrollY: "200px",
          scrollCollapse: true,
          paging: false,
        },
      },
      scrollY: "200px",
      scrollCollapse: true,
      paging: false,
    });
  });
};
let userAct;
const userActual = async () => {
  await axios
    .get("https://clinica.onrender.com/clinica/user", {
      headers: {
        "user-token": localStorage.getItem("token"),
      },
    })
    .then((result) => {
      const { data } = result;
      userAct = data.nombreCompleto;
      document.querySelector("#nombreCompleto").value = userAct;
    })
    .catch((result) => {
      console.log(result);
    });
};
userActual();
const solicitarCita = async (id) => {
  await axios
    .post(
      "https://clinica.onrender.com/citas/reservar",
      {
        idCita: id,
        nombreCompleto: userAct,
        telefono: document.querySelector("#telefono").value,
      },
      {
        headers: {
          "user-token": localStorage.getItem("token"),
        },
      }
    )
    .then((result) => {
      const { data } = result;
      window.alert("Cita registrada");
    })
    .catch((result) => {
      console.log(result);
      const { response } = result;
      const { data } = response;
      window.alert("Error al registrar la cita");
    });
};
eventoSelect();
crearDataTable();
