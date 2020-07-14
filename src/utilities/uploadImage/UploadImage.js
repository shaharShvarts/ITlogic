import React, { useEffect, useState, useRef } from "react";

import "./UploadImage.css";

const UploadImage = ({ image, setImage }) => {
  const [file, setFiles] = useState(null);
  const [dragState, setDragState] = useState("");
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (!image) {
      setDragState("drop-zone");
      setTitle("Click Or Drag a image here");
    } else {
      setDragState(() => "drop-zone done");
    }
  }, [image]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setDragState(() => "drop-zone done");
        setImage(e.target.result);
      };
    }
  }, [file, setImage]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={() => {
          setFiles(inputRef.current.files[0]);
        }}
        hidden
      />
      <b
        className={dragState}
        onClick={() => {
          const { current } = inputRef;
          current.click();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragState(() => "drop-zone done");
          setFiles(e.dataTransfer.files[0]);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragState(() => "drop-zone");
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragState(() => "drop-zone drop-over");
        }}
      >
        {image ? <img src={image} alt={file ? file.name : ""} /> : title}
      </b>
    </>
  );
};

export default UploadImage;
