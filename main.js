// HALAMAN INDEX 

function createHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return; 

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';

        const opacity = Math.random() * 0.4 + 0.1;
        particle.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;

        const duration = Math.random() * 8 + 4;
        particle.style.animation = `floatParticle ${duration}s linear infinite`;

        particle.style.animationDelay = Math.random() * 5 + 's';

        hero.appendChild(particle);
    }
}

// Event listener untuk halaman load
window.addEventListener('load', createHeroParticles);

// Hover effect untuk job cards
const jobCards = document.querySelectorAll('.job-card');
jobCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Hover effect untuk blog cards
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Hover effect untuk nav links
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'transform 0.3s ease';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animasi untuk semua nav links dan about button
document.addEventListener('DOMContentLoaded', function() {
    const allNavLinks = document.querySelectorAll('a[href*=".html"]');

    allNavLinks.forEach((link, index) => {
        if(!link.closest('.footer-social') && !link.classList.contains('apply-btn')) {
            link.addEventListener('mouseenter', function() {
                this.style.textShadow = '0 2px 4px rgba(0, 58, 140, 0.2)';
                this.style.transform = 'scale(1.05)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.textShadow = 'none';
                this.style.transform = 'scale(1)';
            });

            if(link.closest('.nav-menu')) {
                link.style.opacity = '0';
                link.style.transform = 'translateY(-5px)';

                setTimeout(() => {
                    link.style.transition = 'all 0.5s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, 100 * (index + 1));
            }
        }
    });

    // Event listener untuk about button
    const aboutBtn = document.querySelector('.about-btn');
    if(aboutBtn) {
        aboutBtn.addEventListener('click', function() {
            window.location.href = 'tentang.html';
        });
    }
});

const searchInput = document.querySelector(".search-input");
const searchBox = document.querySelector(".search-box");

if (searchInput && searchBox) {
    searchInput.addEventListener("focus", () => {
        searchBox.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.25)";
    });

    searchInput.addEventListener("blur", () => {
        searchBox.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
    });
}

// function redirectToJobPage() {
//     const select = document.getElementById('keahlian');
//     const selectedValue = select.value;

//     if (selectedValue) {
//         window.location.href = selectedValue;
//     }
// }

// ===================== SEARCH & FILTER LOWONGAN =====================
// GANTI semua bagian search & filter yang lama dengan ini

// Fungsi redirect ke halaman kategori
function redirectToJobPage() {
    const select = document.getElementById('keahlian');
    const selectedValue = select.value;

    if (selectedValue) {
        window.location.href = selectedValue;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const lowonganSearch = document.querySelector('.lowongan-search');
    const filterSelect = document.getElementById('keahlian');
    const resetBtn = document.querySelector('.filter-reset');
    const jobCards = document.querySelectorAll('.job-card');

    // Hanya jalankan jika elemen ada (halaman lowongan)
    if (!filterSelect) return;

    // ===== AUTO SELECT DROPDOWN BERDASARKAN HALAMAN SAAT INI =====
    const currentPage = window.location.pathname.split('/').pop();
    
    // Mapping halaman ke value dropdown
    const pageToOption = {
        'lowongan_webdev_uiux.html': 'lowongan_webdev_uiux.html',
        'lowongan_entre_bisdig.html': 'lowongan_entre_bisdig.html',
        'lowongan_cyber_security.html': 'lowongan_cyber_security.html',
        'lowongan_data_scientist.html': 'lowongan_data_scientist.html',
        'lowongan_digital_forensic.html': 'lowongan_digital_forensic.html'
    };

    // Set dropdown ke pilihan yang sesuai dengan halaman saat ini
    if (pageToOption[currentPage]) {
        filterSelect.value = pageToOption[currentPage];
    }

    // ===== EVENT: FILTER SELECT - REDIRECT KE HALAMAN KATEGORI =====
    filterSelect.addEventListener('change', function() {
        if (this.value) {
            window.location.href = this.value;
        } else {
            // Jika pilih "Bidang Keahlian" (kosong), kembali ke halaman utama
            window.location.href = 'lowongan.html';
        }
    });

    // ===== FUNGSI SEARCH LOWONGAN (filter di halaman yang sama) =====
    function filterBySearch() {
        if (!lowonganSearch || jobCards.length === 0) return;
        
        const searchTerm = lowonganSearch.value.toLowerCase().trim();
        let visibleCount = 0;

        jobCards.forEach(card => {
            const jobTitle = card.querySelector('.job-title')?.textContent.toLowerCase() || '';
            const jobDesc = card.querySelector('.job-desc')?.textContent.toLowerCase() || '';
            const companyName = card.querySelector('.company-text span')?.textContent.toLowerCase() || '';

            const matchesSearch = searchTerm === '' || 
                jobTitle.includes(searchTerm) || 
                jobDesc.includes(searchTerm) || 
                companyName.includes(searchTerm);

            if (matchesSearch) {
                card.style.display = '';
                card.style.removeProperty('display');
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Hapus pesan lama
        const existingNoResult = document.querySelector('.no-result-message');
        if (existingNoResult) existingNoResult.remove();

        // Tampilkan pesan jika tidak ada hasil
        if (visibleCount === 0 && searchTerm !== '') {
            const jobsWrapper = document.querySelector('.jobs-wrapper');
            if (jobsWrapper) {
                const noResultDiv = document.createElement('div');
                noResultDiv.className = 'no-result-message';
                noResultDiv.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: #666; width: 100%;">
                        <h3 style="color: #003399; margin-bottom: 10px;">Tidak ada lowongan ditemukan</h3>
                        <p>Coba ubah kata kunci pencarian Anda</p>
                    </div>
                `;
                jobsWrapper.appendChild(noResultDiv);
            }
        }
    }

    // ===== EVENT: SEARCH INPUT =====
    if (lowonganSearch) {
        lowonganSearch.addEventListener('input', filterBySearch);
    }

    // ===== EVENT: RESET BUTTON =====
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Reset search input
            if (lowonganSearch) lowonganSearch.value = '';
            
            // Reset dropdown dan kembali ke halaman utama lowongan
            filterSelect.selectedIndex = 0;
            
            // Tampilkan semua card
            jobCards.forEach(card => {
                card.style.removeProperty('display');
            });

            // Hapus pesan "tidak ada hasil"
            const noResultMsg = document.querySelector('.no-result-message');
            if (noResultMsg) noResultMsg.remove();

            // Redirect ke halaman utama lowongan
            window.location.href = 'lowongan.html';
        });
    }
});

// Bookmark functionality
function toggleBookmark(jobId, jobTitle, jobCompany, jobLocation, jobLogo, jobDeadline, jobType, jobSalary) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    jobId = String(jobId);

    const bookmarkIndex = bookmarks.findIndex(bookmark => String(bookmark.id) === jobId);

    if (bookmarkIndex === -1) {
        bookmarks.push({
            id: jobId,
            title: jobTitle,
            company: jobCompany,
            location: jobLocation,
            logo: jobLogo,
            deadline: jobDeadline,
            type: jobType,
            salary: jobSalary
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        return true;
    } else {
        bookmarks.splice(bookmarkIndex, 1);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        return false;
    }
}

// Check if a job is bookmarked
function isBookmarked(jobId) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    return bookmarks.some(bookmark => String(bookmark.id) === String(jobId));
}

// Get all bookmarks
function getAllBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
}

// Function to handle bookmark toggle - DIPANGGIL DARI HTML
function handleBookmarkToggle(button) {
    const jobId = button.getAttribute('data-job-id');

    if (!jobId) {
        console.error('Button tidak punya data-job-id!');
        return;
    }

    const jobCard = button.closest('.job-card');
    
    // Get job details
    const titleElement = jobCard.querySelector('.job-title');
    const jobTitle = titleElement ? titleElement.textContent.trim() : '';

    const companyElement = jobCard.querySelector('.company-name, .company-text span');
    const jobCompany = companyElement ? companyElement.textContent.trim() : '';

    const locationElement = jobCard.querySelector('.company-text small');
    const jobLocation = locationElement ? locationElement.textContent.trim() : '';

    const logoElement = jobCard.querySelector('.company-logo');
    const jobLogo = logoElement ? logoElement.src : '';

    // PERBAIKAN: Ambil deadline dengan lebih robust
    const deadlineElement = jobCard.querySelector('.job-subtittle');
    let jobDeadline = 'N/A';

    if (deadlineElement) {
        let deadlineText = deadlineElement.textContent.trim();
        
        if (deadlineText.includes('Berlaku sampai:')) {
            jobDeadline = deadlineText.replace('Berlaku sampai:', '').trim();
        } else {
            jobDeadline = deadlineText;
        }
        
        if (!jobDeadline || jobDeadline === '') {
            jobDeadline = 'N/A';
        }
    }

    console.log('Deadline yang disimpan:', jobDeadline); // Debug log

    const infoItems = jobCard.querySelectorAll('.info-item span');
    const jobType = infoItems.length > 0 ? infoItems[0].textContent.trim() : 'N/A';
    const jobSalary = infoItems.length > 1 ? infoItems[1].textContent.trim() : 'N/A';

    if (!jobTitle || !jobCompany) {
        console.error('Could not get job details for bookmark');
        return;
    }

    const wasAdded = toggleBookmark(jobId, jobTitle, jobCompany, jobLocation, jobLogo, jobDeadline, jobType, jobSalary);

    // Update button state
    if (wasAdded) {
        button.classList.add('bookmarked');
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 300);
    } else {
        button.classList.remove('bookmarked');
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 300);
    }
}

// Initialize favorite buttons saat halaman load
function initializeFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.bookmark-btn');
    
    favoriteButtons.forEach(button => {
        const jobId = button.getAttribute('data-job-id');
        
        if (jobId && isBookmarked(jobId)) {
            button.classList.add('bookmarked');
        } else {
            button.classList.remove('bookmarked');
        }
    });
}

// FUNGSI UNTUK HAPUS BOOKMARK (untuk halaman Favorit)
function removeBookmark(jobId) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks = bookmarks.filter(bookmark => String(bookmark.id) !== String(jobId));
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// ============================================
// FUNGSI KHUSUS UNTUK HALAMAN FAVORIT
// ============================================

// Function to render bookmarks di halaman Favorit
function renderBookmarks() {
    const bookmarksList = document.getElementById('bookmarks-list');
    
    if (!bookmarksList) {
        return;
    }

    const bookmarks = getAllBookmarks();

    if (bookmarks.length === 0) {
        bookmarksList.innerHTML = `
            <div class="no-bookmarks">
                <img src="icons/love23.png" alt="No favorites" style="width: 80px; opacity: 0.3; filter: brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(7426%) hue-rotate(356deg) brightness(91%) contrast(115%);">
                <h3>Belum ada lowongan yang disimpan</h3>
                <p>Temukan lowongan yang menarik dan tambahkan ke favorit untuk kemudian hari.</p>
            </div>
        `;
        return;
    }

    let bookmarksHTML = '<div class="bookmarks-grid">';

    bookmarks.forEach(bookmark => {
        let detailPage = getDetailPageUrl(bookmark.title, bookmark.id);

        bookmarksHTML += `
            <div class="bookmark-card" data-job-id="${bookmark.id}">
                <div class="bookmark-icon-container">
                    <button class="bookmark-btn bookmarked" data-job-id="${bookmark.id}">
                        <img src="icons/love23.png" alt="Favorit" class="bookmark-icon">
                    </button>
                </div>

                <div class="card-top">
                    <img src="${bookmark.logo}" alt="${bookmark.company}" class="company-logo">
                    <div class="company-text">
                        <span class="company-name">${bookmark.company}</span>
                        <small>${bookmark.location}</small>
                    </div>
                </div>

                <hr class="divider">

                <h3 class="job-title">${bookmark.title}</h3>

                <h5 class="job-subtittle">Berlaku sampai: ${bookmark.deadline || 'N/A'}</h5>

                <div class="job-info">
                    <div class="info-item">
                        <img src="icons/icon full time.png" class="icon" alt="">
                        <span>${bookmark.type}</span>
                    </div>
                    <div class="info-item">
                        <img src="icons/icon gaji.png" class="icon" alt="">
                        <span>${bookmark.salary}</span>
                    </div>
                </div>

                <div class="card-actions">
                    <a href="${detailPage}" class="apply-btn">Lihat Detail</a>
                    <button class="remove-favorite-btn" onclick="removeFavoriteFromPage('${bookmark.id}')">
                        Hapus Favorit
                    </button>
                </div>
            </div>
        `;
    });

    bookmarksHTML += '</div>';
    bookmarksList.innerHTML = bookmarksHTML;
}

// Function to map job title to its detail page URL
function getDetailPageUrl(jobTitle, jobId) {
    const mappings = {
        'job-1': 'lowongan_webdev_uiux_detail_1.html',
        'job-2': 'lowongan_data_scientist_detail_1.html',
        'job-3': 'lowongan_data_scientist_detail_2.html'
    };

    if (mappings[jobId]) {
        return mappings[jobId];
    }

    if (jobTitle.includes('UI/UX')) {
        return 'lowongan_webdev_uiux_detail_1.html';
    } else if (jobTitle.includes('Junior Data Analyst')) {
        return 'lowongan_data_scientist_detail_1.html';
    } else if (jobTitle.includes('Data Visualization')) {
        return 'lowongan_data_scientist_detail_2.html';
    }

    return 'lowongan.html';
}

// PERBAIKAN: Function to remove favorite - TANPA CONFIRM
function removeFavoriteFromPage(jobId) {
    // Hapus langsung tanpa confirm
    removeBookmark(jobId);
    
    // Tampilkan notifikasi
    showNotification('Lowongan berhasil dihapus dari favorit');
    
    // Refresh tampilan
    renderBookmarks();
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-popup';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFavoriteButtons();
    renderBookmarks();
});

// ============================================
// FUNGSI UNTUK HALAMAN PENDAFTARAN
// ============================================

// Fungsi untuk memvalidasi tanggal lahir
function validateBirthDate() {
    const birthDateInput = document.querySelector('input[name="tanggalLahir"]');
    if (!birthDateInput) return true;

    const selectedDate = new Date(birthDateInput.value);
    const today = new Date();

    // Validasi tanggal tidak di masa depan
    if (selectedDate > today) {
        alert('Tanggal lahir tidak boleh di masa depan!');
        birthDateInput.value = '';
        return false;
    }

    // Validasi tanggal tidak terlalu lama (lebih dari 100 tahun)
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(today.getFullYear() - 100);

    if (selectedDate < hundredYearsAgo) {
        alert('Tanggal lahir tidak valid (terlalu lama di masa lalu)!');
        birthDateInput.value = '';
        return false;
    }

    // Validasi usia minimal 15 tahun
    const fifteenYearsAgo = new Date();
    fifteenYearsAgo.setFullYear(today.getFullYear() - 15);

    if (selectedDate > fifteenYearsAgo) {
        alert('Pendaftar harus berusia minimal 15 tahun!');
        birthDateInput.value = '';
        return false;
    }

    return true;
}

// Fungsi untuk memformat nomor WhatsApp
function formatWhatsAppNumber() {
    const whatsappInput = document.querySelector('input[placeholder="Masukkan Nomor WhatsApp Aktif"]');
    if (!whatsappInput) return;

    let value = whatsappInput.value.replace(/\D/g, '');

    if (value.startsWith('0')) {
        value = '62' + value.substring(1);
    } else if (value.startsWith('+62')) {
        value = value.substring(1);
    } else if (!value.startsWith('62') && value.length > 0) {
        if (value.length >= 10 && !value.startsWith('62')) {
            value = '62' + value;
        }
    }

    whatsappInput.value = value;
}

// Fungsi submit form pendaftaran
function submitForm() {
    const inputs = document.querySelectorAll('input, textarea, select');
    let formData = {};

    // Ambil data dari semua input
    inputs.forEach(input => {
        const placeholder = input.placeholder || '';
        const name = input.name || '';

        if (placeholder.includes('Nama')) {
            formData.namaLengkap = input.value;
        } else if (placeholder.includes('Email')) {
            formData.email = input.value;
        } else if (placeholder.includes('WhatsApp')) {
            formData.whatsapp = input.value;
        } else if (placeholder.includes('Domisili')) {
            formData.domisili = input.value;
        } else if (name === 'tanggalLahir') {
            formData.tanggalLahir = input.value;
        } else if (placeholder.includes('Deskripsikan')) {
            formData.deskripsi = input.value;
        } else if (placeholder.includes('Link Dokumen')) {
            formData.linkDokumen = input.value;
        }

        // Ambil dari select
        if (name === 'jenisKelamin') formData.jenisKelamin = input.value;
        if (name === 'pendidikan') formData.pendidikan = input.value;
        if (name === 'pengalaman') formData.pengalaman = input.value;
        if (name === 'bidangKeahlian') formData.bidangKeahlian = input.value;
    });

    // Validasi field wajib
    if (!formData.namaLengkap || !formData.email || !formData.whatsapp) {
        alert('Harap lengkapi semua field yang diperlukan!');
        return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Format email tidak valid!');
        return;
    }

    // Validasi nomor WhatsApp
    const waRegex = /^[0-9\s\-\+\(\)]+$/;
    if (!waRegex.test(formData.whatsapp.replace(/\s/g, ''))) {
        alert('Format nomor WhatsApp tidak valid!');
        return;
    }

    // Validasi tanggal lahir
    if (formData.tanggalLahir) {
        const birthDate = new Date(formData.tanggalLahir);
        const today = new Date();
        const hundredYearsAgo = new Date();
        hundredYearsAgo.setFullYear(today.getFullYear() - 100);
        const fifteenYearsAgo = new Date();
        fifteenYearsAgo.setFullYear(today.getFullYear() - 15);

        if (birthDate > today || birthDate < hundredYearsAgo || birthDate > fifteenYearsAgo) {
            alert('Tanggal lahir tidak valid!');
            return;
        }
    }

    // Format nomor WhatsApp
    let formattedWA = formData.whatsapp.replace(/\D/g, '');
    if (formattedWA.startsWith('0')) {
        formattedWA = '62' + formattedWA.substring(1);
    }
    formData.whatsapp = formattedWA;

    // Tampilkan loading
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('show');
    }

    // Kirim ke WhatsApp setelah delay
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const posisi = urlParams.get('posisi') || 'POSISI YANG DILAMAR';

        const message = `Halo%20saya%20ingin%20mendaftar%20sebagai%20${posisi}:%0A%0ANama:%20${encodeURIComponent(formData.namaLengkap || '')}%0AEmail:%20${encodeURIComponent(formData.email || '')}%0AWhatsApp:%20${encodeURIComponent(formData.whatsapp || '')}%0ADomisili:%20${encodeURIComponent(formData.domisili || '')}%0AJenis%20Kelamin:%20${encodeURIComponent(formData.jenisKelamin || '')}%0ATanggal%20Lahir:%20${encodeURIComponent(formData.tanggalLahir || '')}%0APendidikan:%20${encodeURIComponent(formData.pendidikan || '')}%0APengalaman:%20${encodeURIComponent(formData.pengalaman || '')}%0ABidang:%20${encodeURIComponent(formData.bidangKeahlian || '')}%0ADeskripsi:%20${encodeURIComponent(formData.deskripsi || '')}%0ALink%20Dokumen:%20${encodeURIComponent(formData.linkDokumen || '')}`;

        window.open(`https://api.whatsapp.com/send?phone=6282131075377&text=${message}`, '_blank');

        if (loadingOverlay) {
            loadingOverlay.classList.remove('show');
        }
    }, 1500);
}

// Event listener untuk halaman pendaftaran
document.addEventListener('DOMContentLoaded', function() {
    // Validasi tanggal lahir
    const birthDateInput = document.querySelector('input[name="tanggalLahir"]');
    if (birthDateInput) {
        birthDateInput.addEventListener('change', validateBirthDate);
    }

    // Format WhatsApp
    const whatsappInput = document.querySelector('input[placeholder="Masukkan Nomor WhatsApp Aktif"]');
    if (whatsappInput) {
        whatsappInput.addEventListener('blur', formatWhatsAppNumber);
        whatsappInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d\s\-\(\)]/g, '');
        });
    }
});

