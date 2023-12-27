import React from 'react'

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <nav className="flex gap-2 justify-center text-white">
            <button
                type="button"
                className="min-w-7 rounded-md p-1"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    type="button"
                    className={`bg-card min-w-7 rounded-md p-1 ${index + 1 === currentPage ? 'bg-primary' : ''}`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button
                type="button"
                className="min-w-7 rounded-md p-1"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </nav>
    )
}

export default Pagination