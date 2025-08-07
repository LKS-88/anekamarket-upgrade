document.addEventListener('DOMContentLoaded', function() {
    // Initialize DataTable
    const ordersTable = $('#ordersTable').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/id.json'
        },
        columnDefs: [
            { responsivePriority: 1, targets: 0 }, // ID Pesanan
            { responsivePriority: 2, targets: 6 }, // Aksi
            { responsivePriority: 3, targets: 1 }, // Pelanggan
            { responsivePriority: 4, targets: 4 }, // Status
            { 
                targets: [3], // Total
                render: function(data, type, row) {
                    if (type === 'display') {
                        return 'Rp ' + parseInt(data).toLocaleString('id-ID');
                    }
                    return data;
                }
            }
        ]
    });

    // Filter Orders
    $('#orderStatus, #orderDate, #searchOrder').on('change keyup', function() {
        ordersTable.draw();
    });

    // Order Detail Modal
    $('.action-btn.view').on('click', function() {
        $('#orderDetailModal').modal('show');
    });

    // Add New Order
    $('#addOrderBtn').on('click', function() {
        // In a real app, this would open a form to add new order
        console.log('Add new order clicked');
    });

    // Print Order
    $('.action-btn.print').on('click', function(e) {
        e.stopPropagation();
        // In a real app, this would print the order invoice
        console.log('Print order clicked');
    });

    // Export Orders
    $('.btn-export').on('click', function() {
        // In a real app, this would export orders to Excel/PDF
        console.log('Export orders clicked');
    });
});
