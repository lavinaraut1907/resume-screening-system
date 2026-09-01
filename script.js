// Show selected file name

document.getElementById("resumeFile").addEventListener("change", function () {
  let file = this.files[0];

  if (file) {
    document.getElementById("fileName").innerText = file.name;

    document.getElementById("candidateFile").innerText = file.name;
  }
});

// Analyze Resume

function analyzeResume() {
  let jobDescription = document
    .getElementById("jobDescription")
    .value.toLowerCase();

  let resumeText = document.getElementById("resumeText").value.toLowerCase();

  // Check input

  if (jobDescription.trim() === "") {
    alert("Please enter Job Description.");

    return;
  }

  if (resumeText.trim() === "") {
    alert("Please paste resume text for demo.");

    return;
  }

  // Skills database

  let skills = [
    "html",
    "css",
    "javascript",
    "java",
    "python",
    "c++",
    "sql",
    "mysql",
    "mongodb",
    "react",
    "node.js",
    "flask",
    "django",
    "machine learning",
    "artificial intelligence",
    "data science",
    "git",
    "github",
    "excel",
    "power bi",
  ];

  let requiredSkills = [];

  let matchedSkills = [];

  let missingSkills = [];

  // Find required skills

  skills.forEach(function (skill) {
    if (jobDescription.includes(skill)) {
      requiredSkills.push(skill);
    }
  });

  // Find matched skills

  requiredSkills.forEach(function (skill) {
    if (resumeText.includes(skill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // Calculate score

  let score = 0;

  if (requiredSkills.length > 0) {
    score = Math.round((matchedSkills.length / requiredSkills.length) * 100);
  }

  // Display score

  document.getElementById("score").innerText = score + "%";

  // Status

  let status = "";

  if (score >= 80) {
    status = "Excellent Match ✅";
  } else if (score >= 60) {
    status = "Good Match 👍";
  } else if (score >= 40) {
    status = "Average Match ⚠️";
  } else {
    status = "Low Match ❌";
  }

  document.getElementById("status").innerText = status;

  // Matched skills

  let matchedHTML = "";

  if (matchedSkills.length === 0) {
    matchedHTML = "<p>No matched skills.</p>";
  } else {
    matchedSkills.forEach(function (skill) {
      matchedHTML += `<span class="skill matched">
                    ${skill}
                </span>`;
    });
  }

  document.getElementById("matchedSkills").innerHTML = matchedHTML;

  // Missing skills

  let missingHTML = "";

  if (missingSkills.length === 0) {
    missingHTML = "<p>No missing skills 🎉</p>";
  } else {
    missingSkills.forEach(function (skill) {
      missingHTML += `<span class="skill missing">
                    ${skill}
                </span>`;
    });
  }

  document.getElementById("missingSkills").innerHTML = missingHTML;

  // Scroll to result

  document.getElementById("result").scrollIntoView({
    behavior: "smooth",
  });
}
// ================= SIGN UP =================

function signupUser(event) {
  event.preventDefault();

  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("Account created successfully!");

  window.location.href = "login.html";
}

// ================= LOGIN =================

function loginUser(event) {
  event.preventDefault();

  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let savedEmail = localStorage.getItem("userEmail");
  let savedPassword = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPassword) {
    alert("Login successful!");

    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password. Please Sign Up first.");
  }
}
// ================= FILE UPLOAD =================

let resumeFile = document.getElementById("resumeFile");

if (resumeFile) {
  resumeFile.addEventListener("change", function () {
    let file = this.files[0];

    if (file) {
      document.getElementById("fileName").innerText = file.name;
    }
  });
}
// ================= RESUME ANALYSIS =================

function analyzeResume() {
  let jobDescription = document
    .getElementById("jobDescription")
    .value.toLowerCase();

  let resumeText = document.getElementById("resumeText").value.toLowerCase();

  // Check input

  if (jobDescription.trim() === "") {
    alert("Please enter Job Description.");
    return;
  }

  if (resumeText.trim() === "") {
    alert("Please paste Resume Information.");
    return;
  }

  // Skills list

  let skills = [
    "html",
    "css",
    "javascript",
    "java",
    "python",
    "c++",
    "sql",
    "mysql",
    "mongodb",
    "react",
    "node.js",
    "flask",
    "django",
    "machine learning",
    "artificial intelligence",
    "data science",
    "git",
    "github",
    "excel",
    "power bi",
  ];

  let requiredSkills = [];
  let matchedSkills = [];
  let missingSkills = [];

  // Find required skills

  skills.forEach(function (skill) {
    if (jobDescription.includes(skill)) {
      requiredSkills.push(skill);
    }
  });

  // Find matched skills

  requiredSkills.forEach(function (skill) {
    if (resumeText.includes(skill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // Calculate score

  let score = 0;

  if (requiredSkills.length > 0) {
    score = Math.round((matchedSkills.length / requiredSkills.length) * 100);
  }

  // Candidate name

  let candidateName = "Candidate";

  let nameMatch = resumeText.match(/(?:name|candidate\s*name)\s*[:\-]\s*(.+)/i);

  if (nameMatch) {
    candidateName = nameMatch[1].trim();
  }

  // Save result

  localStorage.setItem("resumeScore", score);

  localStorage.setItem("matchedSkills", JSON.stringify(matchedSkills));

  localStorage.setItem("missingSkills", JSON.stringify(missingSkills));

  localStorage.setItem("candidateName", candidateName);

  // Update dashboard statistics

  let total = Number(localStorage.getItem("totalResumes")) || 0;

  total++;

  localStorage.setItem("totalResumes", total);

  localStorage.setItem("screenedCandidates", total);

  // Shortlist if score >= 70

  if (score >= 70) {
    let shortlisted = Number(localStorage.getItem("shortlisted")) || 0;

    shortlisted++;

    localStorage.setItem("shortlisted", shortlisted);
  }

  // Open result page

  window.location.href = "result.html";
}
