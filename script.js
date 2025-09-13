// QR Generator App (vanilla)
const qrWrap = document.getElementById('qr-wrap');
const textInput = document.getElementById('text-input');
const sizeInput = document.getElementById('size');
const sizeVal = document.getElementById('size-val');
const marginInput = document.getElementById('margin');
const marginVal = document.getElementById('margin-val');
const fgColor = document.getElementById('fg-color');
const bgColor = document.getElementById('bg-color');
const logoInput = document.getElementById('logo-input');
const generateBtn = document.getElementById('generate');
const downloadPng = document.getElementById('download-png');
const downloadSvg = document.getElementById('download-svg');
const errorSel = document.getElementById('error-correction');


let qrCode = null;
let currentLogo = null;


function createQR() {
const data = (textInput.value || '').trim() || 'https://example.com';
const size = parseInt(sizeInput.value, 10) || 300;
const margin = parseInt(marginInput.value, 10) || 10;
const fg = fgColor.value || '#FF00FF';
const bg = bgColor.value || '#FFFFFF';
const ecLevel = errorSel.value || 'M';


// clear container
qrWrap.innerHTML = '';


// create QRCodeStyling instance
qrCode = new QRCodeStyling({
width: size,
height: size,
margin: margin,
data,
image: currentLogo,
dotsOptions: {color: fg, type: 'rounded'},
backgroundOptions: {color: bg},
qrOptions: {errorCorrectionLevel: ecLevel}
});


qrCode.append(qrWrap);
}


// initial default
sizeVal.textContent = sizeInput.value + 'px';
marginVal.textContent = marginInput.value;


sizeInput.addEventListener('input', () => { sizeVal.textContent = sizeInput.value + 'px'; });
marginInput.addEventListener('input', () => { marginVal.textContent = marginInput.value; });


logoInput.addEventListener('change', async (e) => {
const f = e.target.files[0];
if (!f) return;
const reader = new FileReader();
reader.onload = () => {
currentLogo = reader.result;
createQR();
};
reader.readAsDataURL(f);
});


generateBtn.addEventListener('click', (e)=>{ e.preventDefault(); createQR(); });


downloadPng.addEventListener('click', async ()=>{
if (!qrCode) createQR();
window.addEventListener('load', createQR);
