const welcomeDialog = document.querySelector(".welcome-dialog");

if (welcomeDialog) {
    const welcomeDialogClose = welcomeDialog.querySelector(".welcome-dialog-close");
    const welcomeDialogAction = welcomeDialog.querySelector(".welcome-dialog-action");

    welcomeDialog.showModal();

    welcomeDialogClose.addEventListener("click", () => {
        welcomeDialog.close();
    });

    welcomeDialogAction.addEventListener("click", () => {
        welcomeDialog.close();
    });

    welcomeDialog.addEventListener("click", (event) => {
        if (event.target === welcomeDialog) {
            welcomeDialog.close();
        }
    });
}

if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        offset: 80,
        disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
}


const stats = document.querySelectorAll(".floating-stat");

stats.forEach((card, index) => {

    card.animate([
        {
            transform: "translateY(0px)"
        },
        {
            transform: "translateY(-12px)"
        },
        {
            transform: "translateY(0px)"
        }
    ], {
        duration: 2000 + (index * 600),
        iterations: Infinity
    });

});


// Graph

const ctx = document.getElementById("impactChart");

if (ctx) {
    const chartWrapper = ctx.closest(".chart-wrapper");

    if (chartWrapper) {
        const chartObserver = new IntersectionObserver((entries, observer) => {
            if (!entries.some((entry) => entry.isIntersecting)) {
                return;
            }

            observer.disconnect();

            new Chart(ctx, {
                type: "pie",
                data: {
                    labels: [
                        "Women Empowerment",
                        "Education",
                        "Agriculture",
                        "Health",
                        "SHGs"
                    ],
                    datasets: [{
                        data: [35, 20, 18, 12, 15],
                        backgroundColor: [
                            "#c64e44",
                            "#f4a261",
                            "#2a9d8f",
                            "#457b9d",
                            "#8d99ae"
                        ],
                        borderColor: "#fff",
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    animation: {
                        animateRotate: true,
                        duration: 2000
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }, { threshold: 0.25 });

        chartObserver.observe(chartWrapper);
    }
}

const galleryGrid = document.querySelector(".gallery-grid");
const galleryLightbox = document.querySelector(".gallery-lightbox");
if (galleryGrid && galleryLightbox) {
    const galleryLightboxImage = galleryLightbox.querySelector(".gallery-lightbox-image");
    const galleryLightboxClose = galleryLightbox.querySelector(".gallery-lightbox-close");

    if (galleryLightboxImage && galleryLightboxClose) {
        function openGalleryImage(item) {
            const image = item.querySelector("img");

            galleryLightboxImage.src = image.currentSrc || image.src;
            galleryLightboxImage.alt = image.alt;
            galleryLightbox.showModal();
        }

        galleryGrid.querySelectorAll(".gallery-item").forEach((item) => {
            const image = item.querySelector("img");

            item.setAttribute("role", "button");
            item.setAttribute("tabindex", "0");
            item.setAttribute("aria-label", `View image: ${image.alt}`);
        });

        galleryGrid.addEventListener("click", (event) => {
            const item = event.target.closest(".gallery-item");

            if (item) {
                openGalleryImage(item);
            }
        });

        galleryGrid.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            const item = event.target.closest(".gallery-item");

            if (item) {
                event.preventDefault();
                openGalleryImage(item);
            }
        });

        galleryLightboxClose.addEventListener("click", () => {
            galleryLightbox.close();
        });

        galleryLightbox.addEventListener("click", (event) => {
            if (event.target === galleryLightbox) {
                galleryLightbox.close();
            }
        });
    }
}


// Gallery page code //

/* =================================
   GALLERY FILTER
================================= */

const filterButtons = document.querySelectorAll(".gallery-filter");

const galleryCards = document.querySelectorAll(".gallery-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Active button change
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory = button.dataset.filter;

        // Filter images
        galleryCards.forEach((card) => {

            const cardCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === cardCategory
            ) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }

        });

    });

});

