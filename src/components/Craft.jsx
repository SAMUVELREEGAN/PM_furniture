import React, { useEffect, useRef, useState } from 'react';
import './Craft.css';

const Craft = () => {
  const craftRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  const [years, setYears] = useState(0);
  const [clients, setClients] = useState(0);
  const [projects, setProjects] = useState(0);

  // Animate counters
  useEffect(() => {
    if (startCount) {
      const duration = 5000;
      const step = 1;
      let start = 0;

      const animate = () => {
        start += step;
        setYears(prev => (prev < 20 ? prev + 1 : 20));
        setClients(prev => (prev < 498 ? prev + 10 : 498));
        setProjects(prev => (prev < 150 ? prev + 5 : 150));
        if (start < duration) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [startCount]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (craftRef.current) observer.observe(craftRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className='container my-5' ref={craftRef}>
      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-10 col-md-8 col-sm-12 mt-3 crafted'>
                <h2>Crafted by talented and high quality material</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-4 col-md-4 col-sm-12 mt-3 project text-center'>
                <h3>{years}+</h3>
                <p>Years Experience</p>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-12 mt-3 project text-center'>
                <h3>{clients}+</h3>
                <p>Happy Client</p>
              </div>
              <div className='col-lg-4 col-md-4 col-sm-12 mt-3 project text-center'>
                <h3>{projects}+</h3>
                <p>Project Finished</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Craft;
