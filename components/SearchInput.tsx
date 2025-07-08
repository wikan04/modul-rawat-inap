import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <Input
      type="text"
      placeholder="Cari nama atau NIK..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border mb-4 rounded"
    />
  );
}
