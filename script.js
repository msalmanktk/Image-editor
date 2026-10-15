let filters = {
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
const resetBtn = document.querySelector("#reset-btn");
const canvasCtx = imageCanvas.getContext("2d");
const downloadBtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");
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
    // console.log(e.target.value);
    filters[name].value = input.value;
    // console.log(filters[name]);
    if (imageSaved) applyFilters();
  });
  return div;
}
function createFilters() {
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
    // console.log(filterElement);
    filtersContainer.appendChild(filterElement);
  }); //return array
}

createFilters();

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
`.trim();

  canvasCtx.drawImage(imageSaved, 0, 0);
}
//resetbutton
resetBtn.addEventListener("click", function () {
  if (imageSaved) {
    filters = {
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
    applyFilters();
    // console.log("reset");
    // range go back to normal
    filtersContainer.innerHTML = "";
    createFilters();
  }
});
// downlaod button
downloadBtn.addEventListener("click", () => {
  if (imageSaved) {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
  }
});

//Image presets
const imagePresets = {
  Default: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 100,
    Huerotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  Drama: {
    Brightness: 90,
    Contrast: 140,
    Saturation: 60,
    Huerotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 10,
    Opacity: 100,
    Invert: 0,
  },
  Vintage: {
    Brightness: 110,
    Contrast: 85,
    Saturation: 75,
    Huerotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 45,
    Opacity: 100,
    Invert: 0,
  },
  OldSchool: {
    Brightness: 95,
    Contrast: 90,
    Saturation: 50,
    Huerotation: 350, // Slight warm shift
    Blur: 1, // Softens the image slightly
    Grayscale: 0,
    Sepia: 60,
    Opacity: 100,
    Invert: 0,
  },
  Cinematic: {
    Brightness: 95,
    Contrast: 125,
    Saturation: 110,
    Huerotation: 190, // Teal/blue undertone shift
    Blur: 0,
    Grayscale: 0,
    Sepia: 5,
    Opacity: 100,
    Invert: 0,
  },
  Cyberpunk: {
    Brightness: 110,
    Contrast: 130,
    Saturation: 160,
    Huerotation: 140, // Shifts colors to vibrant pinks/neons
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  Noir: {
    Brightness: 85,
    Contrast: 150,
    Saturation: 0,
    Huerotation: 0,
    Blur: 0,
    Grayscale: 100, // High contrast black and white
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  WarmSummer: {
    Brightness: 105,
    Contrast: 105,
    Saturation: 130,
    Huerotation: 10, // Warm yellow/orange tint
    Blur: 0,
    Grayscale: 0,
    Sepia: 15,
    Opacity: 100,
    Invert: 0,
  },
  CoolMist: {
    Brightness: 105,
    Contrast: 95,
    Saturation: 80,
    Huerotation: 200, // Cool blue tint
    Blur: 0.5,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  XRay: {
    Brightness: 100,
    Contrast: 130,
    Saturation: 0,
    Huerotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 100, // Inverted black and white
  },
};
Object.keys(imagePresets).forEach((presetName) => {
  const presetBtn = document.createElement("button");
  presetBtn.classList.add("btn");
  presetBtn.innerText = presetName;
  presetsContainer.appendChild(presetBtn);

  presetBtn.addEventListener("click", () => {
    const preset = imagePresets[presetName];
    // console.log(preset);

    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
  });
});
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
