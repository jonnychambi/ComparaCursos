interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => (
  <div className="rounded-2xl border border-studia-soft bg-white p-2 shadow-soft">
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder ?? 'Busca por programa, institución o tecnología'}
      className="w-full rounded-xl border-none px-4 py-3 text-sm text-studia-dark outline-none"
      aria-label="Buscar programas"
    />
  </div>
);
