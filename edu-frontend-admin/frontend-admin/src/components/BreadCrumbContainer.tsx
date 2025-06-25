import React from "react";
import { pathNameExtractor } from "../utils/Utilities";
import { breadCrumbType } from "../types/types";
import { useNavigate } from "react-router-dom";

interface BreadCrumbContainerProps {
  path: any;
}

const BreadCrumbContainer: React.FC<BreadCrumbContainerProps> = ({ path }) => {
  const navigate = useNavigate();
  const extractedPathNames = pathNameExtractor(path);
  const transformedCurrentPathListNames = extractedPathNames.map(
    (item: string, index: number) => {
      const decodedItem = decodeURIComponent(item);
      const currentPath = `/${extractedPathNames
        .slice(0, index + 1)
        .join("/")}`;
      return {
        currentPath,
        transformedCurrentPath:
          decodedItem.charAt(0).toUpperCase() +
          decodedItem.slice(1).toLowerCase(),
      };
    }
  );

  const handleClick = (value: string, index: number) => {
    const enableClickAction =
      index < transformedCurrentPathListNames.length - 1;
    if (enableClickAction) {
      navigate(value);
    }
  };

  return (
    <div>
      {transformedCurrentPathListNames.map(
        (item: breadCrumbType, index: number) => {
          return (
            <button
              onClick={() => handleClick(item.currentPath, index)}
              className="text-[#5580FF]"
              key={`${index}-${item.currentPath}`}
            >
              {item.transformedCurrentPath}
              {index < transformedCurrentPathListNames.length - 1 ? (
                <span className="mx-1">/</span>
              ) : null}
            </button>
          );
        }
      )}
    </div>
  );
};

export default BreadCrumbContainer;
