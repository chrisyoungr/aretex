"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navigation from "../../components/navigation"

interface OrderItem {
  id: string
  sku: string
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  totalAmount: number
  items: OrderItem[]
  shippingAddress: string
  notes?: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // New order form state
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    customerEmail: "",
    shippingAddress: "",
    notes: "",
    items: [] as Omit<OrderItem, "id" | "totalPrice">[],
  })

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: "1",
          orderNumber: "ORD-2024-001",
          customerName: "John Smith",
          customerEmail: "john.smith@email.com",
          status: "pending",
          orderDate: "2024-01-15",
          totalAmount: 299.99,
          shippingAddress: "123 Main St, New York, NY 10001",
          items: [
            {
              id: "1",
              sku: "WH-001",
              name: "Wireless Headphones",
              quantity: 2,
              unitPrice: 149.99,
              totalPrice: 299.98,
            },
          ],
        },
        {
          id: "2",
          orderNumber: "ORD-2024-002",
          customerName: "Sarah Johnson",
          customerEmail: "sarah.j@email.com",
          status: "processing",
          orderDate: "2024-01-14",
          totalAmount: 189.97,
          shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
          items: [
            {
              id: "2",
              sku: "KB-002",
              name: "Mechanical Keyboard",
              quantity: 1,
              unitPrice: 89.99,
              totalPrice: 89.99,
            },
            {
              id: "3",
              sku: "MG-003",
              name: "Gaming Mouse",
              quantity: 1,
              unitPrice: 99.98,
              totalPrice: 99.98,
            },
          ],
        },
        {
          id: "3",
          orderNumber: "ORD-2024-003",
          customerName: "Mike Davis",
          customerEmail: "mike.davis@email.com",
          status: "shipped",
          orderDate: "2024-01-13",
          totalAmount: 1299.99,
          shippingAddress: "789 Pine St, Chicago, IL 60601",
          items: [
            {
              id: "4",
              sku: "TB-004",
              name: "Office Table",
              quantity: 1,
              unitPrice: 799.99,
              totalPrice: 799.99,
            },
            {
              id: "5",
              sku: "CH-005",
              name: "Office Chair",
              quantity: 1,
              unitPrice: 500.0,
              totalPrice: 500.0,
            },
          ],
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "badge bg-warning text-dark"
      case "processing":
        return "badge bg-info text-dark"
      case "shipped":
        return "badge bg-primary"
      case "delivered":
        return "badge bg-success"
      case "cancelled":
        return "badge bg-danger"
      default:
        return "badge bg-secondary"
    }
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus as any } : order)))
  }

  const handleNewOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newOrder.items.length === 0) {
      alert("Please add at least one item to the order")
      return
    }

    const orderItems: OrderItem[] = newOrder.items.map((item, index) => ({
      ...item,
      id: (index + 1).toString(),
      totalPrice: item.quantity * item.unitPrice,
    }))

    const totalAmount = orderItems.reduce((sum, item) => sum + item.totalPrice, 0)

    const order: Order = {
      id: (orders.length + 1).toString(),
      orderNumber: `ORD-2024-${String(orders.length + 1).padStart(3, "0")}`,
      customerName: newOrder.customerName,
      customerEmail: newOrder.customerEmail,
      status: "pending",
      orderDate: new Date().toISOString().split("T")[0],
      totalAmount,
      items: orderItems,
      shippingAddress: newOrder.shippingAddress,
      notes: newOrder.notes,
    }

    setOrders([order, ...orders])
    setNewOrder({
      customerName: "",
      customerEmail: "",
      shippingAddress: "",
      notes: "",
      items: [],
    })
    setShowNewOrderModal(false)
  }

  const addItemToNewOrder = () => {
    setNewOrder({
      ...newOrder,
      items: [
        ...newOrder.items,
        {
          sku: "",
          name: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    })
  }

  const updateOrderItem = (index: number, field: string, value: any) => {
    const updatedItems = newOrder.items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setNewOrder({ ...newOrder, items: updatedItems })
  }

  const removeOrderItem = (index: number) => {
    setNewOrder({
      ...newOrder,
      items: newOrder.items.filter((_, i) => i !== index),
    })
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
                <h1 className="text-white mb-2">Orders Management</h1>
                <p className="text-muted mb-0">View and manage customer orders</p>
              </div>
              <button className="btn btn-primary btn-lg" onClick={() => setShowNewOrderModal(true)}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="me-2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Order
              </button>
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
                placeholder="Search by order number, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select form-select-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
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
                        <th scope="col">Order #</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Total</th>
                        <th scope="col">Items</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <code className="text-primary">{order.orderNumber}</code>
                          </td>
                          <td>
                            <div>
                              <div className="fw-medium">{order.customerName}</div>
                              <small className="text-muted">{order.customerEmail}</small>
                            </div>
                          </td>
                          <td>
                            <span className="text-muted">{new Date(order.orderDate).toLocaleDateString()}</span>
                          </td>
                          <td>
                            <span className={getStatusBadge(order.status)}>{order.status}</span>
                          </td>
                          <td>
                            <span className="fw-bold text-success">${order.totalAmount.toFixed(2)}</span>
                          </td>
                          <td>
                            <span className="badge bg-info text-dark">{order.items.length} items</span>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setSelectedOrder(order)}
                                data-bs-toggle="modal"
                                data-bs-target="#orderDetailsModal"
                              >
                                View
                              </button>
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                >
                                  Status
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleStatusUpdate(order.id, "pending")}
                                    >
                                      Pending
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleStatusUpdate(order.id, "processing")}
                                    >
                                      Processing
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleStatusUpdate(order.id, "shipped")}
                                    >
                                      Shipped
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleStatusUpdate(order.id, "delivered")}
                                    >
                                      Delivered
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
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

      {/* Order Details Modal */}
      <div className="modal fade" id="orderDetailsModal" tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content bg-dark border-secondary">
            <div className="modal-header border-secondary">
              <h5 className="modal-title text-white">Order Details: {selectedOrder?.orderNumber}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedOrder && (
                <div>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6 className="text-white">Customer Information</h6>
                      <p className="mb-1">
                        <strong>Name:</strong> {selectedOrder.customerName}
                      </p>
                      <p className="mb-1">
                        <strong>Email:</strong> {selectedOrder.customerEmail}
                      </p>
                      <p className="mb-1">
                        <strong>Address:</strong> {selectedOrder.shippingAddress}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-white">Order Information</h6>
                      <p className="mb-1">
                        <strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}
                      </p>
                      <p className="mb-1">
                        <strong>Status:</strong>{" "}
                        <span className={getStatusBadge(selectedOrder.status)}>{selectedOrder.status}</span>
                      </p>
                      <p className="mb-1">
                        <strong>Total:</strong>{" "}
                        <span className="text-success fw-bold">${selectedOrder.totalAmount.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>

                  <h6 className="text-white mb-3">Order Items</h6>
                  <div className="table-responsive">
                    <table className="table table-dark table-sm">
                      <thead>
                        <tr>
                          <th>SKU</th>
                          <th>Item</th>
                          <th>Qty</th>
                          <th>Unit Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <code className="text-primary">{item.sku}</code>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.unitPrice.toFixed(2)}</td>
                            <td className="fw-bold">${item.totalPrice.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {selectedOrder.notes && (
                    <div className="mt-3">
                      <h6 className="text-white">Notes</h6>
                      <p className="text-muted">{selectedOrder.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content bg-dark border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title text-white">Create New Order</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowNewOrderModal(false)}
                ></button>
              </div>
              <form onSubmit={handleNewOrderSubmit}>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label text-white">Customer Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newOrder.customerName}
                        onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-white">Customer Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={newOrder.customerEmail}
                        onChange={(e) => setNewOrder({ ...newOrder, customerEmail: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Shipping Address *</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={newOrder.shippingAddress}
                      onChange={(e) => setNewOrder({ ...newOrder, shippingAddress: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Notes</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={newOrder.notes}
                      onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-white mb-0">Order Items</h6>
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={addItemToNewOrder}>
                      Add Item
                    </button>
                  </div>

                  {newOrder.items.map((item, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-3">
                            <label className="form-label text-white">SKU</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.sku}
                              onChange={(e) => updateOrderItem(index, "sku", e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label text-white">Item Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.name}
                              onChange={(e) => updateOrderItem(index, "name", e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label text-white">Qty</label>
                            <input
                              type="number"
                              className="form-control"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateOrderItem(index, "quantity", Number.parseInt(e.target.value))}
                              required
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label text-white">Price</label>
                            <input
                              type="number"
                              className="form-control"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => updateOrderItem(index, "unitPrice", Number.parseFloat(e.target.value))}
                              required
                            />
                          </div>
                          <div className="col-md-1 d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeOrderItem(index)}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {newOrder.items.length > 0 && (
                    <div className="text-end">
                      <h5 className="text-white">
                        Total: $
                        {newOrder.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2)}
                      </h5>
                    </div>
                  )}
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowNewOrderModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
