export default function Navbar({ cameraRef, planetRefs, setActivePlanet }) {
  const goTo = (planetName) => {
    setActivePlanet(planetName);
    const planetRef = planetRefs[planetName];
    if (planetRef && planetRef.current) {
      cameraRef.current?.focusOn(planetRef.current);
    }
  };

  const handleFreeRoam = () => {
    setActivePlanet(null);
    cameraRef.current?.clearFocus();
  };

  return (
    <div className="navbar">
      <button onClick={handleFreeRoam}>Free Roam</button>
      <button onClick={() => goTo('earth')}>About</button>
      <button onClick={() => goTo('venus')}>Gallery</button>
      <button onClick={() => goTo('jupiter')}>TimeLine</button>
      <button onClick={() => goTo('mars')}>Learnings & Growth</button> 
      <button onClick={() => goTo('saturn')}>Contact</button>
      <button onClick={() => goTo('uranus')}>Comments</button>
    </div>
  );
}
