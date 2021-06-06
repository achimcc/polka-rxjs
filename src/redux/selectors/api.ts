import { createSelector } from '@reduxjs/toolkit';
import { Store } from '../store';

const statusSelector = (store: Store) => store.contracts.connectStatus;
const callResultSelector = (store: Store) => store.contracts.callResults;

export const status = createSelector(statusSelector, status => status);
export const isConnected = createSelector(statusSelector, status => status === 'Connected');
export const callResults = createSelector(callResultSelector, results => results);
