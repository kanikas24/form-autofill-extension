export function showUserPopup(user, onPrefill, onClose) {
  const existing = document.getElementById("email-detector-popup")
  if (existing) existing.remove()

    const container = document.createElement("div");
    container.id = "email-detector-popup";
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #fff;
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 12px;
      z-index: 999999;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
      font-family: Arial, sans-serif;
      font-size: 14px;
      width: 260px;
      transform: translateX(80px);
      opacity: 0;
      transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    `;
    
    setTimeout(() => {
      container.style.transform = "translateX(0)";
      container.style.opacity = "1";
    }, 100);
    

  container.innerHTML = `
    <strong style="color:#2d3748;font-weight:600;display:block;margin-bottom:4px;">
      User Found
    </strong>
    <div style="color:#4a5568;">Name: ${user.firstName} ${user.lastName}</div>
    <div style="color:#4a5568;">Email: ${user.email}</div>
    <div style="color:#4a5568;">Mobile: ${user.mobile}</div>
    <div style="margin-top:12px;display:flex;gap:8px;">
      <button id="prefill-btn"
        style="flex:1;padding:6px 12px;background:#22c55e;color:#fff;font-size:12px;border:none;border-radius:6px;cursor:pointer;transition:background 0.2s;">
        Prefill Data
      </button>
      <button id="close-popup"
        style="flex:1;padding:6px 12px;background:#3b82f6;color:#fff;font-size:12px;border:none;border-radius:6px;cursor:pointer;transition:background 0.2s;">
        Close
      </button>
    </div>
  `

  document.body.appendChild(container)

 const closePopup = () => {
    container.style.transform = "translateX(80px)"
    container.style.opacity = "0"
    setTimeout(() => {
      container.remove()
      if (onClose) onClose()
    }, 800)
  }

  container.querySelector("#close-popup").addEventListener("click", closePopup)
  container.querySelector("#prefill-btn").addEventListener("click", () => {
    if (onPrefill) onPrefill()
    closePopup()
  })
}
