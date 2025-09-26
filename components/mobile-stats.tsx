"use client"

interface MobileStatsProps {
  stats: {
    totalItems: number
    pendingCounts: number
    discrepancies: number
    completedCounts: number
    totalOrders: number
    pendingOrders: number
  }
}

export default function MobileStats({ stats }: MobileStatsProps) {
  return (
    <div className="d-md-none">
      <div className="row g-2 mb-4">
        <div className="col-6">
          <div className="card text-center">
            <div className="card-body py-3">
              <div className="text-primary mb-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h18v18H3zM9 9h6v6H9z" />
                </svg>
              </div>
              <h4 className="text-white mb-0">{stats.totalItems}</h4>
              <small className="text-muted">Total Items</small>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card text-center">
            <div className="card-body py-3">
              <div className="text-warning mb-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h4 className="text-white mb-0">{stats.pendingCounts}</h4>
              <small className="text-muted">Pending</small>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card text-center">
            <div className="card-body py-3">
              <div className="text-danger mb-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-white mb-0">{stats.discrepancies}</h4>
              <small className="text-muted">Issues</small>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card text-center">
            <div className="card-body py-3">
              <div className="text-success mb-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h4 className="text-white mb-0">{stats.completedCounts}</h4>
              <small className="text-muted">Complete</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
