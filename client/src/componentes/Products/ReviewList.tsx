import React, { useEffect } from "react";
import { IReview } from "../../redux/slices/ProductSlice";

interface ReviewProps {
  reviews: Array<IReview>;
}

const ReviewList = ({ reviews }: ReviewProps) => {
  useEffect(() => {
    console.log("Estas son las reviews");
    console.log(reviews);
  }, [reviews]);

  if (!reviews.length) return <h3>Aún no hay reseñas</h3>;

  return (
    <div>
      <h3>Reseñas</h3>
      {reviews.map(({ info }, index) => (
        <ReviewCard
          text={info.text}
          rating={info.rating}
          user={info.user.username}
          flag={index % 2 === 0}
        />
      ))}
    </div>
  );
};

export default ReviewList;

interface ReviewCardProps {
  text: string;
  user: string;
  rating: number;
  flag: boolean;
}

const ReviewCard = ({ text, user, rating, flag }: ReviewCardProps) => {
  const bgColor = "bg-white";

  return (
    <div className={`${flag ? bgColor : ""} w-full py-4`}>
      <div className="flex justify-around mb-4">
        <p className="font-bold">{user}</p>
        <p>{rating}</p>
      </div>
      <h6 className="w-11/12 m-auto text-start">{text}</h6>
    </div>
  );
};
