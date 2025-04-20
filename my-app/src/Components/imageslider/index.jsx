

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import './index.css';
// import Image from "../../Assests/Images/crow.jpg";
// import Image2 from "../../Assests/Images/eagel1.jpg";
// import Image3 from "../../Assests/Images/eagel3.jpg";
// import Image4 from "../../Assests/Images/heron.jpeg";
// import Image5 from "../../Assests/Images/owl1.jpg";
// import Image6 from "../../Assests/Images/owl2.jpg";
// import Image7 from "../../Assests/Images/parrot1.jpg";
// import Image8 from "../../Assests/Images/parrot2.jpg";


// export const ImageSlider = () => {
//   const [galleries, setGalleries] = React.useState([]);
//   const images = [Image, Image2, Image3, Image4, Image5, Image6,Image7,Image8,Image,Image2];  // Array of images
//   const [currentIndex, setCurrentIndex] = useState(0);  // Track the index of the first visible image

//   // Move left in the slider
//   const moveLeft = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 6 : prevIndex - 1));
//   };

//   // Move right in the slider
//   const moveRight = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === images.length - 6 ? 0 : prevIndex + 1));
//   };

//   React.useEffect(() => {
//     const callApi = async () => {
//         const response = await axios.get(`http://localhost:8000/api/gallerys`);
//         if (response?.data?.success) {
//             setGalleries(response?.data?.data);
//         }
//     };
//     callApi();
// }, []);



//   return (
//     <div className="imageslide">
//       {/* Left Arrow */}
//       <FontAwesomeIcon icon={faAngleLeft} className="icon2" onClick={moveLeft} />

//       {/* Images Container */}
//       <div className="image-container">
//         {images.slice(currentIndex, currentIndex + 6).map((image, index) => (
//           <div key={index} className="image2">
//             <img src={image} alt={`image-${index}`} />
//           </div>
//         ))}
//       </div>

//       {/* Right Arrow */}
//       <FontAwesomeIcon icon={faAngleRight} className="icon3" onClick={moveRight} />
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

export const ImageSlider = () => {
  const [galleries, setGalleries] = useState([]); // Stores images from API
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/gallerys");
        if (response?.data?.success) {
          setGalleries(response.data.data); // Set API images
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Move left in the slider
  const moveLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleries.length - 6 : prevIndex - 1
    );
  };

  // Move right in the slider
  const moveRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === galleries.length - 6 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="imageslide">
      {/* Left Arrow */}
      <FontAwesomeIcon icon={faAngleLeft} className="icon2" onClick={moveLeft} />

      {/* Images Container */}
      <div className="image-container">
        {galleries.length > 0 ? (
          galleries.slice(currentIndex, currentIndex + 6).map((gallery, index) => (
            <div key={gallery.id} className="image2">
              <img src={`http://localhost:8000/${gallery.image}`} alt={`Gallery Image ${index}`} />
            </div>
          ))
        ) : (
          <p>Loading images...</p> // Show loading message while fetching
        )}
      </div>

      {/* Right Arrow */}
      <FontAwesomeIcon icon={faAngleRight} className="icon3" onClick={moveRight} />
    </div>
  );
};
