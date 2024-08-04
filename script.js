document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const hiddenCards = document.querySelectorAll('.hidden-card');
  const closeButtons = document.querySelectorAll('.close-btn');
  const icons = document.querySelectorAll('.icons i');
  let currentIndex = 0;

  function activateIcon(index) {
    icons.forEach((icon, i) => {
      icon.classList.remove('active');
      icon.classList.remove('jump');
      if (i === index) {
        icon.classList.add('active');
        setTimeout(() => {
          icon.classList.add('jump');
          setTimeout(() => {
            icon.classList.remove('jump');
            icon.classList.remove('active');
          }, 300); // Duration of jump animation
        }, 400); // Duration of shake animation
      }
    });
  }

  function startAnimationSequence() {
    activateIcon(currentIndex);
    currentIndex = (currentIndex + 1) % icons.length;
    setTimeout(startAnimationSequence, 1600); // Total duration: 800ms shake + 800ms delay
  }

  startAnimationSequence();
//cards
  cards.forEach(card => {
      card.addEventListener('click', (event) => {
          const activeCard = document.querySelector('.hidden-card.active');
          if (activeCard) {
              activeCard.classList.remove('active');
              activeCard.style.display = 'none';
          }

          const id = card.id;
          const hiddenCard = document.getElementById(`${id}-hidden`);
          if (hiddenCard && !hiddenCard.classList.contains('active')) {
              hiddenCard.classList.add('active');
              hiddenCard.style.display = 'flex';
              // Trigger reflow to restart CSS animations
              void hiddenCard.offsetWidth;
              hiddenCard.querySelectorAll('h1, p').forEach(el => {
                  el.style.opacity = 0; 
                  el.style.transform = 'translateY(20px)'; // Reset position
                  void el.offsetWidth; // Trigger reflow to restart animation
                  el.style.opacity = 1;
                  el.style.transform = 'translateY(0)';
              });
          }
          event.stopPropagation(); // Prevent the event from bubbling up to the document
      });
  });

  document.addEventListener('click', (event) => {
      const activeCard = document.querySelector('.hidden-card.active');
      if (activeCard && !event.target.closest('.hidden-card')) {
          activeCard.classList.remove('active');
          activeCard.style.display = 'none';
      }
  });

  closeButtons.forEach(btn => {
      btn.addEventListener('click', (event) => {
          hiddenCards.forEach(hiddenCard => {
              if (hiddenCard.classList.contains('active')) {
                  hiddenCard.classList.remove('active');
                  hiddenCard.style.display = 'none';
              }
          });
      });
  });
});
