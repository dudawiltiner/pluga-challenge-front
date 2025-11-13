import { App } from '@app-types/app.types';

export interface AppCardProps {
  app: App;
  onClick: (app: App) => void;
}
