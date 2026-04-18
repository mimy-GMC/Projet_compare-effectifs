const labels3 = [
  '2021-22',
  '2022-23',
  '2023-24',
  '2024-25'
];

const data3 = {
  labels: labels3,
  datasets: [{
    label: 'Les inscrits hommes à l’UT2J en L2 MIASHS',
    data: [90, 76, 85, 85],
    borderColor: 'rgb(20, 160, 160)'
    
  },

  {
    label: 'Les inscrits femmes à l’UT2J en L2 MIASHS',
    data: [58, 44, 50, 45],
    borderColor: 'rgb(140, 220, 180)',
  }
]
};

const config3= {
  type: 'line',   // type de graphique (barres)
  data: data3,    // les données définies avant
  options: {}
};

const myChart3 = new Chart(
   document.querySelector('#graphique3'),
  config3
);



