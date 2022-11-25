import React from "react";
import { useAppSelector } from "../../hooks";
import { IReview } from "../../redux/slices/ProductSlice";
import RatingStars from "./RatingStars";
import CheckUserReview from "./ReviewForm/CheckUserReview";

interface ReviewProps {
  reviews: Array<IReview>;
}

const ReviewList = ({ reviews }: ReviewProps) => {
  const { username } = useAppSelector((state) => state.user);

  if (!reviews.length) return <h3 className="mb-8">Aún no hay reseñas</h3>;

  let reviewed = false;
  // ordena las reviews
  if (username) {
    const userReview = reviews.filter(({ review }) => {
      if (review.user.username === username) {
        reviewed = true;
        return true;
      }
      return false;
    })[0];
    if (reviewed) {
      let sortArr = [...reviews]
      const index = sortArr.indexOf(userReview);
      console.log(index)
      sortArr.splice(index, 1);
      sortArr.unshift(userReview);
      reviews = sortArr;
    }
  }

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
