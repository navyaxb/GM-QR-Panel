import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const activeLabel = {
    color: '#000000',
}

const inactiveLabel = {
    color: '#ED1B3B',
}

const breadcrumbContainer = {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    marginBottom: '10px',
    cursor: 'pointer'
}
const CustomBreadcrumb = ({ pages, activePage }: any) => {
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        if(path !='') {
            navigate(path);
        }
    };


    return (
        <nav style={breadcrumbContainer}>
            {pages.map((page: any, index: number) => (
                <>
                    <div style={inactiveLabel}
                        onClick={() => handleClick(page.path)}>
                        {page.label}
                    </div>
                    <div style={inactiveLabel}
                    >
                        /
                    </div>
                </>
            ))}
            <div style={activeLabel}>
                {activePage.label}
            </div>
        </nav>
    );
};

CustomBreadcrumb.propTypes = {
    pages: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        })
    ).isRequired,
    activePage: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
};

export default CustomBreadcrumb;
