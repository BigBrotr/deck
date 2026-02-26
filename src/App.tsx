import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [current, setCurrent] = useState(0)
  const total = 15

  const next = useCallback(() => setCurrent(p => (p + 1) % total), [total])
  const prev = useCallback(() => setCurrent(p => (p - 1 + total) % total), [total])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); next() }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  const renderSlide = () => {
    switch(current) {
      case 0: // Title
        return (
          <div className="slide center">
            <h1>BigBrotr</h1>
            <p className="subtitle">Network Intelligence for Nostr</p>
            <div className="tags">
              <span className="tag">Open Source</span>
              <span className="tag">MIT License</span>
              <span className="tag">Python + PostgreSQL</span>
            </div>
          </div>
        )
      case 1: // Question
        return (
          <div className="slide center">
            <p className="question">"How do you get a global view<br/>of a distributed network?"</p>
          </div>
        )
      case 2: // Challenge
        return (
          <div className="slide">
            <h2>The Challenge</h2>
            <ul>
              <li>Events scattered across <span className="highlight">hundreds of independent relays</span></li>
              <li>Each relay is <span className="highlight">ephemeral</span> — can disappear anytime</li>
              <li>No single entity sees the <span className="highlight">whole picture</span></li>
              <li>Unreplicated events are <span className="highlight">lost forever</span></li>
            </ul>
          </div>
        )
      case 3: // What is BigBrotr
        return (
          <div className="slide">
            <h2>What is BigBrotr?</h2>
            <div className="grid-2">
              <div>
                <h3>Core Infrastructure</h3>
                <ul>
                  <li>A <span className="highlight">network observatory</span></li>
                  <li>A <span className="highlight">time machine</span> for Nostr</li>
                  <li>A <span className="highlight">research platform</span></li>
                  <li>A <span className="highlight">testbench</span> for developers</li>
                </ul>
              </div>
              <div>
                <h3>Extensible To...</h3>
                <ul>
                  <li>Run a <span className="highlight">Relay</span> on top</li>
                  <li>Build a <span className="highlight">Trust Authority</span> (NIP-85)</li>
                  <li>Deploy <span className="highlight">DVMs</span></li>
                  <li>Expose <span className="highlight">APIs</span></li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 4: // Diamond DAG
        return (
          <div className="slide">
            <h2>Architecture: Diamond DAG</h2>
            <h3>Five packages, one rule: imports only flow downward</h3>
            <div className="architecture">
{`              services           Orchestration
             /   |   \\
          core  nips  utils      Infrastructure
             \\   |   /
              models             Pure domain types`}
            </div>
            <div className="dag-descriptions">
              <div className="dag-item">
                <span className="dag-name">models</span>
                <span className="dag-desc">Frozen dataclasses, zero I/O, fail-fast validation</span>
              </div>
              <div className="dag-item">
                <span className="dag-name">core</span>
                <span className="dag-desc">Pool, Brotr (DB facade), BaseService, Logger, Metrics</span>
              </div>
              <div className="dag-item">
                <span className="dag-name">nips</span>
                <span className="dag-desc">NIP-11 relay info, NIP-66 health monitoring (6 tests)</span>
              </div>
              <div className="dag-item">
                <span className="dag-name">utils</span>
                <span className="dag-desc">DNS, Nostr keys, WebSocket/HTTP transport, SOCKS5</span>
              </div>
              <div className="dag-item">
                <span className="dag-name">services</span>
                <span className="dag-desc">Six independent services sharing PostgreSQL</span>
              </div>
            </div>
          </div>
        )
      case 5: // Customizable Layer Architecture
        return (
          <div className="slide">
            <h2>Customizable Layer Architecture</h2>
            <h3>Define your own implementation</h3>
            <div className="layer-stack">
              <div className="layer">
                <div className="layer-title">YOUR IMPLEMENTATION</div>
                <div className="layer-content">
                  <span className="layer-item core">bigbrotr</span>
                  <span className="layer-item core">lilbrotr</span>
                  <span className="layer-item extensible">+ yourbrotr</span>
                </div>
                <p style={{marginTop: '10px', fontSize: '0.9rem', color: '#888'}}>
                  Define: which fields to store, which relays to sync, custom filters
                </p>
              </div>
              <div className="layer">
                <div className="layer-title">SERVICES (Independent)</div>
                <div className="layer-content">
                  <span className="layer-item core">Seeder</span>
                  <span className="layer-item core">Finder</span>
                  <span className="layer-item core">Validator</span>
                  <span className="layer-item core">Monitor</span>
                  <span className="layer-item core">Refresher</span>
                  <span className="layer-item core">Synchronizer</span>
                  <span className="layer-item extensible">+ API</span>
                  <span className="layer-item extensible">+ DVM</span>
                  <span className="layer-item extensible">+ Relay</span>
                  <span className="layer-item extensible">+ Trust Authority</span>
                </div>
              </div>
              <div className="layer">
                <div className="layer-title">CORE</div>
                <div className="layer-content">
                  <span className="layer-item core">Pool</span>
                  <span className="layer-item core">Brotr</span>
                  <span className="layer-item core">BaseService</span>
                  <span className="layer-item core">Logger</span>
                  <span className="layer-item core">Metrics</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 6: // Six Independent Services
        return (
          <div className="slide">
            <h2>Six Independent Services</h2>
            <h3>All connected only through the database — no queues, no inter-service APIs</h3>
            <div className="services-flow">
              <div className="services-column">
                <div className="service-card discovery">
                  <div className="service-name">Seeder</div>
                  <div className="service-mode">one-shot</div>
                  <div className="service-desc">Load relay URLs from seed files</div>
                </div>
                <div className="service-card discovery">
                  <div className="service-name">Finder</div>
                  <div className="service-mode">continuous</div>
                  <div className="service-desc">Discover from APIs & NIP-65 events</div>
                </div>
                <div className="services-label">Discovery</div>
              </div>
              <div className="services-arrows">
                <span>→</span>
                <span className="arrow-label">candidates</span>
              </div>
              <div className="services-column">
                <div className="service-card validation">
                  <div className="service-name">Validator</div>
                  <div className="service-mode">continuous</div>
                  <div className="service-desc">WebSocket handshake + Nostr verify</div>
                </div>
                <div className="services-label">Validation</div>
              </div>
              <div className="services-arrows">
                <span>→</span>
                <span className="arrow-label">valid relays</span>
              </div>
              <div className="services-column">
                <div className="service-card operation">
                  <div className="service-name">Monitor</div>
                  <div className="service-mode">continuous</div>
                  <div className="service-desc">NIP-11 & NIP-66 health checks</div>
                </div>
                <div className="service-card operation">
                  <div className="service-name">Refresher</div>
                  <div className="service-mode">scheduled</div>
                  <div className="service-desc">Materialized view refresh</div>
                </div>
                <div className="service-card operation">
                  <div className="service-name">Synchronizer</div>
                  <div className="service-mode">continuous</div>
                  <div className="service-desc">Cursor-based event collection</div>
                </div>
                <div className="services-label">Operation</div>
              </div>
            </div>
          </div>
        )
      case 7: // Database Schema
        return (
          <div className="slide">
            <h2>Database Schema</h2>
            <div className="db-schema-horizontal">
              <div className="db-table">
                <div className="db-table-header">event</div>
                <div className="db-table-body">
                  <div className="db-column pk">id <span>BYTEA PK</span></div>
                  <div className="db-column">pubkey <span>BYTEA</span></div>
                  <div className="db-column">created_at <span>BIGINT</span></div>
                  <div className="db-column">kind <span>INTEGER</span></div>
                  <div className="db-column">tags <span>JSONB</span></div>
                  <div className="db-column computed">tagvalues <span>TEXT[] GIN</span></div>
                  <div className="db-column">content <span>TEXT</span></div>
                  <div className="db-column">sig <span>BYTEA</span></div>
                </div>
              </div>

              <div className="db-table junction">
                <div className="db-table-header">event_relay</div>
                <div className="db-table-body">
                  <div className="db-column fk">event_id <span>BYTEA FK</span></div>
                  <div className="db-column fk">relay_url <span>TEXT FK</span></div>
                  <div className="db-column">seen_at <span>BIGINT</span></div>
                </div>
              </div>

              <div className="db-table">
                <div className="db-table-header">relay</div>
                <div className="db-table-body">
                  <div className="db-column pk">url <span>TEXT PK</span></div>
                  <div className="db-column">network <span>TEXT</span></div>
                  <div className="db-column">discovered_at <span>BIGINT</span></div>
                </div>
              </div>

              <div className="db-table junction">
                <div className="db-table-header">relay_metadata</div>
                <div className="db-table-body">
                  <div className="db-column fk">relay_url <span>TEXT FK</span></div>
                  <div className="db-column fk">metadata_id <span>BYTEA FK</span></div>
                  <div className="db-column fk">metadata_type <span>TEXT FK</span></div>
                  <div className="db-column">generated_at <span>BIGINT</span></div>
                </div>
              </div>

              <div className="db-table">
                <div className="db-table-header">metadata</div>
                <div className="db-table-body">
                  <div className="db-column pk">id <span>BYTEA PK</span></div>
                  <div className="db-column pk">metadata_type <span>TEXT PK</span></div>
                  <div className="db-column">data <span>JSONB</span></div>
                </div>
                <div className="db-table-note">Content-addressed (SHA-256)</div>
              </div>

              <div className="db-table">
                <div className="db-table-header">service_state</div>
                <div className="db-table-body">
                  <div className="db-column pk">service_name <span>TEXT PK</span></div>
                  <div className="db-column pk">state_type <span>TEXT PK</span></div>
                  <div className="db-column pk">state_key <span>TEXT PK</span></div>
                  <div className="db-column">state_value <span>JSONB</span></div>
                  <div className="db-column">updated_at <span>BIGINT</span></div>
                </div>
              </div>
            </div>

            <div className="db-schema-legend">
              <span className="legend-item"><span className="legend-pk"></span> Primary Key</span>
              <span className="legend-item"><span className="legend-fk"></span> Foreign Key</span>
              <span className="legend-item"><span className="legend-computed"></span> Computed</span>
            </div>
          </div>
        )
      case 8: // NIP Implementations
        return (
          <div className="slide">
            <h2>NIP Implementations</h2>
            <div className="grid-2">
              <div className="box">
                <h3>NIP-11: Relay Information</h3>
                <p className="box-subtitle">Fetches relay metadata via HTTP</p>
                <ul className="compact">
                  <li>Relay name, description, contact</li>
                  <li>Software name and version</li>
                  <li>Supported NIPs list</li>
                  <li>Rate limits and policies</li>
                  <li>Payment information</li>
                </ul>
              </div>
              <div className="box">
                <h3>NIP-66: Relay Monitoring</h3>
                <p className="box-subtitle">Six independent health tests</p>
                <div className="nip66-grid">
                  <div className="nip66-test"><span className="nip66-name">RTT</span><span className="nip66-desc">WebSocket round-trip time</span></div>
                  <div className="nip66-test"><span className="nip66-name">SSL</span><span className="nip66-desc">Certificate validity</span></div>
                  <div className="nip66-test"><span className="nip66-name">DNS</span><span className="nip66-desc">Resolution time, IPs</span></div>
                  <div className="nip66-test"><span className="nip66-name">Geo</span><span className="nip66-desc">Country, city, ASN</span></div>
                  <div className="nip66-test"><span className="nip66-name">Net</span><span className="nip66-desc">AS number, ISP</span></div>
                  <div className="nip66-test"><span className="nip66-name">HTTP</span><span className="nip66-desc">Status, headers</span></div>
                </div>
              </div>
            </div>
          </div>
        )
      case 9: // Network Support
        return (
          <div className="slide">
            <h2>Network Support</h2>
            <h3>Four network types, each with independent configuration</h3>
            <div className="network-grid">
              <div className="network-card clearnet">
                <div className="network-icon">🌐</div>
                <h4>Clearnet</h4>
                <code>wss://</code>
                <p>Direct connection</p>
              </div>
              <div className="network-card tor">
                <div className="network-icon">🧅</div>
                <h4>Tor</h4>
                <code>.onion</code>
                <p>SOCKS5 proxy</p>
              </div>
              <div className="network-card i2p">
                <div className="network-icon">🔒</div>
                <h4>I2P</h4>
                <code>.b32.i2p</code>
                <p>SOCKS5 proxy</p>
              </div>
              <div className="network-card lokinet">
                <div className="network-icon">🛡️</div>
                <h4>Lokinet</h4>
                <code>.loki</code>
                <p>SOCKS5 proxy</p>
              </div>
            </div>
            <p className="network-note">Per-network timeout, concurrency, and proxy settings via Pydantic configuration models</p>
          </div>
        )
      case 10: // Use Cases
        return (
          <div className="slide">
            <h2>Use Cases</h2>
            <div className="use-case-grid">
              <div className="use-case">
                <div className="use-case-icon">🕸️</div>
                <h4>Web of Trust</h4>
                <p>Collect signals for NIP-85 trust assertions: follow graphs, endorsements, zaps</p>
              </div>
              <div className="use-case">
                <div className="use-case-icon">📡</div>
                <h4>Network Analysis</h4>
                <p>Propagation, clustering, geographic distribution, replication</p>
              </div>
              <div className="use-case">
                <div className="use-case-icon">🔬</div>
                <h4>Protocol Research</h4>
                <p>NIP adoption, kind distribution, tag patterns at scale</p>
              </div>
              <div className="use-case">
                <div className="use-case-icon">🧪</div>
                <h4>Testbench</h4>
                <p>Simulate attacks, inject events, test algorithm resilience</p>
              </div>
              <div className="use-case">
                <div className="use-case-icon">📁</div>
                <h4>Archival</h4>
                <p>Complete event history, content-addressed, queryable</p>
              </div>
              <div className="use-case">
                <div className="use-case-icon">🛡️</div>
                <h4>Trust Authority</h4>
                <p>Build trust scoring systems on collected social graph data</p>
              </div>
            </div>
          </div>
        )
      case 11: // WoT
        return (
          <div className="slide">
            <h2>Web of Trust Infrastructure</h2>
            <h3>BigBrotr collects the raw signals — you build trust on top</h3>
            <div className="grid-2 wot-section">
              <div>
                <ul>
                  <li><span className="highlight">Kind 3</span> → Follow graph edges</li>
                  <li><span className="highlight">Kind 10002</span> → Relay preferences</li>
                  <li><span className="highlight">Kind 7</span> → Endorsements</li>
                  <li><span className="highlight">Kind 9735</span> → Economic signals (zaps)</li>
                  <li><span className="highlight">Kind 1985</span> → Labels (NIP-32)</li>
                </ul>
              </div>
              <div className="wot-diagram">
                <div className="wot-circle wot-you">
                  <strong>You</strong>
                  <small>d=0</small>
                </div>
                <div className="wot-arrow">→</div>
                <div className="wot-circle wot-d1">
                  <strong>Follows</strong>
                  <small>d=1</small>
                </div>
                <div className="wot-arrow">→</div>
                <div className="wot-circle wot-d2">
                  <strong>FoF</strong>
                  <small>d=2</small>
                </div>
              </div>
            </div>
          </div>
        )
      case 12: // Technology Stack
        return (
          <div className="slide">
            <h2>Technology Stack</h2>
            <div className="grid-2">
              <div className="box">
                <h3>Components</h3>
                <div className="tech-list">
                  <div className="tech-row"><span className="tech-label">Language</span><span className="tech-value">Python 3.11+</span></div>
                  <div className="tech-row"><span className="tech-label">Database</span><span className="tech-value">PostgreSQL 16+</span></div>
                  <div className="tech-row"><span className="tech-label">Async</span><span className="tech-value">asyncio + asyncpg</span></div>
                  <div className="tech-row"><span className="tech-label">Config</span><span className="tech-value">Pydantic + YAML</span></div>
                  <div className="tech-row"><span className="tech-label">Pooling</span><span className="tech-value">PgBouncer</span></div>
                  <div className="tech-row"><span className="tech-label">Metrics</span><span className="tech-value">Prometheus</span></div>
                  <div className="tech-row"><span className="tech-label">Monitoring</span><span className="tech-value">Grafana</span></div>
                  <div className="tech-row"><span className="tech-label">Proxy</span><span className="tech-value">Tor, I2P, Lokinet</span></div>
                </div>
              </div>
              <div>
                <h3>By the Numbers</h3>
                <div className="stat-grid">
                  <div className="stat"><div className="stat-number">6</div><div className="stat-label">Services</div></div>
                  <div className="stat"><div className="stat-number">5</div><div className="stat-label">Packages</div></div>
                  <div className="stat"><div className="stat-number">25</div><div className="stat-label">Stored Functions</div></div>
                  <div className="stat"><div className="stat-number">11</div><div className="stat-label">Mat. Views</div></div>
                  <div className="stat"><div className="stat-number">6</div><div className="stat-label">Tables</div></div>
                  <div className="stat"><div className="stat-number">4</div><div className="stat-label">Networks</div></div>
                  <div className="stat"><div className="stat-number">2400+</div><div className="stat-label">Tests</div></div>
                  <div className="stat"><div className="stat-number">80%+</div><div className="stat-label">Coverage</div></div>
                </div>
              </div>
            </div>
          </div>
        )
      case 13: // Key Takeaways
        return (
          <div className="slide">
            <h2>Key Takeaways</h2>
            <ul className="big-list">
              <li>BigBrotr is <span className="highlight">infrastructure</span>, extensible to relay / API / DVM / Trust Authority</li>
              <li><span className="highlight">6 independent services</span> — Seeder, Finder, Validator, Monitor, Refresher, Synchronizer</li>
              <li><span className="highlight">Database as integration point</span> — no message queues, no inter-service APIs</li>
              <li><span className="highlight">Multi-network</span> — clearnet, Tor, I2P, Lokinet with per-network config</li>
              <li><span className="highlight">Content-addressed</span> — SHA-256 deduplication eliminates consistency bugs</li>
              <li><span className="highlight">Production-ready</span> — Prometheus metrics, Grafana dashboards, Docker deployments</li>
            </ul>
          </div>
        )
      case 14: // Final
        return (
          <div className="slide center">
            <h1>BigBrotr</h1>
            <p className="subtitle">github.com/bigbrotr/bigbrotr</p>
            <div className="tags">
              <span className="tag">Python 3.11+</span>
              <span className="tag">PostgreSQL 16+</span>
              <span className="tag">Docker Ready</span>
              <span className="tag">MIT License</span>
            </div>
            <p className="final-cta">What would <strong>you</strong> build with complete network visibility?</p>
          </div>
        )
      default:
        return <div className="slide"><h2>Slide {current + 1}</h2></div>
    }
  }

  return (
    <div className="presentation">
      {renderSlide()}
      <div className="slide-number">{current + 1} / {total}</div>
      <div className="controls">
        <button onClick={prev}>← Prev</button>
        <button onClick={next}>Next →</button>
      </div>
    </div>
  )
}

export default App
