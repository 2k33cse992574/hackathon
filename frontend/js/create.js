// ===============================
// CREATE CASE – BACKEND ALIGNED
// ===============================

const API_BASE = "http://localhost:5000/api";

// ---------- USER ID (ANONYMOUS) ----------
function getUserId() {
  let id = localStorage.getItem("user_id");
  if (!id) {
    id = "user-" + crypto.randomUUID();
    localStorage.setItem("user_id", id);
  }
  return id;
}

// ---------- ELEMENTS ----------
const caseTitle = document.querySelector(
  "input[placeholder*='College']"
);

const audienceSelect = document.querySelector("select");

const textareas = document.querySelectorAll("textarea");
const algoAText = textareas[0];
const algoBText = textareas[1];

const ethicsCheckbox = document.querySelector("input[type='checkbox']");

const buttons = document.querySelectorAll("button");
const startBtn = buttons[buttons.length - 1];

// ---------- HELPERS ----------
function parseTextarea(textarea) {
  return textarea.value
    .split("\n")
    .map(v => v.trim())
    .filter(v => v.length > 0);
}

// ---------- MAIN SUBMIT ----------
startBtn.addEventListener("click", async () => {

  // ----- VALIDATION -----
  if (!caseTitle || caseTitle.value.trim() === "") {
    alert("Please enter case title");
    return;
  }

  if (!ethicsCheckbox.checked) {
    alert("You must agree to ethical usage");
    return;
  }

  const resultsA = parseTextarea(algoAText);
  const resultsB = parseTextarea(algoBText);

  if (resultsA.length < 3 || resultsB.length < 3) {
    alert("Each algorithm output must have at least 3 items");
    return;
  }

  // ----- PAYLOAD (BACKEND CONTRACT) -----
  const payload = {
    audience_tag: audienceSelect.value.toLowerCase(),
    resultsA,
    resultsB
  };

  console.log("Creating case:", payload);

  // ----- API CALL -----
  try {
    const res = await fetch(`${API_BASE}/create-case`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": getUserId()
      },
      body: JSON.stringify(payload)
    });

    const json = await res.json();

    if (!json.success) {
      alert("Failed to create case");
      console.error(json);
      return;
    }

    const caseId = json.data.case_id;

    alert("Evaluation created successfully");

    // Redirect to vote page with caseId
    window.location.href = `vote.html?case_id=${caseId}`;

  } catch (err) {
    console.error(err);
    alert("Backend not reachable");
  }
});
