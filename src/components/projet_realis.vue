<template>
  <div>
    <canvas ref="monthChart"></canvas>
    <canvas ref="typeChart" class="mt-4"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Chart } from "chart.js/auto";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  name: "ProjectsChart",
  setup() {
    const db = getFirestore();
    const auth = getAuth();
    const monthChart = ref(null);
    const typeChart = ref(null);
    let monthChartInstance = null;
    let typeChartInstance = null;

    const getProjetsParMois = async () => {
      const user = auth.currentUser;
      if (!user) return { countsByMonth: {}, countsByType: {} };

      const projetsQuery = query(
        collection(db, "projets"),
        where("userId", "==", user.uid)
      );

      try {
        const querySnapshot = await getDocs(projetsQuery);
        const countsByMonth = {};
        const countsByType = {};

        querySnapshot.forEach((doc) => {
          const projet = doc.data();
          const date = new Date(projet.dateRealisation);
          const mois = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          
          countsByMonth[mois] = (countsByMonth[mois] || 0) + 1;
          countsByType[projet.type] = (countsByType[projet.type] || 0) + 1;
        });

        return { countsByMonth, countsByType };
      } catch (error) {
        console.error("Erreur récupération des projets Firestore:", error);
        return { countsByMonth: {}, countsByType: {} };
      }
    };

    onMounted(async () => {
      const { countsByMonth, countsByType } = await getProjetsParMois();
      const labelsMonth = Object.keys(countsByMonth).sort();
      const dataMonth = labelsMonth.map((mois) => countsByMonth[mois]);
      const labelsType = Object.keys(countsByType);
      const dataType = labelsType.map((type) => countsByType[type]);

      if (monthChart.value) {
        monthChartInstance = new Chart(monthChart.value, {
          type: "bar",
          data: {
            labels: labelsMonth,
            datasets: [{
              label: "Projets réalisés par mois",
              data: dataMonth,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            }],
          },
        });
      }

      if (typeChart.value) {
        typeChartInstance = new Chart(typeChart.value, {
          type: "pie",
          data: {
            labels: labelsType,
            datasets: [{
              label: "Projets par type",
              data: dataType,
              backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
            }],
          },
        });
      }
    });

    onBeforeUnmount(() => {
      if (monthChartInstance) monthChartInstance.destroy();
      if (typeChartInstance) typeChartInstance.destroy();
    });

    return { monthChart, typeChart };
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  margin-bottom: 30px;
}
.mt-4 {
  margin-top: 1rem;
}
</style>