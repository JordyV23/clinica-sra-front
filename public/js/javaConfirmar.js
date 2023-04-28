const btnConfirmar = document.querySelector('#confirmar')
const passwordN = document.querySelector('#passwordN')
const passwordCF = document.querySelector('#passwordCf')

btnConfirmar.addEventListener('click',()=>{
    if (passwordN.value===passwordCF.value) {
      return passwordN.value
    }else{
      alert('No coinsiden las contraseñas')
    }
  })