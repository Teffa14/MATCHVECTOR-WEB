(() => {
  "use strict";

  const cfg = window.MATCHVECTOR_CONFIG || {};
  const API_BASE = String(cfg.apiBase || "").replace(/\/$/, "");
  const POLL_MS = Number(cfg.pollIntervalMs || 2500);
  const MAX_POLLS = Math.max(1, Math.ceil(Number(cfg.maxPollMinutes || 30) * 60000 / POLL_MS));

  const navItems = [
    ["dashboard", "Overview"],
    ["match", "Match Report"],
    ["dna", "Player DNA"],
    ["upload", "Upload Replay"],
    ["pricing", "Pricing"],
    ["economics", "Economics"]
  ];

  const appEl = document.getElementById("app");
  const navEl = document.getElementById("nav");
  const backendDot = document.getElementById("backendDot");
  const backendLabel = document.getElementById("backendLabel");
  const backendDetail = document.getElementById("backendDetail");

  const route = () => location.hash.replace(/^#\//, "") || "dashboard";
  const badge = (text, cls = "") => '<span class="badge ' + cls + '">' + text + "</span>";
  const metric = (label, value, note, cls = "") =>
    '<section class="card kpi"><div class="label">' + label + '</div><div class="value ' + cls + '">' + value + '</div><div class="muted">' + note + "</div></section>";

  function header(title, sub, live = false) {
    return '<div class="top"><div><div class="eyebrow">MATCHVECTOR · PERFORMANCE INTELLIGENCE</div><div class="h1">' +
      title + '</div><div class="muted">' + sub + '</div></div><div class="hero-actions">' +
      badge("deterministic-first", "det") + badge("evidence-backed", "ai") +
      badge(live ? "live replay path" : "synthetic demo", live ? "live" : "demo") +
      "</div></div>";
  }

  function navRender() {
    navEl.innerHTML = navItems.map(([r, label]) =>
      '<a class="' + (route() === r ? "active" : "") + '" href="#/' + r + '">' + label + "</a>"
    ).join("");
  }

  function dashboard() {
    return header("Performance overview", "Product surface preview · synthetic values are clearly marked") +
      '<div class="grid4">' +
      metric("FIRST FLICK", "0.96×", "Centered · n=14") +
      metric("OPENING DUELS", "54%", "Win rate · low sample") +
      metric("TRADEABLE DEATHS", "71%", "+8% vs baseline", "good") +
      metric("REPORT REUSE", "64%", "Synthetic cache-hit example", "info") +
      "</div>" +
      '<div class="grid2"><section class="card"><h3>Recent matches</h3><div class="table-wrap"><table class="table"><thead><tr><th>MAP</th><th>SCORE</th><th>ACS</th><th>K/D</th><th>STATE</th></tr></thead><tbody>' +
      [["Ascent","13–10","248","1.31","cached"],["Haven","11–13","214","1.06","fresh"],["Lotus","13–8","262","1.44","cached"],["Bind","13–6","276","1.58","cached"]]
        .map(r => "<tr>" + r.map(x => "<td>" + x + "</td>").join("") + "</tr>").join("") +
      '</tbody></table></div></section><section class="card"><h3>Player DNA</h3>' +
      [["First-shot discipline",82],["Crosshair correction",74],["Trade readiness",68],["Spacing",61],["Advantage conversion",77]]
        .map(x => '<div style="margin:12px 0"><div class="row space"><span>' + x[0] + "</span><strong>" + x[1] +
          '</strong></div><div class="bar"><div class="fill" style="width:' + x[1] + '%"></div></div></div>').join("") +
      '</section></div><div class="grid2"><section class="card"><h3>Training priorities</h3>' +
      [["Spacing before first contact","High confidence · 18 evidence windows"],["Reduce corrective mouse movement","Medium confidence · 14 fights"],["Earlier trade positioning","Medium confidence · 9 rounds"]]
        .map((x, i) => '<div class="priority row"><div class="rank">' + (i + 1) + '</div><div><strong>' + x[0] + '</strong><div class="muted">' + x[1] + "</div></div></div>").join("") +
      '</section><section class="card"><h3>Trust boundary</h3><p>Backend calculations stay deterministic and evidence-linked. Model interpretation is downstream and optional.</p><p>' +
      badge("observed", "det") + " " + badge("inferred", "ai") + " " + badge("unknown stays unknown", "demo") +
      '</p><p class="muted">This screen uses synthetic values. Real replay results appear only after a successful upload.</p></section></div>';
  }

  function match() {
    return header("Ascent · Jett · 13–10", "Synthetic match report · representative product layout") +
      '<div class="grid4">' +
      metric("ACS","248","derived · n=23") +
      metric("K/D","1.31","deterministic") +
      metric("HS%","34.2%","synthetic display value") +
      metric("FIRST FLICK","0.96×","usable · n=14") +
      "</div>" +
      '<div class="grid2"><section class="card timeline"><h3>Round timeline</h3>' +
      [["R3 00:18","Smoke B Main","team"],["R3 00:24","First contact B Main","you"],["R3 00:25","Kill · Omen","you"],["R3 00:48","Spike planted B","team"],["R7 00:21","First death · Mid","you"],["R12 00:44","Rotate A → B","you"]]
        .map(e => '<div class="event"><span class="muted">' + e[0] + "</span><span>" + e[1] + "</span><span>" + e[2] + "</span></div>").join("") +
      '</section><section class="card"><h3>Key fights</h3>' +
      [["R3 · B Main","WON","TTD 287ms · FS acc 100%","HIGH · ev_31, ev_32"],["R7 · Mid Top","LOST","TTD 412ms · moving at kill timestamp","MED · ev_74, ev_76"],["R18 · A Main","TRADED","TTD 334ms","MED · ev_181"]]
        .map(f => '<div class="priority"><div class="row space"><strong>' + f[0] + '</strong><strong>' + f[1] + '</strong></div><div class="muted">' + f[2] + '</div><div style="margin-top:6px">' + badge(f[3], "ai") + "</div></div>").join("") +
      '</section></div><div class="grid2"><section class="card"><h3>Deterministic summary</h3><div class="table-wrap"><table class="table">' +
      [["Opening duel win rate","54%","n=13"],["Tradeable deaths","71%","n=7"],["Median teammate distance","14.8m","n=18"],["Advantage conversion","67%","n=6"]]
        .map(d => "<tr><td>" + d[0] + "</td><td><strong>" + d[1] + '</strong></td><td class="muted">' + d[2] + "</td></tr>").join("") +
      '</table></div></section><section class="card"><h3>Interpretation examples</h3>' +
      [["Spacing collapses before first contact","HIGH","teammate-distance + contact windows"],["Corrective mouse movement rises after wide peeks","MED","synthetic first-flick example"],["Early rotate timing improved vs baseline","MED","observed route-transition example"]]
        .map(a => '<div class="priority"><strong>' + a[0] + '</strong><div class="muted">' + a[1] + " confidence · " + a[2] + "</div></div>").join("") +
      "</section></div>";
  }

  function dna() {
    return header("Player DNA", "Longitudinal profile preview · synthetic values") +
      '<div class="grid4">' +
      metric("MECHANICS","74","+7 over 8 weeks","good") +
      metric("TACTICS","68","+4 over 8 weeks","good") +
      metric("DISCIPLINE","63","+1 over 8 weeks","warn") +
      metric("IMPACT","77","+9 over 8 weeks","good") +
      "</div>" +
      '<div class="grid2"><section class="card"><h3>Axis detail</h3>' +
      [["First-shot discipline",82,"strength"],["Crosshair correction",74,"strength"],["Trade readiness",68,"stable"],["Spacing",61,"liability"],["Advantage conversion",77,"strength"]]
        .map(x => '<div style="margin:14px 0"><div class="row space"><span>' + x[0] + "</span><span>" + x[1] + " · " + x[2] + '</span></div><div class="bar"><div class="fill" style="width:' + x[1] + '%"></div></div></div>').join("") +
      '</section><section class="card"><h3>Training queue</h3>' +
      [["1","Spacing before first contact"],["2","Corrective movement after wide peeks"],["3","Trade positioning"]]
        .map(x => '<div class="priority row"><div class="rank">' + x[0] + '</div><div><strong>' + x[1] + '</strong><div class="muted">AI-ranked only when evidence is available</div></div></div>').join("") +
      "</section></div>";
  }

  function upload() {
    return header("Analyze a replay", "Real .vrf upload path · backend-owned deterministic processing", true) +
      '<div class="grid2 upload-panel"><section class="card">' +
      '<label class="drop" id="dropZone" for="replayInput"><strong>Drop a VALORANT replay here</strong><span>.vrf · maximum 500 MB</span><span class="btn secondary">Choose replay</span><input id="replayInput" type="file" accept=".vrf"></label>' +
      '<div class="upload-file" id="fileSummary"><div><strong id="fileName"></strong><div class="fine" id="fileSize"></div></div><button class="btn" id="analyzeBtn" type="button">Analyze replay</button></div>' +
      '<div class="progress" aria-label="Upload progress"><div class="progress-fill" id="progressFill"></div></div>' +
      '<div class="status-box" id="uploadStatus">Select a .vrf file. The raw replay is deleted by the backend after processing.</div>' +
      '</section><section class="card"><h3>Processing pipeline</h3>' +
      '<div class="stage" id="stageUpload"><strong>1. Upload + SHA-256</strong><div class="muted">The browser uploads one replay. The backend validates size/type and hashes the bytes.</div></div>' +
      '<div class="stage" id="stageProcess"><strong>2. Deterministic replay analysis</strong><div class="muted">Pinned vrfkit → canonical packet → evidence-linked analytics → report artifacts.</div></div>' +
      '<div class="stage" id="stageReport"><strong>3. Report ready</strong><div class="muted">Generated report opens from the private processing service. Raw replay bytes are not exposed.</div></div>' +
      '<div style="margin-top:14px" class="fine">GPT is not required for the core deterministic report. Unsupported telemetry remains unknown.</div>' +
      "</section></div>";
  }

  function pricing() {
    const tiers = [
      ["Free","$0","Ads + rewarded unlocks","30 uploads/mo · 2 AI/day"],
      ["Starter","$5.99","No ads","150 uploads/mo · 10 AI/day"],
      ["Pro","$12.99","Advanced DNA","500 uploads/mo · 30 AI/day"],
      ["Elite","$24.99","Deep analysis","2000 uploads/mo · 100 AI/day"]
    ];
    return header("Pricing", "Configuration-driven experiment · not a billing commitment") +
      '<div class="grid4">' + tiers.map((t, i) =>
        '<section class="card"><div class="eyebrow">' + t[0] + '</div><div class="price">' + t[1] + '</div><p>' + t[2] + '</p><p class="muted">' + t[3] + '</p><p>' +
        badge(i === 0 ? "ads" : "ad-free", i === 0 ? "demo" : "det") + '</p><button class="btn secondary" disabled>Coming later</button></section>'
      ).join("") + '</div><section class="card" style="margin-top:14px"><strong>Guardrails</strong><p class="muted">Deterministic statistics do not need LLM tokens. Duplicate processing and repeat AI spend should be cached as the production stack matures.</p></section>';
  }

  function economics() {
    return header("Internal unit economics", "Synthetic operating model · not production financials") +
      '<div class="grid4">' +
      metric("AI COST / REPORT","$0.0076","synthetic normal-report example","good") +
      metric("CACHE HIT RATE","64%","synthetic report reuse","good") +
      metric("COST / ACTIVE USER","$0.42","synthetic month") +
      metric("REVENUE / USER","$7.86","synthetic blended ARPU") +
      '</div><div class="grid2"><section class="card"><h3>Tier economics</h3><div class="table-wrap"><table class="table"><thead><tr><th>TIER</th><th>ARPU</th><th>REPORTS</th><th>COST</th><th>CONTRIBUTION</th></tr></thead><tbody>' +
      [["Free","$0","9","$0.18","-$0.18"],["Starter","$5.99","18","$0.41","$5.58"],["Pro","$12.99","31","$0.77","$12.22"],["Elite","$24.99","54","$1.58","$23.41"]]
        .map(r => "<tr>" + r.map(x => "<td>" + x + "</td>").join("") + "</tr>").join("") +
      '</tbody></table></div></section><section class="card"><h3>Ledger contract</h3><p class="muted">Production accounting should retain model policy, prompt version, token counts, latency, estimated cost, cache hit, tier, replay hash and revenue source.</p></section></div>';
  }

  function footer() {
    return '<footer class="footer">MATCHVECTOR · independent community project · unaffiliated with Riot Games · VALORANT and related marks belong to Riot Games, Inc.</footer>';
  }

  function setBackend(state, detail) {
    backendDot.className = "status-dot" + (state === "online" ? " online" : state === "offline" ? " offline" : "");
    backendLabel.textContent = state === "online" ? "Backend ready" : state === "offline" ? "Backend unavailable" : "Checking backend";
    backendDetail.textContent = detail || "Replay API";
  }

  async function checkBackend() {
    if (!API_BASE) {
      setBackend("offline", "API not configured");
      return;
    }
    setBackend("checking", "Replay API");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(API_BASE + "/api/health", {cache:"no-store", signal:controller.signal});
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.status === "ready") {
        setBackend("online", "vrfkit + analytics ready");
      } else {
        setBackend("offline", data.status || "degraded");
      }
    } catch (_) {
      setBackend("offline", "service may be waking");
    } finally {
      clearTimeout(timer);
    }
  }

  function setStage(id, state) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("active", "done", "failed");
    if (state) el.classList.add(state);
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes)) return "";
    const units = ["B","KB","MB","GB"];
    let value = bytes, index = 0;
    while (value >= 1024 && index < units.length - 1) {
      value /= 1024; index += 1;
    }
    return value.toFixed(index === 0 ? 0 : 1) + " " + units[index];
  }

  function uploadRequest(file, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", API_BASE + "/api/jobs");
      xhr.responseType = "json";
      xhr.upload.onprogress = event => {
        if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
      };
      xhr.onerror = () => reject(new Error("Network error while uploading replay."));
      xhr.onload = () => {
        let body = xhr.response;
        if (!body) {
          try { body = JSON.parse(xhr.responseText || "{}"); } catch (_) { body = {}; }
        }
        if (xhr.status < 200 || xhr.status >= 300) {
          reject(new Error(body.detail || body.error || "Replay upload failed."));
          return;
        }
        resolve(body);
      };
      const form = new FormData();
      form.append("replay", file, file.name);
      xhr.send(form);
    });
  }

  async function pollJob(statusUrl, onState) {
    for (let i = 0; i < MAX_POLLS; i += 1) {
      const res = await fetch(statusUrl, {cache:"no-store"});
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.detail || "Could not read replay job status.");
      onState(body);
      if (body.status === "ready" || body.status === "failed") return body;
      await new Promise(resolve => setTimeout(resolve, POLL_MS));
    }
    throw new Error("Replay analysis timed out in the browser. The backend job may still be running.");
  }

  function bindUpload() {
    const input = document.getElementById("replayInput");
    const drop = document.getElementById("dropZone");
    const summary = document.getElementById("fileSummary");
    const fileName = document.getElementById("fileName");
    const fileSize = document.getElementById("fileSize");
    const analyze = document.getElementById("analyzeBtn");
    const status = document.getElementById("uploadStatus");
    const progress = document.getElementById("progressFill");
    if (!input || !drop || !analyze) return;

    let selected = null;
    let busy = false;

    function choose(file) {
      if (!file) return;
      if (!file.name.toLowerCase().endsWith(".vrf")) {
        selected = null;
        summary.classList.remove("visible");
        status.className = "status-box error";
        status.textContent = "Choose a VALORANT .vrf replay.";
        return;
      }
      if (file.size > 500 * 1024 * 1024) {
        selected = null;
        summary.classList.remove("visible");
        status.className = "status-box error";
        status.textContent = "This replay exceeds the 500 MB upload limit.";
        return;
      }
      selected = file;
      summary.classList.add("visible");
      fileName.textContent = file.name;
      fileSize.textContent = formatBytes(file.size);
      status.className = "status-box";
      status.textContent = "Ready to upload. Backend processing starts after the upload completes.";
      progress.style.width = "0%";
      setStage("stageUpload", "");
      setStage("stageProcess", "");
      setStage("stageReport", "");
    }

    input.addEventListener("change", () => choose(input.files[0]));
    ["dragenter","dragover"].forEach(name => drop.addEventListener(name, e => {
      e.preventDefault(); drop.classList.add("drag");
    }));
    ["dragleave","drop"].forEach(name => drop.addEventListener(name, e => {
      e.preventDefault(); drop.classList.remove("drag");
    }));
    drop.addEventListener("drop", e => {
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      choose(file);
    });

    analyze.addEventListener("click", async () => {
      if (!selected || busy) return;
      if (!API_BASE) {
        status.className = "status-box error";
        status.textContent = "Replay API is not configured.";
        return;
      }
      busy = true;
      analyze.disabled = true;
      setStage("stageUpload", "active");
      status.className = "status-box";
      status.textContent = "Uploading replay…";
      try {
        const created = await uploadRequest(selected, pct => {
          progress.style.width = pct + "%";
          status.textContent = "Uploading replay… " + pct + "%";
        });
        progress.style.width = "100%";
        setStage("stageUpload", "done");
        setStage("stageProcess", "active");
        status.textContent = "Upload complete. Deterministic replay processing is running…";

        const finished = await pollJob(created.status_url, state => {
          if (state.status === "processing") {
            setStage("stageProcess", "active");
            status.textContent = "Processing replay… " + (state.stage || "deterministic analysis");
          } else if (state.status === "queued") {
            status.textContent = "Replay queued for processing…";
          }
        });

        if (finished.status === "failed") {
          setStage("stageProcess", "failed");
          status.className = "status-box error";
          status.textContent = finished.error || "Replay analysis failed.";
          return;
        }

        setStage("stageProcess", "done");
        setStage("stageReport", "done");
        status.className = "status-box success";
        status.innerHTML = 'Report ready. <a class="btn" style="margin-left:8px" target="_blank" rel="noopener" href="' +
          finished.report_url + '">Open report</a>';
        checkBackend();
      } catch (err) {
        setStage("stageUpload", "failed");
        setStage("stageProcess", "failed");
        status.className = "status-box error";
        status.textContent = String(err && err.message ? err.message : err);
      } finally {
        busy = false;
        analyze.disabled = false;
      }
    });
  }

  function render() {
    navRender();
    const r = route();
    const page = ({dashboard,match,dna,upload,pricing,economics}[r] || dashboard)();
    appEl.innerHTML = page + footer();
    if (r === "upload") bindUpload();
    appEl.focus({preventScroll:true});
  }

  addEventListener("hashchange", render);
  render();
  checkBackend();
  setInterval(checkBackend, 60000);
})();
