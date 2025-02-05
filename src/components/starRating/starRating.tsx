import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './starRating.css';

interface IProps {
  currentRate?: number;
  onRate: (rate: number) => void;
}

const StarRating: React.FC<IProps> = ({ currentRate, onRate }) => {
  const [rating, setRating] = useState(currentRate ?? 0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-2">
      {[...Array(5)].map((_, index) => {
        const starValue: number = index + 1;
        return (
          <Star
            key={starValue}
            size={30}
            color={
              starValue <= (hover || rating)
                ? 'rgb(240, 238, 120)'
                : 'rgba(176, 178, 179, 0.916)'
            }
            className={`star ${
              starValue <= (hover || rating)
                ? 'stroke-yellow-400'
                : 'stroke-gray-400'
            }`}
            onClick={() => {
              setRating(starValue);
              if (onRate) onRate(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
