import React from 'react';

import Image from 'next/image';

import { ELEMENTS } from './AppCard.enum';
import { AppCardProps } from './AppCard.types';

const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => {
  return (
    <a
      data-cy={ELEMENTS.APP_CARD}
      onClick={() => onClick(app)}
      className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg"
    >
      <figure style={{ backgroundColor: app.color }} className="p-6">
        <Image
          data-cy={ELEMENTS.APP_CARD_IMAGE}
          src={app.icon}
          alt={app.name}
          width={64}
          height={64}
          className="transition group-hover:scale-110"
        />
      </figure>
      <div className="card-body min-h-17 text-center justify-center">
        <h4 data-cy={ELEMENTS.APP_CARD_NAME}>{app.name}</h4>
      </div>
    </a>
  );
};

export default AppCard;
