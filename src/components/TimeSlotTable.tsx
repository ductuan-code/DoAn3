import { Table, Tag, Button, Alert } from 'antd';
import { TimeSlot } from '../types';

interface TimeSlotTableProps {
  timeSlots: TimeSlot[];
  selectedSlots: TimeSlot[];
  bookedSlotIds: string[];
  isSlotSelected: (slotId: string) => boolean;
  isSlotDisabled: (slot: TimeSlot, bookedSlotIds: string[]) => boolean;
  onSelectSlot: (slot: TimeSlot) => void;
}

export default function TimeSlotTable({ 
  timeSlots, 
  selectedSlots, 
  bookedSlotIds,
  isSlotSelected,
  isSlotDisabled,
  onSelectSlot
}: TimeSlotTableProps) {
  
  // Tính tổng giá
  const totalPrice = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);

  const columns = [
    {
      title: 'Giờ',
      dataIndex: 'startTime',
      key: 'time',
      render: (_: any, record: TimeSlot) => (
        <span style={{ fontWeight: 500 }}>
          {record.startTime} - {record.endTime}
        </span>
      )
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {price.toLocaleString('vi-VN')} đ
        </span>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: TimeSlot) => {
        if (bookedSlotIds.includes(record.id)) {
          return <Tag color="red">✗ Đã đặt</Tag>;
        }
        return (
          <Tag color={status === 'available' ? 'green' : 'red'}>
            {status === 'available' ? '✓ Còn trống' : '✗ Đã đặt'}
          </Tag>
        );
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: TimeSlot) => {
        const selected = isSlotSelected(record.id);
        const disabled = isSlotDisabled(record, bookedSlotIds);
        
        return (
          <Button 
            type={selected ? 'primary' : 'default'}
            disabled={disabled}
            onClick={() => onSelectSlot(record)}
          >
            {selected ? '✓ Đã chọn' : 'Chọn'}
          </Button>
        );
      }
    }
  ];

  return (
    <>
      {selectedSlots.length > 0 && (
        <Alert
          message={
            <div>
              <strong>Đã chọn {selectedSlots.length} khung giờ</strong>
              <span style={{ marginLeft: 16 }}>
                Tổng tiền: <span style={{ fontSize: 18, color: '#1890ff', fontWeight: 'bold' }}>
                  {totalPrice.toLocaleString('vi-VN')} đ
                </span>
              </span>
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      <Table 
        dataSource={timeSlots}
        columns={columns}
        rowKey="id"
        pagination={false}
        rowClassName={(record) => 
          isSlotSelected(record.id) ? 'selected-row' : ''
        }
      />
    </>
  );
}
