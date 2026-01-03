import Upload from "./components/Upload";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Video Sensitivity Platform</h1>
      <Upload />
      <hr />
      <Dashboard />
    </div>
  );
}

export default App;
