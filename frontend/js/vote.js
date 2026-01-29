// ===============================
// FINAL JUROR VOTING LOGIC
// ===============================

const API_BASE = "http://localhost:5000/api";

// ---------- USER ID (ANONYMOUS & STABLE) ----------
function getUserId() {
  let id = localStorage.getItem("user_id");
  if (!id) {
    id = "user-" + crypto.randomUUID();
    localStorage.setItem("user_id", id);
  }
  return id;
}

// ---------- GLOBAL STATE ----------
let voteTask = null;
let betterChoice = "";
let fairerChoice = "";

// ---------- DOM ELEMENTS ----------
const leftList = document.getElementById("leftList");
const rightList = document.getElementById("rightList");

const betterRadios = document.querySelectorAll("input[name='better']");
const fairerRadios = document.querySelectorAll("input[name='fairer']");
const commentBox = document.querySelector("textarea");
const submitBtn = document.getElementById("submitVote");

// ---------- RENDER HELPERS ----------
function renderList(container, items, bgClass) {
  container.innerHTML = "";

  items.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = `p-4 ${bgClass} rounded-xl`;
    li.innerText = `${idx + 1}. ${item}`;
    container.appendChild(li);
  });
}

// ---------- LOAD VOTE TASK ----------
async function loadVoteTask() {
  try {
    const res = await fetch(`${API_BASE}/get-vote-task`, {
      headers: {
        "x-user-id": getUserId()
      }
    });

    const json = await res.json();

    if (!json.success) {
      alert(json.message || "No voting task available");
      return;
    }

    voteTask = json.data;

    renderList(leftList, voteTask.left, "bg-indigo-100");
    renderList(rightList, voteTask.right, "bg-green-100");

  } catch (err) {
    console.error(err);
    alert("Failed to load voting task from backend");
  }
}

// ---------- RADIO HANDLERS ----------
betterRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    betterChoice = radio.value; // must be "left" or "right"
  });
});

fairerRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    fairerChoice = radio.value; // must be "left" or "right"
  });
});

// ---------- SUBMIT VOTE ----------
submitBtn.addEventListener("click", async () => {
  if (!betterChoice || !fairerChoice) {
    alert("Please answer both questions");
    return;
  }

  if (!voteTask) {
    alert("Vote task not loaded");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/submit-vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": getUserId()
      },
      body: JSON.stringify({
        case_id: voteTask.case_id,
        better: betterChoice,
        fairer: fairerChoice,
        comment: commentBox.value || "",
        mapping: voteTask.mapping
      })
    });

    const json = await res.json();

    if (!json.success) {
      alert(json.message || "Vote submission failed");
      return;
    }

    // ✅ SUCCESS PATH
    window.location.href = `results.html?case_id=${voteTask.case_id}`;

  } catch (err) {
    console.error(err);
    alert("Network error while submitting vote");
  }
});
// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", loadVoteTask);
