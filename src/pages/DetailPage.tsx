import React from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
    const { id } = useParams();
    // Fetch user data based on the `id` or use preloaded data.
    return (
      <div>
        <h1>User Details for ID: {id}</h1>
        {/* Display more user details */}
      </div>
    );
  };


export default DetailPage;
