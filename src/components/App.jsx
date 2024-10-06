import BackgroundHeading from "./BackgroundHeading.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import ItemList from "./ItemList.jsx";

function App() {

  return (
    <>
      <BackgroundHeading />
      <main>
        <Header />
        <ItemList />
        <Sidebar />
      </main>
      <Footer />
    </>
  )
}

export default App
