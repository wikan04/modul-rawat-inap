"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Patient } from "@/types/patient";
import { usePatientStore } from "@/store/patientStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/DatePickerInput";

interface PatientFormProps {
  initialData?: Patient;
  mode?: "add" | "edit";
}

export default function PatientForm({
  initialData,
  mode = "add",
}: PatientFormProps) {
  const router = useRouter();
  const addPatient = usePatientStore((state) => state.addPatient);

  const [formData, setFormData] = useState<Patient>(
    initialData || {
      id: uuidv4(),
      nama: "",
      nik: "",
      diagnosa: "",
      tanggalMasuk: "",
      dokter: "",
      ruangan: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nama) newErrors.nama = "Nama wajib diisi";
    if (!formData.nik || formData.nik.length !== 16) {
      newErrors.nik = "NIK harus 16 digit";
    }
    if (!formData.diagnosa) newErrors.diagnosa = "Diagnosa wajib diisi";
    if (!formData.tanggalMasuk)
      newErrors.tanggalMasuk = "Tanggal masuk wajib diisi";
    if (!formData.dokter) newErrors.dokter = "Dokter wajib diisi";
    if (!formData.ruangan) newErrors.ruangan = "Ruangan wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === "add") {
      addPatient({ ...formData, id: uuidv4() });
    }

    router.push("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setFormData({
      ...formData,
      tanggalMasuk: date.toISOString().split("T")[0],
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Edit Data Pasien" : "Formulir Pasien Masuk"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "nama", label: "Nama Lengkap", type: "text" },
          { name: "nik", label: "NIK", type: "text" },
          { name: "diagnosa", label: "Diagnosa Masuk", type: "textarea" },
          { name: "dokter", label: "Dokter Penanggung Jawab", type: "text" },
          { name: "ruangan", label: "Ruangan", type: "text" },
        ].map(({ name, label, type }) => (
          <div key={name} className="space-y-1">
            <Label htmlFor={name}>{label}</Label>
            {type === "textarea" ? (
              <Textarea
                id={name}
                name={name}
                value={formData[name as keyof Patient] || ""}
                onChange={handleChange}
              />
            ) : (
              <Input
                id={name}
                type={type}
                name={name}
                value={formData[name as keyof Patient] || ""}
                onChange={handleChange}
              />
            )}
            {errors[name] && (
              <p className="text-sm text-red-500">{errors[name]}</p>
            )}

            {name === "nik" && formData.nik && formData.nik.length > 0 && (
              <p
                className={`text-sm ${
                  formData.nik.length < 16 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {formData.nik.length}/16 karakter
              </p>
            )}
          </div>
        ))}

        <div className="space-y-1">
          <Label htmlFor="tanggalMasuk">Tanggal Masuk</Label>
          <DatePickerInput
            value={
              formData.tanggalMasuk
                ? new Date(formData.tanggalMasuk)
                : undefined
            }
            onChange={(date) => {
              if (!date) return;
              setFormData({
                ...formData,
                tanggalMasuk: date.toLocaleDateString("sv-SE"),
              });
            }}
          />
          {errors.tanggalMasuk && (
            <p className="text-sm text-red-500">{errors.tanggalMasuk}</p>
          )}
        </div>

        <div className="flex justify-between">
          <Button type="submit">
            {mode === "edit" ? "Simpan Perubahan" : "Simpan"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
          >
            Lihat Daftar Pasien
          </Button>
        </div>
      </form>
    </div>
  );
}
