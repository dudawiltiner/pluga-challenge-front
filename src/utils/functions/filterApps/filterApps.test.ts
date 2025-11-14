// @ts-nocheck
/// <reference types="jest" />
import { App } from '@app-types/app.types';

import { filterApps } from './filterApps';

describe('filterApps', () => {
  const mockApps: App[] = [
    {
      app_id: '1',
      name: 'Slack',
      icon: 'https://example.com/slack.png',
      color: '#4A154B',
      link: 'https://slack.com',
    },
    {
      app_id: '2',
      name: 'Trello',
      icon: 'https://example.com/trello.png',
      color: '#0079BF',
      link: 'https://trello.com',
    },
    {
      app_id: '3',
      name: 'GitHub',
      icon: 'https://example.com/github.png',
      color: '#181717',
      link: 'https://github.com',
    },
  ];

  it('deve retornar todos os apps quando o termo de busca está vazio', () => {
    const result = filterApps(mockApps, '');
    expect(result).toHaveLength(mockApps.length);
    expect(result).toEqual(mockApps);
  });

  it('deve filtrar apps por nome (case insensitive)', () => {
    const result = filterApps(mockApps, 'slack');
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Slack');
  });

  it('deve retornar array vazio quando nenhum app corresponde ao termo', () => {
    const result = filterApps(mockApps, 'nonexistent');
    expect(result).toHaveLength(0);
  });

  it('deve filtrar apps parcialmente pelo nome', () => {
    const result = filterApps(mockApps, 'tre');
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Trello');
  });

  it('deve ser case insensitive', () => {
    const result1 = filterApps(mockApps, 'GITHUB');
    const result2 = filterApps(mockApps, 'github');
    expect(result1).toHaveLength(result2.length);
    expect(result1[0]?.name).toBe('GitHub');
    expect(result2[0]?.name).toBe('GitHub');
    expect(result1[0]?.app_id).toBe(result2[0]?.app_id);
  });
});
