const btn = document.querySelector("#Cargar");
let consultas = null;

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  await axios("https://clinica.onrender.com/citas/citasUsuario",
  {
    headers: {
        "user-token": localStorage.getItem("token"),
    }
  })
    .then((result) => {
      const { data } = result;
      consultas = data.citas;
      consultas.forEach((element) => {
        document.querySelector("tbody").innerHTML += `
    <tr>
          <td>${element.nombreMedico}</td>
          <td>${element.especialidad}</td>
          <td>${element.fecha}</td>
          <td>${element.hora}</td>
          <td>${element.nombreCompleto}</td>
          <td>${element.telefono}</td>
    </tr>
    `;
      });
      console.log(consultas);
    })
    .catch((result) => {
      console.log(result);
      const { response } = result;
      const { data } = response;
      window.alert("Error al cargar.")
    });
});