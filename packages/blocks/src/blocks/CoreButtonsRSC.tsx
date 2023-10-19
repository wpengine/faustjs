import React from 'react';

import { getStyles } from '../utils/get-styles/getStyles.js';
import { BlocksViewerRSC } from '../components/BlocksViewerRSC.js';
import { CoreButtonsFragmentProps, CoreButtons } from './CoreButtons.js';

export function CoreButtonsRSC(props: CoreButtonsFragmentProps) {
  const { attributes, theme, innerBlocks, blocks } = props;
  const style = getStyles(theme, { ...props });
  return (
    <div
      style={style}
      id={attributes?.anchor}
      className={attributes?.cssClassName}>
      <BlocksViewerRSC data={innerBlocks ?? []} blocks={blocks} theme={theme} />
    </div>
  );
}

CoreButtonsRSC.fragments = CoreButtons.fragments;
CoreButtonsRSC.config = CoreButtons.config;
CoreButtonsRSC.displayName = CoreButtons.displayName;
