import { useEffect, useState, useCallback } from "react";
import { api } from "./api.js";
import NewLinkForm from "./components/NewLinkForm.jsx";
import LinksTable from "./components/LinksTable.jsx";
import ClicksChart from "./components/ClicksChart.jsx";

export default function App() {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    api
      .listLinks()
      .then((data) => setLinks(data.links))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function onCreated(link) {
    setLinks((prev) => [
      { ...link, click_count: 0, created_at: new Date().toISOString() },
      ...prev,
    ]);
  }

  const totalClicks = links.reduce((sum, l) => sum + l.click_count, 0);

  return (
    <div className="container">
      <header className="top">
        <div className="brand">shrtn<span> · dashboard</span></div>
        <div>{links.length} enlaces · {totalClicks} clics totales</div>
      </header>

      <NewLinkForm onCreated={onCreated} />

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="empty">Cargando...</p>
      ) : (
        <>
          <ClicksChart links={links} />
          <div className="card">
            <h3>Todos los enlaces</h3>
            <LinksTable links={links} />
          </div>
        </>
      )}
    </div>
  );
}
