
/* =========================================================
   DEL LOGGING INC.
   WEBSITE INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");

    const navLinks =
        document.querySelectorAll(".main-nav a");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("active");

            menuToggle.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    const header =
        document.querySelector(".site-header");


    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        };


        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );


        updateHeader();

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-label, " +
            ".intro-content, " +
            ".service-card, " +
            ".operations-image, " +
            ".operations-content, " +
            ".project-card, " +
            ".value, " +
            ".quote-intro, " +
            ".quote-form-wrapper"
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       SERVICE CARD STAGGER
    ====================================================== */

    document
        .querySelectorAll(".service-card")
        .forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 70}ms`;

        });


    /* =====================================================
       PROJECT CARD STAGGER
    ====================================================== */

    document
        .querySelectorAll(".project-card")
        .forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 100}ms`;

        });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerOffset =
                        window.innerWidth <= 720
                            ? 70
                            : 20;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerOffset;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       QUOTE FORM
    ====================================================== */

    const quoteForm =
        document.querySelector("#quoteForm");

    const formStatus =
        document.querySelector("#formStatus");

    const submitButton =
        quoteForm?.querySelector(
            ".form-submit"
        );


    if (quoteForm) {

        quoteForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                if (!quoteForm.checkValidity()) {

                    quoteForm.reportValidity();

                    return;

                }


                const originalButtonText =
                    submitButton.innerHTML;


                submitButton.disabled = true;

                submitButton.innerHTML =
                    "SENDING REQUEST...";


                formStatus.textContent = "";

                formStatus.className =
                    "form-status";


                try {

                    const response =
                        await fetch(
                            quoteForm.action,
                            {
                                method: "POST",

                                body:
                                    new FormData(
                                        quoteForm
                                    ),

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (response.ok) {

                        quoteForm.reset();

                        formStatus.textContent =
                            "Thank you. Your quote request has been received. We'll be in touch.";

                        formStatus.classList.add(
                            "success"
                        );

                    } else {

                        throw new Error(
                            "Submission failed."
                        );

                    }

                } catch (error) {

                    formStatus.textContent =
                        "We couldn't send your request. Please try again or contact us directly by email.";

                    formStatus.classList.add(
                        "error"
                    );

                }


                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButtonText;

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom span:first-child"
        );


    if (footerYear) {

        footerYear.textContent =
            footerYear.textContent.replace(
                /\d{4}/,
                new Date().getFullYear()
            );

    }

});


/* =====================================================
   QUOTE REQUEST MODAL
====================================================== */

const quoteModal =
    document.querySelector("#quoteModal");

const quoteOpenButtons =
    document.querySelectorAll(".open-quote");

const quoteClose =
    document.querySelector("#quoteClose");

const quoteBackdrop =
    document.querySelector(
        ".quote-modal-backdrop"
    );

const quoteForm =
    document.querySelector("#quoteForm");

const formStatus =
    document.querySelector("#formStatus");

const submitButton =
    quoteForm?.querySelector(
        ".form-submit"
    );


/* Open modal */

const openQuoteModal = () => {

    if (!quoteModal) return;

    quoteModal.classList.add("active");

    quoteModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "quote-open"
    );

};


/* Close modal */

const closeQuoteModal = () => {

    if (!quoteModal) return;

    quoteModal.classList.remove("active");

    quoteModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "quote-open"
    );

};


/* Open buttons */

quoteOpenButtons.forEach((button) => {

    button.addEventListener(
        "click",
        openQuoteModal
    );

});


/* Close button */

if (quoteClose) {

    quoteClose.addEventListener(
        "click",
        closeQuoteModal
    );

}


/* Click outside modal */

if (quoteBackdrop) {

    quoteBackdrop.addEventListener(
        "click",
        closeQuoteModal
    );

}


/* Escape key */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            quoteModal?.classList.contains("active")
        ) {

            closeQuoteModal();

        }

    }
);


/* =====================================================
   NETLIFY FORM SUBMISSION
====================================================== */

if (quoteForm) {

    quoteForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (!quoteForm.checkValidity()) {

                quoteForm.reportValidity();

                return;

            }


            const originalButton =
                submitButton.innerHTML;


            submitButton.disabled = true;

            submitButton.innerHTML =
                "SENDING REQUEST...";


            formStatus.textContent = "";

            formStatus.className =
                "form-status";


            try {

                const formData =
                    new FormData(quoteForm);


                const response =
                    await fetch(
                        "/",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded"
                            },

                            body:
                                new URLSearchParams(
                                    formData
                                ).toString()
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Form submission failed."
                    );

                }


                /*
                 * Successful submission.
                 */

                formStatus.textContent =
                    "Request received. Thank you.";


                formStatus.classList.add(
                    "success"
                );


                submitButton.innerHTML =
                    "REQUEST RECEIVED ✓";


                /*
                 * Give the visitor a moment
                 * to see the confirmation.
                 */

                setTimeout(() => {

                    quoteForm.reset();

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalButton;

                    closeQuoteModal();

                    /*
                     * Return to the top of
                     * the main website.
                     */

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }, 1800);


            } catch (error) {

                formStatus.textContent =
                    "Something went wrong. Please try again or contact us directly.";


                formStatus.classList.add(
                    "error"
                );


                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButton;

            }

        }
    );

}