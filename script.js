document.addEventListener('DOMContentLoaded', function () {
  // --- BAGIAN BARU: LOGIKA THEME SWITCHER ---
  const themeSwitcher = document.getElementById('theme-switcher');
  const themes = ['default', 'pink', 'dark'];
  let currentThemeIndex = 0;

  // Cek tema yang tersimpan di localStorage saat halaman dimuat
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
  }

  // Tambahkan event listener untuk tombol
  themeSwitcher.addEventListener('click', () => {
    // Pindah ke tema berikutnya, kembali ke 0 jika sudah di akhir
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[currentThemeIndex];

    // Terapkan tema ke body
    document.body.setAttribute('data-theme', nextTheme);

    // Simpan pilihan tema
    localStorage.setItem('selectedTheme', nextTheme);
  });

  // --- KODE LAMA DIMULAI DARI SINI ---
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

  function checkPassword() {
    const correctPassword = 'sayangkamu';
    const enteredPassword = passwordInput.value;

    if (enteredPassword === correctPassword) {
      passwordGate.style.display = 'none';
      websiteContent.style.display = 'block';
      document.getElementById('background-music').play();
      initializeWebsiteFunctions();
    } else {
      errorMessage.textContent = 'Kata sandi salah, coba lagi ya!';
      passwordInput.value = '';
    }
  }

  function initializeWebsiteFunctions() {
    document.addEventListener('contextmenu', (event) => event.preventDefault());
    AOS.init({ duration: 800, once: true });
    calculateDays();
    setupPhotoLightbox();
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
});
