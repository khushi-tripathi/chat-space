import React, { useState } from "react";
import { Radio, Space } from "antd";

export default function CompleteSignUp() {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <h1>Please select any of the option to proceed...</h1>
      <Radio.Group className="sign-up-radio" onChange={onChange} value={value}>
        <Space direction="vertical">
          <Radio value={1}>
            By Default : Display all the registered people
          </Radio>
          <Radio value={2}>By Default : No one in the list</Radio>
          <Radio value={3}>Skip for now...</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
}
