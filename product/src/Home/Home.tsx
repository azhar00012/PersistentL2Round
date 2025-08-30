// Home.jsx
import { Link } from "react-router-dom";
function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '80vh', justifyContent: 'center' }}>
      <h1>Welcome to the Test Store!</h1>
      <h3>Please navigate to the Product List.</h3>
      <Link to="/product-list" aria-label="View Product List">Go to Product List</Link>
    </main>
  );
}

export default Home;
