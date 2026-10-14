const filters = {
  Brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },

  Saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Huerotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  Blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  Grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  Sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  Opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  Invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const filtersContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");

const canvasCtx = imageCanvas.getContext("2d");
let file = null;
let imageSaved = null;
function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");
  const input = document.createElement("input");
  input.type = "range";
  input.value = value;
  input.min = min;
  input.max = max;
  input.id = name;
  const p = document.createElement("p");
  p.innerText = name;
  div.append(p);
  div.append(input);
  //range
  input.addEventListener("input", (e) => {
    console.log(e.target.value);
    filters[name].value = input.value;
    // console.log(filters[name]);
    applyFilters();
  });
  return div;
}

Object.keys(filters).forEach((key) => {
  //   console.log(filter);
  //   console.log(key, filters[key]);
  const filterElement = createFilterElement(
    key,
    filters[key].unit,
    filters[key].value,
    filters[key].min,
    filters[key].max,
  );
  console.log(filterElement);
  filtersContainer.appendChild(filterElement);
}); //return array
imageInput.addEventListener("change", (e) => {
  // const file = e.target.value;
  file = e.target.files[0];
  const imagePlaceholder = document.querySelector(".placeholder");
  imagePlaceholder.style.display = "none";

  const image = new Image();
  // const image = document.createElement("img");//nope
  image.src = URL.createObjectURL(file);
  // imageCanvas.appendChild(image);
  image.onload = () => {
    imageSaved = image;
    imageCanvas.width = image.width;
    imageCanvas.height = image.height;
    canvasCtx.drawImage(image, 0, 0);
    imageCanvas.style.display = "block";
  };
});

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.filter = `
brightness(${filters.Brightness.value}${filters.Brightness.unit})
contrast(${filters.Contrast.value}${filters.Contrast.unit})
saturate(${filters.Saturation.value}${filters.Saturation.unit})
hue-rotate(${filters.Huerotation.value}${filters.Huerotation.unit})
blur(${filters.Blur.value}${filters.Blur.unit})
grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
sepia(${filters.Sepia.value}${filters.Sepia.unit})
opacity(${filters.Opacity.value}${filters.Opacity.unit})
invert(${filters.Invert.value}${filters.Invert.unit})
`;

  canvasCtx.drawImage(imageSaved, 0, 0);
}

// //--------------------------
//below correct code for only brghtness
// function applyBrightness(change) {
//   canvasCtx.filter = `brightness(${change}%)`;
//   canvasCtx.drawImage(imageSaved, 0, 0);
// }

// function applyBlur() {
//   canvasCtx.filter = "blur(15px)";
//   canvasCtx.drawImage(imageSaved, 0, 0);
// }
// const brightness = document.querySelector("#Brightness");
// brightness.addEventListener("input", (e) => {
//   if (imageSaved) applyBrightness(e.target.value);
// });
