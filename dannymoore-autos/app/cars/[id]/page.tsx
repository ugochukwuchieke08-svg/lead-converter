"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  MessageCircle,
  Settings2,
  CalendarDays,
} from "lucide-react";
import Navbar from "@/components/Navbar";

import { getCarById, Car } from "@/services/carService";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    async function loadCar() {
      try {
        const data = await getCarById(id);
        setCar(data);
      } catch (error) {
        console.error("Failed to load vehicle:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadCar();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="vehicleLoading">
        <p>Loading vehicle...</p>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="vehicleNotFound">
        <h1>Vehicle not found</h1>

        <p>
          This vehicle may have been sold or removed from our inventory.
        </p>

        <button onClick={() => router.push("/")}>
          <ArrowLeft size={18} />
          Back to Inventory
        </button>
      </main>
    );
  }

  const images = car.images?.length ? car.images : [];

  const nextImage = () => {
    if (!images.length) return;

    setImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    if (!images.length) return;

    setImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dannymoore Autos, I'm interested in the ${car.year} ${car.brand} ${car.model}. Is it still available?`
  );

  return (
    <main className="vehiclePage">
      {/* NAVBAR */}
      <Navbar />

      {/* BACK */}
      <div className="vehicleContainer">
        <button
          className="backButton"
          onClick={() => router.back()}
        >
          <ArrowLeft size={19} />
          Back to inventory
        </button>

        {/* VEHICLE */}
        <section className="vehicleLayout">
          {/* GALLERY */}
          <div className="vehicleGallery">
            <div className="mainVehicleImage">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[imageIndex]}
                    alt={`${car.year} ${car.brand} ${car.model}`}
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        className="galleryButton galleryPrev"
                        onClick={previousImage}
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} />
                      </button>

                      <button
                        className="galleryButton galleryNext"
                        onClick={nextImage}
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="noVehicleImage">
                  No image available
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="thumbnailGrid">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    className={
                      imageIndex === index
                        ? "thumbnail active"
                        : "thumbnail"
                    }
                    onClick={() => setImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${car.brand} ${car.model} ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFORMATION */}
          <div className="vehicleInfo">
            <p className="eyebrow">AVAILABLE VEHICLE</p>

            <h1>
              {car.year} {car.brand}
              <br />
              {car.model}
            </h1>

            <div className="vehiclePrice">
              {formatPrice(car.price)}
            </div>

            <p className="vehicleDescription">
              This {car.year} {car.brand} {car.model} is currently available
              at Dannymoore Autos. Contact us to confirm availability,
              schedule a viewing, or book a test drive.
            </p>

            {/* QUICK SPECS */}
            <div className="quickSpecs">
              <Spec
                icon={<CalendarDays size={21} />}
                label="Year"
                value={String(car.year)}
              />

              <Spec
                icon={<Gauge size={21} />}
                label="Mileage"
                value={car.mileage || "N/A"}
              />

              <Spec
                icon={<Settings2 size={21} />}
                label="Transmission"
                value={car.transmission || "N/A"}
              />

              <Spec
                icon={<Fuel size={21} />}
                label="Fuel"
                value={car.fuel || "N/A"}
              />
            </div>

            {/* ACTIONS */}
            <div className="vehicleActions">
              <a
                href="https://wa.me/2348166952640"
                target="_blank"
                rel="noopener noreferrer"
                className="vehicleWhatsapp"
              >
                <MessageCircle size={21} />
                WhatsApp About This Car
              </a>

              <a href="/#contact" className="vehicleTestDrive">
                Book a Test Drive
                <ArrowRight size={20} />
              </a>
            </div>

            {/* FULL SPECS */}
            <div className="fullSpecs">
              <h2>Vehicle Specifications</h2>

              <SpecRow label="Brand" value={car.brand} />
              <SpecRow label="Model" value={car.model} />
              <SpecRow label="Year" value={String(car.year)} />
              <SpecRow
                label="Mileage"
                value={car.mileage || "Not specified"}
              />
              <SpecRow
                label="Transmission"
                value={car.transmission || "Not specified"}
              />
              <SpecRow
                label="Fuel Type"
                value={car.fuel || "Not specified"}
              />
              <SpecRow
                label="Engine"
                value={car.engine || "Not specified"}
              />
              <SpecRow
                label="Interior"
                value={car.interior || "Not specified"}
              />
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="logo">
          DANNYMOORE <span>AUTOS</span>
        </div>

        <p>© {new Date().getFullYear()} Dannymoore Autos Ltd.</p>
      </footer>
    </main>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="spec">
      <div className="specIcon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="specRow">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}