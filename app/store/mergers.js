import flowRight from 'lodash/flowRight';
import head from 'lodash/head';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import over from 'lodash/over';
import reject from 'lodash/reject';

export const latestArrayMerger = (objValue, srcValue) => (isArray(objValue) ? srcValue : undefined);

export const latestNullMerger = (objValue, srcValue) => (isNull(objValue) ? srcValue : undefined);

const rejectUndefined = (arr) => reject(arr, isUndefined);

export const complexMerger = flowRight([head, rejectUndefined, over]);
