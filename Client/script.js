let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let autoSlide;
let userInteracted = false;

// Function to show slides
function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));

    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    let activeSlide = slides[slideIndex];
    activeSlide.classList.add("active");

    let textBox = activeSlide.querySelector(".text-box");
    if (textBox) {
        textBox.style.opacity = "0";
        textBox.style.transform = "translateX(-50px)";
        textBox.style.transition = "none"; // Reset transition

        setTimeout(() => {
            textBox.style.transition = "opacity 1s ease-in-out, transform 1s ease-in-out";
            textBox.style.opacity = "1";
            textBox.style.transform = "translateX(0)";
        }, 800); // Delay text transition for smooth effect
    }

    // Start auto-slide only if the user has not interacted
    if (!userInteracted) {
        autoSlide = setTimeout(() => {
            slideIndex++;
            showSlides();
        }, 5000);
    }
}

// Function to handle manual navigation
function moveSlide(n) {
    clearTimeout(autoSlide); // Stop auto-slide
    userInteracted = true; // Mark user interaction
    slideIndex += n;
    showSlides();

    // Resume auto-slide after 5 sec of inactivity
    setTimeout(() => {
        userInteracted = false;
        showSlides();
    }, 5000);
}

// Start slideshow when the page loads
document.addEventListener("DOMContentLoaded", showSlides);

// Add event listeners for arrow buttons
document.getElementById("prev").addEventListener("click", () => moveSlide(-1));
document.getElementById("next").addEventListener("click", () => moveSlide(1));
function openLoginPage() {
    window.location.href = "login.html";  // Redirect to login.html
}
function checkPasswordStrength() {
    let password = document.getElementById("password").value;
    let strengthText = document.getElementById("password-strength");

    // Check password length
    if (password.length < 8) {
        strengthText.innerHTML = "Password must be at least 8 characters.";
        strengthText.className = "weak";
        return;
    }

    // Regular expressions for strength validation
    let weakPattern = /[a-z]/; 
    let mediumPattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/; 
    let strongPattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/; 

    // Evaluate strength
    if (strongPattern.test(password)) {
        strengthText.innerHTML = "Strong password ✅";
        strengthText.className = "strong";
    } else if (mediumPattern.test(password)) {
        strengthText.innerHTML = "Medium password ⚠️";
        strengthText.className = "medium";
    } else if (weakPattern.test(password)) {
        strengthText.innerHTML = "Weak password ❌";
        strengthText.className = "weak";
    }
}