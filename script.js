// Password validation and form handling
function checkPassword(event) {
  event.preventDefault();
  
  const correctPassword = "0001";
  const passwordInput = document.getElementById("password");
  const submitBtn = document.querySelector(".submit-btn");
  const loginCard = document.querySelector(".login-card");
  
  const userInput = passwordInput.value.trim();
  
  // Add loading state
  submitBtn.classList.add("loading");
  submitBtn.querySelector("span").textContent = "Verifying...";
  submitBtn.querySelector(".btn-icon").textContent = "⟳";
  
  // Simulate loading delay for better UX
  setTimeout(() => {
    if (userInput === correctPassword) {
      // Success animation
      loginCard.classList.add("success");
      submitBtn.classList.remove("loading");
      submitBtn.querySelector("span").textContent = "Access Granted!";
      submitBtn.querySelector(".btn-icon").textContent = "✓";
      submitBtn.style.background = "linear-gradient(135deg, #48bb78 0%, #38a169 100%)";
      
      // Show success message
      showNotification("Welcome! Redirecting to your portal...", "success");
      
      // Redirect after success animation
      setTimeout(() => {
        window.location.href = "https://edu-vibe-nt.vercel.app/subjects/9";
      }, 1500);
      
    } else {
      // Error animation
      loginCard.classList.add("shake");
      passwordInput.style.borderColor = "#e53e3e";
      passwordInput.style.background = "#fed7d7";
      
      submitBtn.classList.remove("loading");
      submitBtn.querySelector("span").textContent = "Access Portal";
      submitBtn.querySelector(".btn-icon").textContent = "→";
      
      // Show error message
      showNotification("Galat password! Please try again.", "error");
      
      // Reset form state after animation
      setTimeout(() => {
        loginCard.classList.remove("shake");
        passwordInput.style.borderColor = "#e2e8f0";
        passwordInput.style.background = "#f7fafc";
        passwordInput.value = "";
        passwordInput.focus();
      }, 500);
    }
  }, 1000);
}

// Notification system
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "500",
    fontSize: "0.9rem",
    zIndex: "1000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    wordWrap: "break-word"
  });
  
  // Set background color based on type
  if (type === "success") {
    notification.style.background = "linear-gradient(135deg, #48bb78, #38a169)";
  } else {
    notification.style.background = "linear-gradient(135deg, #e53e3e, #c53030)";
  }
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Enhanced input interactions
document.addEventListener("DOMContentLoaded", function() {
  const passwordInput = document.getElementById("password");
  
  // Focus input on page load
  passwordInput.focus();
  
  // Add enter key support
  passwordInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      checkPassword(event);
    }
  });
  
  // Input validation feedback
  passwordInput.addEventListener("input", function() {
    const value = this.value;
    const inputIcon = document.querySelector(".input-icon");
    
    if (value.length > 0) {
      inputIcon.textContent = value.length >= 4 ? "✓" : "🔐";
      inputIcon.style.color = value.length >= 4 ? "#48bb78" : "#a0aec0";
    } else {
      inputIcon.textContent = "🔐";
      inputIcon.style.color = "#a0aec0";
    }
  });
  
  // Reset input styles on focus
  passwordInput.addEventListener("focus", function() {
    this.style.borderColor = "#667eea";
    this.style.background = "white";
  });
});

// Add some interactive elements
function addInteractiveElements() {
  // Add floating particles
  createFloatingParticles();
  
  // Add click ripple effect to button
  addRippleEffect();
}

function createFloatingParticles() {
  const particleCount = 15;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    
    Object.assign(particle.style, {
      position: "fixed",
      width: Math.random() * 4 + 2 + "px",
      height: Math.random() * 4 + 2 + "px",
      background: "rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      pointerEvents: "none",
      zIndex: "-1",
      animation: `floatParticle ${Math.random() * 10 + 10}s linear infinite`
    });
    
    document.body.appendChild(particle);
  }
  
  // Add CSS animation for particles
  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function addRippleEffect() {
  const button = document.querySelector(".submit-btn");
  
  button.addEventListener("click", function(e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    Object.assign(ripple.style, {
      position: "absolute",
      width: size + "px",
      height: size + "px",
      left: x + "px",
      top: y + "px",
      background: "rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      transform: "scale(0)",
      animation: "ripple 0.6s linear",
      pointerEvents: "none"
    });
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
  
  // Add ripple animation CSS
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize interactive elements when DOM is loaded
document.addEventListener("DOMContentLoaded", addInteractiveElements);

// Add keyboard shortcuts
document.addEventListener("keydown", function(event) {
  // Alt + R to reset form
  if (event.altKey && event.key === "r") {
    event.preventDefault();
    document.getElementById("password").value = "";
    document.getElementById("password").focus();
    showNotification("Form reset!", "success");
  }
  
  // Escape to clear input
  if (event.key === "Escape") {
    document.getElementById("password").value = "";
    document.getElementById("password").blur();
  }
});