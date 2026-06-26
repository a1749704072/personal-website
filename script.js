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

const sections = [...document.querySelectorAll("main section[id]")];

function updateActiveNav() {
    const offset = window.scrollY + 120;
    let activeId = sections[0]?.id;

    sections.forEach((section) => {
        if (section.offsetTop <= offset) {
            activeId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

const filterButtons = document.querySelectorAll(".course-filter");
const courses = document.querySelectorAll(".course-grid span");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        courses.forEach((course) => {
            const shouldShow = filter === "all" || course.dataset.category === filter;
            course.classList.toggle("hidden", !shouldShow);
        });
    });
});
