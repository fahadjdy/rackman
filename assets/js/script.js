// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(20px)"
  } else {
    navbar.style.background = "linear-gradient(135deg, var(--tertiary-color), var(--white))"
    navbar.style.backdropFilter = "blur(10px)"
  }
})

// Product Data
const products = [
  {
    id: 1,
    name: "Heavy Duty Industrial Rack",
    description: "High-capacity storage solution for industrial applications",
    price: "₹25,000",
    image: "assets/img/product.png",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Warehouse Pallet Rack",
    description: "Efficient pallet storage system for warehouses",
    price: "₹18,500",
    image: "assets/img/product.png",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Cantilever Storage Rack",
    description: "Perfect for long and bulky item storage",
    price: "₹22,000",
    image: "assets/img/product.png",
    badge: "New",
  },
  {
    id: 4,
    name: "Mobile Storage System",
    description: "Space-saving mobile rack solution",
    price: "₹35,000",
    image: "assets/img/product.png",
    badge: "Premium",
  },
  {
    id: 5,
    name: "Display Rack Unit",
    description: "Attractive display solution for retail spaces",
    price: "₹12,500",
    image: "assets/img/product.png",
    badge: "Affordable",
  },
  {
    id: 6,
    name: "Mezzanine Floor System",
    description: "Double your storage space with mezzanine floors",
    price: "₹45,000",
    image: "assets/img/product.png",
    badge: "Custom",
  },
  {
    id: 7,
    name: "Drive-In Rack System",
    description: "High-density storage for similar products",
    price: "₹28,000",
    image: "assets/img/product.png",
    badge: "Efficient",
  },
  {
    id: 8,
    name: "Push Back Rack",
    description: "LIFO storage system for inventory management",
    price: "₹32,000",
    image: "assets/img/product.png",
    badge: "Smart",
  },
  {
    id: 9,
    name: "Flow Rack System",
    description: "Gravity-fed storage for FIFO inventory",
    price: "₹38,000",
    image: "assets/img/product.png",
    badge: "Advanced",
  },
  {
    id: 10,
    name: "Multi-Tier Rack",
    description: "Maximize vertical space utilization",
    price: "₹26,500",
    image: "assets/img/product.png",
    badge: "Versatile",
  },
  {
    id: 11,
    name: "Automated Storage Rack",
    description: "Fully automated storage and retrieval system",
    price: "₹85,000",
    image: "assets/img/product.png",
    badge: "High-Tech",
  },
  {
    id: 12,
    name: "Selective Pallet Rack",
    description: "Most common and versatile pallet rack system",
    price: "₹20,000",
    image: "assets/img/product.png",
    badge: "Standard",
  },
]

// Pagination Variables
let currentPage = 1
const productsPerPage = 12
const totalPages = Math.ceil(products.length / productsPerPage)

// Load Products
function loadProducts() {
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  const productsGrid = document.getElementById("productsGrid")
  productsGrid.innerHTML = ""

  currentProducts.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-badge">${product.badge}</div>
      </div>
      <div class="product-content">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-actions">
          <button class="product-btn whatsapp-btn" onclick="shareOnWhatsApp('${product.name}')">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
          </button>
          <button class="product-btn call-btn" onclick="callForProduct('${product.name}')">
            <i class="fas fa-phone"></i>
            <span>Call</span>
          </button>
        </div>
      </div>
    `
    productsGrid.appendChild(productCard)
  })

  updatePagination()
}

// Update Pagination
function updatePagination() {
  const paginationNumbers = document.getElementById("paginationNumbers")
  paginationNumbers.innerHTML = ""

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button")
    pageButton.className = `page-number ${i === currentPage ? "active" : ""}`
    pageButton.textContent = i
    pageButton.onclick = () => goToPage(i)
    paginationNumbers.appendChild(pageButton)
  }

  // Update prev/next buttons
  document.getElementById("prevPage").disabled = currentPage === 1
  document.getElementById("nextPage").disabled = currentPage === totalPages
}

// Change Page
function changePage(direction) {
  const newPage = currentPage + direction
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage
    loadProducts()
  }
}

// Go to Specific Page
function goToPage(page) {
  currentPage = page
  loadProducts()
}

// WhatsApp Share
function shareOnWhatsApp(productName) {
  const message = `Hi! I'm interested in the ${productName} from RackPro Industries. Can you provide more details?`
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// Call for Product
function callForProduct(productName) {
  alert(`Calling for ${productName}... \nPhone: +91 98765 43210`)
  // In a real implementation, this would initiate a phone call
}

// Download Brochure (CTA Section)
document.querySelector(".download-btn").addEventListener("click", () => {
  downloadBrochure()
})

function downloadBrochure() {
  // Simulate download - replace with actual file URL
  const link = document.createElement("a")
  link.href = "#" // Replace with actual brochure URL
  link.download = "RackPro-Industries-Brochure.pdf"
  link.click()

  // Show feedback
  const btn = document.querySelector(".download-btn")
  const originalText = btn.innerHTML
  btn.innerHTML = '<i class="fas fa-check"></i> <span>Downloaded!</span>'
  setTimeout(() => {
    btn.innerHTML = originalText
  }, 2000)
}

// Smooth scrolling enhancement for footer links
document.querySelectorAll('.footer-links a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Contact Form Submission
document.querySelector(".contact-form").addEventListener("submit", submitForm)

function submitForm(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    message: formData.get("message"),
  }

  // Simulate form submission
  const submitBtn = document.querySelector(".submit-btn")
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>'
  submitBtn.disabled = true

  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>'

    setTimeout(() => {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      event.target.reset()
    }, 2000)
  }, 1500)

  console.log("Form submitted:", data)
}

// Newsletter Subscription
document.querySelector(".newsletter-form").addEventListener("submit", subscribeNewsletter)

function subscribeNewsletter(event) {
  event.preventDefault()

  const email = event.target.querySelector('input[type="email"]').value
  const button = event.target.querySelector("button")
  const originalHTML = button.innerHTML

  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-check"></i>'

    setTimeout(() => {
      button.innerHTML = originalHTML
      button.disabled = false
      event.target.reset()

      // Show success message
      alert("Thank you for subscribing to our newsletter!")
    }, 1500)
  }, 1000)

  console.log("Newsletter subscription:", email)
}

// Initialize products on page load
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
})

// Category Slider Functionality
let currentSlide = 0
const itemsPerSlide = 4
const totalItems = document.querySelectorAll(".category-item").length
const maxSlides = Math.ceil(totalItems / itemsPerSlide) - 1

function slideCategories(direction) {
  const slider = document.querySelector(".slider-container")
  const itemWidth = 220 // 200px width + 20px gap

  if (direction === "next" && currentSlide < maxSlides) {
    currentSlide++
  } else if (direction === "prev" && currentSlide > 0) {
    currentSlide--
  }

  const translateX = -currentSlide * itemWidth * itemsPerSlide
  slider.style.transform = `translateX(${translateX}px)`
}

// Auto-slide functionality
setInterval(() => {
  if (currentSlide >= maxSlides) {
    currentSlide = 0
  } else {
    currentSlide++
  }
  const slider = document.querySelector(".slider-container")
  const itemWidth = 220
  const translateX = -currentSlide * itemWidth * itemsPerSlide
  slider.style.transform = `translateX(${translateX}px)`
}, 4000)

// Responsive slider adjustment
function adjustSlider() {
  const screenWidth = window.innerWidth
  let newItemsPerSlide = 4

  if (screenWidth <= 480) {
    newItemsPerSlide = 2
  } else if (screenWidth <= 768) {
    newItemsPerSlide = 3
  }

  // Reset slider position when screen size changes
  currentSlide = 0
  const slider = document.querySelector(".slider-container")
  slider.style.transform = "translateX(0px)"
}

window.addEventListener("resize", adjustSlider)
adjustSlider() // Call on initial load
