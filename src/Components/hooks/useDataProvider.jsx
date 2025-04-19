import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Custom hook to provide data from Redux or sessionStorage with fallback to dummy data
 * @param {string} reduxSelector - Function to select data from Redux state
 * @param {string} storageKey - The key to use for sessionStorage
 * @param {Object} fallbackData - The dummy data to use as fallback
 * @returns {Object} The data from Redux, sessionStorage or fallback, and the source
 */
export const useDataProvider = (reduxSelector, storageKey, fallbackData) => {
  // Get data from Redux
  const reduxData = useSelector(reduxSelector);

  // State to track the data source
  const [dataSource, setDataSource] = useState("loading");

  // Final data state
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    // Helper function to check if data is valid
    const isValidData = (data) => {
      return (
        data &&
        (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
      );
    };

    // Check if Redux has valid data
    if (isValidData(reduxData)) {
      setData(reduxData);
      setDataSource("redux");
      // Store in sessionStorage as backup
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(reduxData));
      } catch (error) {
        console.error("Failed to store data in sessionStorage:", error);
      }
      return;
    }

    // If no Redux data, try to get from sessionStorage
    try {
      const storedData = sessionStorage.getItem(storageKey);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (isValidData(parsedData)) {
          setData(parsedData);
          setDataSource("sessionStorage");
          return;
        }
      }
    } catch (error) {
      console.error("Failed to retrieve data from sessionStorage:", error);
    }

    // Fallback to dummy data
    setData(fallbackData);
    setDataSource("fallback");
  }, [reduxData, storageKey, fallbackData]);

  return { data, dataSource, isLoading: dataSource === "loading" };
};
