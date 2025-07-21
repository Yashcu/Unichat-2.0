// src/components/dashboard/QuickActionLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuickActionLink = ({ to, label, color = 'gray', icon: Icon, inline = false }) => (
    <Link
        to={to}
        className={
            inline
                ? `flex flex-row items-center gap-2 px-2 py-1 rounded-md hover:bg-${color}-50 transition-colors text-center`
                : `flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-${color}-500 hover:bg-${color}-50 transition-colors text-center gap-2`
        }
    >
        {Icon && <Icon className={inline ? `w-5 h-5 text-${color}-500` : `w-6 h-6 mb-1 text-${color}-500`} />}
        <p className={inline ? 'text-sm font-medium text-gray-700' : 'text-sm font-medium text-gray-700'}>{label}</p>
    </Link>
);

QuickActionLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
    icon: PropTypes.elementType,
    inline: PropTypes.bool
};

export default QuickActionLink;
