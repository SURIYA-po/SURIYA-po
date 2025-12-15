// PbCard.jsx

import React from 'react';
import '../assets/pbcard.css'; // Use the same CSS as provided in the previous response

/**
 * A versatile card component that accepts a single MongoDB document (BlogPost or Project)
 * @param {object} props
 * @param {object} props.data - The data object (either a BlogPost or Project document).
 * @returns {JSX.Element}
 */
const PbCard = ({ data }) => {
  if (!data) return null;

  // 1. Determine Card Type and Map Data Fields
  const isPortfolio = !!data.liveUrl || !!data.repoUrl; // Portfolio has live/repo URLs
console.log(data);
  // Use a map object to structure the data for consistency
  const cardData = {};

  if (isPortfolio) {
    // Mapping for a Project (Portfolio Item)
    cardData.isPortfolio = true;
    cardData.subtitle = data.title;
    cardData.description = data.description.substring(0, 150) + '...';
    cardData.imageSrc = data.image;
    cardData.tags = data.techStack || [];
    cardData.projectLink = data.liveUrl || data.repoUrl;
    cardData.projectLinkText = data.liveUrl ? "View Project ↗" : "View Repo 🔗";
    cardData.date = null;

  } else {
    // Mapping for a BlogPost (Blog Item)
    cardData.isPortfolio = false;
    // Note: The main page title ("Tips and Tricks") is likely external to the card data.
    // We'll use the Blog Post's title as the subtitle in the card structure.
    cardData.subtitle = data.title;
    cardData.description = data.excerpt || data.content.substring(0, 200) + '...';
    cardData.imageSrc = data.coverImage;
    cardData.tags = data.tags || [];
    cardData.projectLink = null;
    cardData.projectLinkText = null;
    cardData.date = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', {
      month: 'short', day: '2-digit', year: '2-digit'
    }) : 'N/A'; // Format date like "Oct 21, 24"
  }

  // 2. JSX Structure (similar to the previous design, but using cardData)
  return (
    <div className={`pb-card ${cardData.isPortfolio ? 'pb-card--portfolio' : 'pb-card--blog'}`}>

      {/* 1. Content Section */}
      <div className="pb-card__content">

        {/* Date for Blog Cards */}
        {cardData.date && <p className="pb-card__date">{cardData.date}</p>}

        {/* Subtitle (Title of the Post/Project) */}
        <h3 className="pb-card__subtitle">{cardData.subtitle}</h3>

        <p className="pb-card__description">{cardData.description}</p>
           {/* Tags inside content for Portfolio Cards (based on visual) */}
        {cardData.isPortfolio && cardData.tags.length > 0 && (
          <div className="pb-card__tags pb-card__tags--main">
            {cardData.tags.map((tag, index) => (
              <span key={index} className="pb-card__tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* "View Project" Link for Portfolio Cards */}
        <div className="pair">
          <a
            href={cardData.projectLink}
            className="view-project"
            target="_blank"
            rel="noreferrer"
            onMouseMove={() => {
              arrow.style.transform = "rotate(0deg)";
            }}
          >

            View project
          </a>
          <div
            className="arrow"

          ></div>
        </div>

     
      </div>

      {/* 2. Image Section */}
      <div className="pb-card__image-container">
        <img src={cardData.imageSrc} alt={`${cardData.subtitle} illustration`} className="pb-card__image" />
      </div>

      {/* 3. Tags at the bottom for Blog Cards (based on visual) */}
      {!cardData.isPortfolio && cardData.tags.length > 0 && (
        <div className="pb-card__tags pb-card__tags--blog">
          {cardData.tags.map((tag, index) => (
            <span key={index} className="pb-card__tag pb-card__tag--blog">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PbCard;