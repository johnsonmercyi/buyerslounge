import React, { useEffect, useRef, useState } from "react";
import styles from './styles.module.css';
import Icon from "util/icons";
import { animate } from "util/utils";

const ImageViewer = ({ show, showHandler, selected = null, images = [], ...props }) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [animateImage, setAnimateImage] = useState(false);

  const backdropRef = useRef(null);
  const imageViewWrapperRef = useRef(null);
  const imageHolderRef = useRef(null);

  useEffect(() => {
    setSelectedImage(selected || images[0]);
  }, [selected]);


  useEffect(() => {
    setSelectedImage(images[imageIndex]);

  }, [imageIndex]);

  useEffect(() => {
    if (show) {
      backdropRef.current.style.display = "flex";
      animate(
        backdropRef.current,
        0,
        500,
        1,
        "ease-in-out", [
        { backgroundColor: "rgba(0, 0, 0, 0.7)" }
      ], () => {
        animate(
          imageViewWrapperRef.current,
          0,
          200,
          1,
          "ease-in-out", [
          { transform: "scale(1)" }
        ]);
      }, 0);
    } else {
      animate(
        backdropRef.current,
        0,
        200,
        1,
        "ease-in-out", [
        { backgroundColor: "rgba(0, 0, 0, 0)" }
      ], () => {
        animate(
          imageViewWrapperRef.current,
          0,
          200,
          1,
          "ease-in-out", [
          { transform: "scale(0)" }
        ], () => {
          backdropRef.current.style.display = "none";
        });
      }, 0);
    }
  }, [show]);


  const slideDirHandler = (newDir) => {

    if (newDir === "right") {
      setImageIndex(prevIndex => {
        if (prevIndex === images.length - 1) {
          return 0;
        }
        return prevIndex += 1;
      });
    } else if (newDir === "left") {
      setImageIndex(prevIndex => {
        if (prevIndex === 0) {
          return images.length - 1;
        }
        return prevIndex -= 1;
      });
    }
  }

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };


  return (
    <div
      onClick={() => showHandler(false)}
      className={styles.backdrop}
      ref={backdropRef}
      tabIndex={0}
    >

      <div className={styles.imageViewWrapper} ref={imageViewWrapperRef} onClick={handleDialogClick}>
        <Icon
          name={"arrow-left"}
          strokeWidth={"2"}
          strokeColor={"var(--default-color)"}
          width={"50"}
          height={"50"}
          className={[styles.arrowLeft, styles.icon].join(" ")}
          onClickHandler={() => slideDirHandler("left")} />

        <div className={styles.imageViewer}>
          <div ref={imageHolderRef} className={styles.imageHolder}>
            {<img src={`http://localhost:8080${selectedImage}`} alt="Product image" />}
          </div>
          <div className={styles.overlay}>
            {images.map((image, index) => (
              <div key={index} style={{
                backgroundColor: image === selectedImage ? "white" : "transparent"
              }}></div>
            ))}
          </div>
        </div>

        <Icon
          name={"arrow-right"}
          strokeWidth={"2"}
          strokeColor={"var(--default-color)"}
          className={[styles.arrowRight, styles.icon].join(" ")}
          width={"50"}
          height={"50"}
          onClickHandler={() => slideDirHandler("right")} />

      </div>
    </div>
  );
}

export default ImageViewer;