// @ts-nocheck
/// <reference types="jest" />
import { App } from '@app-types/app.types';

import {
  getLastSelectedAppsFromStorage,
  manageLastSelectedApps,
  saveLastSelectedAppsToStorage,
} from './manageLastSelectedApps';

describe('manageLastSelectedApps', () => {
  const mockApps: App[] = [
    {
      app_id: '1',
      name: 'App 1',
      icon: 'https://example.com/app1.png',
      color: '#000000',
      link: 'https://example.com/app1',
    },
    {
      app_id: '2',
      name: 'App 2',
      icon: 'https://example.com/app2.png',
      color: '#000000',
      link: 'https://example.com/app2',
    },
    {
      app_id: '3',
      name: 'App 3',
      icon: 'https://example.com/app3.png',
      color: '#000000',
      link: 'https://example.com/app3',
    },
    {
      app_id: '4',
      name: 'App 4',
      icon: 'https://example.com/app4.png',
      color: '#000000',
      link: 'https://example.com/app4',
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('deve adicionar um novo app à lista', () => {
    const result = manageLastSelectedApps([], mockApps[0], 3);
    expect(result).toHaveLength(1);
    expect(result[0].app_id).toBe('1');
  });

  it('deve mover um app existente para o final', () => {
    const initial = [mockApps[0], mockApps[1]];
    const result = manageLastSelectedApps(initial, mockApps[0], 3);
    expect(result).toHaveLength(2);
    expect(result[result.length - 1].app_id).toBe('1');
  });

  it('deve manter apenas os últimos 3 apps', () => {
    const initial = [mockApps[0], mockApps[1], mockApps[2]];
    const result = manageLastSelectedApps(initial, mockApps[3], 3);
    expect(result).toHaveLength(3);
    expect(result[result.length - 1].app_id).toBe('4');
    expect(result[0].app_id).toBe('2');
  });

  it('deve retornar array vazio quando maxItems é 0', () => {
    const initial = [mockApps[0], mockApps[1]];
    const result = manageLastSelectedApps(initial, mockApps[2], 0);
    expect(result).toHaveLength(0);
  });
});

describe('getLastSelectedAppsFromStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('deve retornar array vazio quando não há dados no storage', () => {
    const result = getLastSelectedAppsFromStorage();
    expect(result).toEqual([]);
  });

  it('deve retornar os IDs salvos no storage', () => {
    const appIds = ['1', '2', '3'];
    localStorage.setItem('lastSelectedApps', JSON.stringify(appIds));
    const result = getLastSelectedAppsFromStorage();
    expect(result).toEqual(appIds);
  });

  it('deve retornar array vazio quando o storage contém dados inválidos', () => {
    localStorage.setItem('lastSelectedApps', 'invalid json');
    const result = getLastSelectedAppsFromStorage();
    expect(result).toEqual([]);
  });
});

describe('saveLastSelectedAppsToStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('deve salvar os IDs no storage', () => {
    const appIds = ['1', '2', '3'];
    saveLastSelectedAppsToStorage(appIds);
    const stored = localStorage.getItem('lastSelectedApps');
    expect(stored).toBe(JSON.stringify(appIds));
  });

  it('deve sobrescrever dados anteriores', () => {
    localStorage.setItem('lastSelectedApps', JSON.stringify(['old']));
    const appIds = ['1', '2'];
    saveLastSelectedAppsToStorage(appIds);
    const stored = localStorage.getItem('lastSelectedApps');
    expect(stored).toBe(JSON.stringify(appIds));
  });
});
