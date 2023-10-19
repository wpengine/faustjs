import React from 'react';

import { getStyles } from '../utils/get-styles/getStyles.js';
import { BlocksViewerRSC } from '../components/BlocksViewerRSC.js';
import { CoreColumnFragmentProps, CoreColumn } from './CoreColumn.js';

export function CoreColumnRSC(props: CoreColumnFragmentProps) {
  const { attributes, theme, innerBlocks, blocks } = props;
  const style = getStyles(theme, { ...props });
  return (
    <div style={style} className={attributes?.cssClassName}>
      <BlocksViewerRSC data={innerBlocks ?? []} blocks={blocks} theme={theme} />
    </div>
  );
}

CoreColumnRSC.fragments = CoreColumn.fragments;
