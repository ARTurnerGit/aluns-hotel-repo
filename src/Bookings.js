import React, { useState, useEffect } from "react";
import Search from "./Search.js";
import SearchResults from "./SearchResults.js";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("fetching");

  useEffect(() => {
    fetch("https://cyf-react.glitch.me/")
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setStatus("failure");
        } else {
          setBookings(data);
          setStatus("success");
        }
      });
  }, []); // only run once, after the first render (please)

  const search = searchVal => {
    const filteredBookings = bookings.filter(({ firstName, surname }) => {
      if (firstName === searchVal || surname === searchVal) {
        return true;
      } else {
        return false;
      }
    });
    setBookings(filteredBookings);
  };

  return (
    <div className="App-content">
      <div className="container">
        {status === "fetching" && "LOADING, PLEASE WAIT..."}
        {status === "success" && (
          <>
            <Search search={search} />
            <SearchResults bookings={bookings} />
          </>
        )}
        {status === "failure" && "OOPS, SOMETHING WENT WRONG"}
      </div>
    </div>
  );
};

export default Bookings;

// 1 - import the bookings from the .json file
// 2 - passing those bookings as a prop to <SearchResults />
