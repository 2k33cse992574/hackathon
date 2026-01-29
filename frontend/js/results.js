// ===============================
// RESULTS DASHBOARD – REAL DATA
// ===============================

const API_BASE = "http://localhost:5000/api";

// ---------- GET CASE ID ----------
const params = new URLSearchParams(window.location.search);
const caseId = params.get("case_id");

if (!caseId) {
  alert("Missing case ID");
  throw new Error("case_id not found in URL");
}

// ---------- FETCH RESULTS ----------
fetch(`${API_BASE}/results/${caseId}`)
  .then(res => res.json())
  .then(json => {
    if (!json.success) {
      alert("Failed to load results");
      return;
    }
    renderResults(json.data);
  })
  .catch(err => {
    console.error(err);
    alert("Backend not reachable");
  });

// ---------- RENDER ----------
function renderResults(data) {
  const total = data.totalVotes;

  document.getElementById("totalJurors").innerText = total;

  if (total === 0) {
    document.getElementById("betterPercent").innerText = "—";
    document.getElementById("fairerPercent").innerText = "—";
    return;
  }

  const betterA = data.stats.better.A;
  const betterB = data.stats.better.B;

  const fairerA = data.stats.fairer.A;
  const fairerB = data.stats.fairer.B;

  const betterAPercent = Math.round((betterA / total) * 100);
  const betterBPercent = 100 - betterAPercent;

  const fairerAPercent = Math.round((fairerA / total) * 100);
  const fairerBPercent = 100 - fairerAPercent;

  // ---- SCORE CARDS ----
  document.getElementById("betterPercent").innerText =
    betterAPercent >= betterBPercent
      ? `${betterAPercent}%`
      : `${betterBPercent}%`;

  document.getElementById("fairerPercent").innerText =
    fairerAPercent >= fairerBPercent
      ? `${fairerAPercent}%`
      : `${fairerBPercent}%`;

  // ---- BREAKDOWN ----
  document.getElementById("betterOneText").innerText = `${betterAPercent}%`;
  document.getElementById("betterTwoText").innerText = `${betterBPercent}%`;

  document.getElementById("betterBarOne").style.width = `${betterAPercent}%`;
  document.getElementById("betterBarTwo").style.width = `${betterBPercent}%`;

  // ---- COMMENTS ----
  const commentsBox = document.getElementById("commentsBox");
  commentsBox.innerHTML = "";

  data.comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "bg-white/10 p-6 rounded-2xl";
    div.innerText = `“${c}”`;
    commentsBox.appendChild(div);
  });

  // ---- PIE CHART ----
  const ctx = document.getElementById("votePieChart");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["List One", "List Two"],
      datasets: [
        {
          data: [betterAPercent, betterBPercent],
          backgroundColor: ["#EF4444", "#22C55E"]
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          labels: { color: "white" }
        }
      }
    }
  });
}
