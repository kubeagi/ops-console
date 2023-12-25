import React from 'react';

import Loader from '../Loader';

interface PageLoadingProps {
  fullScreen?: boolean;
}
const PageLoading: React.FC<PageLoadingProps> = ({ fullScreen = true }) => {
  return <Loader fullScreen={fullScreen} spinning />;
};
export default PageLoading;
