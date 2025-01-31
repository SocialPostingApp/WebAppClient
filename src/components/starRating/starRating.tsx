import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface IProps {
  totalStars: number;
  onRate: (rate: number) => void;
}

const StarRating: React.FC<IProps> = ({ totalStars = 5, onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-2">
      {[...Array(totalStars)].map((_, index) => {
        const starValue: number = index + 1;
        return (
          <Star
            key={starValue}
            size={30}
            className={`cursor-pointer transition-colors ${
              starValue <= (hover || rating)
                ? 'fill-yellow-400 stroke-yellow-400'
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
