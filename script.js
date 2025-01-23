// Vaccine suggestions based on age
const vaccineData = {
    "0-2": ["Hepatitis B", "DTaP", "Hib", "IPV", "PCV", "RV", "MMR", "Varicella"],
    "3-18": ["DTaP", "IPV", "MMR", "HPV", "MenACWY", "Influenza"],
    "19-64": ["Tdap", "Influenza", "HPV", "Shingles", "Pneumococcal"],
    "65+": ["Influenza", "Pneumococcal", "Shingles", "Tdap"]
};

// Vaccines for animal bites
const animalVaccineData = {
    "dog": ["Rabies", "Tetanus"],
    "cat": ["Rabies", "Tetanus"],
    "other": ["Rabies", "Tetanus"]
};

// Show age-wise vaccines
function showVaccines(ageGroup) {
    const vaccineList = document.getElementById('vaccineList');
    vaccineList.innerHTML = "";

    if (vaccineData[ageGroup]) {
        vaccineData[ageGroup].forEach(vaccine => {
            const card = document.createElement('div');
            card.className = 'vaccine-card';
            card.innerHTML = `
                <h3><i class="fas fa-syringe"></i> ${vaccine}</h3>
                <p>Recommended for ages ${ageGroup}.</p>
            `;
            vaccineList.appendChild(card);
        });
    } else {
        vaccineList.innerHTML = "<p>No suggestions available for this age group.</p>";
    }
}

// Show vaccines for animal bites
function showAnimalVaccines(animalType) {
    const animalVaccineList = document.getElementById('animalVaccineList');
    animalVaccineList.innerHTML = "";

    if (animalVaccineData[animalType]) {
        animalVaccineData[animalType].forEach(vaccine => {
            const card = document.createElement('div');
            card.className = 'vaccine-card';
            card.innerHTML = `
                <h3><i class="fas fa-syringe"></i> ${vaccine}</h3>
                <p>Recommended for ${animalType} bites.</p>
            `;
            animalVaccineList.appendChild(card);
        });
    } else {
        animalVaccineList.innerHTML = "<p>No suggestions available for this animal type.</p>";
    }
}

// Booking Form Submission
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const vaccine = document.getElementById('vaccine').value;
    const date = document.getElementById('date').value;

    // Redirect to Google Calendar
    const eventDetails = {
        summary: `Vaccination: ${vaccine} for ${name}`,
        description: `Don't forget your vaccination appointment for ${vaccine} on ${date}.`,
        start: `${date}T09:00:00`,
        end: `${date}T10:00:00`
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.summary)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.description)}`;
    window.open(googleCalendarUrl, '_blank');

    // Clear the form
    document.getElementById('bookingForm').reset();
});

// Google Maps Integration
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 28.6139, lng: 77.2090 }, // Default to New Delhi
        zoom: 12,
    });

    const marker = new google.maps.Marker({
        position: { lat: 28.6139, lng: 77.2090 },
        map: map,
        title: "Vaccination Center",
    });
}

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    alert(`Thank you, ${name}! Your message has been sent. We will contact you shortly.`);

    // Clear the form
    document.getElementById('contactForm').reset();
});
// Function to process payment (mock integration)
function processPayment() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const vaccine = document.getElementById('vaccine').value;
    const center = document.getElementById('center').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Mock payment integration (replace with actual payment gateway)
    alert(`Payment processed for ${name}. Appointment scheduled for ${date} at ${time}.`);

    // Clear the form
    document.getElementById('appointmentForm').reset();
}
// Function to process payment using Razorpay
function processPayment() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const vaccine = document.getElementById('vaccine').value;
    const center = document.getElementById('center').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Validate form fields
    if (!name || !email || !phone || !vaccine || !center || !date || !time) {
        alert("Please fill out all fields.");
        return;
    }

    // Razorpay payment options
    const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: 50000, // Amount in paise (e.g., 50000 = ₹500)
        currency: "INR",
        name: "Vaccination Reminder",
        description: "Payment for Vaccination Appointment",
        image: "https://example.com/logo.png", // Add your logo URL
        handler: function (response) {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            // Redirect or show success message
            window.location.href = "success.html"; // Redirect to a success page
        },
        prefill: {
            name: name,
            email: email,
            contact: phone,
        },
        theme: {
            color: "#4CAF50", // Green theme
        },
    };

    // Open Razorpay payment modal
    const rzp = new Razorpay(options);
    rzp.open();
}
// Vaccine data for age groups
const vaccines = {
    "0-2": [
        { name: "Hepatitis B", purpose: "Protects against Hepatitis B virus" },
        { name: "DTaP", purpose: "Protects against Diphtheria, Tetanus, and Pertussis" },
        { name: "Hib", purpose: "Protects against Haemophilus influenzae type b" },
    ],
    "3-18": [
        { name: "MMR", purpose: "Protects against Measles, Mumps, and Rubella" },
        { name: "Varicella", purpose: "Protects against Chickenpox" },
        { name: "HPV", purpose: "Protects against Human Papillomavirus" },
    ],
    "19-64": [
        { name: "Influenza", purpose: "Protects against seasonal flu" },
        { name: "Tdap", purpose: "Protects against Tetanus, Diphtheria, and Pertussis" },
    ],
    "65+": [
        { name: "Shingles", purpose: "Protects against Shingles" },
        { name: "Pneumococcal", purpose: "Protects against Pneumonia" },
    ],
};

// Animal bite vaccines
const animalVaccines = {
    dog: { name: "Rabies", purpose: "Protects against Rabies from dog bites" },
    cat: { name: "Rabies", purpose: "Protects against Rabies from cat bites" },
    other: { name: "Tetanus", purpose: "Protects against Tetanus from animal bites" },
};

// Show vaccines for selected age group
function showVaccines(ageGroup) {
    const vaccineList = document.getElementById("vaccineList");
    vaccineList.innerHTML = vaccines[ageGroup]
        .map(
            (vaccine) =>
                `<button data-purpose="${vaccine.purpose}">${vaccine.name}</button>`
        )
        .join("");
}

// Show vaccines for selected animal
function showAnimalVaccines(animal) {
    const animalVaccineList = document.getElementById("animalVaccineList");
    const vaccine = animalVaccines[animal];
    animalVaccineList.innerHTML = `<button data-purpose="${vaccine.purpose}">${vaccine.name}</button>`;
}

// Handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("paymentSection").style.display = "block";
});

// Handle payment button click
document.getElementById("paymentButton").addEventListener("click", function () {
    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("paymentConfirmation").style.display = "block";

    setTimeout(() => {
        const name = document.getElementById("name").value;
        const vaccine = document.getElementById("vaccine").value;
        const date = document.getElementById("date").value;

        // Format date for Google Calendar
        const formattedDate = new Date(date).toISOString().replace(/-|:|\.\d+/g, "");
        const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            `Vaccination: ${vaccine}`
        )}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(
            `Name: ${name}\nVaccine: ${vaccine}`
        )}`;

        // Open Google Calendar in a new tab
        window.open(googleCalendarLink, "_blank");
    }, 2000); // Simulate 2-second payment processing
});
