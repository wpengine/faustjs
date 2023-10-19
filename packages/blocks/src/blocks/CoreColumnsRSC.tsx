import React from 'react';

import { getStyles } from '../utils/get-styles/getStyles.js';
import { BlocksViewerRSC } from '../components/BlocksViewerRSC.js';
import { CoreColumnsFragmentProps, CoreColumns } from './CoreColumns.js';

export function CoreColumnsRSC(props: CoreColumnsFragmentProps) {
  const { attributes, theme, innerBlocks, blocks } = props;
  const style = getStyles(theme, { ...props });
  return (
    <div style={style} className={attributes?.cssClassName}>
      <BlocksViewerRSC data={innerBlocks ?? []} blocks={blocks} theme={theme} />
    </div>
  );
}

CoreColumnsRSC.fragments = CoreColumns.fragments;
