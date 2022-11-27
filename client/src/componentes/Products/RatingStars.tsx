import { Rating } from "@mui/material";
import React, { useState } from "react";

interface IRatingPorps {
  read_only: boolean;
  value: number;
}

const RatingStars = ({ read_only, value }: IRatingPorps) => {
  const [ratingValue, setRatingValue] = useState(value);

  if (!read_only)
    return (
      <Rating
        name="simple-controlled"
        value={ratingValue}
        onChange={(event, newValue) => {
          if (newValue) setRatingValue(newValue);
        }}
      />
    );

  return <Rating value={ratingValue} readOnly={read_only} />;
};

export default RatingStars;
