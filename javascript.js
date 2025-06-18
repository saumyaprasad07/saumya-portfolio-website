function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Project Cards Animation
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer to detect when project cards enter viewport
    const cards = document.querySelectorAll('.project-card');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Add animation class when card enters viewport
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      }, {
        threshold: 0.2 // Trigger when 20% of the card is visible
      });
  
      // Observe each card
      cards.forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      cards.forEach(card => {
        card.classList.add('is-visible');
      });
    }
    
    // Add hover effect on project cards (optional)
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.querySelector('.project-title').style.color = '#3498db';
      });
      
      card.addEventListener('mouseleave', function() {
        this.querySelector('.project-title').style.color = '#333';
      });
    });
  });
  
  // Add this CSS to your stylesheet

document.head.insertAdjacentHTML('beforeend', `
    <style>
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .animate-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
    </style>
  `);


  document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Function to update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * (100 / slideCount)}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Disable/enable buttons based on position
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === slideCount - 1 ? '0.5' : '1';
    }
    
    // Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < slideCount - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            if (currentIndex < slideCount - 1) {
                currentIndex++;
                updateCarousel();
            }
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }
    
    // Auto-advance carousel (optional, remove if not wanted)
    let autoAdvance = setInterval(() => {
        if (currentIndex < slideCount - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);
    
    // Stop auto-advance on user interaction
    document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });
    
    // Initialize carousel
    updateCarousel();
});