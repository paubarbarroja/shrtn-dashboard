export default function LinksTable({ links }) {
  if (!links.length) {
    return <p className="empty">Todavía no has creado ningún enlace.</p>;
  }

  function copy(text) {
    navigator.clipboard?.writeText(text);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Enlace corto</th>
          <th>Destino</th>
          <th>Clics</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {links.map((link) => (
          <tr key={link.code}>
            <td>
              <a className="short-link" href={link.short_url} target="_blank" rel="noopener noreferrer">
                {link.short_url}
              </a>
            </td>
            <td>
              <span className="long-url" title={link.long_url}>{link.long_url}</span>
            </td>
            <td><span className="click-badge">{link.click_count}</span></td>
            <td>
              <button className="copy-btn" onClick={() => copy(link.short_url)}>Copiar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
