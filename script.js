// BURGER MENU
document.addEventListener("DOMContentLoaded", () => {

    emailjs.init("-HjyFNJhUpMq4hckZ");

  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  if (burger && navLinks) {
    burger.addEventListener("click", (e) => {
      navLinks.classList.toggle("active");
      burger.classList.toggle("active");
      e.stopPropagation();
    });

    document.addEventListener("click", (event) => {
      if (!navLinks.contains(event.target) && !burger.contains(event.target)) {
        navLinks.classList.remove("active");
        burger.classList.remove("active");
      }
    });
  }

  // SCROLL ANIMATION
 const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      entry.target.classList.add("show");

      // Animate children cards with delay
      const cards = entry.target.querySelectorAll(".car-card");
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 150); // delay per card
      });

    }
  });
});
  document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

  // Track clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(link => link.addEventListener("click", () => console.log("Call clicked")));
  document.querySelectorAll('a[href="#contact"]').forEach(link => link.addEventListener("click", () => console.log("Book clicked")));

  // Form submission
  const form = document.getElementById("testDriveForm");
  if (form) form.addEventListener("submit", handleFormSubmit);

  // Display all cars if car-list exists
  const carList = document.getElementById("car-list");
  if (carList) displayCars(cars);

});

// ====== CAR DATA ======
const cars = [
  {
    brand: "Toyota",
    model: "Camry (Sports Edition)",
    year: 2013,
    price: 13500000,
    mileage: "91,654 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Gray on black interior, Chilling AC, Sports stering control ",
    images: ["Images/toyota camry.jpg","Images/camry1.jpg","Images/camry2.jpg","Images/camry3.jpg","Images/camry4.jpg","Images/camry5.jpg","Images/camry6.jpg"]
  },
  {
    brand: "Mercedes Benz",
    model: "GLE 450",
    year: 2020,
    price: 79000000,
    mileage: "50,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Ambient Lightingd, Hud Display, 21inches Alloys",
    images: ["Images/gle 350 1.jpg","Images/gle1.jpg","Images/gle2.jpg","Images/gle3.jpg","Images/gle4.jpg","Images/gle5.jpg","Images/gle6.jpg"]
  },
  {
    brand: "Mercedes Benz",
    model: "ML 350",
    year: 2013,
    price: 19800000,
     mileage: "70,700 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "untouched",
    interior: "Ambient Lightingd, Smart Screen",
    images: ["Images/ml 350.jpg","Images/ml1.jpg","Images/ml2.jpg","Images/ml3.jpg","Images/ml4.jpg","Images/ml5.jpg"]
  },
  {
    brand: "Lexus",
    model: "RX 350",
    year: 2010,
    price: 15000000,
     mileage: "73,327 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Andriod Screen Chilling Air Conditioning Ventilated Leather Seats",
    images: ["Images/lexus rx 350.jpg","Images/rx1.jpg","Images/rx2.jpg","Images/rx3.jpg","Images/rx4.jpg","Images/rx5.jpg","Images/rx6.jpg","Images/rx7.jpg","Images/rx8.jpg"]
  },
  {
    brand: "Mercedes",
    model: "ML 350 4matic",
    year: 2010,
    price: 14000000,
    mileage: "60,000 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Black on black interior, Andriod Screen, Metallic roof carrier, Bluetooth Connectivity",
    images: ["Images/custom ml 350.jpg","Images/ml21.jpg","Images/ml22.jpg","Images/ml23.jpg","Images/ml24.jpg","Images/ml25.jpg","Images/ml26.jpg","Images/ml27.jpg"]
  },
  {
    brand: "Lexus",
    model: "ES 350",
    year: 2013,
    price: 19000000,
    mileage: "75,368 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Thumb start, Navigation DVD screen, Sun roof, Ventilated leather seats",
    images: ["Images/lexus es 350.jpg","Images/es1.jpg","Images/es2.jpg","Images/es3.jpg","Images/es5.jpg","Images/es6.jpg","Images/es7.jpg","Images/es8.jpg"]
  },
  {
    brand: "Mercedes Benz",
    model: "GLC 300",
    year: 2015,
    price: 41000000,
    mileage: "120,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Panoramic roof, Thumb start, 360 camera, Matte Coffe color, LED headlights Collision assist, Lane keeping assist, Ventillated seats,",
    images: ["Images/glc 350 1.jpg","Images/brown glc 300 2.jpg","Images/brown glc 300 3.jpg","Images/brown glc 300.jpg",]
  },
  {
    brand: "Mercedes Benz",
    model: "ML 350 upgraded",
    year: 2018,
    price: 24500000,
    mileage: "120,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior:  "Thumb start, Panoramic roof, Ambient Lightnings, LED headlights,Smart screen, Power booth, Side board lights ",
    images: ["Images/gle350.jpg","Images/ml31.jpg","Images/ml32.jpg","Images/ml33.jpg","Images/ml34.jpg","Images/ml35.jpg","Images/ml36.jpg","Images/ml37.jpg","Images/ml38.jpg"]
  },
  {
    brand: "Mercedes Benz",
    model: "GLK 350",
    year: 2015,
    price: 21000000,
    mileage: "120,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Thumb Start, Panoramic roof, Keyless entry,Parking assist, Reverse camera, Motion sensor, AMG alloy rims",
    images: ["Images/glk 350.jpg","Images/glk1.jpg","Images/glk2.jpg","Images/glk3.jpg","Images/glk4.jpg","Images/glk5.jpg","Images/glk6.jpg","Images/glk7.jpg","Images/glk8.jpg"]
  },
  {
    brand: "Toyota",
    model: "Venza",
    year: 2014,
    price: 22200000,
    mileage: "50,000 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Thumb start, LED lights, Power booth, Panoramic roof, Park sensor, Custom Duty intact ",
    images: ["Images/venza 1.jpg","Images/venza1.jpg","Images/venza2.jpg","Images/venza3.jpg","Images/venza4.jpg","Images/venza5.jpg","Images/venza6.jpg","Images/venza7.jpg"]
  },
  {
    brand: "Toyota",
    model: "High Lander",
    year: 2016,
    price: 30300000,
    mileage: "20,000 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Thumb start, Ambient lights, Blind Spot Monitor (BSM), Proximity sensor Captain seats, Burgundy on cream interior",
    images: ["Images/high lander 1.jpg","Images/lander1.jpg","Images/lander2.jpg","Images/lander3.jpg"]
  },
  {
    brand: "Lexus",
    model: "RX 350L [Full Option]",
    year: 2018,
    price: 45000000,
    mileage: "120,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "3 row seats, Long screen, Hud display, Eco control, Parking sensor,Lane assist, Automatic folding mirror,AC chilling, Two-tone interior, Extremely clean",
    images: ["Images/Lexus RX 350L.jpg"]
  },
  {
    brand: "Honda",
    model: "Pilot EX-L",
    year: 2016,
    price: 23500000,
    interior: "Thumb start, Power boot, Eco assist, Sunroof, Factory fitted rims, Chilling AC,3row seats",
    images: ["Images/Honda Pilot.jpg","Images/pilot1.jpg","Images/pilot2.jpg","Images/pilot 3.jpg","Images/pilot4.jpg","Images/pilot5.jpg","Images/pilot6.jpg","Images/pilot7.jpg"]
  },
  {
    brand: "Lexus",
    model: "ES 350",
    year: 2013,
    price: 20500000,
    mileage: "75,368 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Thumb start, Power boot, Eco assist, Sunroof, Navigation DVD screen display, Mark levission speakers, Paddle shifters, Chilling AC,3row seats",
    images: ["Images/lexus es 350 2013.jpg"]
  },
  {
    brand: "Lexus",
    model: "LX 570",
    year: 2018,
    price: 0,
    mileage: "21,123 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V8",
    interior: "Thumb start, Power boot, Eco assist, Sunroof, HUD display, Wireless Charging, Paddle shifters, Chilling AC,3row seats",
    images: ["Images/Lexus LX 570.jpg","Images/lx1.jpg","Images/lx2.jpg","Images/lx3.jpg",]
  },
  {
    brand: "Toyota",
    model: "High Lander XLE",
    year: 2022,
    price: 63000000,
    mileage: "120,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Hud display, Wireless charging, Sport and Eco drive mode, LED headlights, Touchscreen and android, Blue on arsh interior,Parking sensors",
    images: ["Images/Toyota highlander.jpg","Images/lander21.jpg","Images/lander22.jpg","Images/lander23.jpg"]
  },
  {
    brand: "Lexus",
    model: "Lexus RX 350",
    year: 2012,
    price: 21500000,
    mileage: "75,327 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "HEads up display, Panoramic roof, 270deg camera, Lexus Park assist, silver on black interior, Bluethoot, Intelligent Headlights",
    images: ["Images/Lexus Rx 350 1.jpg","Images/Lexus Rx 350 2.jpg","Images/Lexus Rx 350 3.jpg","Images/Lexus Rx 350 4.jpg","Images/Lexus Rx 350 5.jpg","Images/Lexus Rx 350 6.jpg"]
  },
  {
    brand: "Toyota",
    model: "Toyota Avalon LTD",
    year: 2015,
    price: 19500000,
    mileage: "72,636 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "sun roof, Rear AC vents control, Navigation DVD Screen display Reverse Camera, JBL sound system",
    images: ["Images/Toyota Avalon 1.jpg","Images/av1.jpg","Images/av2.jpg","Images/av3.jpg","Images/av4.jpg","Images/av5.jpg","Images/av6.jpg","Images/av7.jpg"]
  },
  {
    brand: "Mercedes Benz",
    model: "Mercedes GLC 300",
    year: 2016,
    price: 30000000,mileage: "120,000 km",
    transmission: "Automatic + Sports mode active",
    fuel: "Petrol",
    engine: "V6",
    interior: "Massage seats, Panoramic roof, Thumb start,Proximity sensors, Lane keeping assist, Ventillated seats",
    images: ["Images/Mecerdes glc 300 1.jpg","Images/glc1.jpg","Images/glc2.jpg","Images/glc3.jpg","Images/glc4.jpg","Images/glc5.jpg","Images/glc6.jpg"]
  },
  {
    brand: "Toyota",
    model: "Highlander",
    year: 2013,
    price: 19000000,
    mileage: "120,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Keyless, Reverse camera, JBL speakers,Power boot, Ventilated leather seats, 3 row seats",
    images: ["Images/new1.jpg","Images/new2.jpg","Images/new3.jpg","Images/new4.jpg","Images/new5.jpg","Images/new6.jpg","Images/new7.jpg","Images/new8.jpg","Images/new9.jpg"]
  },
  {
    brand: "Lexus",
    model: "ES 350",
    year: 2010,
    price: 13500000,
    mileage: "82,210 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Thumb start Proximity/parking sensor,",
    images: ["Images/new10.jpg","Images/new11.jpg","Images/new12.jpg","Images/new13.jpg","Images/new14.jpg","Images/new15.jpg","Images/new16.jpg","Images/new17.jpg"]
  },
  {
    brand: "Ford",
    model: "Escape Titanum",
    year: 2015,
    price: 13500000,
    mileage: "112,000 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Thumb start, Self Parking assist,Door lock features, Eco boost, AWD",
    images: ["Images/new18.jpg","Images/new19.jpg","Images/new20.jpg","Images/new21.jpg","Images/new22.jpg","Images/new23.jpg","Images/new24.jpg","Images/new25.jpg","Images/new26.jpg","Images/new27.jpg"]
  },
  {
    brand: "Mercedes Benz",
    model: "ML 350",
    year: 2013,
    price: 19000000,mileage: "109,457 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Thumb start LED lights Smart screen, Auto folding side mirrors, Power booth, Proximity sensors",
    images: ["Images/new28.jpg","Images/new29.jpg","Images/new30.jpg","Images/new31.jpg","Images/new32.jpg","Images/new33.jpg","Images/new34.jpg"]
  },
  {
    brand: "Mercedes Benz",
    model: " GLK 350",
    year: 2012,
    price: 16300000,
    mileage: "120,111 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Thumb start LED lights Smart screen, Auto folding side mirrors, Power booth, Proximity sensors",
    images: ["Images/new35.jpg","Images/new36.jpg","Images/new37.jpg","Images/new38.jpg","Images/new39.jpg","Images/new40.jpg","Images/new41.jpg"]
  },
  {
    brand: "Lexus",
    model: "ES 350",
    year: 20008,
    price: 30000000,
    mileage: "60,214 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Leather Seats, Auto folding side mirrors, Low Mileage Black on black interior, motion camera active",
    images: ["Images/new42.jpg","Images/new43.jpg","Images/new44.jpg","Images/new45.jpg","Images/new46.jpg","Images/new47.jpg","Images/48.jpg","Images/49.jpg","Images/50.jpg"]
  },
  {
    brand: "Toyota",
    model: "Highlander XLE",
    year: 2017,
    price: 30000000,
    mileage: "73,789 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Remote start, Thumb start, Captin seats, Blind sport monitor, Ambient lights, Gray on black interior",
    images: ["Images/51.jpg","Images/52.jpg","Images/53.jpg","Images/54.jpg","Images/55.jpg"]
  },
  {
    brand: "Toyota",
    model: "Camry (Sports Edition)",
    year: 2013,
    price: 14000000,mileage: "76,985 miles",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Accident free Thumb start, Extremely clean car, white on black interior, Sports steering control",
    images: ["Images/56.jpg","Images/57.jpg","Images/58.jpg","Images/59.jpg","Images/60.jpg"]
  },
  {
    brand: "Lexus",
    model: "RX 350 Full Option",
    year: 2019,
    price: 41000000,mileage: "120,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "2.5L",
    interior: "Long screen, Hud display, Wireless charging, Eco control, Parking assist, Proximity sensors, Lane assist,Folding mirrors, AC chilling, two-tone interior",
    images: ["Images/61.jpg","Images/62.jpg","Images/63.jpg","Images/64.jpg"]
  }
];

// ====== PRICE FORMATTER ======
function formatPrice(price) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(price);
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

    card.addEventListener("click", () => openModal(car));

    carList.appendChild(card);
  });

  // 🔥 Toggle button
  if (carArray.length > 3) {
    const btn = document.createElement("button");

    btn.innerText = showAll ? "View Less" : "View All Cars";
    btn.classList.add("view-more-btn");

    btn.addEventListener("click", () => {
      showAll = !showAll;
      displayCars(carArray);

      // 👇 optional but smart UX: scroll back up
      document.getElementById("car-list").scrollIntoView({
        behavior: "smooth"
      });
    });

    carList.appendChild(btn);
  }
}

// ====== FILTER CARS ======
function filterCars(brand) {
  const brandNormalized = brand.toLowerCase().trim();
  if (brandNormalized === "all") displayCars(cars);
  else displayCars(cars.filter(car => car.brand.toLowerCase().trim() === brandNormalized));
}

// ====== MODAL HANDLING ======
function openModal(car) {
  const modal = document.getElementById("carModal");
  const modalBody = document.getElementById("modal-body");
  if (!modal || !modalBody) return;

  let currentImg = 0;
  const images = car.images;

  const stockRandom = Math.floor(Math.random() * 5) + 1;
  const viewedRandom = Math.floor(Math.random() * 15) + 5;

  modalBody.innerHTML = `
    <div class="modal-hero">
      <img id="modal-car-img" src="${images[0]}" alt="${car.brand} ${car.model}">
      <button id="prev-img" class="img-nav">&lt;</button>
      <button id="next-img" class="img-nav">&gt;</button>
      <div class="price-badge">${formatPrice(car.price)}</div>
    </div>

    <div class="modal-details">
      <h2>${car.year} ${car.brand} ${car.model}</h2>
      <p class="tagline">Premium Condition • Fully Inspected • Ready to Drive</p>
     <div class="spec-grid">
  <div><strong>Mileage</strong><span>${car.mileage || "N/A"}</span></div>
  <div><strong>Transmission</strong><span>${car.transmission || "N/A"}</span></div>
  <div><strong>Fuel Type</strong><span>${car.fuel || "N/A"}</span></div>
  <div><strong>Engine</strong><span>${car.engine || "N/A"}</span></div>
  <div><strong>Interior</strong><span>${car.interior || "N/A"}</span></div>
</div>
      <div class="urgency-box">
        <p>✔ Verified Vehicle</p>
        <p>✔ Available for Immediate Inspection</p>
        <p>✔ Contact us for full details</p>
      </div>
      <button class="luxury-btn">Schedule Test Drive</button>
    </div>
  `;

  const modalImg = modalBody.querySelector("#modal-car-img");
  const prevBtn = modalBody.querySelector("#prev-img");
  const nextBtn = modalBody.querySelector("#next-img");

  const updateImg = () => modalImg.src = images[currentImg];

  prevBtn.addEventListener("click", e => { e.stopPropagation(); currentImg = (currentImg - 1 + images.length) % images.length; updateImg(); });
  nextBtn.addEventListener("click", e => { e.stopPropagation(); currentImg = (currentImg + 1) % images.length; updateImg(); });

  // Touch swipe
  let startX = 0;
  modalImg.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  modalImg.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) currentImg = (currentImg - 1 + images.length) % images.length;
    else if (startX - endX > 50) currentImg = (currentImg + 1) % images.length;
    updateImg();
  });

  const bookBtn = modalBody.querySelector(".luxury-btn");
  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      const vehicleInput = document.getElementById("vehicleInput");
      if (vehicleInput) vehicleInput.value = `${car.year} ${car.brand} ${car.model}`;
      closeModal();
      const contactSection = document.getElementById("contact");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("carModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// ====== EMAIL FORM ======

function handleFormSubmit(e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const phone = this.phone.value.trim();
  const vehicle = this.vehicle.value.trim();

  const message = document.getElementById("formMessage");

  if (!name || !email || !phone || !vehicle) {
    message.style.color = "red";
    message.innerText = "Please fill all fields.";
    return;
  }

  if (!emailjs) {
    console.error("EmailJS not loaded");
    return;
  }

  Promise.all([
    emailjs.send("service_rp0z9cg","template_m5nfcss",{ name, email, phone, vehicle }),
    emailjs.send("service_rp0z9cg","template_8crw928",{ name, email, vehicle })
  ])
  .then(() => {
    message.style.color = "green";
    message.innerText = `Thanks ${name}! Your request for ${vehicle} was sent.`;
    e.target.reset();
  })
  .catch((err) => {
    console.error(err);
    message.style.color = "red";
    message.innerText = "Something went wrong. Try again.";
  });
}

function selectVehicle(vehicleName) {
  const vehicleInput = document.getElementById("vehicleInput");
  if (vehicleInput) {
    vehicleInput.value = vehicleName;
  }

  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
}

setTimeout(() => {
  const btn = document.querySelector(".whatsapp-float");
  if (btn) {
    btn.style.transform = "scale(1.1)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 300);
  }
}, 4000);

document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;

    item.classList.toggle("active");
  });
});

let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");

  index = (index + 1) % slides.length;

  slides[index].classList.add("active");
}, 4000); // change every 4 seconds