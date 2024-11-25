document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('overlay');
    const exploreButton = document.getElementById('explore-button');
    const header = document.querySelector('header');

    if (!overlay || !exploreButton || !header) {
        console.error('Required elements are missing in the DOM.');
        return;
    }

    // Nonaktifkan scrolling
    document.body.style.overflow = 'hidden';

    // Tambahkan event listener ke tombol Explore
    exploreButton.addEventListener('click', () => {
        hideOverlay();
        startHeaderAnimation();
        activateOtherAnimations();
    });

    function hideOverlay() {
        overlay.style.opacity = '0'; // Efek transisi
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = ''; // Aktifkan scroll kembali
        }, 500);
    }

    function startHeaderAnimation() {
        header.classList.remove('header-paused');
        header.classList.add('header-running');
    }

    function activateOtherAnimations() {
        document.querySelectorAll('.paused').forEach((el) => {
            el.classList.remove('paused');
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Sembunyikan semua soal kecuali soal pertama
    const soalElements = document.querySelectorAll('.soal');
    soalElements.forEach((soal, index) => {
        soal.style.display = index === 0 ? 'block' : 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const functionInput = document.getElementById('functionInput');
    if (functionInput) {
        functionInput.value = ''; // Set input value to empty string
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const openingSound = document.getElementById("openingSound");

    // Coba memutar suara saat halaman selesai dimuat
    if (openingSound) {
        openingSound.volume = 0.5; // Atur volume (0.0 - 1.0)
        openingSound.play().catch((error) => {
            console.warn("Autoplay dibatasi oleh browser:", error);

            // Jika autoplay dibatasi, coba setelah interaksi pengguna
            document.addEventListener("click", () => {
                openingSound.play().catch((error) => {
                    console.error("Gagal memutar suara:", error);
                });
            }, { once: true });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const soalButtons = document.querySelectorAll('.soal-button');
    soalButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Hapus kelas "active" dari semua tombol
            soalButtons.forEach(btn => btn.classList.remove('active'));

            // Tambahkan kelas "active" ke tombol yang diklik
            button.classList.add('active');

            // Tampilkan soal yang sesuai
            showSoal(index + 1);
        });
    });
});
function showSoal(soalNumber) {
    const soalElements = document.querySelectorAll('.soal');
    soalElements.forEach((soal) => {
        soal.style.display = 'none';
    });

    const selectedSoal = document.getElementById(`soal-${soalNumber}`);
    if (selectedSoal) {
        selectedSoal.style.display = 'block';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const functionInput = document.getElementById('functionInput');
    if (functionInput) {
        functionInput.value = ''; // Set input value to empty string
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('overlay');
    const exploreButton = document.getElementById('explore-button');
    const header = document.querySelector('header');
    const homeSection = document.getElementById('home');

    if (!overlay || !exploreButton || !header) {
        console.error('Required elements are missing in the DOM.');
        return;
    }

    // Nonaktifkan scrolling
    disableScroll();

    // Nonaktifkan tombol Explore selama animasi masuk overlay
    disableButton(exploreButton);

    // Aktifkan tombol Explore setelah overlay selesai tampil
    setTimeout(() => {
        enableButton(exploreButton);
    }, 500); // Sesuaikan durasi dengan animasi masuk overlay

    // Tambahkan event listener ke tombol Explore
    exploreButton.addEventListener('click', onExploreButtonClick);

    // Jika tombol Explore sudah pernah diklik, posisikan halaman langsung ke home
    if (sessionStorage.getItem("exploreClicked")) {
        showHome(); // Pastikan langsung ke elemen home
    } else {
        showOverlay(); // Tampilkan overlay jika belum pernah klik Explore
    }
    
    // === Fungsi Utama ===
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = '';
    }

    function disableButton(button) {
        button.style.pointerEvents = 'none'; // Nonaktifkan klik
        button.style.opacity = '0.6'; // Feedback visual (opsional)
    }

    function enableButton(button) {
        button.style.pointerEvents = ''; // Aktifkan klik
        button.style.opacity = '1'; // Kembalikan tampilan normal
    }

    function hideOverlay() {
        disableButton(exploreButton); // Nonaktifkan tombol selama overlay menghilang
        overlay.style.opacity = '0'; // Efek transisi
        setTimeout(() => {
            overlay.style.display = 'none';
            enableScroll();
        }, 500); // Sesuaikan durasi dengan animasi keluar overlay
    }

    function showOverlay() {
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        disableScroll(); // Pastikan scrolling tetap dinonaktifkan
    }

    function startHeaderAnimation() {
        header.classList.remove('header-paused');
        header.classList.add('header-running');
    }

    function activateOtherAnimations() {
        document.querySelectorAll('.paused').forEach((el) => {
            el.classList.remove('paused');
        });
    }

    function showHome() {
        // Pastikan tampilan langsung di bagian home
        const homePosition = homeSection.getBoundingClientRect().top + window.scrollY;
        document.documentElement.scrollTop = homePosition; // Untuk browser modern
        document.body.scrollTop = homePosition;           // Untuk fallback browser lama
    }

    function onExploreButtonClick() {
        sessionStorage.setItem('exploreClicked', true);
        hideOverlay();
        startHeaderAnimation();
        activateOtherAnimations();
        showHome(); // Tampilkan langsung elemen home

        // Aktifkan tombol kembali setelah overlay menghilang sepenuhnya
        setTimeout(() => {
            enableButton(exploreButton);
        }, 500); // Durasi animasi keluar overlay
    }
});



document.addEventListener('DOMContentLoaded', function () {
    if (typeof smoothscroll !== 'undefined') {
        smoothscroll.polyfill();
    }
});


const navbar = document.getElementById("navbar");
let scrollTimeout; // Untuk mendeteksi timeout saat scroll
let hoverTimeout; // Untuk menambahkan jeda waktu saat keluar dari navigasi
let isHovering = false; // Status apakah kursor berada di navigasi atau anak elemennya

// Fungsi untuk memunculkan navigasi
function showNavbar() {
    navbar.classList.remove("hidden");
}

// Fungsi untuk menyembunyikan navigasi dengan jeda
function hideNavbar() {
    if (!isHovering && window.scrollY > 0) { // Jangan sembunyikan jika layar berada di atas
        navbar.classList.add("hidden");
    }
}

// Fungsi untuk menangani posisi scroll
function handleScroll() {
    // Navigasi tetap tampil jika posisi scroll lebih dari 100px
    if (window.scrollY > 100) {
        showNavbar();
    } else {
        showNavbar(); // Tetap tampilkan navigasi saat di atas layar
    }

    // Reset timeout setiap kali ada aktivitas scroll baru
    clearTimeout(scrollTimeout);

    // Set timeout untuk menyembunyikan navigasi setelah layar diam 2 detik
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 0) { // Hanya sembunyikan jika posisi scroll lebih dari 0
            hideNavbar();
        }
    }, 2000); // 2000ms = 2 detik
}

// Event listener untuk mendeteksi hover pada navigasi dan anak-anaknya
navbar.addEventListener("mouseenter", () => {
    clearTimeout(hoverTimeout); // Batalkan jeda jika kursor masuk kembali
    isHovering = true; // Kursor berada di navigasi atau anak-anaknya
    showNavbar(); // Paksa navigasi tetap tampil
});

navbar.addEventListener("mouseleave", () => {
    isHovering = false; // Kursor keluar dari navigasi atau anak-anaknya
    // Tambahkan jeda sebelum menyembunyikan navigasi
    hoverTimeout = setTimeout(() => {
        hideNavbar();
    }, 1000); // 1000ms = 1 detik
});

// Event listener untuk mendeteksi scroll
window.addEventListener("scroll", handleScroll);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const Tombolkuis = document.getElementById("tombol-kuis");

    if (Tombolkuis) {
        Tombolkuis.addEventListener("click", () => {
            window.location.href = "./kuis quadcalc/kuis.html"; // Ganti dengan path file kuiz Anda
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const functionInput = document.getElementById('functionInput');
    if (functionInput) {
        functionInput.value = ''; // Set input value to empty string
        functionInput.placeholder = 'ax^2 + bx + c';
    }
});

function resetGraph() {
    // Ambil elemen input, output, dan canvas
    const inputField = document.getElementById('functionInput');
    const outputDiv = document.getElementById('tampilan');
    const canvasElement = document.getElementById('grafikCanvas');
    const resetButton = document.getElementById('resetButton');

    // Tambahkan transisi untuk outputDiv dan canvas
    outputDiv.style.transition = 'opacity 0.5s ease';
    canvasElement.style.transition = 'opacity 0.5s ease';

    // Set opacity ke 0 untuk efek menghilang
    outputDiv.style.opacity = 0;
    canvasElement.style.opacity = 0;

    // Tunggu 500ms (sesuai durasi transisi) sebelum mereset konten
    setTimeout(() => {
        // Kosongkan input
        inputField.value = '';
        inputField.placeholder = 'ax^2 + bx + c)';

        // Sembunyikan tampilan output
        outputDiv.style.display = 'none';

        // Reset canvas
        ctx.clearRect(0, 0, width, height);
        drawAxes();

        // Reset variabel global
        roots = [];
        yIntercept = null;
        peaks = [];
        compiledFunction = null;
        animationX = -10;
        lastInputExpression = '';

        // Kembalikan opacity untuk outputDiv dan canvas
        outputDiv.style.opacity = 1;
        canvasElement.style.opacity = 1;

        // Sembunyikan tombol reset setelah reset
        resetButton.style.display = 'none';
    }, 500); // Waktu transisi yang sama
}


    
    
    
    
    
    
    
    
    
    
    const canvas = document.getElementById('grafikCanvas');
    const ctx = canvas.getContext('2d');
    const coordinatesDiv = document.getElementById('coordinates');
    const width = canvas.width;
    const height = canvas.height;
   
    let originX = width / 2;
    let originY = height / 2;
    let roots = [];
    let yIntercept = null;
    let peaks = [];
    let compiledFunction = null;
    let animationX = -10; // Awal dari animasi

    // Variabel untuk dragging
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let originOffsetX = 0;
    let originOffsetY = 0;

    let scale = 20; // Skala awal
    const minScale = 10; // Skala minimum untuk zoom out
    const maxScale = 100; // Skala maksimum untuk zoom in
    

    // Fungsi menggambar sumbu
  // Fungsi menggambar sumbu
  function drawAxes() {
    ctx.clearRect(0, 0, width, height); // Bersihkan canvas

    // Warna grid
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 0.5;

    // Tentukan interval grid berdasarkan skala
    let baseInterval = 1;
    if (scale < 20) baseInterval = 5; // Interval lebih besar untuk skala kecil
    else if (scale > 50) baseInterval = 0.5; // Interval lebih kecil untuk skala besar

    // Range yang terlihat berdasarkan skala dan offset
    const startX = Math.floor((-originX - originOffsetX) / scale);
    const endX = Math.ceil((width - originX - originOffsetX) / scale);
    const startY = Math.floor((originY + originOffsetY - height) / scale);
    const endY = Math.ceil((originY + originOffsetY) / scale);

    // Gambar garis vertikal grid
    for (let x = startX; x <= endX; x += baseInterval) {
        const canvasX = originX + originOffsetX + x * scale;
        ctx.beginPath();
        ctx.moveTo(canvasX, 0);
        ctx.lineTo(canvasX, height);
        ctx.stroke();
    }

    // Gambar garis horizontal grid
    for (let y = startY; y <= endY; y += baseInterval) {
        const canvasY = originY + originOffsetY - y * scale;
        ctx.beginPath();
        ctx.moveTo(0, canvasY);
        ctx.lineTo(width, canvasY);
        ctx.stroke();
    }

    // Gambar sumbu X
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, originY + originOffsetY);
    ctx.lineTo(width, originY + originOffsetY);
    ctx.stroke();

    // Gambar sumbu Y
    ctx.beginPath();
    ctx.moveTo(originX + originOffsetX, 0);
    ctx.lineTo(originX + originOffsetX, height);
    ctx.stroke();

    // Tampilkan label angka pada sumbu X
    ctx.font = '12px Arial';
    ctx.fillStyle = '#fff'; // Ubah warna teks menjadi putih
    for (let x = startX; x <= endX; x += baseInterval) {
        const canvasX = originX + originOffsetX + x * scale;
        if (canvasX >= 0 && canvasX <= width) {
            const labelX = parseFloat(x.toFixed(2)); // Format angka
            ctx.fillText(labelX, canvasX - 10, originY + originOffsetY + 15);
        }
    }

    // Tampilkan label angka pada sumbu Y
    for (let y = startY; y <= endY; y += baseInterval) {
        const canvasY = originY + originOffsetY - y * scale;
        if (canvasY >= 0 && canvasY <= height) {
            const labelY = parseFloat(y.toFixed(2)); // Format angka
            ctx.fillText(labelY, originX + originOffsetX + 5, canvasY + 5);
        }
    }
}


      
        
    
    
    
    

    // Fungsi menggambar grafik dengan animasi
    function animateGraph() {
        ctx.clearRect(0, 0, width, height);
        drawAxes(); // Pastikan offset diperhitungkan di sini
    
        // Gambar kurva sampai titik animasiX
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        let started = false;
    
        for (let x = -10; x <= animationX; x += 0.1) {
            const y = compiledFunction.evaluate({ x });
            const canvasX = originX + originOffsetX + x * scale;
            const canvasY = originY + originOffsetY - y * scale;
    
            if (!started) {
                ctx.moveTo(canvasX, canvasY);
                started = true;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();
    
        // Perbarui posisi animasi
        if (animationX < 10) {
            animationX += 0.1;
            requestAnimationFrame(animateGraph); // Lanjutkan animasi
        } else {
            // Setelah selesai, tambahkan titik potong dan titik puncak
            drawRoots(roots);
            drawYIntercept(yIntercept);
            drawPeaks(peaks);

            const resetButton = document.getElementById('resetButton');
            resetButton.style.display = 'inline-block'; // Tampilkan tombol reset
        }
    }

    let lastInputExpression = "";
    

    // Fungsi menggambar grafik (memulai animasi)
    function drawGraph() {

        const input = document.getElementById("functionInput").value;
        const resultDiv = document.getElementById("result");
    
        
            // Regex untuk mengekstrak koefisien a, b, dan c
            const regex = /([+-]?\d*\.?\d*)x\^2\s*([+-]?\d*\.?\d*)x\s*([+-]?\d*\.?\d*)/;
            const match = input.replace(/\s+/g, '').match(regex);
    
            if (!match) {
                alert("Harap masukkan fungsi dalam format ax² + bx + c yang benar!");
                button.classList.remove('loading');
                spinner.remove();
                return ;
            }

        
    const outputDiv = document.getElementById('tampilan');
    const inputexpression = document.getElementById('functionInput').value.trim();
    
    if(inputexpression === ''){
        outputDiv.style.display = 'none';
        alert("Harap masukkan fungsi terlebih dahulu!");
        return;
    }
    else if (inputexpression === lastInputExpression) {
        alert("Hasil perhitungan dari fungsi tersebut telah ditampilkan, Harap masukkan fungsi yang berbeda!");
        return;
    }

    lastInputExpression = inputexpression;

    // Ambil referensi tombol
    const button = document.querySelector('.button');
    const spinner = document.createElement('span');
    spinner.className = 'loading-spinner';
    button.appendChild(spinner);
    let isProcessing = false;
    let isSpinnerAdded = false;

    button.disabled = true;
    setTimeout(() => button.disabled = false, 2000);

    function transisi() {
        if (isProcessing) return;
        isProcessing = true;

        if (!isSpinnerAdded) {
            button.appendChild(spinner);
            isSpinnerAdded = true;
        }

        button.classList.add('loading');

        
        outputDiv.style.display = 'block';
        outputDiv.style.opacity = 0;

        setTimeout(() => {
            outputDiv.style.opacity = 1;
            outputDiv.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                button.classList.remove('loading');
                isProcessing = false;
            }, 500);
        }, 1500);
    }
    transisi();



        // Reset posisi animasi
        animationX = -10;
    
        // Ambil ekspresi fungsi
        const inputExpression = document.getElementById('functionInput').value;
    
        // Kompilasi fungsi
        try {
            compiledFunction = math.compile(inputExpression);
        } catch (error) {
            alert("Ekspresi fungsi tidak valid!");
            return;
        }
    
        // Temukan akar, titik potong y, dan titik puncak
        roots = findRoots(compiledFunction);
        yIntercept = findYIntercept(compiledFunction);
        peaks = findPeaks(math.derivative(inputExpression, 'x'));

           // Pastikan y-intercept ada untuk fokus grafik
           const yInterceptValue = yIntercept !== null ? yIntercept : 0;
    
           // Atur posisi agar fokus pada titik potong y
           originOffsetX = 0; // Karena kita ingin x = 0 di tengah layar
           originOffsetY = yInterceptValue * scale; // Fokuskan 

    
        // Mulai animasi
   // Mulai animasi
   setTimeout(() => {
    animateGraph();

    // Hapus animasi dari tombol setelah beberapa saat
    button.classList.remove('loading');
    spinner.remove();
}, 1000);



function Kalkulator() {
        
        const a = parseFloat(match[1]) || 1; // Default ke 1 jika tidak ada a
        const b = parseFloat(match[2]) || 0; // Default ke 0 jika tidak ada b
        const c = parseFloat(match[3]) || 0; // Default ke 0 jika tidak ada c

        const D = b * b - 4 * a * c;
        let solusi = "";
        
    setTimeout(() => {
        solusi += `<p>Langkah Penyelesaian:</p>`;
        solusi += `<p>1. Hitung diskriminan: D = b² - 4ac</p>`;
        solusi += `<p>&emsp; D = ${b}² - 4 * ${a} * ${c}</p>`;
        solusi += `<p>&emsp; D = ${D}</p>`;

        const x_v = -b / (2 * a);
        const y_v = a * x_v * x_v + b * x_v + c;
        solusi += `<p>2. Titik balik (vertex) dari fungsi kuadrat adalah: (${x_v.toFixed(2)}, ${y_v.toFixed(2)})</p>`;

        if (D > 0) {
            const x1 = (-b + Math.sqrt(D)) / (2 * a);
            const x2 = (-b - Math.sqrt(D)) / (2 * a);
            solusi += "<p>3. Karena D > 0, persamaan memiliki dua akar nyata:</p>";
            solusi += `<p>&emsp; x₁ = (-b + √D) / 2a = (${-b} + √${D}) / ${2 * a} = ${x1.toFixed(2)}</p>`;
            solusi += `<p>&emsp; x₂ = (-b - √D) / 2a = (${-b} - √${D}) / ${2 * a} = ${x2.toFixed(2)}</p>`;
            solusi += `<p>Jadi, akar-akar persamaan adalah x₁ = ${x1.toFixed(2)} dan x₂ = ${x2.toFixed(2)}</p>`;
        } else if (D === 0) {
            const x = -b / (2 * a);
            solusi += "<p>3. Karena D = 0, persamaan memiliki satu akar:</p>";
            solusi += `<p>&emsp; x = -b / 2a = ${-b} / ${2 * a} = ${x.toFixed(2)}</p>`;
        } else {
            solusi += "<p>3. Karena D < 0, persamaan tidak memiliki akar real.</p>";
        }

        resultDiv.innerHTML = solusi; // Pastikan menampilkan solusi di sini
        resultDiv.style.display = "block";
    }, 1000);

} Kalkulator();
    }

    function calculateFunctionRange(func, minX, maxX, step) {
        let minY = Number.POSITIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;
        let minXPoint = minX;
        let maxXPoint = maxX;

        for (let x = minX; x <= maxX; x += step) {
            const y = func.evaluate({ x });
            if (y < minY) {
                minY = y;
                minXPoint = x;
            }
            if (y > maxY) {
                maxY = y;
                maxXPoint = x;
            }
        }

        return {
            minX: minXPoint,
            maxX: maxXPoint,
            minY,
            maxY,
        };
    }
    

    // Temukan akar
    function findRoots(compiledFunction) {
        const roots = [];
        for (let x = -10; x <= 10; x += 0.1) {
            const y1 = compiledFunction.evaluate({ x });
            const y2 = compiledFunction.evaluate({ x: x + 0.1 });
            if (y1 * y2 < 0) {
                roots.push(x);
            }
        }
        return roots;
    }

    // Temukan titik potong y
    function findYIntercept(compiledFunction) {
        return compiledFunction.evaluate({ x: 0 });
    }

    // Temukan titik puncak
    function findPeaks(derivativeFunction) {
        const peaks = [];
        for (let x = -10; x <= 10; x += 0.1) {
            const slope1 = derivativeFunction.evaluate({ x });
            const slope2 = derivativeFunction.evaluate({ x: x + 0.1 });
            if (slope1 * slope2 < 0) {
                const peakX = x + (slope1 / (slope1 - slope2)) * 0.1;
                const peakY = compiledFunction.evaluate({ x: peakX });
                peaks.push({ x: peakX, y: peakY });
            }
        }
        return peaks;
    }

    // Gambar akar
    function drawRoots(roots) {
        ctx.fillStyle ='#00ffff';
        roots.forEach(root => {
            const canvasX = originX + originOffsetX + root * scale;
            ctx.beginPath();
            ctx.arc(canvasX, originY + originOffsetY, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    // Gambar titik potong y
    function drawYIntercept(yIntercept) {
        const canvasY = originY + originOffsetY - yIntercept * scale;
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(originX + originOffsetX, canvasY, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Gambar titik puncak
    function drawPeaks(peaks) {
        ctx.fillStyle = '#ffff00';
        peaks.forEach(peak => {
            const canvasX = originX + originOffsetX + peak.x * scale;
            const canvasY = originY + originOffsetY - peak.y * scale;
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    canvas.addEventListener('mousedown', (event) => {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        dragStartX = event.clientX - rect.left;
        dragStartY = event.clientY - rect.top;
    });
    
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
    
        // Jika sedang dragging, pindahkan offset
        if (isDragging) {
            const currentX = mouseX;
            const currentY = mouseY;
    
            const deltaX = currentX - dragStartX;
            const deltaY = currentY - dragStartY;
    
            originOffsetX += deltaX;
            originOffsetY += deltaY;
    
            dragStartX = currentX;
            dragStartY = currentY;
    
            ctx.clearRect(0, 0, width, height);
            drawAxes();
            animateGraph();
            return; // Tidak perlu melanjutkan ke pemeriksaan koordinat
        }
    
        // Periksa apakah mouse dekat dengan titik
        const point = isCloseToPoint(mouseX, mouseY, [
            ...roots.map(x => ({ x, y: 0 })), // Titik akar
            { x: 0, y: yIntercept }, // Titik potong y
            ...peaks // Titik puncak
        ]);
    
        if (point) {
            // Tampilkan koordinat titik pada posisi tetap di bawah canvas
            coordinatesDiv.innerText = `Koordinat: (x: ${point.x.toFixed(2)}, y: ${point.y.toFixed(2)})`;
            return; // Jika titik ditemukan, abaikan pemeriksaan kurva
        }
    
        // Periksa apakah mouse dekat dengan kurva
        const curvePoint = isCloseToCurve(mouseX, mouseY);
        if (curvePoint) {
            // Tampilkan koordinat kurva pada posisi dinamis mengikuti mouse
            coordinatesDiv.innerText = `Koordinat: (x: ${curvePoint.x.toFixed(2)}, y: ${curvePoint.y.toFixed(2)})`;
            return;
        }
    
        // Jika tidak menyentuh apa pun, kosongkan koordinat
        coordinatesDiv.innerText = 'Koordinat: (x: -, y: -)';
    });
    
    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
    });
    
    
    


canvas.addEventListener('mouseup', () => isDragging = false);
canvas.addEventListener('mouseleave', () => isDragging = false);



canvas.addEventListener('wheel', (event) => {
    event.preventDefault(); // Mencegah scrolling halaman saat menggunakan wheel

    // Deteksi arah scroll: event.deltaY > 0 untuk zoom out, < 0 untuk zoom in
    if (event.deltaY < 0) {
        // Zoom In
        if (scale < maxScale) {
            scale *= 1.2;
        }
    } else {
        // Zoom Out
        if (scale > minScale) {
            scale /= 1.2;
        }
    }

    // Perbarui grafik setelah zoom
    ctx.clearRect(0, 0, width, height);
    drawAxes();
    animateGraph();
});
  

function isCloseToPoint(mouseX, mouseY, points, tolerance = 10) {
    for (const point of points) {
        const canvasX = originX + originOffsetX + point.x * scale;
        const canvasY = originY + originOffsetY - point.y * scale;

        const distance = Math.sqrt((mouseX - canvasX) ** 2 + (mouseY - canvasY) ** 2);
        if (distance <= tolerance) {
            return point; // Jika dekat, kembalikan koordinat titik
        }
    }
    return null; // Tidak dekat dengan titik manapun
}


function isCloseToCurve(mouseX, mouseY, tolerance = 3) {
    // Gunakan interval yang lebih rapat untuk mendeteksi titik kurva
    for (let x = -10; x <= 10; x += 0.05) { // Interval yang lebih rapat
        const y = compiledFunction.evaluate({ x });
        const canvasX = originX + originOffsetX + x * scale;
        const canvasY = originY + originOffsetY - y * scale;

        const distance = Math.sqrt((mouseX - canvasX) ** 2 + (mouseY - canvasY) ** 2);
        if (distance <= tolerance) {
            return { x, y };
        }
    }
    return null;
}

