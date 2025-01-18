import React from 'react';
import PropTypes from 'prop-types';
import './Styles/Button.css';

const Button = ({ onClick, title, disabled, loading }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="custom-button">
      {loading ? 'Loading...' : title}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  loading: false,
};

export default Button;

