import React from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import { Items } from '../../store/items';
import WeightBar from '../utils/WeightBar';
import { SlotWithItem } from '../../typings';
import useFitText from '../../hooks/useFitText';

interface Props {
  item: SlotWithItem;
}

const HotbarSlot: React.FC<Props> = ({ item }) => {
  const label = item.metadata?.label ? item.metadata.label : Items[item.name]?.label || item.name;
  const { ref: labelRef, fontSize } = useFitText(label);

  return (
    <div
      className="hotbar-item-slot"
      style={{
        backgroundColor: isSlotWithItem(item) ? 'rgba(142, 142, 142,0.63)' : 'rgba(71, 71, 71, 0.63)',
        backgroundImage: `url(${item?.name ? getItemUrl(item) : 'none'}`,
      }}
    >
      {isSlotWithItem(item) && (
        <div className="item-slot-wrapper">
          <div className="item-slot-header-wrapper">
            <div className="inventory-slot-number">{item.slot}</div>
            <p>{item.count ? item.count.toLocaleString('en-us') + 'x' : ''}</p>
          </div>
          <div>
            <div className="inventory-slot-label-box">
              <div className="inventory-slot-label-text" ref={labelRef} style={{ fontSize: `${fontSize}vw` }}>
                {label}
              </div>
              {item?.durability !== undefined && <WeightBar percent={item.durability} durability />}
              {item.weight !== undefined && (
                <div className="inventory-slot-weight">
                  {(item.weight / 1000).toLocaleString('en-us', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  kg
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotbarSlot;
