document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.loading-screen').classList.add('hidden');
        }, 1200);
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        playButtonSound();
    });

    // Search Toggle
    const searchToggle = document.getElementById('searchToggle');
    const navSearch = document.getElementById('navSearch');
    
    searchToggle.addEventListener('click', function() {
        navSearch.classList.toggle('active');
        playButtonSound();
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Gallery item animations
    function animateGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY + windowHeight;
        
        galleryItems.forEach((item, index) => {
            const itemPosition = item.offsetTop;
            
            if (scrollPosition > itemPosition + 100) {
                item.style.animationDelay = `${index * 0.1}s`;
                item.style.animationName = 'fadeInUp';
            }
        });
    }

    // Initialize animations
    window.addEventListener('load', animateGalleryItems);
    window.addEventListener('scroll', animateGalleryItems);

    // Toggle product details
    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const expandedContent = document.getElementById(targetId);
            expandedContent.classList.toggle('active');
            
            if (expandedContent.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Sembunyikan Detail';
                this.classList.add('active');
            } else {
                this.innerHTML = '<i class="fas fa-chevron-down"></i> Detail Produk';
                this.classList.remove('active');
            }
            
            playButtonSound();
        });
    });

    // Change main image in gallery carousel
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mainImageId = this.getAttribute('data-main-image');
            const mainImage = document.getElementById(mainImageId);
            mainImage.src = this.src;
            mainImage.alt = this.alt;
            
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            playButtonSound();
        });
    });

    // Price variation selection
    document.querySelectorAll('.price-variation').forEach(variation => {
        variation.addEventListener('click', function() {
            this.parentElement.querySelectorAll('.price-variation').forEach(v => v.classList.remove('active'));
            this.classList.add('active');
            updateTotalPrice(this.closest('.gallery-details'));
            playButtonSound();
        });
    });

    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                value++;
            } else if (this.classList.contains('minus') && value > 1) {
                value--;
            }
            
            input.value = value;
            updateTotalPrice(this.closest('.gallery-details'));
            playButtonSound();
        });
    });

    // Update total price function
    function updateTotalPrice(detailsContainer) {
        const activeVariation = detailsContainer.querySelector('.price-variation.active');
        const quantityInput = detailsContainer.querySelector('.quantity-input');
        
        if (activeVariation && quantityInput) {
            const price = parseFloat(activeVariation.getAttribute('data-price'));
            const quantity = parseInt(quantityInput.value);
            const totalPrice = price * quantity;
            
            const formattedPrice = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(totalPrice).replace('IDR', 'Rp');
            
            detailsContainer.querySelector('.total-price-value').textContent = formattedPrice;
        }
    }

    // Play button sound function
    function playButtonSound() {
        const sound = document.getElementById('buttonSound');
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio tidak dapat diputar:", e));
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize all interactive components
    initModals();
    initContactForm();
    initNewsletter();
    initSearch();
});

// Initialize modals
function initModals() {
    // Order modal
    const orderModal = document.getElementById('orderModal');
    const quickOrderBtn = document.getElementById('quick-order');
    const closeModal = document.querySelector('.close-modal');
    
    quickOrderBtn.addEventListener('click', () => {
        orderModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        playButtonSound();
    });
    
    closeModal.addEventListener('click', () => {
        orderModal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Image modal
    const imageModal = document.getElementById('imageModal');
    const closeImageModal = document.querySelector('.close-image-modal');
    
    document.querySelectorAll('.gallery-main-image, .thumbnail').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            document.getElementById('zoomedImage').src = this.src;
            imageModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            playButtonSound();
        });
    });
    
    closeImageModal.addEventListener('click', () => {
        imageModal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        
        // Simulate form submission
        setTimeout(() => {
            formStatus.textContent = 'Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.';
            formStatus.className = 'form-status success';
            formStatus.style.display = 'block';
            this.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            playButtonSound();
        }, 1500);
    });
}

// Initialize newsletter
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        
        // Simulate submission
        setTimeout(() => {
            alert(`Terima kasih telah berlangganan dengan ${email}!`);
            this.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            playButtonSound();
        }, 1000);
    });
}

// Initialize search functionality
function initSearch() {
    const searchModal = document.getElementById('searchModal');
    const searchModalInput = document.getElementById('searchModalInput');
    const searchResults = document.getElementById('searchResults');
    const closeSearchModal = document.querySelector('.close-search-modal');
    
    // Open search modal from header search
    document.getElementById('headerSearchBtn').addEventListener('click', function() {
        const query = document.getElementById('headerSearchInput').value.trim();
        if (query) {
            searchModalInput.value = query;
            performSearch(query);
        }
        searchModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        playButtonSound();
    });
    
    // Open search modal from nav search
    document.querySelector('.nav-search button').addEventListener('click', function() {
        const query = document.querySelector('.nav-search input').value.trim();
        if (query) {
            searchModalInput.value = query;
            performSearch(query);
        }
        searchModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        playButtonSound();
    });
    
    // Close search modal
    closeSearchModal.addEventListener('click', function() {
        searchModal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Search when pressing enter in search modal
    searchModalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value.trim());
        }
    });
    
    // Perform search function
    function performSearch(query) {
        if (!query) {
            searchResults.innerHTML = '<div class="no-results">Masukkan kata kunci pencarian</div>';
            return;
        }
        
        searchResults.innerHTML = '<div class="search-loading"><i class="fas fa-spinner fa-spin"></i> Mencari...</div>';
        
        // Simulate search delay
        setTimeout(() => {
            const results = document.querySelectorAll('.gallery-item');
            let found = false;
            
            searchResults.innerHTML = '';
            
            results.forEach(item => {
                const title = item.querySelector('.gallery-title').textContent.toLowerCase();
                const desc = item.querySelector('.gallery-description')?.textContent.toLowerCase() || '';
                
                if (title.includes(query.toLowerCase()) || desc.includes(query.toLowerCase())) {
                    found = true;
                    const clone = item.cloneNode(true);
                    clone.classList.add('search-result-item');
                    clone.style.display = 'block';
                    clone.style.animation = 'none';
                    clone.style.opacity = '1';
                    clone.style.transform = 'none';
                    clone.querySelector('.gallery-detail-expanded')?.remove();
                    searchResults.appendChild(clone);
                    
                    clone.addEventListener('click', () => {
                        searchModal.classList.remove('show');
                        document.body.style.overflow = '';
                        item.scrollIntoView({ behavior: 'smooth' });
                    });
                }
            });
            
            if (!found) {
                searchResults.innerHTML = '<div class="no-results">Tidak ditemukan hasil untuk "' + query + '"</div>';
            }
        }, 500);
    }
}
