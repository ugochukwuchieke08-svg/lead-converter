// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyBry7dNkfXeJJEyuuSTBwM4mWX2ycXYynM",
  authDomain: "dannymoore-autos-ltd.firebaseapp.com",
  projectId: "dannymoore-autos-ltd",
  storageBucket: "dannymoore-autos-ltd.firebasestorage.app",
  messagingSenderId: "1027781605759",
  appId: "1:1027781605759:web:4c87e5f7b55eaad4d6c24a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ================= DOM CONTENT LOADED =================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof emailjs !== "undefined") emailjs.init("-HjyFNJhUpMq4hckZ");

  // ===== BURGER MENU =====
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", e => {
      navLinks.classList.toggle("active");
      burger.classList.toggle("active");
      e.stopPropagation();
    });

    document.addEventListener("click", event => {
      if (!navLinks.contains(event.target) && !burger.contains(event.target)) {
        navLinks.classList.remove("active");
        burger.classList.remove("active");
      }
    });
  }

  // ===== SCROLL ANIMATION =====
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        const cards = entry.target.querySelectorAll(".car-card");
        cards.forEach((card, i) => setTimeout(() => card.classList.add("show"), i * 150));
      }
    });
  });
  document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

  // ===== TRACK CLICKS =====
  document.querySelectorAll('a[href^="tel:"]').forEach(link => link.addEventListener("click", () => console.log("Call clicked")));
  document.querySelectorAll('a[href="#contact"]').forEach(link => link.addEventListener("click", () => console.log("Book clicked")));

  // ===== FORM SUBMISSION =====
  const form = document.getElementById("testDriveForm");
  if (form) form.addEventListener("submit", handleFormSubmit);

  const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = allCars.filter(car =>
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query)
    );

    showAll = true;
    displayCars(filtered);
  });
}

  // ===== FETCH CARS IF CAR LIST EXISTS =====
  const carList = document.getElementById("car-list");
  if (carList) fetchAdditionalCars();
});

// ====== CAR DATA ======


// ====== PRICE FORMATTER ======
function formatPrice(price) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(price);
}

// ====== FETCH ADDITIONAL CARS ======
let allCars = [];
async function fetchAdditionalCars() {
  if (!db) {
    console.warn("Firebase not available, using local cars only");
    allCars = cars;
    displayCars(allCars);
    return;
  }

  try {
    const snapshot = await db.collection("cars").get();
    const firestoreCars = snapshot.docs.map(doc => doc.data());
    allCars = [...cars, ...firestoreCars];
    displayCars(allCars);
  } catch (err) {
    console.error("Error fetching cars from Firestore:", err);
    allCars = cars;
    displayCars(allCars);
  }
}

// ====== UPLOAD CAR FORM ======
const uploadForm = document.getElementById("carUploadForm");
const uploadMessage = document.getElementById("uploadMessage");
const carImagesInput = document.getElementById("carImages");

if (uploadForm) {
  uploadForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    const carData = {
      brand: formData.get("brand"),
      model: formData.get("model"),
      year: Number(formData.get("year")),
      price: Number(formData.get("price")),
      mileage: formData.get("mileage"),
      transmission: formData.get("transmission"),
      fuel: formData.get("fuel"),
      engine: formData.get("engine"),
      interior: formData.get("Specs"),
      images: []
    };

    const files = carImagesInput.files;
    if (!files.length) return alert("Please select at least one image");

    uploadMessage.innerText = "Uploading images...";
    try {
      for (let file of files) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", "client upload");
        const res = await fetch("https://api.cloudinary.com/v1_1/du6e7pzwg/image/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!data.secure_url) throw new Error("Upload failed");
        carData.images.push(data.secure_url);
      }

      await db.collection("cars").add(carData);
      await fetchAdditionalCars();

      uploadMessage.style.color = "green";
      uploadMessage.innerText = "Car uploaded successfully!";
      uploadForm.reset();
    } catch (err) {
      console.error(err);
      uploadMessage.style.color = "red";
      uploadMessage.innerText = "Upload failed. Try again.";
    }
  });
}

// ====== DISPLAY CARS ======
let showAll = false;

function displayCars(carArray) {
  const carList = document.getElementById("car-list");
  if (!carList) return;
  carList.innerHTML = "";

  const carsToShow = showAll ? carArray : carArray.slice(0, 3);

  carsToShow.forEach(car => {
    const card = document.createElement("div");
    card.classList.add("car-card");
    card.innerHTML = `
      <img src="${car.images[0]}" alt="${car.brand} ${car.model}">
      <h3>${car.year} ${car.brand} ${car.model}</h3>
      <p>${formatPrice(car.price)}</p>
      <button class="book-btn">Book Test Drive</button>
    `;
    card.addEventListener("click", () => {

  const slug =
    `${car.brand}-${car.model}-${car.year}`
      .toLowerCase()
      .replace(/\s+/g, "-");

  window.location.href =
    `car.html?id=${slug}`;
  });
    carList.appendChild(card);
  });

  if (carArray.length > 3) {
    const btn = document.createElement("button");
    btn.innerText = showAll ? "View Less" : "View All Cars";
    btn.classList.add("view-more-btn");
    btn.addEventListener("click", () => { showAll = !showAll; displayCars(carArray); carList.scrollIntoView({ behavior: "smooth" }); });
    carList.appendChild(btn);
  }
}


// ====== FILTER CARS ======
function filterCars(brand) {
  const b = brand.toLowerCase().trim();
  showAll = false;
  displayCars(b === "all" ? allCars : allCars.filter(c => c.brand.toLowerCase().trim() === b));
}



// ====== EMAIL FORM ======
function handleFormSubmit(e) {
  e.preventDefault();
  const { name, email, phone, vehicle } = this;
  const message = document.getElementById("formMessage");

  if (!name.value.trim() || !email.value.trim() || !phone.value.trim() || !vehicle.value.trim()) {
    message.style.color = "red"; message.innerText = "Please fill all fields."; return;
  }
  if (!emailjs) { console.error("EmailJS not loaded"); return; }

  Promise.all([
    emailjs.send("service_rp0z9cg","template_m5nfcss",{ name: name.value, email: email.value, phone: phone.value, vehicle: vehicle.value }),
    emailjs.send("service_rp0z9cg","template_8crw928",{ name: name.value, email: email.value, vehicle: vehicle.value })
  ]).then(() => { message.style.color = "green"; message.innerText = `Thanks ${name.value}! Your request for ${vehicle.value} was sent.`; e.target.reset(); })
    .catch(err => { console.error(err); message.style.color = "red"; message.innerText = "Something went wrong. Try again."; });
}

function selectVehicle(vehicleName) {
  const vehicleInput = document.getElementById("vehicleInput");
  if (vehicleInput) vehicleInput.value = vehicleName;
  const contactSection = document.getElementById("contact");
  if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
}

// ====== WHATSAPP FLOAT ANIMATION ======
setTimeout(() => {
  const btn = document.querySelector(".whatsapp-float");
  if (btn) { btn.style.transform = "scale(1.1)"; setTimeout(() => btn.style.transform = "scale(1)", 300); }
}, 4000);

// ====== FAQ TOGGLE ======
document.querySelectorAll(".faq-question").forEach(btn => btn.addEventListener("click", () => btn.parentElement.classList.toggle("active")));

// ====== SLIDESHOW ======
const slides = document.querySelectorAll(".slide");
if (slides.length) {
  let index = 0;
  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4000);
}

document.querySelectorAll('.car-slider').forEach(slider => {
  const images = slider.querySelectorAll('img');
  let index = 0;

  const showImage = (i) => {
    images.forEach(img => img.classList.remove('active'));
    images[i].classList.add('active');
  };

  slider.querySelector('.next').onclick = () => {
    index = (index + 1) % images.length;
    showImage(index);
  };

  slider.querySelector('.prev').onclick = () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  };

  // Auto slide (optional but adds polish)
  setInterval(() => {
    index = (index + 1) % images.length;
    showImage(index);
  }, 1500);
});
