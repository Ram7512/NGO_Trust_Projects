// Initialize AOS Animation
AOS.init({
    duration: 1500,
    easing: "ease-in-out",
    once: true,
    offset: 100
});


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

        // cutout: '70%',

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