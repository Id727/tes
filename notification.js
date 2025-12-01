 notification.js

// Data Nama Pelanggan untuk Notifikasi Fiktif
const customerNames = ["Abas", "Aditya", "Agung", "Aji", "Akbar", "Aldi", "Ali", "Amin", "Andra", "Angga", "Anisa", "Anton", "Aris", "Aura", "Ayu", "Bakhtiar", "Bayu", "Brian", "Bulan", "Cahyo", "Cindy", "Daffa", "Dani", "Denny", "Desi", "Dimas", "Doni", "Dora", "Edi", "Eka", "Eko", "Ella", "Elyas", "Erna", "Fahmi", "Faisal", "Fathir", "Ferdi", "Firman", "Fitri", "Galih", "Gani", "Gede", "Gia", "Habib", "Helena", "Heru", "Ida", "Ilham", "Intan", "Irma", "Ivan", "Jaja", "Jaka", "Jali", "Juli", "Juned", "Kania", "Kiki", "Krisna", "Laila", "Lukman", "Maimun", "Maria", "Mariam", "Medi", "Meli", "Mila", "Mirna", "Mona", "Nabila", "Nadia", "Nanda", "Nani", "Nita", "Nurul", "Pandu", "Permata", "Puji", "Rama", "Rani", "Rani", "Ratna", "Rina", "Rio", "Risa", "Robby", "Romi", "Safira", "Sari", "Satria", "Selvi", "Siti", "Sule", "Sulis", "Surya", "Tari", "Taufik", "Titi", "Toni", "Ulfa", "Usnita", "Wahyu", "Yeni", "Yoga", "Yuli", "Yusuf", "Budi", "Citra", "Dewi", "Eko", "Fajar", "Gita", "Hadi", "Indah", "Joko", "Karin", "Lita", "Mamat", "Nana", "Putri", "Rizky", "Santi", "Tono", "Umar", "Vina", "Wulan", "Yanto", "Zia"];

let readyProducts = [];
let lastNotifIndex = -1; 

function shortenName(name) {
    return name.substring(0, 2) + '..';
}

function compileReadyProducts() {
    readyProducts = [];
    // Mengakses 'products' yang sudah dimuat dari product-data.js
    if (typeof products !== 'undefined') { 
        for (const key in products) {
            products[key].forEach(p => {
                if (p.desc.startsWith('✅ Ready Stock')) {
                    readyProducts.push({
                        name: p.name.trim(),
                        price: p.price
                    });
                }
            });
        }
    }
}

function showFakeNotification() {
    compileReadyProducts();
    if (readyProducts.length === 0) return;

    const container = document.getElementById('notification-container');

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * readyProducts.length);
    } while (randomIndex === lastNotifIndex && readyProducts.length > 1);

    lastNotifIndex = randomIndex;

    const randomProduct = readyProducts[randomIndex];
    const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const formattedPrice = randomProduct.price.toLocaleString('id-ID');
    const shortName = shortenName(randomName);


    const notificationHTML = `
        <div class="fake-notification show">
            <span class="notif-icon">✅</span>
            <div class="notif-text">
                Transaksi Berhasil! <br>
                <strong>${shortName}..</strong> membeli ${randomProduct.name} (Rp ${formattedPrice}).
            </div>
        </div>
    `;

    container.innerHTML = '';
    container.innerHTML = notificationHTML;

    setTimeout(() => {
        const notif = container.querySelector('.fake-notification');
        if (notif) notif.classList.remove('show');

        setTimeout(() => {
            container.innerHTML = '';
        }, 600);

    }, 5800);
}

function startNotificationLoop() {
    compileReadyProducts();
    if (readyProducts.length === 0) return; 

    const randomInterval = Math.floor(Math.random() * (25000 - 12000 + 1)) + 12000;
    const randomDelay = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;

    setTimeout(() => {
        showFakeNotification();
        setTimeout(startNotificationLoop, randomInterval);
    }, randomDelay);
}

// Jalankan Loop Notifikasi saat Halaman dimuat
document.addEventListener('DOMContentLoaded', startNotificationLoop);
