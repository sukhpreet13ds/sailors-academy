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
});
