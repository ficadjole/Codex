import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { useAuth } from "../../hooks/auth/useAuthHook";
import type { GenreDto } from "../../models/genre/GenreDto";
import PdfUploader from "../bookForm/PdfUploader";
import BookDetailsCard from "../bookForm/BookDetailsCard";
import DiscountCard from "./DiscountCard";
import { validateBookCreateData } from "../../api_services/validators/bookForm/BookCreateValidator";
import { mapToBookDto, mapToBookUpdateDto } from "../../helpers/bookMapper";
import type { BookValidationErrors } from "../../types/validation/book/BookValidationErrors";
import type { BookFormProps } from "../../types/props/form_props/BookFormProps";
import toast from "react-hot-toast";
import { uploadFile } from "../../helpers/uploadFile";
import type { ItemImageDto } from "../../models/item/details/ItemImageDto";

export default function BookForm({
  genreApi,
  itemApi,
  itemImageApi,
  initialData,
  isEdit = false,
}: BookFormProps) {
  const { token } = useAuth();
  const [itemId, setItemId] = useState<number | null>(null); //null knjiga nije napravljena, number knjiga postoji
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [nmbrOfPages, setNmbrOfPages] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [goodreadsLink, setGoodreadsLink] = useState("");
  const [publicationYear, setPublicationYear] = useState<number | null>(null);
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [cover, setCover] = useState<"meke" | "tvrde">("meke");
  const [pdf, setPdf] = useState<File | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [discountFrom, setDiscountFrom] = useState<string>("");
  const [discountTo, setDiscountTo] = useState<string>("");

  const [genres, setGenres] = useState<GenreDto[]>([]);

  const [images, setImages] = useState<File[]>([]);
  const [primary, setPrimary] = useState<number>(0);

  const [errors, setErrors] = useState<BookValidationErrors>({});

  const [existingImages, setExistingImages] = useState<ItemImageDto[]>(
    initialData?.images || []
  );
  const [originalPrimaryIndex, setOriginalPrimaryIndex] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); //sluzi da spreci podrazumevano ponasanje browsera

    const validation = validateBookCreateData(
      name,
      author,
      isbn,
      price,
      nmbrOfPages,
      description,
      publicationYear,
      genreIds,
      goodreadsLink,
      discountPercent,
      discountFrom,
      discountTo,
    );

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    if (!token) {
      toast.error("Niste ulogovani");
      return;
    }
    try {
      // EDIT
      if (isEdit && itemId) {
        const dto = mapToBookUpdateDto(
          {
            name,
            price,
            description,
            author,
            isbn,
            nmbrOfPages,
            goodreadsLink,
            publicationYear,
            cover,
            pdf,
            genreIds,
            discountPercent,
            discountFrom,
            discountTo,
          },
          itemId,
        );

        const success = await itemApi.updateItem(token, itemId, dto);

        if (!success) {
          toast.error("Greška pri izmeni knjige");
          return;
        }

        if (discountPercent !== null && discountFrom && discountTo) {
          await itemApi.addDiscount(
            token,
            itemId,
            discountPercent,
            discountFrom,
            discountTo,
          );
        }

        toast.success("Knjiga uspešno izmenjena");
        return;
      }

      // CREATE
      const book = mapToBookDto({
        name,
        price,
        description,
        author,
        isbn,
        nmbrOfPages,
        goodreadsLink,
        publicationYear,
        cover,
        pdf,
        genreIds,
        discountPercent,
        discountFrom,
        discountTo,
      });

      const id = await itemApi.addBook(token, book);

      if (!id) {
        toast.error("Greška pri dodavanju knjige");
        return;
      }
      setItemId(id);
      toast.success("Knjiga uspešno kreirana. Sada dodaj slike.");
    } catch {
      toast.error("Došlo je do greške");
    }
  }

  function resetForm() {
    setItemId(null);

    setName("");
    setPrice(null);
    setAuthor("");
    setIsbn("");
    setNmbrOfPages(null);
    setDescription("");
    setGoodreadsLink("");
    setPublicationYear(null);
    setGenreIds([]);
    setCover("meke");
    setPdf(null);

    setDiscountPercent(null);
    setDiscountFrom("");
    setDiscountTo("");

    setImages([]);
    setPrimary(0);

    setErrors({});
  }

  useEffect(() => {
    if (!initialData) return

    const index = initialData.images.findIndex(
      (img: ItemImageDto) => img.isPrimary
    )
    setOriginalPrimaryIndex(index)
  }, [initialData])

  async function handleImageUpload() {
    if (!token || !itemId) return;

    try {

      // 1. upload novih slika
      for (let i = 0; i < images.length; i++) {
        const imageUrl = await uploadFile(itemId, images[i], token, "aksesoar")

        await itemImageApi.addImage(token, itemId, {
          imageUrl,
          isPrimary: primary === existingImages.length + i,
          sortOrder: i,
        })
      }

      // 2. AKO je primary promenjen NA POSTOJEĆU sliku
      if (
        primary !== null &&
        primary < existingImages.length &&
        primary !== originalPrimaryIndex
      ) {
        const selected = existingImages[primary]

        await itemImageApi.addImage(token, itemId, {
          imageUrl: selected.imageUrl,
          isPrimary: true,
          sortOrder: 0,
        })
      }

      toast.success("Slike uspešno dodate");
      resetForm();

    } catch {
      toast.error("Greška pri uploadu slika");
    }
  }

  useEffect(() => {
    if (!initialData) return;
    setExistingImages(initialData.images || []);
  }, [initialData]);

  async function handleDeleteExistingImage(imageId: number) {
    if (!token) return;

    const success = await itemImageApi.deleteImage(token, imageId);

    if (success) {
      toast.success("Slika obrisana");

      // ukloni iz UI-a (initialData ili poseban state)
      setExistingImages(prev => prev.filter(img => img.imageId !== imageId));
    } else {
      toast.error("Greška pri brisanju slike");
    }
  }


  useEffect(() => {
    async function loadGenres() {
      const data = await genreApi.getAll();
      setGenres(data);
    }
    loadGenres();
  }, []);

  useEffect(() => {
    if (!initialData) return;

    setItemId(initialData.itemId!);
    setName(initialData.name);
    setAuthor(initialData.author);
    setIsbn(initialData.isbn);
    setPrice(initialData.price);
    setNmbrOfPages(initialData.nmbrOfPages);
    setDescription(initialData.description);
    setGoodreadsLink(initialData.goodreadsLink);
    setPublicationYear(initialData.publicationYear);
    setCover(initialData.cover);

    setGenreIds(initialData.genres?.map((g) => g.genreId) ?? []);

    setDiscountPercent(initialData.discountPercent ?? null);
    setDiscountFrom(initialData.discountFrom?.split("T")[0] ?? "");
    setDiscountTo(initialData.discountTo?.split("T")[0] ?? "");
  }, [initialData]);

  function toggleGenre(id: number) {
    setGenreIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((g) => g !== id);
      }

      return [...prev, id];
    });
  }

  return (
    <div className="grid lg:grid-cols-3 gap-10">
      <BookDetailsCard
        name={name}
        setName={setName}
        author={author}
        setAuthor={setAuthor}
        isbn={isbn}
        setIsbn={setIsbn}
        price={price}
        setPrice={setPrice}
        nmbrOfPages={nmbrOfPages}
        setNmbrOfPages={setNmbrOfPages}
        description={description}
        setDescription={setDescription}
        goodreadsLink={goodreadsLink}
        setGoodreadsLink={setGoodreadsLink}
        publicationYear={publicationYear}
        setPublicationYear={setPublicationYear}
        cover={cover}
        setCover={setCover}
        genres={genres}
        genreIds={genreIds}
        toggleGenre={toggleGenre}
        errors={errors}
      />

      <div className="flex flex-col gap-8 h-full">
        <div className="card relative min-h-[320px]">
          <h2 className="text-xl font-semibold mb-4">Slike</h2>

          {!itemId && (
            <div className="absolute inset-0 bg-[#0F1A1C]/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-10 text-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-[#9DB7AA]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c1.1 0 2 .9 2 2v2a2 2 0 11-4 0v-2c0-1.1.9-2 2-2zm6-3V7a6 6 0 10-12 0v1H4v12h16V8h-2z"
                />
              </svg>
              <p className="text-sm text-[#9DB7AA] max-w-[220px]">
                Prvo kreiraj knjigu da bi mogao dodati slike.
              </p>
            </div>
          )}

          <div className={!itemId ? "opacity-40 pointer-events-none" : ""}>
            <ImageUploader
              initialImages={existingImages} // ✅ OVO
              onChange={(files, primaryIndex) => {
                setImages(files);
                setPrimary(primaryIndex ?? 0);
              }}
              onDeleteExisting={handleDeleteExistingImage}
            />

            {itemId && (
              <button
                className="btn-primary w-full mt-4"
                onClick={handleImageUpload}
              >
                Sačuvaj slike
              </button>
            )}
          </div>
        </div>

        <PdfUploader
          onChange={(file) => setPdf(file)}
          disabled={!isEdit && itemId !== null}
        />

        <DiscountCard
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
          discountFrom={discountFrom}
          setDiscountFrom={setDiscountFrom}
          discountTo={discountTo}
          setDiscountTo={setDiscountTo}
          errors={errors}
        />

        <button
          className={`btn-primary w-full ${!isEdit && itemId
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : ""
            }`}
          onClick={handleSubmit}
          disabled={!isEdit && itemId !== null}
        >
          {isEdit ? "Sačuvaj izmene" : "Kreiraj knjigu"}
        </button>
      </div>
    </div>
  );
}
