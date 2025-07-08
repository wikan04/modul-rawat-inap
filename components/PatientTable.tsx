import { Patient } from "@/types/patient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PatientTableProps {
  patients: Patient[];
  sortBy: "nama" | "tanggalMasuk";
  sortAsc: boolean;
  onSort: (field: "nama" | "tanggalMasuk") => void;
}

export default function PatientTable({
  patients,
  sortBy,
  sortAsc,
  onSort,
}: PatientTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => onSort("nama")}
              className="cursor-pointer"
            >
              Nama {sortBy === "nama" && (sortAsc ? "↑" : "↓")}
            </TableHead>
            <TableHead>NIK</TableHead>
            <TableHead>Diagnosa</TableHead>
            <TableHead
              onClick={() => onSort("tanggalMasuk")}
              className="cursor-pointer"
            >
              Tanggal Masuk {sortBy === "tanggalMasuk" && (sortAsc ? "↑" : "↓")}
            </TableHead>
            <TableHead>Dokter</TableHead>
            <TableHead>Ruangan</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.nama}</TableCell>
              <TableCell>{p.nik}</TableCell>
              <TableCell>{p.diagnosa}</TableCell>
              <TableCell>{p.tanggalMasuk}</TableCell>
              <TableCell>{p.dokter}</TableCell>
              <TableCell>{p.ruangan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
