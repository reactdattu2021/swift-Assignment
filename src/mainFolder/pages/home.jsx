import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
// import { TiArrowUnsorted } from "react-icons/ti";
import "./homepage.css";
const Homepage = () => {
  const [rows, setRows] = useState([]);

  const [allData, setAllData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0); // NEW: current step index (0 = 10, 1 = 50, 2 = 100, 3 = all)
  const pageSizes = [10, 50, 100];

  // Sorting state
  const [postIdSortDirection, setPostIdSortDirection] = useState(
    localStorage.getItem("postIdSortDirection") || null
  );

  const [nameSortDirection, setNameSortDirection] = useState(
    localStorage.getItem("nameSortDirection") || null
  );
  const [emailSortDirection, setEmailSortDirection] = useState(
    localStorage.getItem("emailSortDirection") || null
  );
  const [isSortClicked, setIsSortClicked] = useState(
    localStorage.getItem("isSortClicked") === "true"
  );
  // Optional: search state
  const [searchText, setSearchText] = useState(
    localStorage.getItem("searchText") || ""
  );

  // Fetch data on initial load or page change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const data = await response.json();

        // Optional: filter by search
        let filtered = [...data];
        if (searchText) {
          filtered = filtered.filter(
            (item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase()) ||
              item.email.toLowerCase().includes(searchText.toLowerCase()) ||
              item.body.toLowerCase().includes(searchText.toLowerCase())
          );
        }

        setAllData(filtered);

        const size = pageIndex === 3 ? filtered.length : pageSizes[pageIndex];
        const currentPageRows = filtered.slice(0, size);
        setRows(currentPageRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageIndex, searchText]); // Refetch slices when pageSize changes

  // Sort only the current page of data
  useEffect(() => {
    if (!isSortClicked) return;

    // Always get a fresh slice from allData for the current page
    const size = pageIndex === 3 ? allData.length : pageSizes[pageIndex];
    let currentPageRows = allData.slice(0, size);

    // If no sort selected, just show original slice
    if (!postIdSortDirection && !nameSortDirection && !emailSortDirection) {
      setRows(currentPageRows);
      return;
    }

    // Apply sorting if any direction is active
    if (postIdSortDirection) {
      currentPageRows.sort((a, b) =>
        postIdSortDirection === "asc"
          ? a.postId - b.postId
          : b.postId - a.postId
      );
    } else if (nameSortDirection) {
      currentPageRows.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return nameSortDirection === "asc" ? -1 : 1;
        if (nameA > nameB) return nameSortDirection === "asc" ? 1 : -1;
        return 0;
      });
    } else if (emailSortDirection) {
      currentPageRows.sort((a, b) => {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();
        if (emailA < emailB) return emailSortDirection === "asc" ? -1 : 1;
        if (emailA > emailB) return emailSortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    setRows(currentPageRows);
  }, [
    postIdSortDirection,
    nameSortDirection,
    emailSortDirection,
    isSortClicked,
    pageIndex,
    allData,
    pageSizes,
  ]);

  // Persist sort and search state
  useEffect(() => {
    localStorage.setItem("postIdSortDirection", postIdSortDirection || "");
    localStorage.setItem("nameSortDirection", nameSortDirection || "");
    localStorage.setItem("emailSortDirection", emailSortDirection || "");
    localStorage.setItem("isSortClicked", isSortClicked);
    localStorage.setItem("searchText", searchText);
  }, [
    postIdSortDirection,
    nameSortDirection,
    emailSortDirection,
    isSortClicked,
    searchText,
  ]);

  // Cycle sort mode on button click
  const handleSortChange = (column, direction) => {
    setIsSortClicked(!!direction);
    setPostIdSortDirection(column === "postId" ? direction : null);
    setNameSortDirection(column === "name" ? direction : null);
    setEmailSortDirection(column === "email" ? direction : null);
  };

  const handleNextPage = () => {
    if (pageIndex < 3) {
      setPageIndex((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="flex-container">
        <div className="sort-controls-container">
          <select
            className="select-button"
            value={postIdSortDirection || ""}
            onChange={(e) => handleSortChange("postId", e.target.value || null)}
          >
            <option value="">Sort Post ID (None)</option>
            <option value="asc">Sort Post ID (asc)</option>
            <option value="desc">Sort Post ID (desc)</option>
          </select>
          <select
            className="select-button"
            value={nameSortDirection || ""}
            onChange={(e) => {
              const value = e.target.value || null;
              setIsSortClicked(!!value);
              setNameSortDirection(value);
            }}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <option value="">Sort Name (None)</option>
            <option value="asc">Sort Name (asc)</option>
            <option value="desc">Sort Name (desc)</option>
          </select>
          <select
            className="select-button"
            value={emailSortDirection || ""}
            onChange={(e) => handleSortChange("email", e.target.value || null)}
          >
            <option value="">Sort Email (None)</option>
            <option value="asc">Sort Email (asc)</option>
            <option value="desc">Sort Email (desc)</option>
          </select>
        </div>

          <div className="search-input-container">
    <CiSearch className="search-icon" />
    <input
      type="text"
      className="search-box"
      placeholder="Search Name, Email, Comment"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>
      </div>

      <div className="main-dev">
        <div className="grid-header">Post Id</div>
        <div className="grid-header">Name</div>
        <div className="grid-header">Email</div>
        <div className="grid-header">Comment</div>

        {rows.map((row, index) => (
          <React.Fragment key={index}>
            <div className="grid-cell">{row.postId}</div>
            <div className="grid-cell">{row.name}</div>
            <div className="grid-cell">{row.email}</div>
            <div className="grid-cell">{row.body}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex-spacing-container">
        {pageIndex > 0 && (
          <button className="spacing" onClick={handlePrevPage}>
            Previous
          </button>
        )}
        {pageIndex < 3 && (
          <button className="spacing" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
    </>
  );
};
export default Homepage;
