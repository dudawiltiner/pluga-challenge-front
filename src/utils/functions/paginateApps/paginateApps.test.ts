/// <reference types="jest" />
import { App } from '@app-types/app.types';

import { paginateApps } from './paginateApps';

describe('paginateApps', () => {
  const mockApps: App[] = Array.from({ length: 25 }, (_, i) => ({
    app_id: `${i + 1}`,
    name: `App ${i + 1}`,
    icon: `https://example.com/app${i + 1}.png`,
    color: '#000000',
    link: `https://example.com/app${i + 1}`,
  }));

  it('deve retornar os primeiros 12 apps na página 1', () => {
    const result = paginateApps(mockApps, 1, 12);
    expect(result).toHaveLength(12);
    expect(result[0].app_id).toBe('1');
    expect(result[11].app_id).toBe('12');
  });

  it('deve retornar os apps corretos na página 2', () => {
    const result = paginateApps(mockApps, 2, 12);
    expect(result).toHaveLength(12);
    expect(result[0].app_id).toBe('13');
    expect(result[11].app_id).toBe('24');
  });

  it('deve retornar os apps restantes na última página', () => {
    const result = paginateApps(mockApps, 3, 12);
    expect(result).toHaveLength(1);
    expect(result[0].app_id).toBe('25');
  });

  it('deve retornar array vazio quando a página está fora do range', () => {
    const result = paginateApps(mockApps, 10, 12);
    expect(result).toHaveLength(0);
  });

  it('deve retornar array vazio quando o array de apps está vazio', () => {
    const result = paginateApps([], 1, 12);
    expect(result).toHaveLength(0);
  });
});
