import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const BreadCrumbs = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event, link) => {
    event.preventDefault();
    navigate(link);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => {
        const isActive = location.pathname === item.link;
        return item.link ? (
          <Link
            key={index}
            color={isActive ? 'primary' : 'inherit'}
            href={item.link}
            onClick={(event) => handleClick(event, item.link)}
            sx={{
              textDecoration: 'none'
            }}
          >
            {item.label}
          </Link>
        ) : (
          <Typography key={index} color="textPrimary">
            {item.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

BreadCrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string
    })
  ).isRequired
};

export default BreadCrumbs;
