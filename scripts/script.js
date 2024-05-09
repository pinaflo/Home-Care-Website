// Image slider functionality
// Selecting DOM elements
let menu = document.querySelector('.menu-icon');
let menuicon = document.querySelector('.menu-icon-i');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

// Toggle navbar menu on menu icon click
menu.onclick = () => {
	// console.log("Hello")
	menuicon.classList.toggle('fa-xmark');
	navbar.classList.toggle('open');
	navtc.classList.toggle("nav-touch-close-open");
}

// Close navbar menu on navigation touch close button click
navtc.onclick = () => {
	menuicon.classList.toggle('fa-xmark');
	navbar.classList.remove('open');
	navtc.classList.remove('nav-touch-close-open');
	navtc.classList.remove("nav-tc-z");
}

let slideIndex = 0;
const slidesLength = document.getElementsByClassName("slide").length;
const dotsLength = document.getElementsByClassName("dot").length;

// Showing slides if elements exist
if (slidesLength && dotsLength) {
	showSlides(slideIndex);
}

// Function to move to next slide
function nextSlide() {
	showSlides(slideIndex += 1);
}

// Function to move to previous slide
function prevSlide() {
	showSlides(slideIndex -= 1);
}

// Function to move to a specific slide
function currentSlide(n) {
	showSlides(slideIndex = n);
}

// Function to show slides
function showSlides() {
	const slides = document.getElementsByClassName("slide");
	const dots = document.getElementsByClassName("dot");

	if (slideIndex >= slides.length) {
		slideIndex = 0;
	}

	if (slideIndex < 0) {
		slideIndex = slides.length - 1;
	}

	for (let i = 0; i < slides.length; i++) {
		slides[i].style.transform = `translateX(-${slideIndex * 100}%)`;
		slides[i].classList.remove("active");
	}

	for (let i = 0; i < dots.length; i++) {
		dots[i].classList.remove("active");
	}

	slides[slideIndex].classList.add('active');
	dots[slideIndex].className += " active";
}

// Auto slide
// if (slidesLength && dotsLength) {
// 	setInterval(() => {
// 		nextSlide();
// 	}, 5000);
// }

let testimonials = document.querySelectorAll('.testimonial-card-wrapper');
let dots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 1; // Start with the first testimonial as active

function showTestimonials() {
	testimonials.forEach(testimonial => testimonial.classList.remove('active'));
	testimonials[currentTestimonial].classList.add('active');

	dots.forEach(dot => dot.classList.remove('active'));
	dots[currentTestimonial].classList.add('active');

	let shift = (currentTestimonial - 1) * -30;; // Calculate the shift needed to move the active testimonial to the middle
	if (window.innerWidth <= 800) {
		shift = (currentTestimonial) * -100;
	}
	// console.log(shift);
	document.querySelector('.testimonial-container').style.transform = `translateX(${shift}%)`;
}

function nextTestimonial() {
	currentTestimonial = (currentTestimonial + 1) % testimonials.length;
	showTestimonials();
}

function prevTestimonial() {
	currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
	showTestimonials();
}

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		currentTestimonial = index;
		showTestimonials();
	});
});

function autoSlide() {
	setInterval(() => {
		nextTestimonial();
	}, 5000); // Change interval time as needed (5000 milliseconds = 5 seconds)
}

// autoSlide(); // Start automatic sliding

const contactSection = document.querySelector('.contact-section');
const formSection = document.querySelector('.form-section');
const contactSubmitAfter = document.querySelector('.contact-submit-after');
const csaOK = document.querySelector('.csa-ok');


const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv = document.querySelector('.error');
const emailErrorDiv = document.querySelector('.email-error');
const contactButton = document.querySelector('.contact-button');
const contactLoad = document.querySelector('.contact-load');
const submitText = document.querySelector('.submit-text');

if (csaOK) {
	csaOK.onclick = () => {
		contactSubmitAfter.classList.remove('show');
		formSection.classList.remove('hide');
		contactSection.classList.remove('csa-cs');
		contactForm.classList.remove('csa-cf');
		contactButton.classList.remove('loading');
		contactLoad.classList.remove('show');
		submitText.classList.remove('hide');
		// contactSubmitAfter.classList.add('hide');
	}
}

// Function to validate the form
function validateForm(event) {
	event.preventDefault(); // Prevent the form from submitting
	let isValid = true;
	emailIsValid = true;
	nameIsValid = true;
	messageIsValid = true;

	// Check if Name field is empty
	if (nameInput.value.trim() === '') {
		isValid = false;
		nameIsValid = false;
	}

	// Check if Email field is empty or not a valid email address
	if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
		isValid = false;
		if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value)) {
			emailIsValid = false;
		}
	}

	// Check if Message field is empty
	if (messageInput.value.trim() === '') {
		isValid = false;
		messageIsValid = false;
	}

	if (!isValid) {
		// Display the error message
		errorDiv.classList.add('error-show');
		emailErrorDiv.classList.remove('error-show');
		if (nameIsValid && messageIsValid && !emailIsValid) {
			errorDiv.classList.remove('error-show');
			emailErrorDiv.classList.add('error-show');
		}
	} else {
		// Form is valid, it can be sumbitted now
		emailErrorDiv.classList.remove('error-show');
		errorDiv.classList.remove('error-show');
		contactButton.classList.add('loading');
		contactLoad.classList.add('show');
		submitText.classList.add('hide');
		setTimeout(function () {
			sendMail();
		}, 2000);
	}
}

// Function to validate email format using a regular expression
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Event listener for form submission
if (contactForm) {
	contactForm.addEventListener('submit', validateForm);
}


// After adding the Email Js APi key in the script tag of the contact.html, uncomment this function section

function sendMail() {

	contactSubmitAfter.classList.add('show');
	formSection.classList.add('hide');
	contactSection.classList.add('csa-cs');
	contactForm.classList.add('csa-cf');

	var params = {
		name: document.getElementById('name').value,
		email: document.getElementById('email').value,
		message: document.getElementById('message').value
	}

	const serviceID = "service_evf2wim";
	const templateID = "template_v085uvl";

	emailjs.send(serviceID, templateID, params)
		.then(
			res => {
				document.getElementById('name').value = "";
				document.getElementById('email').value = "";
				document.getElementById('message').value = "";

				contactSubmitAfter.classList.add('show');
				formSection.classList.add('hide');
				contactSection.classList.add('csa-cs');
				contactForm.classList.add('csa-cf');

			}
		)
		.catch((error) => {
			console.log(error);
		})
}