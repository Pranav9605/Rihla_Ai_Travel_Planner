import React, { useEffect, useState } from 'react';
import fetchItinerary from './fetchItinerary'

function ItineraryDisplay({ travelQuery }) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetchItinerary(travelQuery).then(data => {
      // Assuming data.rendered_output contains your HTML string.
      setHtmlContent(data.rendered_output);
    });
  }, [travelQuery]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

export default ItineraryDisplay;
