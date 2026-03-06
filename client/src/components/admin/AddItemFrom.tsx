import { useState } from "react";

export default function AddItemForm() {

  const [type, setType] = useState("");

  return (
    <form className="flex flex-col gap-4 max-w-lg">

      {/* zajednicka polja */}

      <input
        placeholder="Naziv itema"
        className="p-2 rounded bg-[#1A2E33]"
      />

      <input
        placeholder="Cena"
        type="number"
        className="p-2 rounded bg-[#1A2E33]"
      />

      <input
        placeholder="Image URL"
        className="p-2 rounded bg-[#1A2E33]"
      />

      {/* dropdown za tip */}

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 rounded bg-[#1A2E33]"
      >
        <option value="">Izaberi tip</option>
        <option value="knjiga">Knjiga</option>
        <option value="aksesoar">Aksesoar</option>
      </select>

      {/* BOOK FIELDS */}

      {type === "knjiga" && (
        <>
          <input
            placeholder="Autor"
            className="p-2 rounded bg-[#1A2E33]"
          />

          <input
            placeholder="ISBN"
            className="p-2 rounded bg-[#1A2E33]"
          />

          <input
            placeholder="Broj stranica"
            type="number"
            className="p-2 rounded bg-[#1A2E33]"
          />
        </>
      )}

      {/* ACCESSORY FIELDS */}

      {type === "aksesoar" && (
        <>
          <input
            placeholder="Materijal"
            className="p-2 rounded bg-[#1A2E33]"
          />

          <input
            placeholder="Boja"
            className="p-2 rounded bg-[#1A2E33]"
          />
        </>
      )}

      <button
        type="submit"
        className="bg-[#9DB7AA] text-black py-2 rounded mt-4"
      >
        Dodaj item
      </button>

    </form>
  );
}