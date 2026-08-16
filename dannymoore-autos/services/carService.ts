import {
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: string;
  transmission?: string;
  fuel?: string;
  engine?: string;
  interior?: string;
  images: string[];
  status?: "in-stock" | "sold";
  createdAt?: unknown;
}

export async function getCars(): Promise<Car[]> {
  const carsRef = collection(db, "cars");

  const snapshot = await getDocs(carsRef);

  const cars = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Car[];

  // New cars with createdAt come first.
  // Old cars without createdAt remain visible.
  return cars.sort((a, b) => {
    const aTime =
      a.createdAt &&
      typeof (a.createdAt as any).toMillis === "function"
        ? (a.createdAt as any).toMillis()
        : 0;

    const bTime =
      b.createdAt &&
      typeof (b.createdAt as any).toMillis === "function"
        ? (b.createdAt as any).toMillis()
        : 0;

    return bTime - aTime;
  });
}

export async function getCarById(id: string): Promise<Car | null> {
  const carRef = doc(db, "cars", id);
  const snapshot = await getDoc(carRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Car;
}