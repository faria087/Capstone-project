
// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import "./index.css";
// import image from "../../Assests/Images/eagel1.jpg";
// import image2 from "../../Assests/Images/crow.jpg";
// import image3 from "../../Assests/Images/parrot2.jpg";
// import image4 from "../../Assests/Images/owl2.jpg";
// import image5 from "../../Assests/Images/heron.jpeg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInstagram } from "@fortawesome/free-brands-svg-icons";

// const images = [image, image2, image3, image4, image5];

// export const ImageSlide2 = () => {
//   const [galleries, setGalleries] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/gallerys");
//         if (response?.data?.success) {
//           setGalleries(response.data.data); // Set API images
//         }
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, []);

  
//   return (
//     <div className="imageslide2">
//       <div className="imgslides">
//         {/* Original Images + Duplicate for Infinite Loop */}
//         {[...images, ...images].map((img, index) => (
//           <div className="imageslidecard" key={index}>
//             <img src={img} alt="" />
//             <div className="icon">
//               <span>
//                 <FontAwesomeIcon icon={faInstagram} />
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export const ImageSlide2 = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/gallerys");
        if (response?.data?.success) {
          setGalleries(response.data.data); // Setting API images
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="imageslide2">
      <div className="imgslides">
        {/* Map over API images and duplicate them for smooth infinite scrolling */}
        {[...galleries, ...galleries].map((img, index) => (
          <div className="imageslidecard" key={index}>
            <img src={`http://localhost:8000/${img.image}`} alt={`Gallery ${index}`} />
            <div className="icon">
              <span>
                <FontAwesomeIcon icon={faInstagram} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
