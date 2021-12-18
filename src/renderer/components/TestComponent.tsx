import { Button, DatePicker } from "antd";
import { useState } from "react";

export const TestComponent = () => {

  const [date, setDate] = useState<moment.Moment | null>(null);
  const handleChange = (value: moment.Moment | null) => {
    console.log(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
  };
  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <DatePicker onChange={handleChange} />
      <div style={{ marginTop: 16 }}>
        Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
      </div>
    </div>
  );
  
};
