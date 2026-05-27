// FIREBASE CONFIG


const cars = [
  {
    brand: "Mercedes Benz",
    model: "GLE 450",
    year: 2020,
    price: 79000000,
    mileage: "50,000 km",
    transmission: "Automatic",
    fuel: "Petrol",
    engine: "V6",
    interior: "Ambient Lightings, Hud Display, 21 inches Alloys",
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
    interior: "Ambient Lightings, Smart Screen",
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
    price: 13000000,
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
    price: 28000000,
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
    images: ["Images/Lexus RX 350L.jpg","Images/l1.jpg","Images/l2.jpg","Images/l3.jpg","Images/l4.jpg","Images/l5.jpg","Images/l6.jpg","Images/l7.jpg","Images/l8.jpg",]
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
    images: ["Images/lexus es 350 2013.jpg","Images/3501.jpg","Images/3502.jpg","Images/3503.jpg","Images/3504.jpg","Images/3505.jpg","Images/3506.jpg","Images/3507.jpg",]
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
    price: 11000000,
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

function formatPrice(price){
  return new Intl.NumberFormat("en-NG",{
    style:"currency",
    currency:"NGN",
    maximumFractionDigits:0
  }).format(price);
}

async function loadCar() {

  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");

  try {

    // GET FIREBASE CARS
    const snapshot = await db.collection("cars").get();

    const firestoreCars = snapshot.docs.map(doc => doc.data());

    // MERGE LOCAL + FIREBASE
    const allCars = [...cars, ...firestoreCars];

    // FIND MATCHING CAR
    const car = allCars.find(c => {

      const slug =
        `${c.brand}-${c.model}-${c.year}`
          .toLowerCase()
          .replace(/\s+/g, "-");

      return slug === id;
    });

    // IF NOT FOUND
    if (!car) {

      document.getElementById("carDetails").innerHTML =
        "<h1 style='padding:40px;'>Car not found</h1>";

      return;
    }

    // PAGE TITLE
    document.title =
      `${car.year} ${car.brand} ${car.model}`;

    // RENDER CAR
    document.getElementById("carDetails").innerHTML = `

      <div class="car-page">

        <img
          src="${car.images[0]}"
          class="main-image"
          id="mainImage"
        >

        <div class="thumbnail-row">
          ${car.images.map(img => `
            <img src="${img}" onclick="changeImage('${img}')">
          `).join("")}
        </div>

        <div class="car-info">

          <h1>
            ${car.year} ${car.brand} ${car.model}
          </h1>

          <div class="price">
            ${formatPrice(car.price)}
          </div>

          <div class="spec-grid">

            <div class="spec-card">
              <h3>Mileage</h3>
              <p>${car.mileage || "N/A"}</p>
            </div>

            <div class="spec-card">
              <h3>Transmission</h3>
              <p>${car.transmission || "N/A"}</p>
            </div>

            <div class="spec-card">
              <h3>Fuel</h3>
              <p>${car.fuel || "N/A"}</p>
            </div>

            <div class="spec-card">
              <h3>Engine</h3>
              <p>${car.engine || "N/A"}</p>
            </div>
            
          </div>

          <div class="spec-card2">
            <h3>Interior / Features</h3>
            <p>${car.interior || "N/A"}</p>
          </div>

          <a
            href="https://wa.me/2348166952640"
            class="btn"
            target="_blank"
          >
            Book Test Drive
          </a>

        </div>

      </div>
    `;

  }
  catch(err) {

    console.error(err);

    document.getElementById("carDetails").innerHTML =
      "<h1 style='padding:40px;'>Error loading car</h1>";
  }
}

function changeImage(img){
  document.getElementById("mainImage").src = img;
}

loadCar();