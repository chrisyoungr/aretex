"use client"

import { useState, useEffect } from "react"
import Navigation from "../../components/navigation"

interface StockItem {
  id: string
  sku: string
  name: string
  category: string
  currentStock: number
  countedStock: number | null
  location: string
  lastCounted: string | null
  status: "pending" | "counted" | "discrepancy"
}

export default function StockCountPage() {
  const [items, setItems] = useState<StockItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null)
  const [countValue, setCountValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setItems([
        {
          id: "1",
          sku: "WH-001",
          name: "Wireless Headphones",
          category: "Electronics",
          currentStock: 45,
          countedStock: null,
          location: "A1-B2",
          lastCounted: null,
          status: "pending",
        },
        {
          id: "2",
          sku: "KB-002",
          name: "Mechanical Keyboard",
          category: "Electronics",
          currentStock: 23,
          countedStock: 25,
          location: "A2-C1",
          lastCounted: "2024-01-15",
          status: "discrepancy",
        },
        {
          id: "3",
          sku: "MG-003",
          name: "Gaming Mouse",
          category: "Electronics",
          currentStock: 67,
          countedStock: 67,
          location: "A1-D3",
          lastCounted: "2024-01-14",
          status: "counted",
        },
        {
          id: "4",
          sku: "TB-004",
          name: "Office Table",
          category: "Furniture",
          currentStock: 12,
          countedStock: null,
          location: "B1-A1",
          lastCounted: null,
          status: "pending",
        },
        {
          id: "5",
          sku: "CH-005",
          name: "Office Chair",
          category: "Furniture",
          currentStock: 8,
          countedStock: null,
          location: "B1-A2",
          lastCounted: null,
          status: "pending",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))]

  const handleCountSubmit = (item: StockItem) => {
    const counted = Number.parseInt(countValue)
    if (isNaN(counted) || counted < 0) return

    const updatedItems = items.map((i) => {
      if (i.id === item.id) {
        const status = counted === i.currentStock ? "counted" : "discrepancy"
        return {
          ...i,
          countedStock: counted,
          lastCounted: new Date().toISOString().split("T")[0],
          status,
        }
      }
      return i
    })

    setItems(updatedItems)
    setSelectedItem(null)
    setCountValue("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "counted":
        return "badge bg-success"
      case "discrepancy":
        return "badge bg-warning text-dark"
      default:
        return "badge bg-secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "counted":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )
      case "discrepancy":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        )
    }
  }

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
                <h1 className="text-white mb-2">Stock Count</h1>
                <p className="text-muted mb-0">Perform per-item inventory counting</p>
              </div>
              <div className="d-flex gap-2">
                <span className={`${getStatusBadge("pending")} fs-6`}>
                  {items.filter((i) => i.status === "pending").length} Pending
                </span>
                <span className={`${getStatusBadge("counted")} fs-6`}>
                  {items.filter((i) => i.status === "counted").length} Counted
                </span>
                <span className={`${getStatusBadge("discrepancy")} fs-6`}>
                  {items.filter((i) => i.status === "discrepancy").length} Discrepancies
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-8">
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-secondary border-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
              <input
                type="text"
                className="form-control border-secondary"
                placeholder="Search by item name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select form-select-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Status</th>
                        <th scope="col">SKU</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Location</th>
                        <th scope="col">System Stock</th>
                        <th scope="col">Counted Stock</th>
                        <th scope="col">Variance</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <span className={`${getStatusBadge(item.status)} d-flex align-items-center gap-1`}>
                              {getStatusIcon(item.status)}
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <code className="text-primary">{item.sku}</code>
                          </td>
                          <td className="fw-medium">{item.name}</td>
                          <td>
                            <span className="badge bg-info text-dark">{item.category}</span>
                          </td>
                          <td>
                            <span className="text-muted">{item.location}</span>
                          </td>
                          <td>
                            <span className="fw-bold">{item.currentStock}</span>
                          </td>
                          <td>
                            {item.countedStock !== null ? (
                              <span className="fw-bold">{item.countedStock}</span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>
                            {item.countedStock !== null ? (
                              <span
                                className={`fw-bold ${
                                  item.countedStock === item.currentStock ? "text-success" : "text-warning"
                                }`}
                              >
                                {item.countedStock - item.currentStock > 0 ? "+" : ""}
                                {item.countedStock - item.currentStock}
                              </span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => setSelectedItem(item)}
                              data-bs-toggle="modal"
                              data-bs-target="#countModal"
                            >
                              {item.status === "pending" ? "Count" : "Recount"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Count Modal */}
      <div className="modal fade" id="countModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark border-secondary">
            <div className="modal-header border-secondary">
              <h5 className="modal-title text-white">Count Item: {selectedItem?.name}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedItem && (
                <div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <strong className="text-white">SKU:</strong>
                      <br />
                      <code className="text-primary">{selectedItem.sku}</code>
                    </div>
                    <div className="col-6">
                      <strong className="text-white">Location:</strong>
                      <br />
                      <span className="text-muted">{selectedItem.location}</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <strong className="text-white">System Stock:</strong>
                      <br />
                      <span className="fs-4 fw-bold text-info">{selectedItem.currentStock}</span>
                    </div>
                    <div className="col-6">
                      <strong className="text-white">Category:</strong>
                      <br />
                      <span className="badge bg-info text-dark">{selectedItem.category}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="countInput" className="form-label text-white">
                      <strong>Enter Counted Quantity:</strong>
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-lg text-center"
                      id="countInput"
                      value={countValue}
                      onChange={(e) => setCountValue(e.target.value)}
                      placeholder="0"
                      min="0"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => selectedItem && handleCountSubmit(selectedItem)}
                data-bs-dismiss="modal"
                disabled={!countValue || isNaN(Number.parseInt(countValue))}
              >
                Save Count
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
