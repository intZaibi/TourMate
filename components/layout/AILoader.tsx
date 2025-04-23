import { useEffect, useState } from 'react';

const loadingMessages = [
  "Our AI is crafting your perfect trip",
  "Planning itinerary",
  "Planning accommodations",
  "Planning dining",
  "Planning budget",
  "Weather forecasting",
  "Fetching images",
];

function LoadingComponent({ isPending }: {isPending: boolean}) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [dotCount, setDotCount] = useState(1);

  // Rotate main message every 30s
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 20000);

    return () => clearInterval(messageInterval);
  }, []);

  // Animate dots every 1s
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 4) + 1);
    }, 1000);

    return () => clearInterval(dotInterval);
  }, []);

  const loadingText = messageIndex < 6 ? `${loadingMessages[messageIndex]}${'.'.repeat(dotCount)}`: `Fetching images${'.'.repeat(dotCount)}`;

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-12 h-[95vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-lg font-medium text-neutral-500">
          {loadingText}
        </p>
      </div>
    );
  }

  return null;
}

export default LoadingComponent;
