import useScreenSize from "@/hooks/getScreenSize";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useUser } from "@clerk/clerk-react";
import { Tracker } from "@/typings";
import saveTracker from "@/utils/saveTracker";

const SaveTrackerForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUser();
  const { breakpoint } = useScreenSize();
  const [formData, setFormData] = useState<Tracker>({
    title: "",
    description: "",
    image: "",
    rating: 0,
    userId: user?.id,
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (newRating: number) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
    setHoveredRating(0); // Reset hovered rating when a star is clicked
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "b07ggq5m"); // Replace with your Cloudinary upload preset
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: data.secure_url,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveTracker(user?.id as string, formData);
    setOpen(false);

    // Reset form fields
    setFormData({
      title: "",
      description: "",
      image: "",
      rating: 0,
      userId: undefined,
    });
  };

  return (
    <div className="w-full max-w-[960px] mx-auto p-6 dark:bg-slate-800 rounded-md mt-2">
      <h2 className="text-lg font-semibold mb-4">Save Tracker Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium dark:dark:text-white"
          >
            Title:
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 border border-gray-300 dark:bg-slate-700 dark:text-white dark:border-slate-600 block w-full p-2 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium dark:text-white"
          >
            Description:
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 border border-gray-300 dark:bg-slate-700 dark:text-white dark:border-slate-600 block w-full p-4 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium dark:text-white"
          >
            Image:
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Saved Pin"
                className="mt-2 w-full max-w-[200px] max-h-[150px] object-cover rounded-md shadow-sm"
              />
            )}
          </label>
        </div>
        <div className="mb-4">
          <fieldset>
            <legend className="block text-sm font-medium dark:text-white">
              Ratings:
            </legend>
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="inline-flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={formData.rating === star}
                  onChange={() => handleRatingChange(star)}
                  className="hidden"
                />
                <span
                  className="ml-2 text-sm cursor-pointer"
                  onClick={() => handleRatingChange(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    size={16}
                    fill={
                      star <= (hoveredRating || formData.rating)
                        ? "orange"
                        : "silver"
                    }
                    className={
                      star <= (hoveredRating || formData.rating)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                  />
                </span>
              </label>
            ))}
          </fieldset>
        </div>
        <Button size={breakpoint === "xs" ? "sm" : "lg"} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SaveTrackerForm;
