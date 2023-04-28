
const obtenerCitas = async () => {
  await axios
    .post("https://clinica.onrender.com/citas/solicitar",{
        "especialidad":document.querySelector("#especialidad").value
       })
    .then((result) => {
      const { data } = result;
      console.log(data);
    })
    .catch((result) => {
      console.log(result);
      window.alert("Error al actualizar la consulta");
    });
};
obtenerCitas()