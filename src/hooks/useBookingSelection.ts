import { useState, useMemo } from 'react';
import { TimeSlot } from '../types';

interface UseBookingSelectionReturn {
  selectedSlots: TimeSlot[];
  totalPrice: number;
  isSlotSelected: (slotId: string) => boolean;
  isSlotDisabled: (slot: TimeSlot, bookedSlotIds: string[]) => boolean;
  toggleSlot: (slot: TimeSlot) => void;
  clearSelection: () => void;
  hasSelection: boolean;
}

/**
 * Custom hook để quản lý logic chọn slots khi booking
 * 
 * Features:
 * - Chọn/bỏ chọn slots
 * - Kiểm tra slots liên tiếp
 * - Tính tổng tiền tự động
 * - Disable slots không hợp lệ
 */
export function useBookingSelection(): UseBookingSelectionReturn {
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  /**
   * Tính tổng giá của các slots đã chọn
   */
  const totalPrice = useMemo(() => {
    return selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
  }, [selectedSlots]);

  /**
   * Kiểm tra slot có được chọn không
   */
  const isSlotSelected = (slotId: string): boolean => {
    return selectedSlots.some(s => s.id === slotId);
  };

  /**
   * Kiểm tra 2 slots có liên tiếp không
   */
  const areConsecutive = (slot1: TimeSlot, slot2: TimeSlot): boolean => {
    return slot1.endTime === slot2.startTime || slot1.startTime === slot2.endTime;
  };

  /**
   * Kiểm tra slot có liên tiếp với bất kỳ slot nào đã chọn không
   */
  const isConsecutiveWithSelected = (slot: TimeSlot): boolean => {
    if (selectedSlots.length === 0) return true;

    // Sắp xếp các slots đã chọn theo thời gian
    const sortedSelected = [...selectedSlots].sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    );

    const firstSlot = sortedSelected[0];
    const lastSlot = sortedSelected[sortedSelected.length - 1];

    // Kiểm tra slot có liền trước hoặc liền sau không
    const isBeforeFirst = slot.endTime === firstSlot.startTime;
    const isAfterLast = slot.startTime === lastSlot.endTime;

    return isBeforeFirst || isAfterLast;
  };

  /**
   * Kiểm tra slot có bị disable không
   * 
   * Disable khi:
   * - Slot đã được đặt (trong bookedSlotIds)
   * - Slot không available
   * - Slot không liên tiếp với các slot đã chọn
   */
  const isSlotDisabled = (slot: TimeSlot, bookedSlotIds: string[]): boolean => {
    // Nếu slot đã được đặt
    if (bookedSlotIds.includes(slot.id)) return true;
    
    // Nếu slot không available
    if (slot.status !== 'available') return true;

    // Nếu slot đã được chọn, cho phép bỏ chọn
    if (isSlotSelected(slot.id)) return false;

    // Nếu chưa chọn slot nào, cho phép chọn
    if (selectedSlots.length === 0) return false;

    // Kiểm tra slot có liên tiếp với các slot đã chọn không
    return !isConsecutiveWithSelected(slot);
  };

  /**
   * Toggle slot (chọn/bỏ chọn)
   */
  const toggleSlot = (slot: TimeSlot): void => {
    setSelectedSlots(prev => {
      const isAlreadySelected = prev.some(s => s.id === slot.id);
      
      if (isAlreadySelected) {
        // Bỏ chọn slot
        return prev.filter(s => s.id !== slot.id);
      } else {
        // Thêm slot vào danh sách đã chọn
        return [...prev, slot];
      }
    });
  };

  /**
   * Xóa toàn bộ selection
   */
  const clearSelection = (): void => {
    setSelectedSlots([]);
  };

  /**
   * Kiểm tra có slot nào được chọn không
   */
  const hasSelection = selectedSlots.length > 0;

  return {
    selectedSlots,
    totalPrice,
    isSlotSelected,
    isSlotDisabled,
    toggleSlot,
    clearSelection,
    hasSelection
  };
}
