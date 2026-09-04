import React, { useEffect, useRef, useState } from "react";

const Gallery = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  const [imagesActive, setImagesActive] = useState(false);
  const [clickedId, setClickedId] = useState(null);

  const imagesData = [
    {
      id: 1,
      src: "https://wavegarden.com/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-22-at-17.17.24.jpeg",
      size: "-big",
    },
    {
      id: 2,
      src: "https://surfparkcentral-prod-assets.s3.us-east-2.amazonaws.com/uploads/2025/05/BSP-Site-Render-5-1024x576.jpg",
      size: "-big -horizontal",
    },
    {
      id: 3,
      src: "https://surfparkcentral-prod-assets.s3.us-east-2.amazonaws.com/uploads/2025/05/BSP-Site-Render-6-1024x576.jpg",
      size: "-normal -horizontal",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=85",
      size: "-normal",
    },
    {
      id: 5,
      src: "https://cdn.shortpixel.ai/spai2/q_lossless%2Bw_924%2Bto_webp%2Bret_img/assets.simpleviewinc.com/simpleview/image/upload/crm/santamonica/10626535_10152695245247264_8749034704909119073_n0_c005e724-5056-b365-aba9970f9c8af5cd.jpg",
      size: "-small -horizontal",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=85",
      size: "-big",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=1200&q=85",
      size: "-normal -horizontal",
    },
    {
      id: 8,
      src: "https://rafisydney.com.au/wp-content/uploads/sites/24/2024/07/RAFI-Urbnsurf_3.jpg",
      size: "-big -horizontal",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
      size: "-normal -horizontal",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
      size: "-normal",
    },
    {
      id: 11,
      src: "https://images.trvl-media.com/lodging/92000000/91310000/91301300/91301260/de316a78.jpg?impolicy=resizecrop&ra=fill&rh=900&rw=1200",
      size: "-big -horizontal",
    },
    {
      id: 12,
      src: "https://surfparkcentral-prod-assets.s3.us-east-2.amazonaws.com/uploads/2025/05/BSP-Site-Render-6-1024x576.jpg",
      size: "-normal",
    },
    {
      id: 13,
      src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
      size: "-big",
    },
    {
      id: 14,
      src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
      size: "-normal -horizontal",
    },
    {
      id: 15,
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
      size: "-big -horizontal",
    },
    {
      id: 16,
      src: "https://images.unsplash.com/photo-1476673160081-cf065607f449?auto=format&fit=crop&w=1200&q=85",
      size: "-small -horizontal",
    },
    {
      id: 17,
      src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
      size: "-big",
    },
    {
      id: 18,
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
      size: "-normal -horizontal",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesActive(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Frame based approach (Event independent and extremely smooth)
  useEffect(() => {
    let animationFrameId;

    const syncScroll = () => {
      const wrapper = wrapperRef.current;
      const container = containerRef.current;

      if (wrapper && container) {
        const rect = wrapper.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Kitna total scroll ho sakta hai
        const scrollableDistance = rect.height - windowHeight;
        
        // Negative top value gives exact scrolled amount
        const scrolled = -rect.top;

        // Progress clamp between 0 to 1
        let progress = scrolled / scrollableDistance;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        container.scrollLeft = maxScrollLeft * progress;
      }

      animationFrameId = requestAnimationFrame(syncScroll);
    };

    // Start loop
    animationFrameId = requestAnimationFrame(syncScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleImageClick = (id) => {
    setClickedId(id);
    setImagesActive(false);

    setTimeout(() => {
      setClickedId(null);
      setImagesActive(true);
    }, 2000);
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        height: "280vh",
        position: "relative",
        background: "#0b2d45",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <style>{`
          .scroll-animations-example {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .scrollsection {
            padding: 0 10vh 0 15vmax;
            display: flex;
            align-items: center;
            height: 100%;
            width: max-content; /* Ensures child width expands for scrolling */
          }

          .item {
            display: inline-block;
            position: relative;
            margin: 0 -25vh 0 3vh;
            vertical-align: middle;
            flex-shrink: 0;
          }

          .item.-big {
            height: 80vh;
            width: 60vh;
          }

          .item.-big.-horizontal {
            height: 60vh;
            width: 80vh;
          }

          .item.-normal {
            height: 60vh;
            width: 45vh;
            z-index: 1;
          }

          .item.-normal.-horizontal {
            height: 45vh;
            width: 60vh;
          }

          .item.-small {
            height: 40vh;
            width: 30vh;
            z-index: 2;
          }

          .item.-small.-horizontal {
            height: 30vh;
            width: 40vh;
          }

          .image {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: cover;
            filter: none;
            opacity: 0;
            pointer-events: none;
            transform: translateX(0) translateY(0) scale(1);
            transition: opacity 1s ease, transform 1s ease;
            cursor: pointer;
          }

          .image.-active {
            transform: translateX(0) translateY(0) scale(1) !important;
            opacity: 1;
            pointer-events: auto;
          }

          .image.-clicked {
            transform: translateX(0) translateY(0) scale(5) !important;
            opacity: 0;
            pointer-events: auto;
          }

          @media (max-width: 768px) {
            .scrollsection {
              padding-left: 8vw;
              padding-right: 8vw;
            }

            .item {
              margin-left: 3vh;
              margin-right: -12vh;
            }

            .item.-big {
              height: 65vh;
              width: 48vh;
            }

            .item.-big.-horizontal {
              height: 48vh;
              width: 65vh;
            }

            .item.-normal {
              height: 50vh;
              width: 38vh;
            }

            .item.-normal.-horizontal {
              height: 38vh;
              width: 50vh;
            }

            .item.-small {
              height: 35vh;
              width: 27vh;
            }

            .item.-small.-horizontal {
              height: 27vh;
              width: 35vh;
            }
          }
        `}</style>

        <div className="scroll-animations-example" ref={containerRef}>
          <div className="scrollsection">
            {imagesData.map((item, index) => {
              let activeClass = "";

              if (clickedId === item.id) {
                activeClass = "-clicked";
              } else if (imagesActive) {
                activeClass = "-active";
              }

              return (
                <div key={item.id} className={`item ${item.size}`}>
                  <img
                    className={`image ${activeClass}`}
                    src={item.src}
                    alt={`Gallery Image ${index + 1}`}
                    loading={index < 6 ? "eager" : "lazy"}
                    draggable="false"
                    onClick={() => handleImageClick(item.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;