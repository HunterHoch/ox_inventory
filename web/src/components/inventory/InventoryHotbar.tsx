import React, { useRef, useState } from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import useNuiEvent from '../../hooks/useNuiEvent';
import { Items } from '../../store/items';
import WeightBar from '../utils/WeightBar';
import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';
import { Slot, SlotWithItem } from '../../typings';
import SlideUp from '../utils/transitions/SlideUp';
import useFitText from '../../hooks/useFitText';

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

  const HotbarSlot = ({ item }: { item: Slot }) => {
    const labelRef = useRef<HTMLDivElement>(null);
    useFitText(labelRef, [item.metadata?.label, item.name]);

    return (
      <div
        className="hotbar-item-slot"
        style={{
          backgroundColor: isSlotWithItem(item) ? 'rgba(142, 142, 142,0.63)' : 'rgba(71, 71, 71, 0.63)',
          backgroundImage: `url(${item?.name ? getItemUrl(item as SlotWithItem) : 'none'}`,
        }}
        key={`hotbar-${item.slot}`}
      >
        {isSlotWithItem(item) && (
          <div className="item-slot-wrapper">
            <div className="item-slot-header-wrapper">
              <div className="inventory-slot-number">{item.slot}</div>
              <p>{item.count ? item.count.toLocaleString('en-us') + `x` : ''}</p>
              {item.weight !== undefined && (
                <div className="inventory-slot-weight">{(item.weight / 1000).toLocaleString('en-us')}kg</div>
              )}
            </div>
            <div>
              <div className="inventory-slot-label-box">
                <div className="inventory-slot-label-text" ref={labelRef}>
                  {item.metadata?.label ? item.metadata.label : Items[item.name]?.label || item.name}
                </div>
                {item?.durability !== undefined && <WeightBar percent={item.durability} durability />}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <SlideUp in={hotbarVisible}>
      <div className="hotbar-container">
        {items.map((item) => (
          <HotbarSlot item={item} key={item.slot} />
        ))}
      </div>
    </SlideUp>
  );
};

export default InventoryHotbar;
