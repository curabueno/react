/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Fiber} from 'react-reconciler/src/ReactFiber';

import {
  REACT_ASYNC_MODE_TYPE,
  REACT_CALL_TYPE,
  REACT_FORWARD_REF_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_RETURN_TYPE,
  REACT_PORTAL_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
} from 'shared/ReactSymbols';

function getComponentName(fiber: Fiber): string | null {
  const {type} = fiber;
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case REACT_ASYNC_MODE_TYPE:
      return 'AsyncMode';
    case REACT_CALL_TYPE:
      return 'ReactCall';
    case REACT_FRAGMENT_TYPE:
      return 'ReactFragment';
    case REACT_PORTAL_TYPE:
      return 'ReactPortal';
    case REACT_PROFILER_TYPE:
      return `Profiler(${fiber.pendingProps.id})`;
    case REACT_RETURN_TYPE:
      return 'ReactReturn';
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';
  }
  if (typeof type === 'object' && type !== null) {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        const functionName = type.render.displayName || type.render.name || '';
        return functionName !== ''
          ? `ForwardRef(${functionName})`
          : 'ForwardRef';
    }
  }
  return null;
}

export default getComponentName;
