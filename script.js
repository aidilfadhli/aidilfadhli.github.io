document.addEventListener('DOMContentLoaded', function () {
  // --- BAGIAN 1: PENGATURAN AWAL & EVENT LISTENER ---
  const passwordGate = document.getElementById('password-gate');
  const websiteContent = document.getElementById('website-content');
  const passwordInput = document.getElementById('password-input');
  const submitButton = document.getElementById('submit-button');
  const errorMessage = document.getElementById('error-message');

  submitButton.addEventListener('click', checkPassword);
  passwordInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      checkPassword();
    }
  });

  // --- BAGIAN 2: FUNGSI UNTUK MENGECEK PASSWORD ---
  function checkPassword() {
    const correctPassword = 'sayangkamu';
    const enteredPassword = passwordInput.value;

    if (enteredPassword === correctPassword) {
      // Jika password benar:
      passwordGate.style.display = 'none';
      websiteContent.style.display = 'block';

      // ===============================================
      // PERINTAH BARU: PUTAR MUSIK LATAR
      document.getElementById('background-music').play();
      // ===============================================

      initializeWebsiteFunctions();
    } else {
      errorMessage.textContent = 'Kata sandi salah, coba lagi ya!';
      passwordInput.value = '';
    }
  }

  // --- BAGIAN 3: SEMUA FUNGSI WEBSITE (DIJALANKAN SETELAH LOGIN) ---
  function initializeWebsiteFunctions() {
    // Pengaman: Menonaktifkan Klik Kanan
    document.addEventListener('contextmenu', (event) => event.preventDefault());

    // Inisialisasi Animasi AOS
    AOS.init({ duration: 800, once: true });

    // Fungsi Penghitung Hari
    calculateDays();

    // Logika Lightbox HANYA UNTUK FOTO
    setupPhotoLightbox();

    // Logika untuk Video Player Kustom
    setupCustomVideoPlayer();
  }

  function calculateDays() {
    const startDate = new Date(2024, 10, 18);
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    document.getElementById('days').innerText = dayDiff;
  }

  function setupPhotoLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const polaroidCards = document.querySelectorAll('.polaroid-card');
    const closeButton = document.querySelector('.close-button');

    polaroidCards.forEach((card) => {
      if (card.querySelector('img')) {
        card.addEventListener('click', () => {
          const imageSrc = card.querySelector('img').src;
          lightboxImage.src = imageSrc;
          modal.style.display = 'flex';
        });
      }
    });

    const closeModal = () => (modal.style.display = 'none');
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
  }

  function setupCustomVideoPlayer() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    videoWrappers.forEach((wrapper) => {
      const video = wrapper.querySelector('video');
      wrapper.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          wrapper.classList.add('playing');
        } else {
          video.pause();
          wrapper.classList.remove('playing');
        }
      });
      video.addEventListener('ended', () => {
        wrapper.classList.remove('playing');
      });
    });
  }
});
