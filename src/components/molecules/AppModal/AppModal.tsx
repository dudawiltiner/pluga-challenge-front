import React, { useEffect, useRef } from 'react';

import { AppCard } from '@components/atoms/AppCard';

import { useDictionary } from '@context/DictionaryContext';

import Image from 'next/image';

import { ELEMENTS } from './AppModal.enum';
import { AppModalProps } from './AppModal.types';

const AppModal: React.FC<AppModalProps> = ({
  selectedApp,
  lastSelectedApps,
  onAppSelect,
  onClose,
}) => {
  const { dictionary } = useDictionary();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selectedApp && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedApp]);

  if (!selectedApp) {
    return null;
  }

  return (
    <dialog className="modal" ref={modalRef} data-cy={ELEMENTS.APP_MODAL}>
      <div className="modal-box flex flex-col gap-6">
        <div className="mx-auto">
          <div className="flex gap-6">
            <figure
              style={{ backgroundColor: selectedApp.color }}
              className="rounded-full p-10"
            >
              <Image
                data-cy={ELEMENTS.APP_MODAL_IMAGE}
                src={selectedApp.icon}
                alt={selectedApp.name}
                width={64}
                height={64}
              />
            </figure>
            <div className="py-6">
              <h2 className="mb-4 text-lg" data-cy={ELEMENTS.APP_MODAL_NAME}>
                {selectedApp.name}
              </h2>
              <a
                data-cy={ELEMENTS.APP_MODAL_ACCESS_BUTTON}
                href={selectedApp.link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                {dictionary.access}
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-center">{dictionary.lastViewed}</h2>
        <div className="grid grid-cols-3 gap-6">
          {lastSelectedApps.toReversed().map((app) => (
            <AppCard key={app.app_id} app={app} onClick={onAppSelect} />
          ))}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button data-cy={ELEMENTS.APP_MODAL_CLOSE} onClick={onClose}>
          {dictionary.close}
        </button>
      </form>
    </dialog>
  );
};

export default AppModal;
