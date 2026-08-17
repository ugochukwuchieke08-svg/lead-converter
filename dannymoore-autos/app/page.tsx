"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { getCars, Car } from "@/services/carService";
import Navbar from "@/components/Navbar";



function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeBrand, setActiveBrand] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Failed to load cars:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(
      new Set(cars.map((car) => car.brand).filter(Boolean))
    );

    return ["All", ...uniqueBrands];
  }, [cars]);

  const filteredCars = useMemo(() => {
    const query = search.toLowerCase().trim();

    return cars.filter((car) => {
      const matchesSearch =
        !query ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        `${car.year}`.includes(query);

      const matchesBrand =
        activeBrand === "All" ||
        car.brand.toLowerCase() === activeBrand.toLowerCase();

      return matchesSearch && matchesBrand;
    });
  }, [cars, search, activeBrand]);

  const displayedCars = showAll
    ? filteredCars
    : filteredCars.slice(0, 6);

  return (
    <main>
      {/* TOP BAR */}
      <div className="topBar">
        <span>• Mercedes GLE 350 receiving multiple enquiries</span>
        <span>• Response time under 5 minutes</span>
      </div>

      {/* NAVBAR */}
     <Navbar />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="heroContent">
          <div className="heroBadge">
            <span>✓</span>
            VERIFIED VEHICLES
          </div>

          <h1>
            Affordable
            <br />
            Cars
            <br />
            <span>in Lagos.</span>
          </h1>

          <p>
            Drive home today. Fast approval. No pressure sales. Browse our
            latest vehicles and find the right car for you.
          </p>

          <div className="heroButtons">
            <a href="#inventory" className="primaryButton">
              Browse Inventory
              <ArrowRight size={20} />
            </a>

            <a href="#contact" className="secondaryButton">
              Book Test Drive
            </a>
          </div>

          <div className="responseTime">
            <span>◷</span>
            We respond within 5 minutes during business hours.
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trustBar">
        <div>✓ Fast Approval</div>
        <div>✓ All Credit Accepted</div>
        <div>✓ No Hidden Fees</div>
        <div>✓ 100+ Cars Sold</div>
      </section>

      {/* INVENTORY */}
      <section className="inventory" id="inventory">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">OUR COLLECTION</p>
            <h2>Latest Inventory</h2>
          </div>

          <a href="/cars" className="viewAll">
            View all cars
            <ArrowRight size={20} />
          </a>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="inventoryControls">
          <div className="searchBox">
            <Search size={21} />
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowAll(true);
              }}
            />
          </div>

          <div className="brandFilters">
            <SlidersHorizontal
              size={19}
              className="filterIcon"
            />

            {brands.slice(0, 7).map((brand) => (
              <button
                key={brand}
                className={
                  activeBrand === brand
                    ? "brandButton active"
                    : "brandButton"
                }
                onClick={() => {
                  setActiveBrand(brand);
                  setShowAll(true);
                }}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* CARS */}
        {loading ? (
          <div className="loading">
            <p>Loading inventory...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="emptyInventory">
            <h3>No vehicles found</h3>
            <p>
              Try searching for another brand or model.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveBrand("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="carGrid">
              {displayedCars.map((car) => (
                <a
                  href={`/cars/${car.id}`}
                  className="carCard"
                  key={car.id}
                >
                 <div className="carImage">
  <span
    className={`carStatusBadge ${
      car.status === "sold" ? "sold" : "inStock"
    }`}
  >
    {car.status === "sold" ? "SOLD" : "IN STOCK"}
  </span>

  {car.images?.[0] ? (
    <img
      src={car.images[0]}
      alt={`${car.year} ${car.brand} ${car.model}`}
    />
  ) : (
    <div className="imagePlaceholder">
      No image available
    </div>
  )}
</div>

                  <div className="carInfo">
                    <p className="carYear">
                      {car.year} {car.brand}
                    </p>

                    <h3>{car.model}</h3>

                    <p className="carPrice">
                      {formatPrice(car.price)}
                    </p>

                    <div className="carDetails">
                      <span>View Details</span>
                      <ArrowRight size={19} />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {filteredCars.length > 6 && (
              <button
                className="inventoryMore"
                onClick={() => setShowAll((value) => !value)}
              >
                {showAll ? "View Less" : "View All Cars"}
                <ArrowRight
                  size={19}
                  className={showAll ? "rotateArrow" : ""}
                />
              </button>
            )}
          </>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="process">
        <div className="processHeader">
          <p className="eyebrow">SIMPLE PROCESS</p>
          <h2>How It Works</h2>
        </div>

        <div className="processGrid">
          <Process
            number="01"
            title="Browse Cars"
            text="Explore our available vehicles."
          />

          <Process
            number="02"
            title="View Details"
            text="Check specifications and images."
          />

          <Process
            number="03"
            title="Contact Seller"
            text="Book a test drive or ask questions."
          />

          <Process
            number="04"
            title="Drive Away"
            text="Complete your purchase and drive home."
          />
        </div>
      </section>
{/* ABOUT */}
<section className="about" id="about">
  <div className="aboutText">
    <p className="eyebrow">ABOUT DANNYMOORE AUTOS</p>

    <h2>
      Straightforward deals.
      <br />
      Real value.
    </h2>

    <p>
      At Dannymoore Autos, we help you find the right car without
      stress, confusion, or hidden charges.
    </p>

    <p>
      Based in Lagos, we've built our reputation on trust, speed, and
      transparency. Whether you're buying your first car or upgrading,
      our goal is simple, get you behind the wheel quickly and
      confidently.
    </p>

    <p>
      No pressure. No unnecessary delays. Just straightforward deals.
    </p>
  </div>

 <div className="about-video">
  <video
    autoPlay
    muted
    loop
    playsInline
    controls
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    }}
  >
    <source
      src="https://res.cloudinary.com/du6e7pzwg/video/upload/v1774285888/VID-20260322-WA0005_de53rd.mp4"
      type="video/mp4"
    />
  </video>
</div>
</section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <p className="eyebrow">GET IN TOUCH</p>

        <h2>Ready to find your car?</h2>

        <p>
          Speak with DannyMoore Autos today and book a test drive.
        </p>

        <a href="https://wa.me/2348166952640" className="primaryButton">
          Contact Us
          <ArrowRight size={20} />
        </a>
      </section>

      <footer>
        <div className="logo">
          DANNYMOORE <span>AUTOS</span>
        </div>

        <p>© {new Date().getFullYear()} Dannymoore Autos Ltd.</p>
      </footer>
    </main>
  );
}

function Process({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="processItem">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}