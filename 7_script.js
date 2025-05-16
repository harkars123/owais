function ChangeAboutMeText() {
    const aboutMeTexts = ["Tech Enthusiast", "Software Engineer", "FullStack Web Developer"];
    const typingSpeed = 100;
    const eraseSpeed = 50;
    const pauseTime = 1500;
    const aboutMeElement = document.querySelector('.about-me');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = aboutMeTexts[textIndex];
        if (!isDeleting && charIndex < currentText.length) {
            aboutMeElement.textContent += currentText[charIndex];
            charIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            aboutMeElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, eraseSpeed);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                textIndex = (textIndex + 1) % aboutMeTexts.length;
            }
            setTimeout(type, pauseTime);
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    });

    // Initialize About Me text typewriter effect
    ChangeAboutMeText();

    // Intersection Observer for progress bars
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = progressBar.dataset.progress;
                progressBar.style.setProperty('--progress', `${progress}%`);
                progressBar.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    });

    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        observer.observe(skill);
    });

    // Toggle the navigation menu for mobile view
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav-menu-visible');
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.close');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    function openModal(modal) {
        if (modal == null) return;
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.style.display = 'none';
    }

    // Carousel functionality
    function showSlides(slideIndex, container) {
        const slides = container.querySelectorAll('img');
        slides.forEach((slide, index) => {
            slide.style.display = index === slideIndex ? 'block' : 'none';
        });
    }

    function moveSlide(button, direction) {
        const container = button.closest('.carousel-container').querySelector('.carousel-slide');
        const slides = container.querySelectorAll('img');
        let slideIndex = Array.from(slides).findIndex(slide => slide.style.display === 'block');

        slideIndex = (slideIndex + direction + slides.length) % slides.length;
        showSlides(slideIndex, container);
    }

    const prevButtons = document.querySelectorAll('.prev');
    const nextButtons = document.querySelectorAll('.next');

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveSlide(button, -1);
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveSlide(button, 1);
        });
    });

    // Initialize the first slide as active for each carousel
    const carousels = document.querySelectorAll('.carousel-slide');
    carousels.forEach(carousel => {
        showSlides(0, carousel);
    });
});
