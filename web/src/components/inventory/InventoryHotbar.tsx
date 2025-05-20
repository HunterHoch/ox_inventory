import React, { useState } from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import useNuiEvent from '../../hooks/useNuiEvent';
import { Items } from '../../store/items';
import WeightBar from '../utils/WeightBar';
import useFitText from '../../hooks/useFitText';
import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';
import { SlotWithItem, Slot } from '../../typings';
import SlideUp from '../utils/transitions/SlideUp';

const HotbarSlot: React.FC<{ item: Slot }> = ({ item }) => {
  const { labelRef, fontSize } = useFitText();
  const label = item.metadata?.label ? item.metadata.label : item.name ? Items[item.name]?.label || item.name : '';

  return (
    <div
      className="hotbar-item-slot"
      style={{
        backgroundColor: isSlotWithItem(item) ? 'rgba(142, 142, 142,0.63)' : 'rgba(71, 71, 71, 0.63)',
        backgroundImage: `url(${item?.name ? getItemUrl(item as SlotWithItem) : 'none'}`,
      }}
    >
      {isSlotWithItem(item) && (
        <div className="item-slot-wrapper">
          <div className="item-slot-header-wrapper">
            <div className="inventory-slot-number">{item.slot}</div>
            <p>{item.count ? item.count.toLocaleString('en-us') + `x` : ''}</p>
          </div>
          <div>
            <div className="inventory-slot-label-box">
              <div className="inventory-slot-label-text" ref={labelRef} style={{ fontSize: `${fontSize}vw` }}>
                {label}
              </div>
              {item?.durability !== undefined && <WeightBar percent={item.durability} durability />}
            </div>
            {item.weight !== undefined && (
              <div className="inventory-slot-weight">{(item.weight / 1000).toLocaleString('en-us')}kg</div>
            )}
          </div>
        </div>
      )}
    </div>
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
          <HotbarSlot item={item} key={`hotbar-${item.slot}`} />
        ))}
      </div>
    </SlideUp>
  );
};

export default InventoryHotbar;
