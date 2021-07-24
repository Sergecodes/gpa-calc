const translationStrings = {
  "Language": "Langue",
  "A GPA Calculator": "Calculateur de MGP",
  "English": "Anglais",
  "French": "Français",
  "Download": "Télécharger",
  "Loading...": "Loading...",
  "Image": "Image",
  "Your GPA": "Votre MGP",
  "Semester ": "Semestre ",
  "semester": "semestre",
  "semesters": "semestres",
  "Semester": "Semestre",
  "Course name": "Nom de l'UE",
  "Cumulative": "Cumulative",
  "Icon 1 content": "La moyenne est calculée en divisant la somme de toutes les MGPs par le nombre de semestres.",
  "Icon 2 content": "Elle est calculée en considérant toutes les UEs de chaque semestre comme étant dans un semestre puis calculant la MGP.",
  "Average": "Moyenne",
  "Credit": "Crédit",
  "Marks /100": "Notes /100",
  "Grade": "Côte",
  "Score and appreciation grid": "Grille de notation et d'appréciation",
  "80 and above": "80 et plus",
  "Very good": "Très bien",
  "Good": "Bien",
  "Good enough": "Assez bien",
  "Satisfactory": "Passable",
  "Credits capitalised non-transferable": "Crédits capitalisés non transférables",
  "Fail": "Echec",
  "Add course": "Ajouter une UE",
  "Reset": "Réinitialiser",
  "Add a semester": "Ajouter un semestre",
  "Remove semester": "Retirer le semestre",
  "Appreciation": "Appréciation",
  "How to Calculate GPA": "Comment calculer la MGP",
  "Example": "Exemple",
  "GitHub": "GitHub",
  "Email": "Émail",
  "Contact via email": "Contactez par émail",

  "sp1": "Chaque UE a un crédit, qui est comme son coefficient et détermine son 'poids.' Les points de chaque UE sont obtenus en utilisant la table ci-dessus, et ces points dépendent le la note obtenu dans cette UE. ",
  "sp2": "Pour trouver la MGP d'un semester donné, multipliez le crédit de chaque UE par ses points puis faites la somme. Divisez cette somme par la somme des credits de chaque UE du semestre en question. ",
  "sp3": "Supposons qu'on a 3 UEs dans un semestre; A, B et C ayant pour crédits 2, 3 et 4 respectivement. ",
  "sp4": "Supposons qu'un étudiant a eu 70, 85 et 49 dans ces différents UEs, alors les notes obtenus sont B+, A et C- (en utilisant la table ci-dessus). ",
  "sp5": "Pour trouver la MGP, on fait (2*3.30 + 3*4.00 + 4*1.70) ÷ (2 + 3 + 4) = 25.40 ÷ 9 qui donne ",
  "sp6": "2.82 / 4.",

};

export default function translate(key) {
  return translationStrings[key];
}
