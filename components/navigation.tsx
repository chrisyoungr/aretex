"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (in real app, check localStorage/cookies)
    const authStatus = typeof window !== "undefined" ? localStorage.getItem("isAuthenticated") : null
    setIsAuthenticated(authStatus === "true")
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated")
    }
    router.push("/login")
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "true")
    }
  }

  // Make login function available globally for login page
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).handleLogin = handleLogin
    }
  }, [])

  if (!isAuthenticated && pathname !== "/login") {
    return null
  }

  if (pathname === "/login") {
    return null
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm">
      <div className="container-fluid px-3 px-md-4">
        <Link href="/dashboard" className="navbar-brand d-flex align-items-center">
          <div className="bg-primary rounded-2 p-2 me-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h18v18H3zM9 9h6v6H9z" />
            </svg>
          </div>
          <span className="fw-bold d-none d-sm-inline">InventoryPro</span>
          <span className="fw-bold d-sm-none">IP</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-expanded={!isCollapsed}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                href="/dashboard"
                className={`nav-link d-flex align-items-center ${pathname === "/dashboard" ? "active" : ""}`}
                onClick={() => setIsCollapsed(true)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="me-2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/stock-count"
                className={`nav-link d-flex align-items-center ${pathname === "/stock-count" ? "active" : ""}`}
                onClick={() => setIsCollapsed(true)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="me-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="d-lg-inline">Stock Count</span>
                <span className="d-none d-md-inline d-lg-none">Count</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/orders"
                className={`nav-link d-flex align-items-center ${pathname === "/orders" ? "active" : ""}`}
                onClick={() => setIsCollapsed(true)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="me-2"
                >
                  <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6 0V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
                </svg>
                Orders
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center flex-column flex-lg-row gap-2">
            <span className="text-muted d-none d-md-inline">Welcome, Admin</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="me-1"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
