/* =========================================================
     Testimonial carousel
     Cycles the 3 testimonial cards. On desktop all 3 show at
     once (arrows just re-order which one is "active"); on
     narrow layouts responsive.css switches the grid into a
     single visible slide, and this script moves that slide.
  ========================================================= */
  (function () {
    const grid = document.getElementById('testimonialGrid');
    const cards = grid ? Array.from(grid.children) : [];
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let index = 0;

    function isSlideMode() {
      // Matches the breakpoint in responsive.css where testimonials stack into a slider
      return window.matchMedia('(max-width: 768px)').matches;
    }

    function update() {
      if (!isSlideMode()) {
        cards.forEach(card => card.classList.remove('is-hidden'));
        return;
      }
      cards.forEach((card, i) => card.classList.toggle('is-hidden', i !== index));
    }

    function setActiveButton(btn) {
      [prevBtn, nextBtn].forEach(b => b && b.classList.remove('active'));
      btn && btn.classList.add('active');
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + cards.length) % cards.length;
        setActiveButton(prevBtn);
        update();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % cards.length;
        setActiveButton(nextBtn);
        update();
      });
    }

    window.addEventListener('resize', update);
    update();
  })();

  /* =========================================================
     Smooth scroll for in-page anchor links (View My Work,
     Get In Touch, Explore All Projects/Services, etc.)
  ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = targetId.length > 1 ? document.querySelector(targetId) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


/* =========================================================
   I DESIGN & CREATE - TYPING ANIMATION
========================================================= */

const createDynamic = document.getElementById("createDynamic");

if (createDynamic) {

  const createItems = [
    "Web Design & Development",
    "Business Websites",
    "Hotel Websites",
    "Portfolio Websites",
    "E-commerce Websites",
    "Logos & Brand Identity",
    "Posters & Flyers",
    "Marketing Banners",
    "Social Media Graphics",
    "Email Management",
    "Calendar Management",
    "Administrative Support"
  ];

  let itemIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const typingSpeed = 85;
  const deletingSpeed = 45;
  const pauseAfterTyping = 1800;
  const pauseAfterDeleting = 500;

  function typeCreateItem() {

    const currentItem = createItems[itemIndex];

    if (!deleting) {

      createDynamic.textContent =
        currentItem.substring(0, characterIndex + 1);

      characterIndex++;

      if (characterIndex === currentItem.length) {

        setTimeout(() => {
          deleting = true;
          typeCreateItem();
        }, pauseAfterTyping);

        return;
      }

      setTimeout(typeCreateItem, typingSpeed);

    } else {

      createDynamic.textContent =
        currentItem.substring(0, characterIndex - 1);

      characterIndex--;

      if (characterIndex === 0) {

        deleting = false;

        itemIndex =
          (itemIndex + 1) % createItems.length;

        setTimeout(typeCreateItem, pauseAfterDeleting);

        return;
      }

      setTimeout(typeCreateItem, deletingSpeed);
    }
  }

  typeCreateItem();
}