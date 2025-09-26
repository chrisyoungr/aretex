"use client"

import { useState, useEffect } from "react"
import Navigation from "../../components/navigation"
import MobileStats from "../../components/mobile-stats"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalItems: 0,
    pendingCounts: 0,
    discrepancies: 0,
    completedCounts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setStats({
        totalItems: 156,
        pendingCounts: 23,
        discrepancies: 3,
        completedCounts: 130,
        totalOrders: 45,
        pendingOrders: 12,
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-vh-100 bg-dark">
        <Navigation />
        <div className="container-fluid py-4">
          <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100 bg-dark">
      <Navigation />

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="text-white mb-2 fs-2 fs-md-1">Dashboard</h1>
                <p className="text-muted mb-0 d-none d-md-block">Overview of your inventory management system</p>
              </div>
              <div className="text-muted d-none d-lg-block">Last updated: {new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>

        <MobileStats stats={stats} />

        <div className="row g-4 mb-4 d-none d-md-flex">
          <div className="col-md-6 col-xl-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded-3 p-3 me-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3h18v18H3zM9 9h6v6H9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white mb-1">{stats.totalItems}</h3>
                    <p className="text-muted mb-0">Total Items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-warning rounded-3 p-3 me-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white mb-1">{stats.pendingCounts}</h3>
                    <p className="text-muted mb-0">Pending Counts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-danger rounded-3 p-3 me-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white mb-1">{stats.discrepancies}</h3>
                    <p className="text-muted mb-0">Discrepancies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="bg-success rounded-3 p-3 me-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white mb-1">{stats.completedCounts}</h3>
                    <p className="text-muted mb-0">Completed Counts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-header border-secondary">
                <h5 className="text-white mb-0">Recent Activity</h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  <div className="list-group-item bg-transparent border-secondary text-white">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1 fs-6">Stock count completed for Electronics</h6>
                      <small className="text-muted">2h ago</small>
                    </div>
                    <p className="mb-1 text-muted small">25 items counted with 2 discrepancies found</p>
                  </div>
                  <div className="list-group-item bg-transparent border-secondary text-white">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1 fs-6">New order received</h6>
                      <small className="text-muted">4h ago</small>
                    </div>
                    <p className="mb-1 text-muted small">Order #ORD-2024-001 for 15 items</p>
                  </div>
                  <div className="list-group-item bg-transparent border-secondary text-white">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1 fs-6">Inventory adjustment made</h6>
                      <small className="text-muted">1d ago</small>
                    </div>
                    <p className="mb-1 text-muted small">Adjusted stock levels for 3 items in Furniture category</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-header border-secondary">
                <h5 className="text-white mb-0">Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-3">
                  <a href="/stock-count" className="btn btn-primary btn-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="me-2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    Start Stock Count
                  </a>
                  <a href="/orders" className="btn btn-outline-primary btn-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="me-2"
                    >
                      <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6 0V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
                    </svg>
                    View Orders
                  </a>
                  <button className="btn btn-outline-secondary btn-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="me-2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
