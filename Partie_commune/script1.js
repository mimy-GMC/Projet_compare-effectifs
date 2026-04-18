const labels1 = [
  '2021-22',
  '2022-23',
  '2023-24',
  '2024-25'
];

const data1 = {
  labels: labels1,
  datasets: [{
    label: 'Les inscrits à l\'UT2J en L2 MIASHS',
    backgroundColor: 'rgb(0, 199, 193)',
    borderColor: 'rgb(0, 199, 193)',
    data: [148, 120, 135, 130]
  }]
};

const config1 = {
  type: 'bar',   // type de graphique (barres)
  data: data1,    // les données définies avant
  options: {}
};

const myChart1 = new Chart(
  document.querySelector('#graphique1'),
  config1
);



