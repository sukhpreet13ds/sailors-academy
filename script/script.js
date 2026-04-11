document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchContainerElement = document.getElementById('searchContainer');
    const navLinksElement = document.getElementById('navLinks');
    const searchInput = document.querySelector('.search-input');

    searchBtn.addEventListener('click', (e) => {
        // e.preventDefault();
        const isActive = searchContainerElement.classList.toggle('active');

        if (isActive) {
            navLinksElement.classList.add('fade-out');
            searchInput.focus();
        } else {
            navLinksElement.classList.remove('fade-out');
            searchInput.value = '';
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchContainerElement.contains(e.target) && searchContainerElement.classList.contains('active')) {
            searchContainerElement.classList.remove('active');
            navLinksElement.classList.remove('fade-out');
            searchInput.value = '';
        }
    });

    // Restore trigger logic for side-panel mega menus
    const triggers = document.querySelectorAll('.dropdown-item-trigger');
    const grandSubPanes = document.querySelectorAll('.grand-subitems');

    // --- HIGH-STABILITY LUXURY MEGA MENU ENGINE (Multi-Instance Support) ---
    // Inject Mega Menu Overlay
    if (!document.querySelector('.mega-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mega-menu-overlay';
        document.body.appendChild(overlay);
    }

    document.querySelectorAll('.luxury-mega').forEach(luxuryMega => {
        const parentLi = luxuryMega.parentElement;
        if (!parentLi) return;

        let menuTimeout;

        const showMenu = () => {
            clearTimeout(menuTimeout);
            luxuryMega.classList.add('is-active');
            document.body.classList.add('no-scroll');
            document.body.classList.add('mega-menu-active');
        };

        const hideMenu = () => {
            // A tiny 100ms buffer bridges any physical gaps without feeling like a delay
            menuTimeout = setTimeout(() => {
                luxuryMega.classList.remove('is-active');
                document.body.classList.remove('no-scroll');
                document.body.classList.remove('mega-menu-active');
            }, 100);
        };

        parentLi.addEventListener('mouseenter', showMenu);
        parentLi.addEventListener('mouseleave', hideMenu);

        // Keep menu open when hovering the panel itself
        luxuryMega.addEventListener('mouseenter', showMenu);
        luxuryMega.addEventListener('mouseleave', hideMenu);
    });

    triggers.forEach(trigger => {
        const handleInteraction = () => {
            const targetId = trigger.getAttribute('data-target');
            grandSubPanes.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
                triggers.forEach(t => t.style.backgroundColor = 'transparent');
                trigger.style.backgroundColor = '#f5f5f5';
            }
        };

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            handleInteraction();
        });

        trigger.addEventListener('mouseenter', handleInteraction);
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.count');
    const animationDuration = 2000; // 2 seconds

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            // Easing function (easeOutQuad)
            const easeProgress = progress * (2 - progress);

            const currentCount = easeProgress * target;

            // Format to 1 decimal place if it's not a whole number
            counter.innerText = target % 1 === 0
                ? Math.floor(currentCount)
                : currentCount.toFixed(1);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };

        requestAnimationFrame(updateCount);
    });

    // --- Button Effect Auto-Injection ---
    const effectButtons = document.querySelectorAll('.button-effect');

    effectButtons.forEach(btn => {
        // Prevent double injection
        if (btn.querySelector('.button-inner')) return;

        const originalContent = btn.innerHTML;
        btn.innerHTML = `
            <span class="button-bg">
                <span class="button-bg-layers">
                    <span class="button-bg-layer button-bg-layer-1 -purple"></span>
                    <span class="button-bg-layer button-bg-layer-2 -turquoise"></span>
                    <span class="button-bg-layer button-bg-layer-3 -yellow"></span>
                </span>
            </span>
            <span class="button-inner">
                <span class="button-inner-static">${originalContent}</span>
                <span class="button-inner-hover">${originalContent}</span>
            </span>
        `;
    });

    // --- Mobile Menu Toggle ---
    const burgerMobile = document.querySelector('.burger-mobile');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobile = document.getElementById('closeMobile');

    if (burgerMobile) {
        burgerMobile.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMobile) {
        closeMobile.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // --- Mobile Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('.accordion-header:not(.no-chevron)');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            const isActive = header.classList.toggle('active');

            if (isActive) {
                body.classList.add('show');
            } else {
                body.classList.remove('show');
            }
        });
    });

    const subAccordionHeaders = document.querySelectorAll('.sub-accordion-header');
    subAccordionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const body = header.nextElementSibling;
            const isActive = body.classList.toggle('show');

            const icon = header.querySelector('i');
            if (isActive) {
                icon.style.transform = 'rotate(90deg)';
                header.style.background = 'rgba(255, 255, 255, 0.1)';
            } else {
                icon.style.transform = '';
                header.style.background = '';
            }
        });
    });

    // --- Auto Opening Modal After 5 Seconds ---
    const autoModal = document.getElementById('autoDemoModal');
    if (autoModal) {
        setTimeout(() => {
            const bootstrapModal = new bootstrap.Modal(autoModal);
            bootstrapModal.show();
        }, 5000);
    }

    // --- Desktop Sidebar Toggle ---
    const burgerDesktop = document.querySelector('.burger-menu');
    const desktopSidebar = document.getElementById('desktopSidebar');
    const closeSidebar = document.getElementById('closeSidebar');

    if (burgerDesktop) {
        burgerDesktop.addEventListener('click', (e) => {
            e.stopPropagation();
            desktopSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            desktopSidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    document.addEventListener('click', (e) => {
        if (desktopSidebar && desktopSidebar.classList.contains('active')) {
            if (!desktopSidebar.contains(e.target)) {
                desktopSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // --- Course Hover Video & Mobile Autoplay Logic ---
    const courseBoxes = document.querySelectorAll('.course-box');
    const isMobileTabletWidth = () => window.innerWidth <= 1100;

    courseBoxes.forEach(box => {
        const video = box.querySelector('.course-hover-video');
        if (video) {
            box.addEventListener('mouseenter', () => {
                // Desktop only: play on hover if video is visible
                if (!isMobileTabletWidth()) {
                    video.play().catch(e => console.log('Video play error:', e));
                }
            });
            box.addEventListener('mouseleave', () => {
                // Desktop only: pause on leave
                if (!isMobileTabletWidth()) {
                    video.pause();
                }
            });
        }
    });

    // --- Quick Reference Modal Logic ---
    const quickModal = document.getElementById('quickReferenceModal');
    const openQuickRef = document.querySelectorAll('#openQuickRef, #openQuickRef1, #openQuickRef2, #openQuickRef3');
    const closeQuickRef = document.getElementById('closeQuickRef');

    if (openQuickRef && quickModal) {
        openQuickRef.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                quickModal.classList.add('show');
                document.body.classList.add('no-scroll');
            });
        });
    }

    if (closeQuickRef && quickModal) {
        closeQuickRef.addEventListener('click', () => {
            quickModal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        });
    }

    // Close modal on click outside content
    window.addEventListener('click', (e) => {
        if (e.target === quickModal) {
            quickModal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });

    // --- Offer Bar Close Functionality ---
    const closeOffer = document.getElementById('closeOffer');
    const offerBar = document.getElementById('offerBar');
    const heroSection = document.querySelector('.hero-section');

    if (closeOffer && offerBar) {
        closeOffer.addEventListener('click', () => {
            offerBar.classList.add('hide');
            document.body.classList.add('offer-closed');
            // Reset hero section padding when offer is closed
            if (heroSection) {
                heroSection.style.paddingTop = '50px';
            }
        });
    }

    // --- 404 & Thank You Page Extra Logic ---
    const bookClass404 = document.getElementById('openDemoModal404');
    if (bookClass404) {
        bookClass404.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('autoDemoModal');
            if (modal) {
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            } else {
                // If modal not on page, redirect to home with modal trigger
                window.location.href = 'index.html?openModal=true';
            }
        });
    }

    // --- Performance Optimization: Video Lazy Loading & Mobile Autoplay ---
    const lazyVideos = [].slice.call(document.querySelectorAll("video:not(.hero-video)"));
    if ("IntersectionObserver" in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                const isCourseVideo = video.classList.contains('course-hover-video');

                if (entry.isIntersecting) {
                    // Lazy Loading logic
                    if (video.classList.contains('lazy-video')) {
                        video.querySelectorAll("source").forEach((source) => {
                            if (source.dataset.src) {
                                source.src = source.dataset.src;
                            }
                        });
                        video.load();
                        video.classList.remove("lazy-video");
                    }

                    // Mobile/Tablet Autoplay: Only for course videos on small screens
                    if (isCourseVideo && isMobileTabletWidth()) {
                        video.play().catch(e => console.log('Autoplay play error:', e));
                    }

                    // Only unobserve non-course videos
                    // We need to keep observing course videos to pause them on scroll out
                    if (!isCourseVideo) {
                        videoObserver.unobserve(video);
                    }
                } else {
                    // Mobile/Tablet Pause: Pause course videos when they exit viewport
                    if (isCourseVideo && isMobileTabletWidth()) {
                        video.pause();
                    }
                }
            });
        }, { threshold: 0.5 });

        lazyVideos.forEach((video) => {
            videoObserver.observe(video);
        });
    }
});

// Optimization: Throttle function for high-frequency events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Rank Section Scroll Animations & Counter ---
    const rankSection = document.querySelector('.rank-section');
    if (rankSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    rankSection.classList.add('is-visible');

                    const rankCounters = rankSection.querySelectorAll('.rank-counter');
                    const rankAnimDuration = 2000;

                    rankCounters.forEach(counter => {
                        // Prevent re-animation if already done
                        if (counter.classList.contains('counted')) return;
                        counter.classList.add('counted');

                        const target = parseFloat(counter.getAttribute('data-target'));
                        const startTime = performance.now();

                        const updateCount = (currentTime) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / rankAnimDuration, 1);

                            const easeProgress = progress * (2 - progress); // easeOutQuad
                            const currentCount = easeProgress * target;

                            counter.innerText = Math.floor(currentCount);

                            if (progress < 1) {
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target;
                            }
                        };

                        requestAnimationFrame(updateCount);
                    });

                    observer.unobserve(rankSection);
                }
            });
        }, { threshold: 0.2 }); // Triggers when 20% of section is visible

        observer.observe(rankSection);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // --- Deep Zoom Animations Generic Observer ---
    const genericAnimSections = document.querySelectorAll('.has-scroll-anim');
    const genericObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                genericObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    genericAnimSections.forEach(sec => genericObserver.observe(sec));
});

(function () {
    // Intersection Observer for fade-scroll animation
    const fadeElements = document.querySelectorAll('.fade-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });
    fadeElements.forEach(el => observer.observe(el));

    // also make mission-card visible manually, they are fade-scroll
    // additional: ensure team members already have cardGlideUp no extra needed
    // CTA button interactive alert (simple)
    const ctaBtn = document.getElementById('ctaJoinBtn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("🚀 Thank you for your interest! Sailor’s Academy welcomes you. Contact us for enrollment details or visit our campus in Ludhiana.");
        });
    }

    // Add a small hover parallax effect for team images? Already included
    // ensure images placeholder note: if assets missing, fallback to placeholder (inline onerror already there)
    // preload any additional smoothness: console free
    // Add floating animation to value icons - optional for extra life
    const valueIcons = document.querySelectorAll('.value-icon i');
    if (valueIcons.length) {
        // simple pulse subtle on hover handled in css
    }
    // optional additional animation: give team cards extra entrance + shadow dynamic
    console.log("About Us Section Loaded with high-end animations & responsive layout");
})();

/* Dynamic Hero Word Cycler */
document.addEventListener('DOMContentLoaded', () => {
    const dynamicWord = document.querySelector('.dynamic-word');
    if (dynamicWord) {
        const words = ["Skills.", "Jobs.", "Income."];
        let currentIndex = 0;

        const cycleWords = () => {
            // Start fade out
            dynamicWord.classList.add('fade-out');
            dynamicWord.classList.remove('fade-in');

            setTimeout(() => {
                // Change word
                currentIndex = (currentIndex + 1) % words.length;
                dynamicWord.textContent = words[currentIndex];

                // Start fade in
                dynamicWord.classList.remove('fade-out');
                dynamicWord.classList.add('fade-in');
            }, 250); // Matches CSS transition duration
        };

        // Initialize first state
        dynamicWord.classList.add('fade-in');
        
        // Start interval
        setInterval(cycleWords, 3000); // Change every 3 seconds
    }

    // --- About Section Read More Toggle ---
    const toggleBtn = document.getElementById('toggleAboutBtn');
    const extraContent = document.getElementById('aboutExtraContent');

    if (toggleBtn && extraContent) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = extraContent.classList.contains('is-expanded');
            
            if (isExpanded) {
                extraContent.classList.remove('is-expanded');
                toggleBtn.textContent = 'Read more';
            } else {
                extraContent.classList.add('is-expanded');
                toggleBtn.textContent = 'Show less';
            }
        });
    }
});

/* E-Certificate Form Submission Logic */
document.addEventListener('DOMContentLoaded', () => {
    const eCertificateForm = document.getElementById('eCertificateForm');
    if (eCertificateForm) {
        eCertificateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = eCertificateForm.querySelector('.btn-generate .button-inner-static');
            const submitBtnHover = eCertificateForm.querySelector('.btn-generate .button-inner-hover');
            
            if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
            if (submitBtnHover) submitBtnHover.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
        });
    }
});