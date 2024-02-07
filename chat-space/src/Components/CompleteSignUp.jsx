import React, { useState } from "react";
import { Radio, Space } from "antd";
import { useDispatch } from "react-redux";
import { SET_RADIO_BUTTON_DATA } from "../Actions/actionConstant";

export default function CompleteSignUp() {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const onChange = (e) => {
    debugger;
    if (e.target.value === 1) {
      dispatch({
        type: SET_RADIO_BUTTON_DATA,
        payload: { isDisplaySelected: true },
      });
    } else {
      dispatch({
        type: SET_RADIO_BUTTON_DATA,
        payload: { isDisplaySelected: false },
      });
    }
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
