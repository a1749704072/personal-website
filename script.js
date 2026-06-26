const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});

const pageSections = [...document.querySelectorAll(".page-section")];
const validPages = new Set(["about", "research", "project", "work", "coursework", "license", "resume", "contact"]);
const aliases = {
    home: "about",
    projects: "project",
    experience: "work"
};

function normalizePage(value) {
    const raw = String(value || "").replace("#", "").toLowerCase();
    const page = aliases[raw] || raw;
    return validPages.has(page) ? page : "about";
}

function currentPageFromHash() {
    return normalizePage(window.location.hash || "about");
}

function setActivePage(page = currentPageFromHash(), shouldScroll = false) {
    const activePage = normalizePage(page);

    pageSections.forEach((section) => {
        section.classList.toggle("active", section.dataset.page === activePage);
    });

    navLinks.forEach((link) => {
        const linkPage = normalizePage(link.getAttribute("href"));
        link.classList.toggle("active", linkPage === activePage);
    });

    if (shouldScroll) {
        window.scrollTo({ top: 0, behavior: "auto" });
    }
}

function navigateTo(page) {
    const activePage = normalizePage(page);
    const nextHash = `#${activePage}`;

    if (window.location.hash !== nextHash) {
        history.pushState(null, "", nextHash);
    }

    setActivePage(activePage, true);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        nav?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
        navigateTo(link.getAttribute("href"));
    });
});

window.addEventListener("hashchange", () => setActivePage(currentPageFromHash(), true));
window.addEventListener("popstate", () => setActivePage(currentPageFromHash(), true));
setActivePage(currentPageFromHash());

const courseData = [
    { title: "Electronics I", category: "Analog" },
    { title: "Electronics II", category: "Analog" },
    { title: "Introduction to Integrated Circuit Design", category: "Analog" },
    { title: "Case Study for Analog and RF Designs", category: "Analog" },
    { title: "RF IC Design", category: "Analog" },
    { title: "Electric Circuits", category: "Analog" },
    { title: "Power Electronics", category: "Analog" },

    { title: "Microelectronics Labs", category: "Lab" },
    { title: "Logic Design Laboratory", category: "Lab" },
    { title: "Solid-State Electronics Laboratory - Semiconductor Processing", category: "Lab" },
    { title: "Electrical Machinery Laboratory", category: "Lab" },
    { title: "General Physics Laboratory I", category: "Lab" },

    { title: "General Physics B I", category: "Science" },
    { title: "General Physics B II", category: "Science" },
    { title: "Modern Physics", category: "Science" },
    { title: "Electromagnetism", category: "Science" },
    { title: "Introduction to Solid-State Electronic Devices", category: "Science" },

    { title: "Logic Design", category: "Digital" },
    { title: "AI Computing Architecture and System (I)", category: "Digital" },
    { title: "Timing Circuit Designs and Their Applications", category: "Digital" },

    { title: "Introduction to Programming", category: "Software" },
    { title: "Generative AI in the Real World", category: "Software" },
    { title: "Introduction to Machine Learning", category: "Software" },

    { title: "Calculus I", category: "Math" },
    { title: "Calculus II", category: "Math" },
    { title: "Ordinary Differential Equations", category: "Math" },
    { title: "Partial Differential Equations and Complex Variables", category: "Math" },
    { title: "Linear Algebra", category: "Math" },
    { title: "Probability", category: "Math" },
    { title: "Signals and Systems", category: "Math" },

    { title: "Academic English Writing", category: "General" },
    { title: "Mandarin Advanced I", category: "General" },
    { title: "Bahasa Indonesia Basic I", category: "General" },
    { title: "Bahasa Indonesia Basic II", category: "General" },
    { title: "Malay Basic I", category: "General" },
    { title: "Career Planning and Life", category: "General" }
];

const filterButtons = document.querySelectorAll(".course-filter");
const courseGrid = document.querySelector(".course-grid");
const emptyMessage = document.querySelector(".course-empty");

function renderCourses(filter = "all") {
    if (!courseGrid) return;

    const selectedCourses = filter === "all"
        ? courseData
        : courseData.filter((course) => course.category.toLowerCase() === filter);

    courseGrid.innerHTML = selectedCourses
        .map((course) => {
            const categoryClass = course.category.toLowerCase();
            return `<span class="course-card category-${categoryClass}" data-category="${categoryClass}">
                <span class="course-title">${course.title}</span>
                <span class="course-category">${course.category}</span>
            </span>`;
        })
        .join("");

    if (emptyMessage) {
        emptyMessage.hidden = selectedCourses.length > 0;
    }
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        renderCourses(filter);
    });
});

renderCourses();
