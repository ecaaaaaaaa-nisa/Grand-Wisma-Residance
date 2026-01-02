// Existing animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
        }
    });
});
document.querySelectorAll('.hero-left, .hero-right, .testimonial')
    .forEach(el => observer.observe(el));

const roomsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-show");
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-card').forEach(el => roomsObserver.observe(el));

// Sync heights - keep
function syncRoomListHeight() {
  const mainCard = document.querySelector('.room-main-card');
  const roomList = document.getElementById('room-list');
  if (!mainCard || !roomList) return;
  const mainHeight = mainCard.getBoundingClientRect().height;
  const gap = 18;
  const count = roomList.querySelectorAll('.room-item').length;
  const available = Math.max(mainHeight - (gap * (count - 1)), 240);
  const per = Math.floor(available / count);
  roomList.querySelectorAll('.room-item').forEach(item => {
    item.style.minHeight = per + 'px';
  });
}
window.addEventListener('load', () => {
  syncRoomListHeight();
  setTimeout(syncRoomListHeight, 400);
});
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(syncRoomListHeight, 120);
});
document.querySelectorAll('.room-main-img').forEach(img => {
  img.addEventListener('load', () => {
    syncRoomListHeight();
  });
});

// Equalize cards - keep
function equalizeRoomCards() {
  const mainCard = document.querySelector('.room-main-card');
  const list = document.getElementById('room-list');
  if (!mainCard || !list) return;
  const mainHeight = mainCard.offsetHeight;
  const items = list.querySelectorAll('.room-item');
  const gapTotal = 24 * (items.length - 1);
  const heightPerCard = (mainHeight - gapTotal) / items.length;
  items.forEach(item => {
    item.style.height = heightPerCard + 'px';
  });
}
window.addEventListener('load', equalizeRoomCards);
window.addEventListener('resize', () => {
  setTimeout(equalizeRoomCards, 100);
});
document.querySelectorAll('.room-main-img, .room-item img').forEach(img => {
  img.addEventListener('load', equalizeRoomCards);
});

// Image Modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close')[0];

document.querySelectorAll('.clickable-denah').forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});

closeBtn.addEventListener('click', function() {
  modal.style.display = "none";
});

modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Gallery for unit pages - keep, Bootstrap handles resize
document.querySelectorAll('.room-gallery').forEach(gallery => {
  const items = gallery.querySelectorAll('.gallery-item');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  let current = 0;

  items.forEach(item => {
    item.onclick = () => {
      current = parseInt(item.dataset.index);
      modalImg.src = images[current];
      modal.classList.add('active');
    };
  });

  document.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
  document.querySelector('.modal-prev').onclick = () => {
    current = (current - 1 + images.length) % images.length;
    modalImg.src = images[current];
  };
  document.querySelector('.modal-next').onclick = () => {
    current = (current + 1) % images.length;
    modalImg.src = images[current];
  };

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') document.querySelector('.modal-prev').click();
    if (e.key === 'ArrowRight') document.querySelector('.modal-next').click();
    if (e.key === 'Escape') document.querySelector('.modal-close').click();
  });
  modal.onclick = e => { if (e.target === modal) modal.classList.remove('active'); };
});
