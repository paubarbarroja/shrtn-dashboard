import { useState } from "react";
import { api } from "../api.js";

export default function NewLinkForm({ onCreated }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { url };
      if (code.trim()) payload.code = code.trim();
      const link = await api.createLink(payload);
      setUrl("");
      setCode("");
      onCreated(link);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h3>Nuevo enlace</h3>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <input
            type="url"
            placeholder="https://ejemplo.com/pagina-muy-larga"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            style={{ flex: "0 0 140px" }}
            placeholder="código (opcional)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Acortar"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
