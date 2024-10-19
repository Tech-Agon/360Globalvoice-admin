import React from "react";

interface NewsBlockProps {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  description: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  isLoading?: number;
}

const News_block: React.FC<NewsBlockProps> = ({
  id,
  title,
  date,
  imageUrl,
  description,
  onEdit,
  onDelete,
  isLoading,
}) => {
  // Function to handle edit button click
  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    }
  };

  // Function to handle delete button click
  const handleDelete = () => {
    if (
      onDelete &&
      window.confirm("Are you sure you want to delete this news item?")
    ) {
      onDelete(id);
    }
  };

  const truncateTitle = (title: string, maxWords: number) => {
    const words = title.split(" ");
    if (words.length <= maxWords) {
      return title;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <article className="overflow-hidden h-fit cursor-pointer rounded-lg shadow transition hover:shadow-lg">
      <img
        alt={title}
        src={imageUrl}
        className="h-56 bg-gray-300 w-full object-cover"
      />
      <div className="bg-white dark:bg-[#131317] p-4 sm:p-6 transition-all duration-300 ease-in-out max-h-fit">
        <time className="block text-xs text-gray-500">{date}</time>

        {/* Title */}
        <h3 className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-white truncate">
          {truncateTitle(title, 7)}
        </h3>

        <p className="mt-2 w-full text-justify text-sm text-gray-500 line-clamp-3 transition-all duration-300 ease-in-out">
          {truncateTitle(description, 5)}
        </p>

        {/* Buttons for Edit and Delete */}
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-[#8725FE] text-white rounded hover:bg-[#6c07e7] transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            {isLoading === id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default News_block;
