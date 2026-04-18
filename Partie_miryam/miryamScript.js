// Cette fonction me permet de récupérer les données de l'API en fonction des paramètres spécifiés (diplôme et secteur disciplinaire) et d'exécuter un callback avec les résultats obtenus.
function DonneesAPIdemandees(callback, diplome, secteur_disciplinaire) {

  const url = `https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records?limit=20&refine=diplom:${diplome}&refine=diplome_rgp%3ALicence&refine=etablissement_id_uai:0311383K&refine=niveau_lib%3A2%C3%A8me+ann%C3%A9e&refine=sect_disciplinaire_lib:${encodeURIComponent(secteur_disciplinaire)}`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function () {
    // Je vérifie que la requête est terminée et que le statut est completé avec succès (200)
    if (xhr.readyState === 4 && xhr.status === 200) {
      const reponse = JSON.parse(xhr.responseText);

      // J'appelle le callback avec les résultats extraits de la réponse de l'API
      callback(null, reponse.results);
    } else {
      callback(new Error(`Erreur HTTP: ${xhr.status}`), null);
    }
  };

  // J'envoie ma requête à l'API
  xhr.send();
}

// Cette fonction me permet d'extraire les années universitaires et les effectifs.
function AnneesEffectifsExtraits(donneesFiltrees) {
  const anneeUniv = [];
  const nbInscrit = [];

    donneesFiltrees.forEach((item) => {
        const lesAnneeUniv = item.annee_universitaire;
        const effectifsEtu = item.effectif_sans_cpge;

        // Je fais une vérification pour enlever les doublons d'années
        if (!anneeUniv.includes(lesAnneeUniv)) {
            anneeUniv.push(lesAnneeUniv);
            nbInscrit.push(effectifsEtu);
        }
    });

    return { anneeUniv, nbInscrit};
}

// Cette fonction me permet de créer un graphique en utilisant la bibliothèque Chart.js avec les données extraites.
function graphiqueCree(canvasId, anneeUniv, nbInscrit, label, borderColor) {
  const contenuGraph = document.querySelector(canvasId).getContext("2d");
  new Chart(contenuGraph, {
    type: "line",
    data: {
      labels: anneeUniv,
      datasets: [
        {
          label: label,
          borderColor: borderColor,
          data: nbInscrit
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        // Titre en bas du graphique
        title: {
          display: true,
          text: "Statistique à l'UT2J",
          position: "top",
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#3498db",
          padding: 20,
        },

        // Personnalisation de l'info-bulle
        tooltip: {
          position: "average",
          backgroundColor: "rgba(87, 20, 61, 0.8)",
          titleFont: { size: 14 },
          bodyFont: { size: 14 },
          callbacks: {
            label: function (context) {
              return `Nombre inscrit est : ${context.raw}`;
            },
          },
          xAlign: "left",
          yAlign: "bottom",
        },

        // Légende en bas
        legend: {
          position: "bottom",
        },
      },

      // Échelles
      scales: {
        y: {
          beginAtZero: true,
        },
      },

      // Layout pour éviter les marges inutiles
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
    },
  });
}



// Cette fonction me permet d'afficher les graphiques pour les deux formations.
function afficheMesGraphiques() {
  // Je récupère les données pour L2 MIASHS
  DonneesAPIdemandees(
    function (erreur, donneesMIASHS) {

      // Cela me permet de gérer les erreurs lors de la récupération des données pour L2 MIASHS
      if (erreur) {
        console.error("Erreur lors de la récupération des données MIASHS:", erreur);
        return;
      }

      // J'extrais les années et les effectifs pour L2 MIASHS à partir des données récupérées
      const { 
        anneeUniv: anneesMIASHS, 
        nbInscrit: effectifsMIASHS 
      } = AnneesEffectifsExtraits(donneesMIASHS);

      graphiqueCree("#graphique1", anneesMIASHS, effectifsMIASHS, "L2 MIASHS", "rgb(0, 199, 193)");
    },
    "2300031",
    "Mathématiques appliquées et sciences sociales"
  );

  // Je récupère les données pour L2 Géographie
  DonneesAPIdemandees(
    function (erreur, donneesGeo) {
      if (erreur) {
        console.error("Erreur lors de la récupération des données Géographie:", erreur);
        return;
      }

      // J'extrais les années et les effectifs pour L2 Géographie à partir des données récupérées
      const { 
        anneeUniv: anneesGeo, 
        nbInscrit: effectifsGeo 
      } = AnneesEffectifsExtraits(donneesGeo);

      graphiqueCree("#graphique2", anneesGeo, effectifsGeo, "L2 Géographie", "rgb(192, 75, 85)");
    },
    "2300012",
    "Géographie"
  );
}


// J'ajoute un écouteur d'événement pour exécuter la fonction afficheMesGraphiques lorsque le contenu du DOM est entièrement chargé.
window.addEventListener("DOMContentLoaded", afficheMesGraphiques);

