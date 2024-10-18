import React, { useState, useMemo } from "react";

export const Pagination = ({totalItems, pageSize, pageSizeList = [5, 10, 25, 50], onChangePage}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const [pages, setPages] = useState([]);

    const paginationData = useMemo(() => {
        let totalPaginas = Math.ceil(totalItems / pageSize);
        let listaPaginas = new Array();
        for (let auxI = 0; auxI < totalPaginas; auxI++) {
            listaPaginas.push(auxI + 1);
        }
        setPages(listaPaginas);
    }, [totalItems, pageSize]);

    function seleccionaPagina(newPage, newPageSize) {
        setCurrentPage(newPage);
        pageSize = newPageSize;
        onChangePage(newPage, newPageSize);
    }

    return (
            <nav className="nav">
                <ul className="mt-4 false false pagination">
                <li className="page-item"><button className="page-link" disabled={currentPage == 1 ? true : false} onClick={() => { seleccionaPagina(1, pageSize); }}><i className="la la-angle-double-left"></i></button></li>
                <li className="page-item"><button className="page-link" disabled={currentPage == 1 ? true : false} onClick={() => { seleccionaPagina(currentPage - 1, pageSize); }}><i className="la la-angle-left"></i></button></li>
                    {pages.map((num, index) =>
                        <li key={index} className={`page-item ${currentPage === num ? 'active' : ''}`}><button className={`page-link` + (currentPage == num ? ` current-page` : ``)} onClick={() => { seleccionaPagina(num, pageSize); }}>{num}</button></li>
                    )}
                    <li className="page-item"><button className="page-link" disabled={currentPage == pages.length ? true : false} onClick={() => { seleccionaPagina(currentPage + 1, pageSize); }}><i className="la la-angle-right"></i></button></li>
                    <li className="page-item"><button className="page-link" disabled={currentPage == pages.length ? true : false} onClick={() => { seleccionaPagina(pages.length, pageSize); }}><i className="la la-angle-double-right"></i></button></li>
                </ul>
            </nav>
    )
}