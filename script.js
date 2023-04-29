let dados;

axios.get("https://api.covid19api.com/summary").then(async function (response) {
  // handle success
  dados = await response.data;
  console.log(response);

  const totalConfirmados = document.getElementById("totalConfirmados");
  totalConfirmados.innerText = dados.Global.TotalConfirmed;

  const totalMortes = document.getElementById("totalMortes");
  totalMortes.innerText = dados.Global.TotalDeaths;

  const totalRecuperados = document.getElementById("totalRecuperados");
  totalRecuperados.innerText = dados.Global.TotalRecovered;

  const graficoNovosCasos = document.getElementById("graficoNovosCasos");

  new Chart(graficoNovosCasos, {
    type: "pie",
    data: {
      labels: ["Confirmados", "Recuperados", "Mortes"],
      datasets: [
        {
          label: "# de casos",
          data: [
            dados.Global.NewConfirmed,
            dados.Global.NewRecovered,
            dados.Global.NewDeaths,
          ],
          backgroundColor: [
            "rgb(255, 150, 54)",
            "rgb(107, 212, 0)",
            "rgb(255, 99, 132)",
          ],
          hoverOffset: 4,
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });

  const top10totalDeMortesPorPais = _.orderBy(
    dados.Countries,
    ["TotalDeaths"],
    ["desc"]
  ).slice(0, 10);

  const graficoTotalDeMortesPorPais = document.getElementById(
    "graficoTotalDeMortesPorPais"
  );

  new Chart(graficoTotalDeMortesPorPais, {
    type: "bar",
    data: {
      labels: top10totalDeMortesPorPais.map((pais) => pais.Country),
      datasets: [
        {
          label: "# de mortes",
          data: top10totalDeMortesPorPais.map((pais) => pais.TotalDeaths),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
