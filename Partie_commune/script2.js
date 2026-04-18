const labels2 = [
  '2021-22',
  '2022-23',
  '2023-24',
  '2024-25'
];

const data2 = {
  labels: labels2,
  datasets: [{
    label: 'Les inscrits à l’UT2J en L2 MIASHS',
    backgroundColor: 'rgb(0, 199, 193)',
    borderColor: 'rgb(0, 199, 193)',
    data: [148, 120, 135, 130]
  }]
};

const config2 = {
  type: 'line',   // type de graphique (barres)
  data: data2,    // les données définies avant
  options: {}
};

const myChart2 = new Chart(
  document.querySelector('#graphique2'),
  config2
);



