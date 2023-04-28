
validacion()
function validacion() {
    if (localStorage.getItem("rol")==="Public") {
        document.querySelector("#Consultas").style.display = "none"
        document.querySelector("#Pacientes").style.display = "none"
        document.querySelector("#Consultas").style.display = "none"
    }
    if (localStorage.getItem("rol")==="Medico" || localStorage.getItem("rol")==="Enfermero" ) {
        document.querySelector("#Agendar").style.display = "none"
        document.querySelector("#MisCitas").style.display = "none"
    }
}