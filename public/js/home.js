const getClima = async () => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: "10.63504, -85.43772" },
    headers: {
      "X-RapidAPI-Key": "f6e26cc14cmsh946720ac48e2bd4p1fda95jsnd8315e9abf9c",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const dato = await axios
    .request(options)
    .then(function (response) {
      const { temp_c, is_day } = response.data.current;
      return { temp_c, is_day };
    })
    .catch(function (error) {
      console.error(error);
      return { temp_c:26, is_day:1 };
    });

  return dato;
};

const insertarClima = async () => {
  const { temp_c, is_day } = await getClima();

  const panel = document.querySelector("#panel");

  const h3 = document.createElement("p");
  const h23 = document.createElement("p");
  const i = document.createElement("i");

  h3.setAttribute("class", "text-center  fw-bold");
  h23.setAttribute("class", "text-center  fw-bold");

  if (is_day) {
    h3.appendChild(
      document.createTextNode(
        ` Buenos dias, La temperatura de hoy es: ${temp_c}°C parece que es un dia soleado`
      )
    );
    i.setAttribute('class', 'fs-4 bi bi-brightness-high-fill');
    i.setAttribute('id', 'dia');
    h3.appendChild(i);
    h23.appendChild(document.createTextNode("Recuerda llevar bloqueador"));
  } else {
    i.setAttribute('class', 'fs-4 bi bi-moon-stars-fill');
    i.setAttribute('id', 'noche');
    h3.appendChild(i);
    h3.appendChild(document.createTextNode(` Buenas noches, La temperatura de hoy es: ${temp_c}°C parece que es una linda noche`));
    h23.appendChild(document.createTextNode("Recuerda dormir minimo 8 horas"));
 
  }

  panel.appendChild(h3);
  panel.appendChild(h23);
};


insertarClima();

