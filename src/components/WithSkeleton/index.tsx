import React, { FC } from 'react';

type WithSkeletonProps = {
  readonly isLoading: boolean;
  readonly isEmpty: boolean;
  readonly error: string | undefined;

  readonly loadingSlot?: React.ReactNode;
  readonly emptySpaceSlot?: React.ReactNode;
  readonly errorSlot?: React.ReactNode;
};

const WithSkeleton: FC<WithSkeletonProps> = (
  {
    isLoading,
    isEmpty,
    error,

    loadingSlot,
    emptySpaceSlot,
    errorSlot,
    children,
  }) => {
  if (isLoading) {
    return <>{loadingSlot || 'Loading...'}{children}</>;
  }

  if (!isLoading && !isEmpty && !error) {
    return <>{children}</>;
  }

  if (!isLoading && !error && isEmpty) {
    return <>{emptySpaceSlot || "no data provided"}</>;
  }

  if (error) {
    return <>{errorSlot || "Something went wrong"}</>;
  }

  return <>{error}</>;
};

export default WithSkeleton;
