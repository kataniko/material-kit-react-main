import React from 'react';
import { Image } from '@mui/material';

/**
 * Renders an image component.
 *
 * @returns {JSX.Element} The rendered image component.
 */
const Logo = () => {
    return (
        <Image
            src="../../public/loba.png"
            alt="My image"
            height="200"
            width="300"
            objectFit="cover"
            lazy
        />
    );
};

export default Logo;
