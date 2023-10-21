import React, { useState, useEffect } from "react";
import links from "../utils/SiteListData";

const SiteList = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      const fetchedResponses = await Promise.all(
        links.map(async (site) => {
          try {
            const response = await fetch(site.link);
            if (response.ok) {
              return `${site.name}: 200`;
            } else {
              return `${site.name}: ${response.status}`;
            }
          } catch (error) {
            return `${site.name}: Network Error`;
          }
        })
      );
      setResponses(fetchedResponses);
    };

    fetchResponses();
  }, []);

  return (
    <div>
      <h2>Websites:</h2>
      <ul>
        {links.map((site, index) => (
          <li key={index}>
            <a href={site.link} target="_blank" rel="noopener noreferrer">
              {site.name}
            </a>
            {responses[index] && (
              <span className="response">{responses[index]}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteList;
