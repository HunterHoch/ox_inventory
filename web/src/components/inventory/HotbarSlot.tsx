import React from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import { Items } from '../../store/items';
import WeightBar from '../utils/WeightBar';
import { Slot } from '../../typings/slot';
import useFitText from '../../hooks/useFitText';

interface Props {
  slot: Slot;
}

const HotbarSlot: React.FC<Props> = ({ slot }) => {
  const label = isSlotWithItem(slot) ? slot.metadata?.label || Items[slot.name]?.label || slot.name : '';
  const { ref: labelRef, fontSize } = useFitText([label]);

  return (
    <div
      className="hotbar-item-slot"
      style={{
        backgroundColor: isSlotWithItem(slot) ? 'rgba(142, 142, 142,0.63)' : 'rgba(71, 71, 71, 0.63)',
        backgroundImage: isSlotWithItem(slot) && slot.name ? `url(${getItemUrl(slot)})` : 'none',
      }}
    >
      {isSlotWithItem(slot) && (
        <div className="item-slot-wrapper">
          {slot.weight !== undefined && (
            <div className="inventory-slot-weight">{(slot.weight / 1000).toLocaleString('en-us')}kg</div>
          )}
          <div className="item-slot-header-wrapper">
            <div className="inventory-slot-number">{slot.slot}</div>
            <p>{slot.count ? slot.count.toLocaleString('en-us') + 'x' : ''}</p>
          </div>
          <div className="inventory-slot-label-box">
            <div className="inventory-slot-label-text" ref={labelRef} style={{ fontSize }}>
              {label}
            </div>
            {slot.durability !== undefined && <WeightBar percent={slot.durability} durability />}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotbarSlot;
