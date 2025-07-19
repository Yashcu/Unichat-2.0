// src/components/dashboard/QuickActionLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuickActionLink = ({ to, label, color = 'gray' }) => (
    <Link
        to={to}
        className={`p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-${color}-500 hover:bg-${color}-50 transition-colors text-center`}
    >
        <p className="text-sm font-medium text-gray-700">{label}</p>
    </Link>
);

QuickActionLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string
};

export default QuickActionLink;
