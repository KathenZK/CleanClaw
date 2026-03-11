import { useEffect, useMemo, useState } from "react";
import brandIcon from "../build/cleanclaw-icon.png";
import type { CleanupResult, ScanResult } from "../shared/cleanup";
import { getMessages } from "../shared/messages";
import { normalizeLang } from "../shared/i18n";
import "./App.css";

const supportedPlatforms = new Set(["darwin", "win32"]);

function formatTimestamp(value: string | undefined, lang: "zh" | "en", fallback: string) {
  if (!value) {
    return fallback;
  }

  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function App() {
  const lang = normalizeLang(globalThis.navigator?.language);
  const messages = getMessages(lang);
  const [platform, setPlatform] = useState<string>("unknown");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [cleanupResult, setCleanupResult] = useState<CleanupResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.cleanClaw) {
      setError(messages.errors.bridgeUnavailable);
      setPlatform("unknown");
      return;
    }

    void window.cleanClaw
      .getPlatform()
      .then((value) => setPlatform(value))
      .catch(() => {
        setPlatform("unknown");
        setError(messages.errors.runtimeUnavailable);
      });
  }, [messages.errors.bridgeUnavailable, messages.errors.runtimeUnavailable]);

  const groupedItems = useMemo(() => {
    const items = scanResult?.items ?? [];
    return Object.entries(
      items.reduce<Record<string, typeof items>>((acc, item) => {
        acc[item.category] ??= [];
        acc[item.category].push(item);
        return acc;
      }, {}),
    );
  }, [scanResult]);

  const categoryLabels = messages.categoryLabels;

  const canScan = !isScanning && !isCleaning && supportedPlatforms.has(platform);
  const matchedCount = scanResult?.items.length ?? 0;
  const canClean = !isCleaning && matchedCount > 0;
  const showScanWorkspace = isScanning || scanResult !== null;

  const handleScan = async () => {
    if (!window.cleanClaw) {
      setError(messages.errors.bridgeUnavailable);
      return;
    }

    setError(null);
    setCleanupResult(null);
    setIsScanning(true);

    try {
      const result = await window.cleanClaw.scan(lang);
      setScanResult(result);
    } catch (scanError) {
      setError(scanError instanceof Error ? scanError.message : messages.errors.scanFailed);
    } finally {
      setIsScanning(false);
    }
  };

  const handleClean = async () => {
    if (!window.cleanClaw) {
      setError(messages.errors.bridgeUnavailable);
      return;
    }

    if (!scanResult?.items.length) {
      return;
    }

    setError(null);
    setIsCleaning(true);
    setShowConfirm(false);

    try {
      const result = await window.cleanClaw.clean(scanResult.items, lang);
      setCleanupResult(result);
    } catch (cleanupError) {
      setError(cleanupError instanceof Error ? cleanupError.message : messages.errors.cleanupFailed);
    } finally {
      setIsCleaning(false);
    }
  };

  return (
    <div className="shell">
      <div className="hero">
        <div className="hero-top">
          <div className="hero-brand" aria-hidden="true">
            <img src={brandIcon} alt="" className="hero-brand-icon" />
            <span className="hero-brand-name">CleanClaw</span>
          </div>
          <div className="hero-copy">
            <h1>{messages.app.title}</h1>
            <p className="subtitle">{messages.app.subtitle}</p>
          </div>
          <div className="hero-stat">
            <span className="meta-label">{messages.app.lastScan}：</span>
            <strong>{formatTimestamp(scanResult?.scannedAt, lang, messages.app.unavailable)}</strong>
          </div>
        </div>
        {!showScanWorkspace ? (
          <div className="action-stack">
            <button className="primary-button hero-primary" disabled={!canScan} onClick={() => void handleScan()}>
              {messages.app.startScan}
            </button>
          </div>
        ) : (
          <section className="scan-workspace">
            <div className="scan-workspace-header">
              <div className="scan-workspace-copy">
                <p className="scan-workspace-label">
                  {isScanning
                    ? messages.app.scanning
                    : matchedCount > 0
                      ? `${messages.app.scanCompletePrefix} ${matchedCount} ${messages.app.scanCompleteSuffix}`
                      : messages.app.scanEmptyTitle}
                </p>
                <h2 className="scan-workspace-title">
                  {isScanning
                    ? messages.app.scanProgressTitle
                    : matchedCount > 0
                      ? `${messages.app.scanCompletePrefix} ${matchedCount} ${messages.app.scanCompleteSuffix}`
                      : messages.app.scanEmptyTitle}
                </h2>
                <p className="scan-workspace-body">
                  {isScanning
                    ? messages.app.scanProgressBody
                    : matchedCount > 0
                      ? messages.app.scanCompleteBody
                      : messages.app.scanEmptyBody}
                </p>
              </div>
              <div className="scan-workspace-actions">
                {canClean ? (
                  <button className="primary-button workspace-primary" onClick={() => setShowConfirm(true)}>
                    {messages.app.startCleanNow}
                  </button>
                ) : null}
                <button className="secondary-button workspace-secondary" disabled={isScanning} onClick={() => void handleScan()}>
                  {messages.app.rescan}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {!supportedPlatforms.has(platform) ? (
        <section className="panel">
          <h2>{messages.app.unsupportedTitle}</h2>
          <p>{messages.app.unsupportedBody}</p>
        </section>
      ) : null}

      {error ? (
        <section className="panel error-panel">
          <h2>{messages.app.errorTitle}</h2>
          <p>{error}</p>
        </section>
      ) : null}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>{messages.app.resultsTitle}</h2>
            <p>{messages.app.resultsBody}</p>
          </div>
          <span className="badge">
            {scanResult?.items.length ?? 0} {messages.app.itemsSuffix}
          </span>
        </div>

        {!scanResult ? (
          <div className="empty-state">
            <div className="empty-copy">
              <strong>{isScanning ? messages.app.scanProgressTitle : messages.app.emptyStateTitle}</strong>
              <p>{isScanning ? messages.app.scanProgressBody : messages.app.emptyBeforeScan}</p>
            </div>
          </div>
        ) : scanResult.items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-copy">
              <strong>{messages.app.cleanStateTitle}</strong>
              <p>{messages.app.emptyAfterScan}</p>
            </div>
          </div>
        ) : (
          <div className="group-list">
            {groupedItems.map(([category, items]) => (
              <div key={category} className="group-card">
                <div className="group-title">
                  <h3>{categoryLabels[category as keyof typeof categoryLabels]}</h3>
                  <span>{items.length}</span>
                </div>
                <div className="target-list">
                  {items.map((item) => (
                    <div key={item.id} className="target-row">
                      <div>
                        <strong>{item.label}</strong>
                        <p>{item.description}</p>
                      </div>
                      <code>{item.path ?? item.taskName ?? item.registryPath ?? item.label}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {cleanupResult ? (
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>{messages.app.reportTitle}</h2>
              <p>{messages.app.reportBody}</p>
            </div>
            <span className="badge">
              {cleanupResult.items.filter((item) => item.success).length} {messages.app.successSuffix}
            </span>
          </div>
          <div className="report-list">
            {cleanupResult.items.map((item) => (
              <div key={item.target.id} className={`report-item ${item.success ? "ok" : "fail"}`}>
                <strong>{item.target.label}</strong>
                <p>{item.message}</p>
              </div>
            ))}
          </div>
          {cleanupResult.reportPath ? (
            <p className="report-path">
              {messages.app.reportSaved} <code>{cleanupResult.reportPath}</code>
            </p>
          ) : null}
        </section>
      ) : null}

      {showConfirm ? (
        <div className="modal-backdrop" role="presentation">
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <h2 id="confirm-title">{messages.app.confirmTitle}</h2>
            <p>
              {messages.app.confirmBodyPrefix} {scanResult?.items.length ?? 0} {messages.app.confirmBodySuffix}
            </p>
            <div className="modal-actions">
              <button className="secondary-button" onClick={() => setShowConfirm(false)}>
                {messages.app.cancel}
              </button>
              <button className="primary-button" disabled={isCleaning} onClick={() => void handleClean()}>
                {isCleaning ? messages.app.cleaning : messages.app.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
