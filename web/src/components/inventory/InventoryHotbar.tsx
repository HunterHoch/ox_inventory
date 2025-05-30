import React, { useState } from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import useNuiEvent from '../../hooks/useNuiEvent';
import { Items } from '../../store/items';
import WeightBar from '../utils/WeightBar';
import { useAppSelector } from '../../store';
import useFitText from '../../hooks/useFitText';
import { selectLeftInventory } from '../../store/inventory';
import { Slot, SlotWithItem } from '../../typings';
import SlideUp from '../utils/transitions/SlideUp';

const HotbarItem: React.FC<{ item: Slot }> = ({ item }) => {
  const labelText = isSlotWithItem(item)
    ? item.metadata?.label || Items[item.name]?.label || item.name
    : '';
  const labelRef = useFitText(labelText);

  return (
    <>
      {isSlotWithItem(item) && (
        <div className="item-slot-wrapper">
          <div className="item-slot-header-wrapper">
            {item.weight !== undefined && (
              <div className="inventory-slot-weight">
                {(item.weight / 1000).toLocaleString('en-us', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                kg
              </div>
            )}
            <div className="inventory-slot-number">{item.slot}</div>
            <p className="item-slot-amount">{item.count ? item.count.toLocaleString('en-us') + `x` : ''}</p>
          </div>
          <div>
            <div className="inventory-slot-label-box">
              <div className="inventory-slot-label-text" ref={labelRef}>
                {labelText}
              </div>
              {item?.durability !== undefined && <WeightBar percent={item.durability} durability />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const InventoryHotbar: React.FC = () => {
  const [hotbarVisible, setHotbarVisible] = useState(false);
  const items = useAppSelector(selectLeftInventory).items.slice(0, 5);

  //stupid fix for timeout
  const [handle, setHandle] = useState<NodeJS.Timeout>();
  useNuiEvent('toggleHotbar', () => {
    if (hotbarVisible) {
      setHotbarVisible(false);
    } else {
      if (handle) clearTimeout(handle);
      setHotbarVisible(true);
      setHandle(setTimeout(() => setHotbarVisible(false), 3000));
    }
  });

  return (
    <SlideUp in={hotbarVisible}>
      <div className="hotbar-container">
        {items.map((item) => (
          <div
            className="hotbar-item-slot"
            style={{
              backgroundColor: item.metadata?.contraband
                ? 'rgba(255, 105, 97, 0.63)'
                : isSlotWithItem(item)
                ? 'rgba(142, 142, 142,0.63)'
                : 'rgba(71, 71, 71, 0.63)',
              backgroundImage: `url(${item?.name ? getItemUrl(item as SlotWithItem) : 'none'}`,
            }}
            key={`hotbar-${item.slot}`}
          >
            <HotbarItem item={item} />
          </div>
        ))}
      </div>
    </SlideUp>
  );
};

export default InventoryHotbar;
