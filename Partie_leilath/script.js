
function recupererDonneesAPI(url, callback) {

    const xhr = new XMLHttpRequest();


    xhr.open("GET", url);

    
    xhr.onreadystatechange = function () {

      
      
        if (xhr.readyState === 4 && xhr.status === 200) {

        
            const reponse = JSON.parse(xhr.responseText);

            
            callback(null, reponse.results);

        } else if (xhr.readyState === 4) {

            
            callback(new Error("Erreur lors de la recuperation de l'API"), null);

        }
    };

   
    xhr.send();
}







// Fonction pour extraire les années et effectifs

function extraireAnneesEtEffectifs(donnees) {

    const annees = [];
    const effectifs = [];

   
    donnees.forEach(function(item){

        const annee = item.annee_universitaire;
        const effectif = item.effectif_sans_cpge;

    
        if(!annees.includes(annee)){

            annees.push(annee);
            effectifs.push(effectif);

        }

    });

   
    return {
        annees: annees,
        effectifs: effectifs
    };
}








// Fonction pour créer un graphique

function creerGraphique(canvasId, annees, effectifs, label, couleur){

    const ctx = document.querySelector(canvasId).getContext("2d");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: annees,

            datasets: [
                {
                    label: label,
                    data: effectifs,

                    backgroundColor: couleur, // couleur des barres
                    borderColor: couleur,     // contour
                    borderWidth: 1
                }
            ]
        },

        options: {
            responsive: true,

            plugins: {
                title: {
                    display: true,
                    text: "Statistique des effectifs",
                    font: {
                        size: 16
                    }
                }
            },

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });

}



// Fonction principale

function afficherGraphiques(){


    
    // URL L3 Mathématiques
    
    const urlMaths = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records/?limit=10&offset=0&refine=diplome_rgp%3ALicence&refine=etablissement_id_uai%3A0311384L&refine=niveau_lib%3A3%C3%A8me+ann%C3%A9e";



    
    // URL L3 Informatique
    
    const urlInfo = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records/?limit=10&offset=0&refine=diplome_rgp%3ALicence&refine=etablissement_id_uai%3A0311384L&refine=niveau_lib%3A3%C3%A8me+ann%C3%A9e&refine=sect_disciplinaire_lib%3AInformatique";



    // Récupération des données pour Maths
   
    recupererDonneesAPI(urlMaths, function(erreur, donneesMaths){

        if(erreur){
            console.error("Erreur API Maths :", erreur);
            return;
        }

        // Extraction des données
        const resultat = extraireAnneesEtEffectifs(donneesMaths);

        // Création du graphique
        creerGraphique(
            "#graphique1",
            resultat.annees,
            resultat.effectifs,
            "L3 Mathématiques",
            "pink"
        );

    });




   
    // Récupération des données pour Informatique
  
    recupererDonneesAPI(urlInfo, function(erreur, donneesInfo){

        if(erreur){
            console.error("Erreur API Info :", erreur);
            return;
        }

        
        const resultat = extraireAnneesEtEffectifs(donneesInfo);

       
        creerGraphique(
            "#graphique2",
            resultat.annees,
            resultat.effectifs,
            "L3 Informatique",
            "purple"
        );

    });

}



window.addEventListener("DOMContentLoaded", afficherGraphiques);