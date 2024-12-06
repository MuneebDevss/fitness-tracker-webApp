// src/components/ui/avatar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Avatar = ({ children, className }) => (
  <div className={clsx('inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200', className)}>
    {children}
  </div>
);

export const AvatarImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-full rounded-full object-cover"
  />
);

export const AvatarFallback = ({ children }) => (
  <div className="flex items-center justify-center w-full h-full text-gray-500 text-lg">
    {children}
  </div>
);

Avatar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AvatarImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

AvatarFallback.propTypes = {
  children: PropTypes.node.isRequired,
};
