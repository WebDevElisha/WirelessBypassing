// Global variables
let tabs = []
let activeTabId = null
let tabCounter = 1
let isPlaying = false

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded - showing password screen")
  initializePasswordScreen()
})

// Password Screen Functions
function initializePasswordScreen() {
  const passwordScreen = document.getElementById("passwordScreen")
  const mainApp = document.getElementById("mainApp")

  // Make sure password screen is visible
  passwordScreen.style.display = "flex"
  mainApp.style.display = "none"

  // Focus on password input
  setTimeout(() => {
    document.getElementById("passwordInput").focus()
  }, 100)

  // Add enter key listener
  document.getElementById("passwordInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      checkPassword()
    }
  })

  console.log("Password screen initialized")
}

function checkPassword() {
  const passwordInput = document.getElementById("passwordInput")
  const errorDiv = document.getElementById("passwordError")
  const password = passwordInput.value.toLowerCase().trim()

  console.log("Checking password:", password)

  if (password === "welovepeople") {
    console.log("Password correct - showing main app")
    localStorage.setItem("wirelessbypassing_auth", "true")
    showMainApp()
    errorDiv.textContent = ""
  } else {
    console.log("Password incorrect")
    errorDiv.textContent = "❌ Invalid access code. Please try again."
    passwordInput.value = ""
    passwordInput.focus()

    // Add shake animation
    passwordInput.style.animation = "shake 0.5s"
    setTimeout(() => {
      passwordInput.style.animation = ""
    }, 500)
  }
}

function showMainApp() {
  const passwordScreen = document.getElementById("passwordScreen")
  const mainApp = document.getElementById("mainApp")

  passwordScreen.style.display = "none"
  mainApp.style.display = "flex"
  mainApp.classList.add("show")

  console.log("Main app shown")
  initializeApp()
}

function logout() {
  console.log("Logging out")
  localStorage.removeItem("wirelessbypassing_auth")
  tabs = []
  activeTabId = null
  tabCounter = 1

  const passwordScreen = document.getElementById("passwordScreen")
  const mainApp = document.getElementById("mainApp")

  passwordScreen.style.display = "flex"
  mainApp.style.display = "none"
  mainApp.classList.remove("show")

  document.getElementById("passwordInput").focus()
  document.getElementById("passwordInput").value = ""
  document.getElementById("passwordError").textContent = ""
}

// Initialize the main application
function initializeApp() {
  console.log("Initializing main app")

  // Create initial tab
  if (tabs.length === 0) {
    addNewTab()
  }

  // Set up event listeners
  document.getElementById("urlInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      navigateToUrl()
    }
  })

  document.getElementById("welcomeSearch").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchFromWelcome()
    }
  })

  // Music search event listeners
  document.getElementById("youtubeSearch").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchYouTube()
    }
  })

  document.getElementById("spotifySearch").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchSpotify()
    }
  })

  console.log("Main app initialized")
}

// Left Sidebar Functions
function toggleLeftSidebar() {
  const sidebar = document.getElementById("leftSidebar")
  sidebar.classList.toggle("expanded")
  console.log("Sidebar toggled")
}

function openGames() {
  showNotification("🎮 Games section coming soon! Will include embedded games and game sites.", "info")
}

function openMovies() {
  showNotification("🎬 Movies section coming soon! Will include streaming capabilities.", "info")
}

function openTools() {
  showNotification("🔧 Tools section coming soon! Will include proxy utilities and more.", "info")
}

// Music Sidebar Functions
function toggleMusicSidebar() {
  const musicSidebar = document.getElementById("musicSidebar")
  musicSidebar.classList.toggle("open")
  console.log("Music sidebar toggled")
}

function closeMusicSidebar() {
  const musicSidebar = document.getElementById("musicSidebar")
  musicSidebar.classList.remove("open")
}

function switchMusicTab(platform) {
  // Update tab buttons
  document.querySelectorAll(".music-tab").forEach((tab) => {
    tab.classList.remove("active")
  })
  event.target.classList.add("active")

  // Update panels
  document.querySelectorAll(".music-panel").forEach((panel) => {
    panel.classList.remove("active")
  })
  document.getElementById(platform + "Music").classList.add("active")
}

// YouTube Music Functions
function searchYouTube() {
  const query = document.getElementById("youtubeSearch").value.trim()
  if (!query) return

  const resultsDiv = document.getElementById("youtubeResults")
  resultsDiv.innerHTML = '<div class="placeholder-text">🔍 Searching YouTube...</div>'

  // Simulate YouTube search results
  setTimeout(() => {
    const mockResults = [
      {
        title: `${query} - Official Music Video`,
        artist: "Artist Name",
        thumbnail: "https://via.placeholder.com/60x60/ff0000/ffffff?text=YT",
        videoId: "dQw4w9WgXcQ",
      },
      {
        title: `${query} (Lyrics)`,
        artist: "Various Artists",
        thumbnail: "https://via.placeholder.com/60x60/ff0000/ffffff?text=YT",
        videoId: "dQw4w9WgXcQ",
      },
      {
        title: `Best of ${query}`,
        artist: "Compilation",
        thumbnail: "https://via.placeholder.com/60x60/ff0000/ffffff?text=YT",
        videoId: "dQw4w9WgXcQ",
      },
    ]

    resultsDiv.innerHTML = mockResults
      .map(
        (result) => `
      <div class="music-item" onclick="playYouTubeTrack('${result.videoId}', '${result.title}', '${result.artist}')">
        <img src="${result.thumbnail}" alt="${result.title}">
        <div class="music-info">
          <div class="music-title">${result.title}</div>
          <div class="music-artist">${result.artist}</div>
        </div>
      </div>
    `,
      )
      .join("")
  }, 1000)
}

function playYouTubeTrack(videoId, title, artist) {
  document.getElementById("trackTitle").textContent = title
  document.getElementById("trackArtist").textContent = artist
  showNotification(`🎵 Now Playing: ${title}`, "success")
}

// Spotify Functions
function searchSpotify() {
  const query = document.getElementById("spotifySearch").value.trim()
  if (!query) return

  const resultsDiv = document.getElementById("spotifyResults")
  resultsDiv.innerHTML = '<div class="placeholder-text">🔍 Searching Spotify...</div>'

  // Simulate Spotify search results
  setTimeout(() => {
    const mockResults = [
      {
        title: `${query}`,
        artist: "Popular Artist",
        thumbnail: "https://via.placeholder.com/60x60/1db954/ffffff?text=SP",
        trackId: "spotify123",
      },
      {
        title: `${query} (Remix)`,
        artist: "DJ Remix",
        thumbnail: "https://via.placeholder.com/60x60/1db954/ffffff?text=SP",
        trackId: "spotify456",
      },
      {
        title: `${query} - Acoustic`,
        artist: "Acoustic Version",
        thumbnail: "https://via.placeholder.com/60x60/1db954/ffffff?text=SP",
        trackId: "spotify789",
      },
    ]

    resultsDiv.innerHTML = mockResults
      .map(
        (result) => `
      <div class="music-item" onclick="playSpotifyTrack('${result.trackId}', '${result.title}', '${result.artist}')">
        <img src="${result.thumbnail}" alt="${result.title}">
        <div class="music-info">
          <div class="music-title">${result.title}</div>
          <div class="music-artist">${result.artist}</div>
        </div>
      </div>
    `,
      )
      .join("")
  }, 1000)
}

function playSpotifyTrack(trackId, title, artist) {
  document.getElementById("trackTitle").textContent = title
  document.getElementById("trackArtist").textContent = artist
  showNotification(`🎵 Now Playing: ${title}`, "success")
}

// Music Player Controls
function togglePlay() {
  const playBtn = document.getElementById("playBtn")
  const icon = playBtn.querySelector("i")

  if (isPlaying) {
    icon.className = "fas fa-play"
    isPlaying = false
    showNotification("⏸️ Music Paused", "info")
  } else {
    icon.className = "fas fa-pause"
    isPlaying = true
    showNotification("▶️ Music Playing", "info")
  }
}

function previousTrack() {
  showNotification("⏮️ Previous Track", "info")
}

function nextTrack() {
  showNotification("⏭️ Next Track", "info")
}

// Tab management functions
function addNewTab() {
  const tabId = "tab_" + tabCounter++
  const newTab = {
    id: tabId,
    title: "New Tab",
    url: "",
    isActive: true,
  }

  // Deactivate all other tabs
  tabs.forEach((tab) => (tab.isActive = false))

  // Add new tab
  tabs.push(newTab)
  activeTabId = tabId

  renderTabs()
  showWelcomeScreen()
  updateAddressBar("")
  console.log("New tab added:", tabId)
}

function removeTab(tabId) {
  if (tabs.length === 1) return // Don't remove the last tab

  const tabIndex = tabs.findIndex((tab) => tab.id === tabId)
  if (tabIndex === -1) return

  const wasActive = tabs[tabIndex].isActive
  tabs.splice(tabIndex, 1)

  if (wasActive && tabs.length > 0) {
    // Activate the previous tab or the first tab
    const newActiveIndex = Math.max(0, tabIndex - 1)
    tabs[newActiveIndex].isActive = true
    activeTabId = tabs[newActiveIndex].id
    switchToTab(activeTabId)
  }

  renderTabs()
  console.log("Tab removed:", tabId)
}

function switchTab(tabId) {
  // Deactivate all tabs
  tabs.forEach((tab) => (tab.isActive = false))

  // Activate selected tab
  const selectedTab = tabs.find((tab) => tab.id === tabId)
  if (selectedTab) {
    selectedTab.isActive = true
    activeTabId = tabId

    if (selectedTab.url) {
      loadUrlInContent(selectedTab.url)
      updateAddressBar(selectedTab.url)
    } else {
      showWelcomeScreen()
      updateAddressBar("")
    }
  }

  renderTabs()
  console.log("Switched to tab:", tabId)
}

function switchToTab(tabId) {
  switchTab(tabId)
}

function renderTabs() {
  const tabsContainer = document.getElementById("tabsContainer")
  tabsContainer.innerHTML = ""

  tabs.forEach((tab) => {
    const tabElement = document.createElement("div")
    tabElement.className = `tab ${tab.isActive ? "active" : ""}`
    tabElement.innerHTML = `
            <i class="fas fa-globe tab-icon"></i>
            <span class="tab-title">${tab.title}</span>
            ${tabs.length > 1 ? `<i class="fas fa-times tab-close" onclick="removeTab('${tab.id}')"></i>` : ""}
        `

    tabElement.addEventListener("click", (e) => {
      if (!e.target.classList.contains("tab-close")) {
        switchTab(tab.id)
      }
    })

    tabsContainer.appendChild(tabElement)
  })
}

// Navigation functions
function navigateToUrl() {
  const urlInput = document.getElementById("urlInput")
  const url = urlInput.value.trim()

  if (!url) return

  loadUrl(url)
  console.log("Navigating to:", url)
}

function searchFromWelcome() {
  const welcomeSearch = document.getElementById("welcomeSearch")
  const url = welcomeSearch.value.trim()

  if (!url) return

  // Independent search - don't sync with address bar
  loadUrl(url)
  console.log("Searching from welcome:", url)
}

function loadUrl(inputUrl) {
  let url = inputUrl

  // Determine if it's a URL or search query
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    if (url.includes(".") && !url.includes(" ")) {
      // Looks like a domain
      url = "https://" + url
    } else {
      // Search query - use DuckDuckGo
      url = `https://duckduckgo.com/?q=${encodeURIComponent(url)}`
    }
  }

  // Update active tab
  const activeTab = tabs.find((tab) => tab.isActive)
  if (activeTab) {
    activeTab.url = url
    activeTab.title = getDomainFromUrl(url) || "Loading..."
  }

  loadUrlInContent(url)
  updateAddressBar(url)
  renderTabs()
  updateStatusBar(url)
}

function loadUrlInContent(url) {
  const welcomeScreen = document.getElementById("welcomeScreen")
  const proxyContent = document.getElementById("proxyContent")

  welcomeScreen.style.display = "none"
  proxyContent.style.display = "block"
  proxyContent.classList.add("show")

  // Create a simple proxy by fetching content and displaying it
  // Note: This is a basic implementation - real proxy would need server-side handling
  proxyContent.innerHTML = `
    <div style="padding: 20px; background: #f0f0f0; color: #333; font-family: Arial;">
      <h2 style="color: #00ffff;">🌐 Loading: ${url}</h2>
      <p>Attempting to load content...</p>
      <iframe src="${url}" style="width: 100%; height: calc(100vh - 200px); border: none; background: white;" 
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
              onload="handleIframeLoad()" 
              onerror="handleIframeError()">
      </iframe>
    </div>
  `

  // Update tab title after a delay
  setTimeout(() => {
    const activeTab = tabs.find((tab) => tab.isActive)
    if (activeTab) {
      activeTab.title = getDomainFromUrl(url) || "Loaded"
      renderTabs()
    }
    showNotification("✅ Content loaded", "success")
  }, 2000)

  console.log("Loading URL in content:", url)
}

function handleIframeLoad() {
  console.log("Iframe loaded successfully")
  showNotification("✅ Page loaded successfully", "success")
}

function handleIframeError() {
  console.log("Iframe failed to load")
  showNotification("❌ Some content may be blocked by the site's security policy", "error")
}

function showWelcomeScreen() {
  const welcomeScreen = document.getElementById("welcomeScreen")
  const proxyContent = document.getElementById("proxyContent")

  welcomeScreen.style.display = "flex"
  proxyContent.style.display = "none"
  proxyContent.classList.remove("show")
  proxyContent.innerHTML = ""
}

function updateAddressBar(url) {
  document.getElementById("urlInput").value = url
}

function updateStatusBar(url) {
  const currentSite = document.getElementById("currentSite")

  if (url) {
    const domain = getDomainFromUrl(url)
    currentSite.textContent = `Loading: ${domain}`
  } else {
    currentSite.textContent = ""
  }
}

function getDomainFromUrl(url) {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace("www.", "")
  } catch (e) {
    return url
  }
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  const colors = {
    success: "rgba(0, 255, 136, 0.9)",
    error: "rgba(255, 68, 68, 0.9)",
    info: "rgba(0, 255, 255, 0.9)",
  }

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type]};
    color: #000;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 350px;
    font-weight: bold;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 4000)

  console.log("Notification:", message)
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
`
document.head.appendChild(style)

// Global error handler
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error)
})

console.log("Script loaded successfully")
