"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import { getCars, Car } from "@/services/carService";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeBrand, setActiveBrand] = useState("All");

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Failed to load inventory:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(
      new Set(
        cars
          .map((car) => car.brand)
          .filter(Boolean)
      )
    ).sort();

    return ["All", ...uniqueBrands];
  }, [cars]);

  const filteredCars = useMemo(() => {
    const query = search.toLowerCase().trim();

    return cars.filter((car) => {
      const matchesSearch =
        !query ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        String(car.year).includes(query);

      const matchesBrand =
        activeBrand === "All" ||
        car.brand.toLowerCase() === activeBrand.toLowerCase();

      return matchesSearch && matchesBrand;
    });
  }, [cars, search, activeBrand]);

  return (
    <main className="carsPage">
      <Navbar />

      {/* PAGE HERO */}
      <section className="carsHero">
        <div>
          <p className="eyebrow">DANNYMOORE AUTOS</p>

          <h1>
            Find your
            <br />
            next car.
          </h1>

          <p className="carsHeroText">
            Explore our complete collection of available vehicles.
            Search by brand, model, or year.
          </p>
        </div>

        <div className="inventoryCount">
          <strong>{cars.length}</strong>
          <span>Vehicles Available</span>
        </div>
      </section>

      {/* INVENTORY */}
      <section className="allInventory">
        {/* CONTROLS */}
        <div className="allInventoryControls">
          <div className="largeSearch">
            <Search size={21} />

            <input
              type="text"
              placeholder="Search brand, model or year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filterLabel">
            <SlidersHorizontal size={19} />
            Filter by brand
          </div>
        </div>

        {/* BRANDS */}
        <div className="allBrandFilters">
          {brands.map((brand) => (
            <button
              key={brand}
              className={
                activeBrand === brand
                  ? "allBrandButton active"
                  : "allBrandButton"
              }
              onClick={() => setActiveBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* RESULT COUNT */}
        {!loading && (
          <div className="inventoryResultHeader">
            <p>
              Showing <strong>{filteredCars.length}</strong>{" "}
              {filteredCars.length === 1 ? "vehicle" : "vehicles"}
            </p>

            {(search || activeBrand !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveBrand("All");
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="inventoryLoading">
            <div className="loadingSpinner" />
            <p>Loading inventory...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="noCars">
            <h2>No vehicles found</h2>

            <p>
              We couldn't find a vehicle matching your search.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveBrand("All");
              }}
            >
              View all vehicles
            </button>
          </div>
        ) : (
          <div className="allCarsGrid">
            {filteredCars.map((car) => (
              <Link
                href={`/cars/${car.id}`}
                className="inventoryCard"
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
                <div className="inventoryCardInfo">
                  <span className="inventoryCardYear">
                    {car.year} {car.brand}
                  </span>

                  <h2>{car.model}</h2>

                  <div className="inventoryCardBottom">
                    <strong>
                      {formatPrice(car.price)}
                    </strong>

                    <span className="inventoryCardArrow">
                      <ArrowRight size={18} />
                    </span>
                  </div>

                  <div className="inventorySpecs">
                    {car.mileage && (
                      <span>{car.mileage}</span>
                    )}

                    {car.transmission && (
                      <span>{car.transmission}</span>
                    )}

                    {car.fuel && (
                      <span>{car.fuel}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="inventoryCTA">
        <p className="eyebrow">CAN'T FIND WHAT YOU WANT?</p>

        <h2>
          Tell us what
          <br />
          you're looking for.
        </h2>

        <p>
          Our team can help you find a specific make, model,
          or specification.
        </p>

        <Link href="/#contact" className="primaryButton">
          Contact Dannymoore Autos
          <ArrowRight size={20} />
        </Link>
      </section>

      <footer>
        <div className="logo">
          DANNYMOORE <span>AUTOS</span>
        </div>

        <p>
          © {new Date().getFullYear()} Dannymoore Autos Ltd.
        </p>
      </footer>
    </main>
  );
}