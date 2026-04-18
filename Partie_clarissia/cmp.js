const url = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records/?limit=10&offset=0&refine=degetu%3A5&refine=diplom%3A9014533&refine=etablissement_id_paysage%3AHqAYu&where=annee_universitaire%3D%222019-20%22+or+annee_universitaire%3D%222020-21%22+or+annee_universitaire%3D%222022-23%22+or+annee_universitaire%3D%222023-24%22";

let annees = [];
let effectifsHommes = [];
let effectifsFemmes = [];

const xhr = new XMLHttpRequest();
xhr.open("GET", url, true);

xhr.onreadystatechange = function() {

if (xhr.readyState === 4 && xhr.status === 200) {

const data = JSON.parse(xhr.responseText);
const resultats = data.results;

/* tri des années pour le graphe  */
resultats.sort((a, b) =>
a.annee_universitaire.localeCompare(b.annee_universitaire)
);

/* remplissage tableaux */
resultats.forEach((r, i) => {

annees[i] = r.annee_universitaire;
effectifsHommes[i] = r.hommes;
effectifsFemmes[i] = r.femmes;

});

/* données du graphique */
const data3 = {
labels: annees,
datasets: [

{
label: 'Hommes',
data: effectifsHommes,
borderColor: 'rgb(75, 37, 164)',
backgroundColor: 'rgba(35, 138, 249, 0.88)',
borderWidth: 1,
tension: 0
},

{
label: 'Femmes',
data: effectifsFemmes,
borderColor: 'rgb(5, 8, 7)',
backgroundColor: 'rgba(172, 32, 62, 0.92)',
borderWidth: 1,
tension: 0
}

]

};

/* configuration graphique */

const config1 = {

type: 'bar',
data: data3,
options: {
plugins: {
legend: {
position: 'bottom'
},

title: {
display: true,
text: "Statistique à UT2J des étudiants de la M2 en Sociologie"
},

tooltip: {
xAlign: 'left',
yAlign: 'bottom',
backgroundColor: 'rgba(0,0,0,0.8)',
callbacks: {
label: function(context) {
return "Nombre inscrit est : " + context.raw;
}
}
}

},

/* labels des axes */

scales: {

x: {
title: {
display: true,
text: "Année universitaire"
}
},

y: {
title: {
display: true,
text: "Nombre d'inscrits "
}
}

}

}

};

/* création du graphique */

new Chart(
document.querySelector('#graphique'),
config1
);

}

};

xhr.send();