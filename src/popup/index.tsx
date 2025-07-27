import React, { useState, useEffect } from "react"

function Popup() {
  const [acknowledged, setAcknowledged] = useState(false)

  useEffect(() => {
    chrome.storage.local.get(["acknowledged"], (res) => {
      if (res.acknowledged) setAcknowledged(true)
    })
  }, [])

  const handleAcknowledge = () => {
    setAcknowledged(true)
    chrome.storage.local.set({ acknowledged: true })
  }

  return (
    <div style={styles.container}>
      {!acknowledged ? (
        <>
          <img src={require("../../assets/icon512.png")} alt="Email Autofill" style={styles.logo} />
          <h2 style={styles.heading}>
            Welcome to <strong>Email Autofill Helper!</strong>
          </h2>
          <p style={styles.description}>
            Automatically detects <strong>email fields</strong> on websites.
            Once you enter an email, it fetches user details and lets you{" "}
            <strong>auto-fill the rest of the form</strong> instantly.
          </p>
          <button
            onClick={handleAcknowledge}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
            onMouseOut={(e) => (e.target.style.background = styles.button.background)}
          >
            Got it, Let’s Go!
          </button>
        </>
      ) : (
        <>
          <img src={require("../../assets/icon512.png")} alt="Active" style={styles.logoSmall} />
          <h3 style={styles.activeText}>Extension is Active ✅</h3>
          <p style={styles.activeDescription}>
            Enter an email in any form to auto-fill the rest of the details.
          </p>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    width: "320px",
    minHeight: "260px",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    padding: "16px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  },
  logo: {
    width: "70px",
    height: "70px",
    marginBottom: "10px",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
  },
  heading: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "8px",
    textAlign: "center"
  },
  description: {
    fontSize: "14px",
    color: "#444",
    textAlign: "center",
    lineHeight: "1.5",
    marginBottom: "12px"
  },
  button: {
    background: "linear-gradient(90deg, #4a90e2, #357ae8)",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
  },
  buttonHover: {
    background: "linear-gradient(90deg, #357ae8, #2b65c5)"
  },
  logoSmall: {
    width: "60px",
    height: "60px",
    marginBottom: "8px",
    borderRadius: "50%"
  },
  activeText: {
    fontSize: "16px",
    color: "#2d6cdf",
    marginBottom: "4px"
  },
  activeDescription: {
    fontSize: "13px",
    color: "#555",
    textAlign: "center",
    lineHeight: "1.4"
  }
}

export default Popup
