import React, { useEffect } from "react";
import { IReview } from "../../redux/slices/ProductSlice";
import RatingStars from "./RatingStars";
import CheckUserReview from "./ReviewForm/CheckUserReview";

interface ReviewProps {
  reviews: Array<IReview>;
}

const ReviewList = ({ reviews }: ReviewProps) => {
  useEffect(() => {
    console.log("Estas son las reviews");
    console.log(reviews);
  }, [reviews]);
  console.log("length de las reviews: ", reviews.length);
  console.log("las reviews ", reviews);
  if (!reviews.length) return <h3 className="mb-8">Aún no hay reseñas</h3>;

  return (
    <div className="mb-8">
      <h3>Reseñas</h3>
      <hr />
      {reviews.map(({ review }, index) => (
        <>
          <ReviewCard
            text={review.text}
            rating={review.rating}
            user={review.user.username}
            flag={index % 2 === 0}
            key={`review_${index}`}
          />
          <hr />
        </>
      ))}
      <CheckUserReview />
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
    <div className={`${flag ? bgColor : ""} w-full py-6`}>
      <div className="flex justify-around mb-4">
        <p className="font-bold">{user}</p>
        <RatingStars value={rating} read_only={true} />
      </div>
      <h6 className="w-11/12 m-auto text-start">{text}</h6>
    </div>
  );
};
