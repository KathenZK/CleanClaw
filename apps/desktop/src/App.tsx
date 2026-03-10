import { useEffect, useMemo, useState } from "react";
import type { CleanupResult, ScanResult } from "../shared/cleanup";
import { categoryLabels } from "../shared/cleanup";
import "./App.css";

const supportedPlatforms = new Set(["darwin", "win32"]);

function formatTimestamp(value?: string) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function App() {
  const [platform, setPlatform] = useState<string>("unknown");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [cleanupResult, setCleanupResult] = useState<CleanupResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void window.cleanClaw
      .getPlatform()
      .then((value) => setPlatform(value))
      .catch(() => setPlatform("unknown"));
  }, []);

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

  const canScan = !isScanning && !isCleaning && supportedPlatforms.has(platform);
  const canClean = !isCleaning && Boolean(scanResult?.items.length);

  const handleScan = async () => {
    setError(null);
    setCleanupResult(null);
    setIsScanning(true);

    try {
      const result = await window.cleanClaw.scan();
      setScanResult(result);
    } catch (scanError) {
      setError(scanError instanceof Error ? scanError.message : "Scan failed.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleClean = async () => {
    if (!scanResult?.items.length) {
      return;
    }

    setError(null);
    setIsCleaning(true);
    setShowConfirm(false);

    try {
      const result = await window.cleanClaw.clean(scanResult.items);
      setCleanupResult(result);
    } catch (cleanupError) {
      setError(cleanupError instanceof Error ? cleanupError.message : "Cleanup failed.");
    } finally {
      setIsCleaning(false);
    }
  };

  return (
    <div className="shell">
      <div className="hero">
        <div>
          <p className="eyebrow">CleanClaw</p>
          <h1>一键彻底清理 OpenClaw</h1>
          <p className="subtitle">
            扫描命中项，确认后删除。Scan first, confirm once, remove OpenClaw leftovers cleanly.
          </p>
        </div>
        <div className="hero-meta">
          <div>
            <span className="meta-label">Platform</span>
            <strong>{platform}</strong>
          </div>
          <div>
            <span className="meta-label">Last scan</span>
            <strong>{formatTimestamp(scanResult?.scannedAt)}</strong>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="primary-button" disabled={!canScan} onClick={() => void handleScan()}>
          {isScanning ? "扫描中 Scanning..." : "开始扫描"}
        </button>
        <button className="secondary-button" disabled={!canClean} onClick={() => setShowConfirm(true)}>
          确认清理
        </button>
      </div>

      {!supportedPlatforms.has(platform) ? (
        <section className="panel">
          <h2>暂不支持当前系统</h2>
          <p>Current MVP supports macOS and Windows only.</p>
        </section>
      ) : null}

      {error ? (
        <section className="panel error-panel">
          <h2>发生错误</h2>
          <p>{error}</p>
        </section>
      ) : null}

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>扫描结果</h2>
            <p>Found items are grouped by category before cleanup.</p>
          </div>
          <span className="badge">{scanResult?.items.length ?? 0} items</span>
        </div>

        {!scanResult ? (
          <div className="empty-state">
            <p>点击“开始扫描”以查看本机中命中的 OpenClaw 项。</p>
          </div>
        ) : scanResult.items.length === 0 ? (
          <div className="empty-state">
            <p>未发现明确命中的 OpenClaw 残留。</p>
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
              <h2>清理报告</h2>
              <p>Simple cleanup list generated after the operation.</p>
            </div>
            <span className="badge">{cleanupResult.items.filter((item) => item.success).length} success</span>
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
              报告已写入 Report saved to: <code>{cleanupResult.reportPath}</code>
            </p>
          ) : null}
        </section>
      ) : null}

      {showConfirm ? (
        <div className="modal-backdrop" role="presentation">
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <h2 id="confirm-title">确认清理</h2>
            <p>
              将删除 {scanResult?.items.length ?? 0} 个命中项，包括目录、服务、自启动项与注册表残留。
            </p>
            <div className="modal-actions">
              <button className="secondary-button" onClick={() => setShowConfirm(false)}>
                取消
              </button>
              <button className="primary-button" disabled={isCleaning} onClick={() => void handleClean()}>
                {isCleaning ? "清理中..." : "确认删除"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
