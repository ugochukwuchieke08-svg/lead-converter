"use client";

import { useEffect, useState } from "react";
import {
  CarFront,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Loader2,
} from "lucide-react";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { getCars, Car } from "@/services/carService";

const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/du6e7pzwg/image/upload";

const CLOUDINARY_PRESET = "client upload";

export default function AdminPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    transmission: "",
    fuel: "",
    engine: "",
    interior: "",
    status: "in-stock",
  });

  const [images, setImages] = useState<File[]>([]);

  async function loadCars() {
    try {
      setLoading(true);
      const data = await getCars();
      setCars(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function uploadImages() {
    const urls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      setUploadProgress(
        `Uploading image ${i + 1} of ${images.length}...`
      );

      const data = new FormData();

      data.append("file", images[i]);
      data.append("upload_preset", CLOUDINARY_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Cloudinary upload failed.");
      }

      const result = await response.json();

      if (!result.secure_url) {
        throw new Error("Cloudinary did not return an image URL.");
      }

      urls.push(result.secure_url);
    }

    return urls;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.brand.trim()) {
      alert("Please enter the vehicle brand.");
      return;
    }

    if (!form.model.trim()) {
      alert("Please enter the vehicle model.");
      return;
    }

    if (!form.year) {
      alert("Please enter the vehicle year.");
      return;
    }

    if (!form.price) {
      alert("Please enter the vehicle price.");
      return;
    }

   if (!editingCar && !images.length) {
  alert("Please select at least one image");
  return;
}

    try {
      setSaving(true);

     let imageUrls = editingCar?.images || [];

if (images.length > 0) {
  imageUrls = await uploadImages();
}

setUploadProgress(
  editingCar ? "Updating vehicle..." : "Saving vehicle..."
);

const carData = {
  brand: form.brand.trim(),
  model: form.model.trim(),
  year: Number(form.year),
  price: Number(form.price),
  mileage: form.mileage.trim(),
  transmission: form.transmission.trim(),
  fuel: form.fuel.trim(),
  engine: form.engine.trim(),
  interior: form.interior.trim(),
  images: imageUrls,
  status: form.status as "in-stock" | "sold",
};

if (editingCar) {
  await updateDoc(
    doc(db, "cars", editingCar.id),
    carData
  );
} else {
  await addDoc(collection(db, "cars"), {
    ...carData,
    createdAt: serverTimestamp(),
  });
}
      setForm({
        brand: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        transmission: "",
        fuel: "",
        engine: "",
        interior: "",
        status: "in-stock",
      });

      setImages([]);
      setUploadProgress("");
      setEditingCar(null);
      setShowForm(false);

      await loadCars();
    } catch (error) {
      console.error(error);
      alert("Failed to add vehicle. Check the console.");
    } finally {
      setSaving(false);
      setUploadProgress("");
    }
  }

  async function deleteCar(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "cars", id));

      setCars((current) =>
        current.filter((car) => car.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete vehicle.");
    }
  }

  return (
    <main className="adminPage">
      <header className="adminHeader">
        <div className="adminBrand">
          <div className="adminLogo">
            <CarFront size={22} />
          </div>

          <div>
            <strong>DANNYMOORE AUTOS</strong>
            <span>Inventory Manager</span>
          </div>
        </div>

        <button
          className="addVehicleButton"
          onClick={() => setShowForm(true)}
        >
          <Plus size={19} />
          Add Vehicle
        </button>
      </header>

      <section className="adminContent">
        <div className="adminIntro">
          <div>
            <p className="eyebrow">ADMINISTRATION</p>
            <h1>Vehicle Inventory</h1>
            <p>
              Manage the vehicles displayed across the Dannymoore
              Autos website.
            </p>
          </div>

          <div className="adminCount">
            <strong>{cars.length}</strong>
            <span>Vehicles</span>
          </div>
        </div>

        {loading ? (
          <div className="adminLoading">
            <Loader2 className="spin" size={28} />
            <p>Loading inventory...</p>
          </div>
        ) : (
          <div className="adminCars">
            {cars.map((car) => (
              <div className="adminCar" key={car.id}>
                <div className="adminCarImage">
                  {car.images?.[0] ? (
                    <img
                      src={car.images[0]}
                      alt={`${car.brand} ${car.model}`}
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </div>

                <span
                  className={`statusBadge ${
                    car.status === "sold" ? "sold" : "inStock"
                  }`}
                >
                  {car.status === "sold" ? "SOLD" : "IN STOCK"}
                </span>

                <div className="adminCarInfo">
                  <span>
                    {car.year} {car.brand}
                  </span>

                  <h2>{car.model}</h2>

                  <strong>
                    ₦{car.price?.toLocaleString()}
                  </strong>
                </div>

                

                <div className="adminCarActions">
                 <button
                    title="Edit vehicle"
                    onClick={() => {
                      setEditingCar(car);

                      setForm({
                        brand: car.brand || "",
                        model: car.model || "",
                        year: car.year ? String(car.year) : "",
                        price: car.price ? String(car.price) : "",
                        mileage: car.mileage || "",
                        transmission: car.transmission || "",
                        fuel: car.fuel || "",
                        engine: car.engine || "",
                        interior: car.interior || "",
                        status: car.status || "in-stock",
                      });

                      setImages([]);
                      setShowForm(true);
                    }}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="deleteButton"
                    title="Delete vehicle"
                    onClick={() => deleteCar(car.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {!cars.length && (
              <div className="adminEmpty">
                <CarFront size={35} />

                <h2>No vehicles yet</h2>

                <p>
                  Add your first vehicle to start building the
                  inventory.
                </p>

                <button
onClick={() => {
  setEditingCar(null);

  setForm({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    transmission: "",
    fuel: "",
    engine: "",
    interior: "",
    status: "in-stock",
  });

  setImages([]);
  setShowForm(true);
}}
>
  <Plus size={18} />
  Add Vehicle
</button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ADD VEHICLE MODAL */}
      {showForm && (
        <div className="adminModalOverlay">
          <div className="adminModal">
            <div className="modalHeader">
              <div>
                <p className="eyebrow">
                  {editingCar ? "EDIT VEHICLE" : "NEW VEHICLE"}
                </p>

                <h2>
                  {editingCar ? "Edit Vehicle" : "Add Vehicle"}
                </h2>
              </div>

              <button
                className="closeModal"
                onClick={() => {
                  if (!saving) {
                    setShowForm(false);
                  }
                }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="formGrid">
                <FormField
                  label="Brand"
                  value={form.brand}
                  placeholder="e.g. Mercedes-Benz"
                  onChange={(value) =>
                    updateField("brand", value)
                  }
                />

                <FormField
                  label="Model"
                  value={form.model}
                  placeholder="e.g. GLE 350"
                  onChange={(value) =>
                    updateField("model", value)
                  }
                />

                <FormField
                  label="Year"
                  value={form.year}
                  type="number"
                  placeholder="2023"
                  onChange={(value) =>
                    updateField("year", value)
                  }
                />

                <FormField
                  label="Price"
                  value={form.price}
                  type="number"
                  placeholder="85000000"
                  onChange={(value) =>
                    updateField("price", value)
                  }
                />
                
                <div className="formField">
                  <label>Vehicle Status</label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField("status", event.target.value)
                    }
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>

                <FormField
                  label="Mileage"
                  value={form.mileage}
                  placeholder="45,000 km"
                  onChange={(value) =>
                    updateField("mileage", value)
                  }
                />

                <FormField
                  label="Transmission"
                  value={form.transmission}
                  placeholder="Automatic"
                  onChange={(value) =>
                    updateField("transmission", value)
                  }
                />

                <FormField
                  label="Fuel"
                  value={form.fuel}
                  placeholder="Petrol"
                  onChange={(value) =>
                    updateField("fuel", value)
                  }
                />

                <FormField
                  label="Engine"
                  value={form.engine}
                  placeholder="3.0L"
                  onChange={(value) =>
                    updateField("engine", value)
                  }
                />

                <FormField
                  label="Interior"
                  value={form.interior}
                  placeholder="Black leather"
                  onChange={(value) =>
                    updateField("interior", value)
                  }
                />
              </div>

              <div className="imageUploadField">
                <label>Vehicle Images</label>

                <label className="imageDropzone">
                  <Upload size={28} />

                  <strong>
                    Click to select vehicle images
                  </strong>

                  <span>
                    You can select multiple images
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      setImages(
                        Array.from(
                          event.target.files || []
                        )
                      );
                    }}
                  />
                </label>

                {images.length > 0 && (
                  <div className="selectedImages">
                    {images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Selected ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {uploadProgress && (
                <div className="uploadStatus">
                  <Loader2 size={18} className="spin" />
                  {uploadProgress}
                </div>
              )}

             <button
              className="submitVehicle"
              type="submit"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2
                    size={19}
                    className="spin"
                  />
                  {editingCar ? "Saving Changes..." : "Uploading..."}
                </>
              ) : (
                <>
                  {editingCar ? (
                    <Pencil size={19} />
                  ) : (
                    <Plus size={19} />
                  )}

                  {editingCar ? "Save Changes" : "Add Vehicle"}
                </>
              )}
            </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function FormField({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="formField">
      <label>{label}</label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </div>
  );
}