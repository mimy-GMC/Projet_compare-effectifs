/* ---------------------------------------------------
   Défi 2.4 : Comparaison MIASHS ↔ Psychologie (UT2J)
-----------------------------------------------------*/

// Fonction générique pour récupérer les données d’un diplôme UT2J
async function getEffectifs(diplomeCode) {
  const url =
    "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/" +
    "?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics" +
    "&rows=50&refine.uai=0311383K&refine.diplom=" + diplomeCode;

  const response = await fetch(url);
  const json = await response.json();

  // On filtre les enregistrements valides
  const records = json.records
    .filter(r => r.fields.effectif_total !== undefined)
    .sort((a, b) => a.fields.annee_universitaire.localeCompare(b.fields.annee_universitaire));

  return {
    years: records.map(r => r.fields.annee_universitaire),
    effectifs: records.map(r => r.fields.effectif_total)
  };
}

async function buildCharts() {
  const MIASHS = "2300031";  // MIASHS UT2J
  const PSYCHO = "2300029";  // Psychologie UT2J

  // Récupération des données API
  const dataM = await getEffectifs(MIASHS);
  const dataP = await getEffectifs(PSYCHO);

  /* -------------------------
     Graphique MIASHS
  --------------------------*/
  new Chart(
    document.getElementById("Chart1"),
    {
      type: "line",
      data: {
        labels: dataM.years,
        datasets: [
          {
            label: "L2 MIASHS UT2J",
            data: dataM.effectifs,
            borderColor: "rgb(78, 255, 9)",
            tension: 0.3
          }
        ]
      }
    }
  );

  /* -------------------------
     Graphique Psychologie
  --------------------------*/
  new Chart(
    document.getElementById("chart2"),
    {
      type: "line",
      data: {
        labels: dataP.years,
        datasets: [
          {
            label: "L2 Psychologie UT2J",
            data: dataP.effectifs,
            borderColor: "rgb(247, 158, 25)",
            tension: 0.3
          }
        ]
      }
    }
  );
}

buildCharts();
