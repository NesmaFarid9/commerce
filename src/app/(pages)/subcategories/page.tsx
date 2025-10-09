import { SubcategoryI } from "@/interfaces/subCategory";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function SubCategories() {
  // Fetch Subcategories
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories`,
    {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 6000 },
    }
  );
  const { data: Categories }: { data: SubcategoryI[] } = await response.json();

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Explore Our Subcategories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/subcategories/${cat._id}`}
            className="group block rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 p-6 text-center"
          >
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-[#FF6F61] transition-colors duration-300">
              {cat.name}
            </h2>

            {/* Hover line */}
            <span className="block mt-4 h-1 w-0 bg-[#FF6F61] group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
