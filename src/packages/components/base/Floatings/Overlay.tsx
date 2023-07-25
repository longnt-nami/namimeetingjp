'use client';

import {
  HTMLAttributes,
  PropsWithChildren
} from 'react';
import { createPortal } from 'react-dom';

import BrowserRender from '@/packages/components/base/Displays/BrowserRender';
import cxm from '@/packages/utils/cxm';

import styles from './Overlay.module.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  show?: boolean;
  onClick?: () => void;
}

/**
 * Base Component to create Modal
 * See `Dialog` component for example usage
 */
function Overlay(props: PropsWithChildren<Props>) {
  const {
    children,
    show = false,
    className = '',
    ...attrProps
  } = props;

  const Component = (
    <div
      {...attrProps}
      className={cxm([
        styles.overlay,
        'bg-black bg-opacity-75',
        className
      ])}
    >
      {children}
    </div>
  );

  return (
    <BrowserRender>
      {show && createPortal(Component, document.body)}
    </BrowserRender>
  );
}

export default Overlay;
