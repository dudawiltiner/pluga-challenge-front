import { App } from '@app-types/app.types';

export interface AppModalProps {
  selectedApp: App | null;
  lastSelectedApps: App[];
  onAppSelect: (app: App) => void;
  onClose: () => void;
}
