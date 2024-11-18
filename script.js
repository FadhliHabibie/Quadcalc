// JavaScript untuk Kalkulator
function calculateQuadratic() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
        alert('Harap masukkan nilai valid. Nilai a tidak boleh nol.');
        return;
    }

    const equation = `${a}x² + ${b}x + ${c}`;
    const derivative = `${2 * a}x + ${b}`;
    const resultBox = document.getElementById('result');

    resultBox.innerHTML = `
        <p><b>Persamaan:</b> ${equation}</p>
        <p><b>Turunan:</b> ${derivative}</p>
    `;
    resultBox.style.display = 'block';
window.onload = function() {
    // Menyembunyikan intro text setelah 3 detik
    setTimeout(function() {
        document.getElementById('intro-text').style.display = 'none';
    }, 3000); // Menghilangkan setelah 3 detik
}

window.onload = function() {
    // Menyembunyikan intro text setelah 3 detik
    setTimeout(function() {
        document.getElementById('intro-text').style.display = 'none';
    }, 3000); // Menghilangkan setelah 3 detik
}

}



// Ambil elemen canvas dan konteks 2D
const canvas = document.getElementById('grafikCanvas');
const ctx = canvas.getContext('2d');
const coordinatesDiv = document.getElementById('coordinates');

// Tentukan ukuran dan titik tengah canvas
const width = canvas.width;
const height = canvas.height;
const scale = 20; // 1 unit = 20px
const originX = width / 2;
const originY = height / 2;

// Fungsi untuk menggambar sumbu x dan y
function drawAxes() {
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;

  // Sumbu x
  ctx.beginPath();
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);
  ctx.stroke();

  // Sumbu y
  ctx.beginPath();
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);
  ctx.stroke();

  // Gambar label untuk sumbu x dan y
  ctx.font = '12px Arial';
  ctx.fillStyle = '#333';

  for (let x = 1; x <= (width / 2) / scale; x++) {
    const canvasX = originX + x * scale;
    ctx.fillText(x, canvasX - 10, originY + 15);
    ctx.fillText(-x, originX - x * scale - 10, originY + 15);
  }

  for (let y = 1; y <= (height / 2) / scale; y++) {
    const canvasY = originY - y * scale;
    ctx.fillText(y, originX + 5, canvasY + 5);
    ctx.fillText(-y, originX + 5, originY + y * scale + 5);
  }
}

// Fungsi untuk menggambar grafik berdasarkan input pengguna
function drawGraph() {
  ctx.clearRect(0, 0, width, height);
  drawAxes();

  const inputExpression = document.getElementById('functionInput').value;

  let compiledFunction;
  try {
    compiledFunction = math.compile(inputExpression);
  } catch (error) {
    alert("Ekspresi fungsi tidak valid!");
    return;
  }

  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;

  ctx.beginPath();
  let started = false;

  const xRange = 10;
  for (let x = -xRange; x <= xRange; x += 0.1) {
    let y;
    try {
      y = compiledFunction.evaluate({ x });
    } catch (error) {
      alert("Kesalahan evaluasi fungsi!");
      return;
    }

    const canvasX = originX + x * scale;
    const canvasY = originY - y * scale;

    if (!started) {
      ctx.moveTo(canvasX, canvasY);
      started = true;
    } else {
      ctx.lineTo(canvasX, canvasY);
    }
  }

  ctx.stroke();
}

// Fungsi untuk menghitung koordinat x dan y pada posisi kursor
function getCursorPosition(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const xMath = (x - originX) / scale;
  const yMath = (originY - y) / scale;

  const inputExpression = document.getElementById('functionInput').value;
  let compiledFunction;
  try {
    compiledFunction = math.compile(inputExpression);
    const evaluatedY = compiledFunction.evaluate({ x: xMath });

    if (Math.abs(evaluatedY - yMath) < 0.5) {
      coordinatesDiv.innerHTML = `Koordinat: (x: ${xMath.toFixed(2)}, y: ${evaluatedY.toFixed(2)})`;
    } else {
      coordinatesDiv.innerHTML = `Koordinat: (x: -, y: -)`;
    }
  } catch (error) {
    console.error("Kesalahan evaluasi fungsi: ", error);
  }
}

drawAxes();
drawGraph();

canvas.addEventListener('mousemove', getCursorPosition);
