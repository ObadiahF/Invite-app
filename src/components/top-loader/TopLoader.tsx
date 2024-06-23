import { useLoading } from './LoadingContext'; // Import the custom hook

const TopLoader = () => {
  const { isLoading } = useLoading();

  if (isLoading) {
    return (
      isLoading && (
        <div className="relative w-full h-1 bg-yellow-400">
          <div className="bar bg-red-600" style={{ animation: 'loading1 3s linear infinite' }}></div>
          <div className="bar bg-blue-600" style={{ animation: 'loading2 3s linear 1s infinite' }}></div>
          <div className="bar bg-yellow-400" style={{ animation: 'loading3 3s linear 2s infinite' }}></div>
          <style>
            {`
            .bar {
              position: absolute;
              height: 100%;
              width: 0;
              left: 50%;
            }
            @keyframes loading1 {
              from {
                left: 0;
                width: 0;
                z-index: 100;
              }
              33.3333% {
                left: 0;
                width: 100%;
                z-index: 10;
              }
              to {
                left: 0;
                width: 100%;
              }
            }
            @keyframes loading2 {
              from {
                left: 0;
                width: 0;
                z-index: 100;
              }
              33.3333% {
                left: 0;
                width: 100%;
                z-index: 10;
              }
              to {
                left: 0;
                width: 100%;
              }
            }
            @keyframes loading3 {
              from {
                left: 0;
                width: 0;
                z-index: 100;
              }
              33.3333% {
                left: 0;
                width: 100%;
                z-index: 10;
              }
              to {
                left: 0;
                width: 100%;
              }
            }
          `}
          </style>
        </div>
      )
    );
  } else {
    return null;
  }
};

export default TopLoader;
