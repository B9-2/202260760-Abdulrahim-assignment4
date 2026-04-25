// Save visitor name
const visitorName = document.getElementById("visitorName");
const saveNameBtn = document.getElementById("saveNameBtn");
const welcomeMessage = document.getElementById("welcomeMessage");

const savedName = localStorage.getItem("visitorName");
if (savedName) {
  welcomeMessage.textContent = `Welcome, ${savedName}!`;
  visitorName.value = savedName;
}

function saveVisitorName() {
  const nameValue = visitorName.value.trim();

  if (nameValue === "") {
    welcomeMessage.textContent = "Please enter your name.";
    welcomeMessage.style.color = "red";
    return;
  }

  localStorage.setItem("visitorName", nameValue);
  welcomeMessage.textContent = `Welcome, ${nameValue}!`;
  welcomeMessage.style.color = "inherit";
}

saveNameBtn.addEventListener("click", saveVisitorName);

visitorName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    saveVisitorName();
  }
});

// Load saved theme
const toggleBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "Light mode";
}

// Dark/Light mode toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "Light mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "Dark mode";
    localStorage.setItem("theme", "light");
  }
});

// Search, filter, and sort projects
const searchInput = document.getElementById("projectSearch");
const filterProjects = document.getElementById("filterProjects");
const sortProjects = document.getElementById("sortProjects");
const projectList = document.getElementById("projectList");
const emptyMessage = document.getElementById("emptyMessage");

const originalProjects = Array.from(projectList.querySelectorAll(".project-card"));

function updateProjects() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const selectedCategory = filterProjects.value;
  const sortValue = sortProjects.value;

  let projects = [...originalProjects];

  projects = projects.filter((project) => {
    const title = project.dataset.title.toLowerCase();
    const text = project.textContent.toLowerCase();
    const category = project.dataset.category;

    const matchesSearch =
      title.includes(searchValue) || text.includes(searchValue);
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (sortValue === "az") {
    projects.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
  } else if (sortValue === "za") {
    projects.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
  }

  projectList.innerHTML = "";

  projects.forEach((project) => {
    projectList.appendChild(project);
  });

  if (projects.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}

searchInput.addEventListener("input", updateProjects);
filterProjects.addEventListener("change", updateProjects);
sortProjects.addEventListener("change", updateProjects);

// Contact form validation
const contactForm = document.getElementById("contactForm");
const myName = document.getElementById("myName");
const myEmail = document.getElementById("myEmail");
const myMessage = document.getElementById("myMessage");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValue = myName.value.trim();
  const emailValue = myEmail.value.trim();
  const messageValue = myMessage.value.trim();

  if (nameValue === "" || emailValue === "" || messageValue === "") {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.style.color = "red";
    return;
  }

  if (nameValue.length < 3) {
    formMessage.textContent = "Name must be at least 3 characters long.";
    formMessage.style.color = "red";
    return;
  }

  if (!emailValue.includes("@") || !emailValue.includes(".")) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "red";
    return;
  }

  if (messageValue.length < 10) {
    formMessage.textContent = "Message must be at least 10 characters long.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Message sent successfully.";
  formMessage.style.color = "green";

  contactForm.reset();
});

// GitHub API integration
const loadReposBtn = document.getElementById("loadReposBtn");
const repoStatus = document.getElementById("repoStatus");
const repoList = document.getElementById("repoList");

async function loadRepositories() {
  repoStatus.textContent = "Loading repositories...";
  repoStatus.style.color = "inherit";
  repoList.innerHTML = "";

  try {
    const response = await fetch("https://api.github.com/users/B9-2/repos");

    if (!response.ok) {
      throw new Error("Failed to fetch repositories.");
    }

    let repos = await response.json();

    repos = repos.filter((repo) => repo.name !== "202260760-Abdulrahim-assignment2");

    repos.sort((a, b) => a.name.localeCompare(b.name));

    if (repos.length === 0) {
      repoStatus.textContent = "No repositories found.";
      return;
    }

    repoStatus.textContent = "";

    repos.forEach((repo) => {
      const repoCard = document.createElement("article");
      repoCard.className = "repo-card";

      repoCard.innerHTML = `
        <h3>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
        </h3>
        <p class="repo-description">
          ${repo.description ? repo.description : "No description available."}
        </p>
        <p class="repo-meta">
          ${repo.language ? `Main language: ${repo.language}` : "Language not specified"}
        </p>
      `;

      repoList.appendChild(repoCard);
    });
  } catch (error) {
    repoStatus.textContent =
      "Could not load GitHub repositories. Please try again later.";
    repoStatus.style.color = "red";
  }
}

loadReposBtn.addEventListener("click", loadRepositories);

// Run on page load
updateProjects();
loadRepositories();