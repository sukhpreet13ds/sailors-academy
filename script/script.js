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

    const triggers = document.querySelectorAll('.dropdown-item-trigger');
    const grandSubPanes = document.querySelectorAll('.grand-subitems');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            const targetId = trigger.getAttribute('data-target');
            
            grandSubPanes.forEach(pane => pane.classList.remove('active'));
            
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }

            triggers.forEach(t => t.style.backgroundColor = 'transparent');
            trigger.style.backgroundColor = '#f5f5f5';
        });

        trigger.addEventListener('mouseenter', () => {
            const targetId = trigger.getAttribute('data-target');
            grandSubPanes.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
                triggers.forEach(t => t.style.backgroundColor = 'transparent');
                trigger.style.backgroundColor = '#f5f5f5';
            }
        });
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

    // --- Course Hover Video Logic ---
    const courseBoxes = document.querySelectorAll('.course-box');
    courseBoxes.forEach(box => {
        const video = box.querySelector('.course-hover-video');
        if (video) {
            box.addEventListener('mouseenter', () => {
                video.play().catch(e => console.log('Video play error:', e));
            });
            box.addEventListener('mouseleave', () => {
                video.pause();
                // Optionally reset video time to 0
                // video.currentTime = 0; 
            });
        }
    });
});

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

