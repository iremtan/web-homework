const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form input[name="q"]');
const productGrid = document.querySelector('.product-grid');
const productCards = productGrid ? Array.from(productGrid.querySelectorAll('.product-card')) : [];
const categoryButtons = Array.from(document.querySelectorAll('.category-button'));
const noResults = document.querySelector('.no-results-message');

let activeCategory = 'all';

function matchesCategory(cardCategory, category) {
    return category === 'all' || cardCategory === category;
}

function updateProductVisibility() {
    if (!productGrid) return;
    const query = (searchInput?.value || '').trim().toLowerCase();
    let found = false;

    productCards.forEach(card => {
        const title = card.querySelector('.product-info h3')?.textContent?.toLowerCase() || '';
        const price = card.querySelector('.price')?.textContent?.toLowerCase() || '';
        const category = card.dataset.category || 'all';

        const matchesSearch = !query || title.includes(query) || price.includes(query);
        const matchesFilter = matchesCategory(category, activeCategory);
        const visible = matchesSearch && matchesFilter;

        if (visible) {
            card.classList.remove('hidden');
            found = true;
        } else {
            card.classList.add('hidden');
        }
    });

    if (noResults) noResults.hidden = found;
}

function setActiveCategory(category) {
    activeCategory = category;
    categoryButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.category === category);
    });
    updateProductVisibility();
}

if (categoryButtons.length) {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveCategory(button.dataset.category || 'all');
        });
    });
}

if (searchForm && window.location.pathname.endsWith('products.html')) {
    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        updateProductVisibility();
    });
}

if (searchInput) {
    searchInput.addEventListener('input', updateProductVisibility);
}

if (window.location.pathname.endsWith('products.html')) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    const category = params.get('category') || 'all';

    if (category) {
        setActiveCategory(category);
    }

    if (query) {
        searchInput.value = query;
    }

    updateProductVisibility();
}

const lightboxOverlay = document.querySelector('.lightbox-overlay');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxTriggers = Array.from(document.querySelectorAll('.lightbox-trigger'));

function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.hidden = true;
    lightboxImage.src = '';
    lightboxImage.alt = '';
}

function openLightbox(src, alt) {
    if (!lightboxOverlay || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightboxOverlay.hidden = false;
}

lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
        event.preventDefault();
        const link = event.currentTarget;
        const src = link.getAttribute('href');
        const alt = link.querySelector('img')?.alt || '';
        openLightbox(src, alt);
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', event => {
        if (event.target === lightboxOverlay) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});
