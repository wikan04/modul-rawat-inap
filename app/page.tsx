"use client";

import { useMemo, useState, useEffect } from "react";
import { usePatientStore } from "@/store/patientStore";
import Link from "next/link";
import PatientTable from "@/components/PatientTable";
import SearchInput from "@/components/SearchInput";
import Loading from "@/components/Loading";
import DataNotFound from "@/components/DataNotFound";
import PaginationControls from "@/components/PaginationControls";
import { Button } from "@/components/ui/button";

export default function PatientListPage() {
  const patients = usePatientStore((state) => state.patients);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"nama" | "tanggalMasuk">("nama");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const filteredPatients = useMemo(() => {
    let filtered = patients.filter(
      (p) =>
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.nik.includes(search)
    );

    filtered.sort((a, b) => {
      const fieldA = a[sortBy].toLowerCase?.() ?? a[sortBy];
      const fieldB = b[sortBy].toLowerCase?.() ?? b[sortBy];
      return sortAsc ? (fieldA > fieldB ? 1 : -1) : fieldA < fieldB ? 1 : -1;
    });
    return filtered;
  }, [patients, search, sortBy, sortAsc]);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: "nama" | "tanggalMasuk") => {
    if (sortBy === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(field);
      setSortAsc(true);
    }
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Pasien Aktif</h1>
        <Link href="/form">
          <Button>Tambah Pasien</Button>
        </Link>
      </div>
      <SearchInput value={search} onChange={setSearch} />
      {loading ? (
        <Loading />
      ) : filteredPatients.length === 0 ? (
        <DataNotFound />
      ) : (
        <>
          <PatientTable
            patients={paginatedPatients}
            sortBy={sortBy}
            sortAsc={sortAsc}
            onSort={handleSort}
          />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
