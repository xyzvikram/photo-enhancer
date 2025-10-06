const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let filters = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  blur: 0,
};

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  applyFilters();
};

function applyFilters() {
  const { brightness, contrast, saturate, blur } = filters;
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) blur(${blur}px)`;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

["brightness", "contrast", "saturate", "blur"].forEach((id) => {
  document.getElementById(id).addEventListener("input", (e) => {
    filters[id] = e.target.value;
    applyFilters();
  });
});

document.getElementById("reset").addEventListener("click", () => {
  filters = { brightness: 100, contrast: 100, saturate: 100, blur: 0 };
  document.querySelectorAll("input[type='range']").forEach((r) => (r.value = filters[r.id]));
  applyFilters();
});

document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "enhanced-photo.png";
  link.href = canvas.toDataURL();
  link.click();
});