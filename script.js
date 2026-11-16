
/* ==========================================
   NEXORA
   Billing Toggle & Plan Selection
========================================== */


/* 1. SELECT BILLING BUTTONS */

var monthlyBtn = document.getElementById("monthly");
var yearlyBtn = document.getElementById("yearly");


/* 2. SELECT PRICES AND BILLING LABELS */

var prices = document.querySelectorAll(".price");
var units = document.querySelectorAll(".unit");


/* 3. BILLING PERIOD FUNCTION */

function setPeriod(period) {

    // Update all pricing cards

    prices.forEach(function(price) {

        var selectedPrice = price.dataset[period];

        price.textContent = Number(
            selectedPrice
        ).toLocaleString("en-IN");

    });


    // Update billing labels

    units.forEach(function(unit) {

        if (period === "monthly") {

            unit.textContent = "per month";

        } else {

            unit.textContent = "per year";

        }

    });


    // Update active button styles

    monthlyBtn.classList.toggle(
        "active",
        period === "monthly"
    );

    yearlyBtn.classList.toggle(
        "active",
        period === "yearly"
    );


    // Update accessibility attributes

    monthlyBtn.setAttribute(
        "aria-pressed",
        String(period === "monthly")
    );

    yearlyBtn.setAttribute(
        "aria-pressed",
        String(period === "yearly")
    );

}


/* 4. BILLING BUTTON EVENTS */

monthlyBtn.addEventListener("click", function() {

    setPeriod("monthly");

});


yearlyBtn.addEventListener("click", function() {

    setPeriod("yearly");

});


/* 5. DEFAULT BILLING PERIOD */

setPeriod("monthly");



/* ==========================================
   PLAN SELECTION MODAL
========================================== */


/* 6. SELECT MODAL ELEMENTS */

var planButtons = document.querySelectorAll(".plan-button");

var modal = document.getElementById("planModal");

var closeModal = document.getElementById("closeModal");

var selectedPlan = document.getElementById("selectedPlan");

var selectedPrice = document.getElementById("selectedPrice");

var selectedUnit = document.getElementById("selectedUnit");

var confirmPlan = document.getElementById("confirmPlan");


/* 7. STORE PREVIOUSLY FOCUSED ELEMENT */

var previousFocus = null;


/* 8. OPEN MODAL FUNCTION */

function openPlanModal(button) {

    // Remember the clicked button

    previousFocus = button;


    // Get selected plan name

    var planName = button.dataset.plan;


    // Find the corresponding pricing card

    var card = button.closest(".pricing-card");


    // Get current displayed price

    var price = card.querySelector(".price");


    // Get current billing label

    var unit = card.querySelector(".unit");


    // Update modal content

    selectedPlan.textContent = planName + " Plan";

    selectedPrice.textContent = Number(
        price.textContent.replace(/,/g, "")
    ).toLocaleString("en-IN");

    selectedUnit.textContent = unit.textContent;


    // Display modal

    modal.hidden = false;


    // Move keyboard focus to close button

    closeModal.focus();

}


/* 9. PLAN BUTTON CLICK EVENTS */

planButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        openPlanModal(button);

    });

});


/* 10. CLOSE MODAL FUNCTION */

function hideModal() {

    modal.hidden = true;


    // Return focus to the button that opened it

    if (previousFocus) {

        previousFocus.focus();

    }

}


/* 11. CLOSE BUTTON EVENT */

closeModal.addEventListener("click", function() {

    hideModal();

});


/* 12. CLOSE WHEN CLICKING OUTSIDE */

modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        hideModal();

    }

});


/* 13. CLOSE USING ESCAPE KEY */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape" && !modal.hidden) {

        hideModal();

    }

});


/* 14. CONFIRM SELECTION */

confirmPlan.addEventListener("click", function() {

    var planName = selectedPlan.textContent;

    alert(
        "Thank you for exploring NEXORA!\n\n" +
        planName +
        " selected successfully.\n\n" +
        "This is a demo project. No payment was processed."
    );

    hideModal();

});
