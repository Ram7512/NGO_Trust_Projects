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

const galleryGrids = document.querySelectorAll(".gallery-grid");
if (galleryGrids.length > 0) {
    const $ = window.jQuery;

    if (!$ || !$.magnificPopup) {
        console.error("Magnific Popup could not be initialized because its dependencies did not load.");
    } else {
        galleryGrids.forEach((galleryGrid) => {
            galleryGrid.querySelectorAll(".gallery-item").forEach((item) => {
                const image = item.querySelector("img");

                if (!image) {
                    console.error("A gallery item is missing its image.", item);
                    return;
                }

                item.setAttribute("role", "button");
                item.setAttribute("tabindex", "0");
                item.setAttribute("aria-label", `View image: ${image.alt}`);

                const openGallery = () => {
                    const visibleItems = Array.from(
                        galleryGrid.querySelectorAll(".gallery-item:not(.hide)")
                    );
                    const popupItems = visibleItems.map((galleryItem) => {
                        const galleryImage = galleryItem.querySelector("img");

                        return {
                            src: galleryImage.currentSrc || galleryImage.src,
                            title: galleryImage.alt
                        };
                    });
                    const currentIndex = visibleItems.indexOf(item);

                    if (currentIndex < 0) {
                        return;
                    }

                    $.magnificPopup.open({
                        items: popupItems,
                        type: "image",
                        mainClass: "mfp-fade",
                        removalDelay: 200,
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0, 1]
                        },
                        image: {
                            titleSrc: "title",
                            verticalFit: true
                        }
                    }, currentIndex);
                };

                item.addEventListener("click", openGallery);
                item.addEventListener("keydown", (event) => {
                    if (event.key !== "Enter" && event.key !== " ") {
                        return;
                    }

                    event.preventDefault();
                    openGallery();
                });
            });
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

