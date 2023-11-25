import React, { useState, useEffect } from 'react';
import './App.css';

const Header = () => (
  <header className="header">
    <h1>TM Photography</h1>
  </header>
);

const AboutMe = () => (
  <section className="section">
    <h2>About Me</h2>
    <p>
    Dive into the captivating tapestry of my work below, where every image is a symphony of colors, emotions, and narratives. Let the visual poetry inspire your senses 
    and transport you to a realm where every photograph is a doorway to a different world.
    </p>
    <p>
    Feel the passion, see the stories – this is more than just a portfolio; it's an invitation to explore, connect, and make memories last forever. Get in touch, and 
    let's embark on a journey of capturing your moments in the most breathtaking way possible!
    </p>
  </section>
);

const Portfolio = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const importAll = (r) => {
      return r.keys().map((fileName) => ({
        fileName: fileName.replace('./', ''),
        file: r(fileName).default,
      }));
    };

    const imageContext = require.context('!file-loader!../public/images', false, /\.(jpg|jpeg|png)$/);
    const images = importAll(imageContext);

    setImageFiles(images);
  }, []);

  const openModal = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="section">
      <h2>Portfolio</h2>
      <div className="gallery">
        {imageFiles.map((image, index) => (
          <div key={index} className="image-container" onClick={() => openModal(index)}>
            <img src={process.env.PUBLIC_URL + `/images/${image.fileName}`} alt={`Photo ${index + 1}`} />
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <Modal
          imageUrl={process.env.PUBLIC_URL + `/images/${imageFiles[selectedImage].fileName}`}
          closeModal={closeModal}
        />
      )}
    </section>
  );
};

const Modal = ({ imageUrl, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>&times;</span>
        <img src={imageUrl} alt="Modal" />
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="footer">
    &copy; {new Date().getFullYear()} TM Photography - My Photography Portfolio
  </footer>
);

const App = () => (
  <div className="app">
    <Header />
    <AboutMe />
    <Portfolio />
    <Footer />
  </div>
);

export default App;
