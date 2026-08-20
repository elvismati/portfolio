/* =========================================================
   PREMIUM RESPONSIVE NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {

        if (!hamburger || !navLinks) return;

        navLinks.classList.add("active");
        hamburger.classList.add("active");

        hamburger.setAttribute("aria-expanded", "true");
        hamburger.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");
    }


    function closeMenu() {

        if (!hamburger || !navLinks) return;

        navLinks.classList.remove("active");
        hamburger.classList.remove("active");

        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");

        closeAllDropdowns();
    }


    function toggleMenu() {

        if (!navLinks) return;

        if (navLinks.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    /* =====================================================
       HAMBURGER
    ===================================================== */

    if (hamburger) {

        hamburger.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            toggleMenu();

        });

    }


    /* =====================================================
       DROPDOWNS
    ===================================================== */

    function closeAllDropdowns(except = null) {

        dropdowns.forEach(dropdown => {

            if (dropdown === except) return;

            dropdown.classList.remove("open");

            const toggle =
                dropdown.querySelector(".dropdown-toggle");

            if (toggle) {

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    function openDropdown(dropdown) {

        closeAllDropdowns(dropdown);

        dropdown.classList.add("open");

        const toggle =
            dropdown.querySelector(".dropdown-toggle");

        if (toggle) {

            toggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    }


    function toggleDropdown(dropdown) {

        if (!dropdown) return;

        const isOpen =
            dropdown.classList.contains("open");


        if (isOpen) {

            dropdown.classList.remove("open");

            const toggle =
                dropdown.querySelector(".dropdown-toggle");

            if (toggle) {

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        } else {

            openDropdown(dropdown);

        }

    }


    /* =====================================================
       CHEVRON BUTTONS

       IMPORTANT:
       The chevron controls the dropdown.
       The text link navigates normally.
    ===================================================== */

    dropdownToggles.forEach(toggle => {

        toggle.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            const dropdown =
                toggle.closest(".dropdown");

            if (!dropdown) return;

            toggleDropdown(dropdown);

        });

    });


    /* =====================================================
       DROPDOWN CHILD LINKS
    ===================================================== */

    const dropdownChildLinks =
        document.querySelectorAll(".dropdown-menu a");

    dropdownChildLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 768) {
                closeMenu();
            }

        });

    });


    /* =====================================================
       NORMAL NAVIGATION LINKS
    ===================================================== */

    const normalLinks =
        document.querySelectorAll(
            ".nav-links > li:not(.dropdown) > a"
        );

    normalLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 768) {
                closeMenu();
            }

        });

    });


    /* =====================================================
       DROPDOWN PARENT LINKS

       Services / Portfolio must navigate normally.

       We intentionally DO NOT use preventDefault().
    ===================================================== */

    const dropdownParentLinks =
        document.querySelectorAll(".dropdown-link");

    dropdownParentLinks.forEach(link => {

        link.addEventListener("click", () => {

            /*
             * Do nothing here.
             *
             * The browser will naturally navigate to:
             *
             * services.html
             * portfolio.html
             */

        });

    });


    /* =====================================================
       CLICK OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        const clickedInsideNavbar =
            event.target.closest(".navbar");

        if (!clickedInsideNavbar) {

            closeAllDropdowns();

            if (
                window.innerWidth <= 768 &&
                navLinks &&
                navLinks.classList.contains("active")
            ) {

                closeMenu();

            }

        }

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeAllDropdowns();

            if (
                navLinks &&
                navLinks.classList.contains("active")
            ) {

                closeMenu();

            }

        }

    });


    /* =====================================================
       RESPONSIVE RESET
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            if (navLinks) {
                navLinks.classList.remove("active");
            }

            if (hamburger) {

                hamburger.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       ACTIVE PAGE
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    const servicePages = [
        "services.html",
        "web-development.html",
        "graphic-design.html",
        "virtual-assistant.html"
    ];


    const portfolioPages = [
        "portfolio.html",
        "web-development-portfolio.html",
        "graphic-design-portfolio.html",
        "virtual-assistant-portfolio.html"
    ];


    const allNavLinks =
        document.querySelectorAll(".nav-links a");


    allNavLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href || href === "#") return;


        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .toLowerCase();


        /* Services section */

        if (
            linkPage === "services.html" &&
            servicePages.includes(currentPage)
        ) {

            link.classList.add("active");

            return;
        }


        /* Portfolio section */

        if (
            linkPage === "portfolio.html" &&
            portfolioPages.includes(currentPage)
        ) {

            link.classList.add("active");

            return;
        }


        /* Normal pages */

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       INITIAL ARIA STATE
    ===================================================== */

    dropdownToggles.forEach(toggle => {

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});