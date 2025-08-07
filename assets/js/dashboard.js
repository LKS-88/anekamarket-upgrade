document.addEventListener('DOMContentLoaded', function() {
    // Toggle Sidebar
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    const dashboardMain = document.querySelector('.dashboard-main');
    
    sidebarToggle.addEventListener('click', function() {
        dashboardSidebar.classList.toggle('active');
        dashboardMain.classList.toggle('sidebar-collapsed');
    });
    
    // Initialize Charts
    initCharts();
    
    // Toggle Notification Dropdown
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    notificationBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        notificationDropdown.classList.remove('active');
    });
    
    // Prevent dropdown from closing when clicking inside
    notificationDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Toggle User Menu Dropdown
    const userMenuBtn = document.querySelector('.user-menu-btn');
    const userMenuDropdown = document.querySelector('.user-menu-dropdown');
    
    userMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenuDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        userMenuDropdown.classList.remove('active');
    });
    
    // Prevent dropdown from closing when clicking inside
    userMenuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Mark all notifications as read
    const markReadBtn = document.querySelector('.mark-read');
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    const notificationBadge = document.querySelector('.notification-btn .badge');
    
    markReadBtn.addEventListener('click', function() {
        unreadNotifications.forEach(notification => {
            notification.classList.remove('unread');
        });
        
        notificationBadge.style.display = 'none';
    });
    
    // Initialize tooltips for action buttons
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Initialize Charts
function initCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
            datasets: [{
                label: 'Pendapatan',
                data: [2500000, 3200000, 2800000, 3500000, 4200000, 3800000, 4500000, 5000000, 4800000, 5500000, 6000000, 6500000],
                backgroundColor: 'rgba(74, 107, 255, 0.1)',
                borderColor: 'rgba(74, 107, 255, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgba(74, 107, 255, 1)',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Rp ' + context.raw.toLocaleString('id-ID');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + value.toLocaleString('id-ID');
                        }
                    },
                    grid: {
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Makanan', 'Minuman', 'Elektronik', 'Pertanian', 'Lainnya'],
            datasets: [{
                data: [35, 20, 15, 20, 10],
                backgroundColor: [
                    'rgba(74, 107, 255, 0.8)',
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(220, 53, 69, 0.8)',
                    'rgba(108, 117, 125, 0.8)'
                ],
                borderColor: [
                    'rgba(74, 107, 255, 1)',
                    'rgba(40, 167, 69, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(220, 53, 69, 1)',
                    'rgba(108, 117, 125, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${percentage}% (${value} pesanan)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Update charts when period changes
document.querySelector('.chart-period').addEventListener('change', function() {
    // In a real app, you would fetch new data based on the selected period
    console.log('Period changed to:', this.value);
    // Then update the charts with new data
});
