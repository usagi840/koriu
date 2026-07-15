/* ==========================================
   KORIU
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*====================================
      Mobile Menu
    ====================================*/

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (nav.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }

    /*====================================
      Close menu after clicking a link
    ====================================*/

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 768) {

                nav.classList.remove("active");

                menuBtn.querySelector("i").classList.remove("fa-xmark");
                menuBtn.querySelector("i").classList.add("fa-bars");

            }

        });

    });

    /*====================================
      Sticky Header Shadow
    ====================================*/

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {

            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow = "none";

        }

    });

    /*====================================
      Smooth Scroll
    ====================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

    /*====================================
      Active Navigation
    ====================================*/

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveLink() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (pageYOffset >= top &&
                pageYOffset < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    /*====================================
      Scroll Reveal Animation
    ====================================*/

    const revealItems = document.querySelectorAll(
        ".product-card, .feature, .section-title"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: .15

    });

    revealItems.forEach(item => {

        item.style.opacity = 0;
        item.style.transform = "translateY(40px)";
        item.style.transition = ".7s ease";

        observer.observe(item);

    });

    /*====================================
      Product Buttons (Demo Cart)
    ====================================*/

    let cart = 0;

    const badge = document.querySelector(".cart-count");

    document.querySelectorAll(".circle-btn").forEach(button => {

        button.addEventListener("click", () => {

            cart++;

            badge.textContent = cart;

            badge.animate([

                { transform: "scale(1)" },
                { transform: "scale(1.4)" },
                { transform: "scale(1)" }

            ], {

                duration: 300

            });

        });

    });

    /*====================================
      Newsletter Validation
    ====================================*/

    const newsletter = document.querySelector(".newsletter");

    if (newsletter) {

        newsletter.addEventListener("submit", (e) => {

            e.preventDefault();

            const email = newsletter.querySelector("input");

            const value = email.value.trim();

            const regex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regex.test(value)) {

                alert("Veuillez entrer une adresse e-mail valide.");

                email.focus();

                return;

            }

            alert("Merci pour votre inscription !");

            newsletter.reset();

        });

    }

    /*====================================
      Hero Buttons Ripple Effect
    ====================================*/

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + "px";

            ripple.style.left = e.clientX - rect.left - size / 2 + "px";
            ripple.style.top = e.clientY - rect.top - size / 2 + "px";

            ripple.className = "ripple";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /*====================================
      Current Year
    ====================================*/

    const copyright = document.querySelector(".copyright");

    if (copyright) {

        copyright.innerHTML =
            `© ${new Date().getFullYear()} Koriu. Tous droits réservés.`;

    }

});