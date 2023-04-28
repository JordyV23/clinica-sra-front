const btn = document.querySelector("#Cargar");
let consultas = null;

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  await axios("https://clinica.onrender.com/consultas/getAll")
    .then((result) => {
      const { data } = result;
      consultas = data.consultas;
      consultas.forEach((element) => {
        document.querySelector("tbody").innerHTML += `
    <tr>
          <td>${element._id}</td>
          <td>${element.cedulaPaciente}</td>
          <td>${element.nombrePaciente}</td>
          <td>${element.peso}</td>
          <td>${element.altura}</td>
          <td>${element.presionArterial}</td>
          <td>${element.sintomas}</td>
          <td>${element.finalizada}</td>
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

