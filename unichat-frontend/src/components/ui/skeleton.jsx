// src/components/ui/skeleton.jsx
import React from 'react';
import { cn } from "@/lib/utils"
import PropTypes from 'prop-types';

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}
Skeleton.propTypes = {
    className: PropTypes.string
};

export { Skeleton }
