'use client';
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div id='pagination' style={{ marginTop: '20px' }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Назад
            </button>
            <span style={{ margin: '0 10px' }}>
                Страница {!!(currentPage) ? currentPage : 1} из {!!(totalPages) ? totalPages : 1}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Вперед
            </button>
        </div>
    );
};

export default Pagination;