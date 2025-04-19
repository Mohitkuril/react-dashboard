import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * @param {string} reduxSelector - Function to select data from Redux state
 * @param {string} storageKey - The key to use for sessionStorage
 * @param {Object} fallbackData - The dummy data to use as fallback
 * @returns {Object} The data from Redux, sessionStorage or fallback, and the source
 */
export const useDataProvider = (reduxSelector, storageKey, fallbackData) => {
  const reduxData = useSelector(reduxSelector);

  const [dataSource, setDataSource] = useState("loading");

  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    const isValidData = (data) => {
      return (
        data &&
        (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
      );
    };

    if (isValidData(reduxData)) {
      setData(reduxData);
      setDataSource("redux");
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(reduxData));
      } catch (error) {
        console.error("Failed to store data in sessionStorage:", error);
      }
      return;
    }

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

    setData(fallbackData);
    setDataSource("fallback");
  }, [reduxData, storageKey, fallbackData]);

  return { data, dataSource, isLoading: dataSource === "loading" };
};
