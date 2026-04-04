// Split all text elements
new SplitType('.hero-title', { types: 'chars' });
new SplitType('.hero-top', { types: 'chars' });
new SplitType('.hero-bottom', { types: 'chars' });

const chars = document.querySelectorAll('.char');

gsap.set(chars, {
  opacity: 0,
  y: () => gsap.utils.random(80, 150),
  rotation: () => gsap.utils.random(-120, 120),
  scale: 0.5
});

const tl = gsap.timeline();

tl.to(chars, {
  opacity: 1,
  y: 0,
  rotation: 0,
  scale: 1,
  stagger: {
    each: 0.03,
    from: "random"
  },
  duration: 1.2,
  ease: "back.out(1.7)"
});

tl.to(chars, {
  y: 0,
  duration: 0.3,
  ease: "elastic.out(1, 0.5)"
}, "-=0.5");