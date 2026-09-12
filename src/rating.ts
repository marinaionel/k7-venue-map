export const formatRating = (rating: number): string => rating.toFixed(1);

export const formatReviewCount = (count: number): string =>
  count.toLocaleString("en-US");