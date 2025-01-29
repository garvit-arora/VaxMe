// Vaccine suggestions based on age
const vaccineData = {
    "0-2": ["Hepatitis B", "DTaP", "Hib", "IPV", "PCV", "RV", "MMR", "Varicella"],
    "3-18": ["DTaP", "IPV", "MMR", "HPV", "MenACWY", "Influenza"],
    "19-64": ["Tdap", "Influenza", "HPV", "Shingles", "Pneumococcal"],
    "65+": ["Influenza", "Pneumococcal", "Shingles", "Tdap"]
};

// Vaccines for animal bites
const animalVaccineData = {
    "dog": ["Rabies"],
    "cat": ["Rabies"],
    "other": ["Rabies"]
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
// Function to generate Google Calendar link
function generateGoogleCalendarLink(name, vaccine, date) {
    const formattedDate = new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        `Vaccination: ${vaccine}`
    )}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(
        `Name: ${name}\nVaccine: ${vaccine}`
    )}&location=Vaccination Center`;
}

// Handle booking form submission
document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Show the sync button
    document.getElementById('syncSection').style.display = 'block';

    // Handle sync button click
    document.getElementById('syncCalendarBtn').addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const vaccine = document.getElementById('vaccine').value;
        const date = document.getElementById('date').value;

        // Generate Google Calendar link
        const googleCalendarLink = generateGoogleCalendarLink(name, vaccine, date);

        // Open Google Calendar in a new tab
        window.open(googleCalendarLink, '_blank');
    });
});
// Function to generate Google Calendar link
function generateGoogleCalendarLink(name, vaccine, date) {
    const formattedDate = new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        `Vaccination: ${vaccine}`
    )}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(
        `Name: ${name}\nVaccine: ${vaccine}`
    )}&location=Vaccination Center`;
}

// Handle appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value;
    const vaccine = document.getElementById('vaccine').value;
    const date = document.getElementById('date').value;

    // Generate Google Calendar link
    const googleCalendarLink = generateGoogleCalendarLink(name, vaccine, date);

    // Set the href attribute of the anchor tag
    const syncLink = document.getElementById('syncCalendarLink');
    syncLink.href = googleCalendarLink;

    // Show the sync section
    document.getElementById('syncSection').style.display = 'block';
});
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer.style.right === '0px') {
        chatContainer.style.right = '-400px'; // Hide chat
    } else {
        chatContainer.style.right = '0px'; // Show chat
    }
}

function showVaccineInfo() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = `
        <div>Please select a disease to learn about its vaccine:</div>
        <div id="optionsContainer">
            <button class="optionBtn" onclick="showVaccineForDisease('COVID-19')">COVID-19</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Measles')">Measles</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Polio')">Polio</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Hepatitis B')">Hepatitis B</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Influenza')">Influenza</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Chickenpox')">Chickenpox</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Mumps')">Mumps</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Rubella')">Rubella</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Hepatitis A')">Hepatitis A</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Diphtheria')">Diphtheria</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Tetanus')">Tetanus</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Whooping Cough')">Whooping Cough</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Dog Bite')">Dog Bite (Rabies)</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Typhoid')">Typhoid</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Yellow Fever')">Yellow Fever</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Meningitis')">Meningitis</button>
            <button class="optionBtn" onclick="showVaccineForDisease('Rotavirus')">Rotavirus</button>
        </div>
    `;
}

function showVaccineForDisease(disease) {
    const chatBox = document.getElementById('chatBox');
    const vaccineInfo = {
        'COVID-19': 'The COVID-19 vaccine prevents severe illness caused by the coronavirus. It is available in different brands and requires 2 or more doses.',
        'Measles': 'Measles is a contagious viral disease that can be prevented by the MMR vaccine (Measles, Mumps, Rubella). It is given in two doses, usually at age 1 and 4.',
        'Polio': 'Polio is a viral disease that can cause paralysis. The polio vaccine is given as an oral or inactivated injectable vaccine, starting at 2 months of age.',
        'Hepatitis B': 'Hepatitis B is a viral infection that affects the liver. The Hepatitis B vaccine is usually given in 3 doses over a period of 6 months, starting at birth.',
        'Influenza': 'The flu vaccine is given annually to protect against seasonal flu. It is typically given to children from age 6 months onwards.',
        'Chickenpox': 'The chickenpox vaccine helps prevent chickenpox, a contagious disease. It is typically given in 2 doses, starting at age 1.',
        'Mumps': 'Mumps is a contagious disease that causes swollen salivary glands. The Mumps vaccine is part of the MMR vaccine and is given to children from age 1.',
        'Rubella': 'Rubella (German measles) can cause birth defects in pregnant women. The Rubella vaccine is part of the MMR vaccine and is given to children from age 1.',
        'Hepatitis A': 'The Hepatitis A vaccine prevents Hepatitis A, a viral liver disease. It is given in 2 doses, typically starting at age 1.',
        'Diphtheria': 'Diphtheria is a bacterial infection that affects the respiratory system. The Diphtheria vaccine is given as part of the DTaP vaccine series.',
        'Tetanus': 'Tetanus is a bacterial infection that causes muscle spasms. The Tetanus vaccine is given as part of the DTaP vaccine series.',
        'Whooping Cough': 'Whooping cough (Pertussis) is a contagious respiratory disease. The vaccine is given as part of the DTaP vaccine series.',
        'Dog Bite': 'Rabies is a fatal disease transmitted by animal bites. If bitten by an animal, you should seek immediate medical help and may need the rabies vaccine.',
        'Typhoid': 'Typhoid fever is a bacterial infection. The Typhoid vaccine is given in a single dose or as a series of doses depending on the type.',
        'Yellow Fever': 'Yellow Fever is a viral disease spread by mosquitoes. The Yellow Fever vaccine is given in a single dose.',
        'Meningitis': 'Meningitis is an infection of the brain and spinal cord. There are different vaccines depending on the type of bacteria or virus causing the infection.',
        'Rotavirus': 'Rotavirus causes severe diarrhea in young children. The Rotavirus vaccine is given orally, typically in 2 or 3 doses starting at 2 months of age.',
    };
    chatBox.innerHTML = `
        <div>${vaccineInfo[disease]}</div>
        <div id="optionsContainer">
            <button class="optionBtn" onclick="showVaccineInfo()">Know more about vaccines</button>
            <button class="optionBtn" onclick="callAgent()">Talk to an agent</button>
        </div>
    `;
}

function callAgent() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = `
        <div>You will be connected to an agent shortly. Please wait...</div>
        <div id="optionsContainer">
            <button class="optionBtn" onclick="showVaccineInfo()">Know about vaccines</button>
            <button class="optionBtn" onclick="callAgent()">Call another agent</button>
        </div>
    `;
    setTimeout(() => {
        chatBox.innerHTML += '<div>An agent is now available. How can I assist you further?</div>';
    }, 2000);
}
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDbxdhFMvPPiZP4uDOFExE6B8oTk3LqSJ8",
    authDomain: "vaxify-957e6.firebaseapp.com",
    projectId: "vaxify-957e6",
    storageBucket: "vaxify-957e6.firebasestorage.app",
    messagingSenderId: "948078390575",
    appId: "1:948078390575:web:df400b425591229a25c5da",
    measurementId: "G-1MHC78BXMV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
window.onload = function() {
        const userName = localStorage.getItem("userName");
        if (userName) {
            document.getElementById("userNameDisplay").innerText = `Welcome, ${userName}!`;
            document.getElementById ("loginBtn").style.display = "none";
            document.getElementById("logoutBtn").style.display = "inline";
        } else {
            document.getElementById("loginBtn").style.display = "inline";
        }
    };

    function logout() {
        localStorage.removeItem("userName");
        window.location.reload(); // Reload the page to update the UI
    }
// Check if the user is logged in
        window.onload = function() {
            const userName = localStorage.getItem("userName");
            if (userName) {
                document.getElementById("userNameDisplay").innerText = `Welcome, ${userName}!`;
                document.getElementById("loginBtn").style.display = "none";
                document.getElementById("logoutBtn").style.display = "inline";
            } else {
 document.getElementById("loginBtn").style.display = "inline";
                document.getElementById("logoutBtn").style.display = "none";
            }
        };

        function logout() {
            localStorage.removeItem("userName");
            window.location.reload(); // Reload the page to update the UI
        }
