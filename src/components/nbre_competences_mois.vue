<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Chart } from "chart.js/auto";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "nbre_competences_mois",
  setup() {
    const chartCanvas = ref(null);
    let chartInstance = null;

    const getCompetencesTermineesParMois = async () => {
      const user = auth.currentUser;
      if (!user) return {};

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const competences = userDoc.data()?.competences || [];
        const counts = {};

        competences.forEach((c) => {
          if (c.statut === "Terminé" && c.date_acqui) {
            const date = new Date(
              c.date_acqui.seconds ? c.date_acqui.seconds * 1000 : c.date_acqui
            );
            const mois = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}`;
            counts[mois] = (counts[mois] || 0) + 1;
          }
        });

        return counts;
      } catch (error) {
        console.error("Erreur récupération Firestore :", error);
        return {};
      }
    };

    onMounted(async () => {
      const dataParMois = await getCompetencesTermineesParMois();
      const labels = Object.keys(dataParMois).sort();
      const data = labels.map((mois) => dataParMois[mois]);

      if (chartCanvas.value) {
        chartInstance = new Chart(chartCanvas.value, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [{
              label: "Compétences terminées par mois",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            }],
          },
        });
      }
    });

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    return { chartCanvas };
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>