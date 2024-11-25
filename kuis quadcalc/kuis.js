const quizData = [
    // Soal berbasis konsep tetap
    {
        question: "Apa itu fungsi kuadrat?",
        options: {
            a: "Persamaan berbentuk ax² + bx + c",
            b: "Persamaan linear",
            c: "Persamaan lingkaran",
            d: "Persamaan eksponensial",
        },
        correct: "a",
        explanation: "Fungsi kuadrat adalah persamaan berbentuk ax² + bx + c, di mana a, b, dan c adalah konstanta."
    },
    // Soal perhitungan baru
    {
        question: "Jika f(x) = x² - 4x + 3, berapa nilai f(2)?",
        options: {
            a: "1",
            b: "3",
            c: "5",
            d: "7",
        },
        correct: "a",
        explanation: "Substitusi x = 2: f(2) = (2)² - 4(2) + 3 = 4 - 8 + 3 = 1."
    },
    {
        question: "Berapa akar-akar dari persamaan x² - 5x + 6 = 0?",
        options: {
            a: "2 dan 3",
            b: "1 dan 6",
            c: "3 dan 5",
            d: "Tidak ada akar real",
        },
        correct: "a",
        explanation: "Faktorkan x² - 5x + 6 menjadi (x - 2)(x - 3) = 0, sehingga akar-akarnya adalah 2 dan 3."
    },
    {
        question: "Diketahui fungsi kuadrat f(x) = 2x² - 8x + 6. Berapa nilai diskriminannya?",
        options: {
            a: "4",
            b: "8",
            c: "16",
            d: "32",
        },
        correct: "c",
        explanation: "Diskriminan = b² - 4ac = (-8)² - 4(2)(6) = 64 - 48 = 16."
    },
    {
        question: "Tentukan koordinat titik puncak dari f(x) = x² - 6x + 8.",
        options: {
            a: "(3, -1)",
            b: "(3, -4)",
            c: "(4, -1)",
            d: "(4, 0)",
        },
        correct: "a",
        explanation: "Gunakan rumus x = -b/(2a), maka x = -(-6)/(2×1) = 3. Substitusi x = 3, y = (3)² - 6(3) + 8 = -1. Jadi titik puncak adalah (3, -1)."
    },
    {
        question: "Jika fungsi kuadrat f(x) = x² + 4x + c memiliki satu akar real, maka nilai c adalah?",
        options: {
            a: "4",
            b: "0",
            c: "1",
            d: "4 atau 0",
        },
        correct: "b",
        explanation: "Satu akar real terjadi jika diskriminan = 0. Diskriminan = b² - 4ac = 0, maka 4² - 4(1)(c) = 0, sehingga c = 4."
    },
    
    // Soal berbasis konsep lainnya
    {
        question: "Apa peran koefisien 'a' dalam fungsi kuadrat?",
        options: {
            a: "Menentukan lebar dan arah parabola",
            b: "Menentukan titik potong y",
            c: "Menentukan jumlah akar",
            d: "Menentukan bentuk sumbu simetri",
        },
        correct: "a",
        explanation: "Koefisien 'a' menentukan apakah parabola membuka ke atas atau ke bawah, serta menentukan lebar grafik."
    },
    {
        question: "Jika f(x) = 3x² - 12x + 9, maka nilai minimum fungsi tersebut adalah?",
        options: {
            a: "0",
            b: "3",
            c: "-3",
            d: "6",
        },
        correct: "b",
        explanation: "Titik minimum terjadi pada x = -b/(2a). Dengan a = 3 dan b = -12, x = -(-12)/(2×3) = 2. Substitusi x = 2 ke f(x), f(2) = 3(2)² - 12(2) + 9 = 3."
    },
    {
        question: "Berapa nilai fungsi f(x) = x² - 2x - 3 pada x = -1?",
        options: {
            a: "0",
            b: "-3",
            c: "3",
            d: "-6",
        },
        correct: "d",
        explanation: "Substitusi x = -1 ke f(x), f(-1) = (-1)² - 2(-1) - 3 = 1 + 2 - 3 = -6."
    },
    {
        question: "Jika parabola y = x² + 2x + k melalui titik (1, 4), berapa nilai k?",
        options: {
            a: "1",
            b: "3",
            c: "4",
            d: "2",
        },
        correct: "b",
        explanation: "Substitusi titik (1, 4) ke persamaan: 4 = (1)² + 2(1) + k, maka k = 4 - 1 - 2 = 1."
    }

];

let currentQuestionIndex = 0;
let score = 0;

// Ambil elemen DOM
const correctSound = document.getElementById("sound-correct");
const wrongSound = document.getElementById("sound-wrong");
const quizContainer = document.getElementById("quiz-container");
const nextButton = document.getElementById("next-question");
const resultContainer = document.getElementById("quiz-result");
const feedbackContainer = document.getElementById("answer-feedback");

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h3>${currentQuestion.question}</h3>
        ${Object.keys(currentQuestion.options).map(option => `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option.toUpperCase()}: ${currentQuestion.options[option]}
            </label>
        `).join('')}
    `;
}

function disableOptions() {
    const answers = document.querySelectorAll("input[name='answer']");
    answers.forEach(answer => {
        answer.disabled = true; // Nonaktifkan semua opsi
    });
}

function getSelectedAnswer() {
    const answers = document.querySelectorAll("input[name='answer']");
    let selected = null;
    answers.forEach(answer => {
        if (answer.checked) {
            selected = answer.value;
        }
    });
    return selected;
}


nextButton.addEventListener("click", () => {
    const selectedAnswer = getSelectedAnswer();
    if (!selectedAnswer) {
        alert("Pilih jawaban terlebih dahulu!");
        return;
    }

    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;

    // Nonaktifkan opsi jawaban setelah memilih
    disableOptions();

    // Tampilkan animasi loading sementara
    feedbackContainer.innerHTML = `
        <div class="loading-spinner"></div>
        <p style="color: white; text-align: center;">Memproses jawaban...</p>
    `;

    setTimeout(() => {
        // Mainkan efek suara dan tambahkan validasi warna
        const answers = document.querySelectorAll("input[name='answer']");
        answers.forEach(answer => {
            const label = answer.parentElement; // Ambil label induk untuk styling
            if (answer.value === currentQuestion.correct) {
                label.classList.add("correct-option");
            }
            if (answer.checked && !isCorrect) {
                label.classList.add("wrong-option"); // Tambahkan warna merah
            }
        });

        // Mainkan efek suara
        if (isCorrect) {
            score++;
            correctSound.play();
            quizContainer.classList.add("correct");
        } else {
            wrongSound.play();
            quizContainer.classList.add("incorrect");
            const benar = document.querySelector('.correct-option');
            benar.style.border = '2px solid green'; 
        }
        

        // Tampilkan feedback lengkap
        feedbackContainer.innerHTML = `
            <div class="feedback-icon">
                ${isCorrect ? '<span class="icon-correct">✔️</span>' : '<span class="icon-wrong">❌</span>'}
            </div>
            <p style="color: white; font-size: 1.2em;">
                ${isCorrect ? 'Jawaban Anda benar!' : 'Jawaban Anda salah.'}
            </p>
            <p style="color: white;">
                Jawaban Anda: ${selectedAnswer.toUpperCase()} - "${currentQuestion.options[selectedAnswer]}"
            </p>
            <p style="color: white;">${currentQuestion.explanation}</p>
            <button id="continue-button">Lanjutkan</button>
        `;

        // Sembunyikan tombol "Next" hingga pengguna klik "Lanjutkan"
        nextButton.style.display = 'none';

        

        // Event listener untuk tombol "Lanjutkan"
        const continueButton = document.getElementById("continue-button");
        continueButton.addEventListener("click", () => {
            // Hentikan efek suara jika masih diputar
            if (!correctSound.paused) {
                correctSound.pause();
                correctSound.currentTime = 0; // Reset ke awal
            }
            if (!wrongSound.paused) {
                wrongSound.pause();
                wrongSound.currentTime = 0; // Reset ke awal
            }

            // Bersihkan efek dan muat soal baru
            quizContainer.classList.remove("correct", "incorrect");
            feedbackContainer.innerHTML = ""; // Kosongkan feedback
            nextButton.style.display = ''; // Tampilkan tombol "Next"
            currentQuestionIndex++;

            if (currentQuestionIndex < quizData.length) {
                transitionQuestion(); // Pindah ke soal berikutnya
            } else {
                nextButton.style.display = 'none';
                showResults(); // Tampilkan hasil jika kuis selesai
            }
        });
    }, 1500); // Delay 1,5 detik untuk simulasi loading
});





function showResults() {
    quizContainer.innerHTML = ""; // Hapus soal dan jawaban
    resultContainer.innerHTML = `
        <h3>Kuis Selesai!</h3>
        <p>Skor Anda: ${score}/${quizData.length}</p>
        <button id="retry-button" data-href="retry">Ulangi Kuis</button>
        <button id="index-button" data-href="../Index.html">Kembali</button>
    `;

    // Tambahkan event listener ke tombol
    resultContainer.addEventListener("click", (e) => {
        const target = e.target.dataset.href;
        if (target === "retry") {
            currentQuestionIndex = 0;
            score = 0;
            localStorage.removeItem("lastScore"); // Reset skor di localStorage
            loadQuestion(); // Muat soal pertama
            resultContainer.innerHTML = ""; // Hapus hasil
            nextButton.style.display = ''; // Tampilkan tombol "Next"
        } else if (target) {
            window.location.href = target; // Navigasi sesuai href
        }
    });
}

function transitionQuestion() {
    quizContainer.classList.add('fade-out'); // Menambahkan efek fade-out
    setTimeout(() => {
        loadQuestion(); // Muat soal baru
        quizContainer.classList.remove('fade-out');
        quizContainer.classList.add('fade-in'); // Menambahkan efek fade-in
        setTimeout(() => quizContainer.classList.remove('fade-in'), 500); // Hapus fade-in setelah selesai
    }, 500); // Tunggu hingga soal lama selesai menghilang
}

// Mulai kuis
loadQuestion();