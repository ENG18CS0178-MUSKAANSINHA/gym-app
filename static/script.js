// ===== User Authentication with Local Storage =====

// Signup logic
function signupUser(event) {
  event.preventDefault();

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check if user already exists
  if (users.some(user => user.email === email)) {
    alert("User already exists! Please login.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful! Please login.");
  window.location.href = "login.html";
}

// Login logic
function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(user => user.email === email && user.password === password);

  if (validUser) {
    localStorage.setItem("currentUser", JSON.stringify(validUser));
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password!");
  }
}

// Logout
function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// Check authentication
function checkAuth() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
  }
}

// ===== Workout Tracking =====

// Add workout
function addWorkout(event) {
  event.preventDefault();

  const exercise = document.getElementById("exercise").value;
  const duration = document.getElementById("duration").value;
  const date = document.getElementById("date").value;

  if (!exercise || !duration || !date) {
    alert("Please fill all workout fields!");
    return;
  }

  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  workouts.push({ exercise, duration, date });
  localStorage.setItem("workouts", JSON.stringify(workouts));

  displayWorkouts();
}

// Display workouts in table
function displayWorkouts() {
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  const tbody = document.querySelector("#workoutTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  workouts.forEach((w, index) => {
    const row = `
      <tr>
        <td>${w.exercise}</td>
        <td>${w.duration} mins</td>
        <td>${w.date}</td>
        <td><button onclick="deleteWorkout(${index})">❌</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Delete workout
function deleteWorkout(index) {
  let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  workouts.splice(index, 1);
  localStorage.setItem("workouts", JSON.stringify(workouts));
  displayWorkouts();
}

